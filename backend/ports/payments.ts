export type PixQrCodeStatus = "PENDING" | "PAID" | "EXPIRED" | "CANCELLED" | "REFUNDED" | string;

export type PixQrCode = {
  id: string;
  amount: number;
  status: PixQrCodeStatus;
  brCode: string;
  brCodeBase64: string;
  expiresAt: string;
};

export interface CreatePixQrCodeGatewayPort {
  createPixQrCode(input: {
    amount: number;
    expiresIn: number;
    description: string;
    metadata: Record<string, string>;
  }): Promise<PixQrCode>;
}

export interface PaymentsRepositoryPort {
  upsertPayment(input: {
    id: string;
    userId: string;
    provider: string;
    billingType: string;
    valueCents: number;
    status: string | null;
  }): Promise<void>;

  updatePaymentStatus(paymentId: string, status: string): Promise<void>;
  getPaymentUserId(paymentId: string): Promise<string | null>;
}

export interface PaymentWebhookEventsRepositoryPort {
  exists(id: string): Promise<boolean>;
  insert(input: { id: string; provider: string; event: string; paymentId: string | null }): Promise<void>;
}

export interface UsersRepositoryPort {
  grantPaidAccess(userId: string): Promise<void>;
}
