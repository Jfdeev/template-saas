import type { CreatePixQrCodeGatewayPort, PaymentsRepositoryPort } from "@/backend/ports/payments";

export async function createPixQrCodeForUser(
  deps: { gateway: CreatePixQrCodeGatewayPort; payments: PaymentsRepositoryPort },
  userId: string,
  config: { amountCents: number; expiresInSeconds: number; description: string }
) {
  const pix = await deps.gateway.createPixQrCode({
    amount: config.amountCents,
    expiresIn: config.expiresInSeconds,
    description: config.description,
    metadata: { userId },
  });

  await deps.payments.upsertPayment({
    id: pix.id,
    userId,
    provider: "abacatepay",
    billingType: "PIX",
    valueCents: pix.amount,
    status: pix.status ?? null,
  });

  return {
    paymentId: pix.id,
    status: pix.status ?? null,
    pix: {
      brCode: pix.brCode,
      qrCodeImage: pix.brCodeBase64,
      expiresAt: pix.expiresAt,
    },
  };
}
