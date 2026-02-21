import { eq } from "drizzle-orm";

import type {
  PaymentWebhookEventsRepositoryPort,
  PaymentsRepositoryPort,
  UsersRepositoryPort,
} from "@/backend/ports/payments";
import { paymentWebhookEvents, payments, users } from "@/backend/infra/db/schema";

type DbLike = ReturnType<typeof import("@/backend/infra/db").getDb>;

export function makeDrizzlePaymentsRepository(db: DbLike): PaymentsRepositoryPort {
  return {
    async upsertPayment(input) {
      await db
        .insert(payments)
        .values({
          id: input.id,
          userId: input.userId,
          provider: input.provider,
          billingType: input.billingType,
          valueCents: input.valueCents,
          status: input.status,
        })
        .onConflictDoUpdate({
          target: payments.id,
          set: {
            status: input.status,
            valueCents: input.valueCents,
            provider: input.provider,
            billingType: input.billingType,
            userId: input.userId,
          },
        });
    },

    async updatePaymentStatus(paymentId: string, status: string) {
      await db.update(payments).set({ status }).where(eq(payments.id, paymentId));
    },

    async getPaymentUserId(paymentId: string) {
      const rows = await db
        .select({ userId: payments.userId })
        .from(payments)
        .where(eq(payments.id, paymentId))
        .limit(1);

      return rows[0]?.userId ?? null;
    },
  };
}

export function makeDrizzlePaymentWebhookEventsRepository(db: DbLike): PaymentWebhookEventsRepositoryPort {
  return {
    async exists(id: string) {
      const existing = await db
        .select({ id: paymentWebhookEvents.id })
        .from(paymentWebhookEvents)
        .where(eq(paymentWebhookEvents.id, id))
        .limit(1);

      return existing.length > 0;
    },

    async insert(input) {
      await db.insert(paymentWebhookEvents).values({
        id: input.id,
        provider: input.provider,
        event: input.event,
        paymentId: input.paymentId,
      });
    },
  };
}

export function makeDrizzleUsersRepository(db: DbLike): UsersRepositoryPort {
  return {
    async grantPaidAccess(userId: string) {
      await db.update(users).set({ hasPaidAccess: true }).where(eq(users.id, userId));
    },
  };
}
