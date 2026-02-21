import type { ConceptualProduct, CreateConceptualProductInput } from "@/backend/domain/products/models";

export type CreditsBalance = number;

export interface CreditsPort {
  getBalance(userId: string): Promise<CreditsBalance>;
  debitOneIfAvailable(userId: string): Promise<boolean>;
}

export interface CreateConceptualProductPort {
  createDebitingOneCreditIfAvailable(
    userId: string,
    input: CreateConceptualProductInput
  ): Promise<{ ok: true; id: string } | { ok: false; error: "NO_CREDITS" }>;
}

export interface ConceptualProductsPort {
  listByUserId(userId: string, limit: number): Promise<ConceptualProduct[]>;
  create(userId: string, input: CreateConceptualProductInput): Promise<{ id: string }>;
  countByUserId(userId: string): Promise<number>;
}

export interface TransactionPort {
  runInTransaction<T>(fn: (ports: { credits: CreditsPort; products: ConceptualProductsPort }) => Promise<T>): Promise<T>;
}
