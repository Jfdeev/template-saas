import { randomUUID } from "crypto";
import { and, desc, eq, gt, sql } from "drizzle-orm";

import type {
  CreateConceptualProductPort,
  CreditsPort,
  ConceptualProductsPort,
  TransactionPort,
} from "@/app/core/ports/products-ports";
import type { CreateConceptualProductInput } from "@/app/core/products/models";
import { getDb } from "@/app/lib/db";
import { conceptualProducts, users } from "@/app/lib/db/schema";

type DbLike = ReturnType<typeof getDb>;

function makeCreditsPort(db: DbLike): CreditsPort {
  return {
    async getBalance(userId: string) {
      const [row] = await db
        .select({ creditsBalance: users.creditsBalance })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      return row?.creditsBalance ?? 0;
    },

    async debitOneIfAvailable(userId: string) {
      const updated = await db
        .update(users)
        .set({ creditsBalance: sql`${users.creditsBalance} - 1` })
        .where(and(eq(users.id, userId), gt(users.creditsBalance, 0)))
        .returning({ creditsBalance: users.creditsBalance });

      return updated.length > 0;
    },
  };
}

function makeConceptualProductsPort(db: DbLike): ConceptualProductsPort {
  return {
    async listByUserId(userId: string, limit: number) {
      return db
        .select({
          id: conceptualProducts.id,
          userId: conceptualProducts.userId,
          name: conceptualProducts.name,
          category: conceptualProducts.category,
          brand: conceptualProducts.brand,
          model: conceptualProducts.model,
          versionGeneration: conceptualProducts.versionGeneration,
          storage: conceptualProducts.storage,
          color: conceptualProducts.color,
          voltage: conceptualProducts.voltage,
          defaultCondition: conceptualProducts.defaultCondition,
          marketRegion: conceptualProducts.marketRegion,
          baseCurrency: conceptualProducts.baseCurrency,
          collectionFrequencyMinutes: conceptualProducts.collectionFrequencyMinutes,
          monitorType: conceptualProducts.monitorType,
          discoveryStatus: conceptualProducts.discoveryStatus,
          isActive: conceptualProducts.isActive,
          createdAt: conceptualProducts.createdAt,
        })
        .from(conceptualProducts)
        .where(eq(conceptualProducts.userId, userId))
        .orderBy(desc(conceptualProducts.createdAt))
        .limit(limit);
    },

    async countByUserId(userId: string) {
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(conceptualProducts)
        .where(eq(conceptualProducts.userId, userId));

      return Number(count ?? 0) || 0;
    },

    async create(userId: string, input: CreateConceptualProductInput) {
      const id = randomUUID();

      await db.insert(conceptualProducts).values({
        id,
        userId,
        name: input.name.trim(),
        category: input.category.trim(),
        brand: input.brand.trim(),
        model: input.model.trim(),
        versionGeneration: input.versionGeneration.trim(),
        storage: input.storage.trim(),
        color: input.color.trim(),
        voltage: input.voltage?.trim() ? input.voltage.trim() : null,
        defaultCondition: input.defaultCondition.trim(),
        marketRegion: String(input.marketRegion).trim(),
        baseCurrency: String(input.baseCurrency).trim(),
        collectionFrequencyMinutes: input.collectionFrequencyMinutes,
        monitorType: String(input.monitorType).trim(),
        discoveryStatus: "PENDING",
        isActive: true,
      });

      return { id };
    },
  };
}

export function makeDrizzlePorts(db: DbLike) {
  return {
    credits: makeCreditsPort(db),
    products: makeConceptualProductsPort(db),
  };
}

export function makeDrizzleCreateConceptualProductPort(db: DbLike): CreateConceptualProductPort {
  return {
    async createDebitingOneCreditIfAvailable(userId: string, input: CreateConceptualProductInput) {
      const id = randomUUID();
      const voltage = input.voltage?.trim() ? input.voltage.trim() : null;

      const result = await (db as unknown as { execute: (q: unknown) => Promise<unknown> }).execute(
        sql`
          WITH debited AS (
            UPDATE users
            SET "creditsBalance" = "creditsBalance" - 1
            WHERE id = ${userId} AND "creditsBalance" > 0
            RETURNING id
          )
          INSERT INTO conceptual_products (
            "id",
            "userId",
            "name",
            "category",
            "brand",
            "model",
            "versionGeneration",
            "storage",
            "color",
            "voltage",
            "defaultCondition",
            "marketRegion",
            "baseCurrency",
            "collectionFrequencyMinutes",
            "monitorType",
            "discoveryStatus",
            "isActive"
          )
          SELECT
            ${id},
            ${userId},
            ${input.name.trim()},
            ${input.category.trim()},
            ${input.brand.trim()},
            ${input.model.trim()},
            ${input.versionGeneration.trim()},
            ${input.storage.trim()},
            ${input.color.trim()},
            ${voltage},
            ${input.defaultCondition.trim()},
            ${String(input.marketRegion).trim()},
            ${String(input.baseCurrency).trim()},
            ${input.collectionFrequencyMinutes},
            ${String(input.monitorType).trim()},
            'PENDING',
            true
          FROM debited
          RETURNING "id";
        `
      );

      const rows = (result as { rows?: Array<{ id: string }> }).rows ?? (result as Array<{ id: string }>);
      const createdId = Array.isArray(rows) ? rows[0]?.id : undefined;
      if (!createdId) {
        return { ok: false, error: "NO_CREDITS" };
      }

      return { ok: true, id: createdId };
    },
  };
}

export function makeDrizzleTransactionPort(db: DbLike): TransactionPort {
  return {
    async runInTransaction<T>(fn: (ports: { credits: CreditsPort; products: ConceptualProductsPort }) => Promise<T>) {
      return db.transaction(async (tx) => fn(makeDrizzlePorts(tx as unknown as DbLike)));
    },
  };
}
