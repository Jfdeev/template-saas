import type {
  PaymentWebhookEventsRepositoryPort,
  PaymentsRepositoryPort,
  UsersRepositoryPort,
} from "@/backend/ports/payments";

export type AbacateWebhook = {
  id?: string;
  event?: string;
  devMode?: boolean;
  data?: {
    pixQrCode?: {
      id?: string;
      status?: string;
      amount?: number;
    };
    payment?: {
      amount?: number;
      method?: string;
    };
  };
};

export async function handleAbacatepayWebhook(
  deps: {
    webhookEvents: PaymentWebhookEventsRepositoryPort;
    payments: PaymentsRepositoryPort;
    users: UsersRepositoryPort;
  },
  payload: AbacateWebhook
) {
  const webhookId = payload.id;
  const event = payload.event;

  if (!webhookId || !event) {
    return { ok: false as const, error: "Missing webhook id/event" };
  }

  const already = await deps.webhookEvents.exists(webhookId);
  if (already) {
    return { ok: true as const };
  }

  const paymentId = payload.data?.pixQrCode?.id ?? null;

  await deps.webhookEvents.insert({
    id: webhookId,
    provider: "abacatepay",
    event,
    paymentId,
  });

  if (!paymentId) {
    return { ok: true as const };
  }

  const status = payload.data?.pixQrCode?.status ?? event;
  await deps.payments.updatePaymentStatus(paymentId, status);

  const isPaid = event.toLowerCase().includes("paid") || payload.data?.pixQrCode?.status === "PAID";
  if (!isPaid) {
    return { ok: true as const };
  }

  const userId = await deps.payments.getPaymentUserId(paymentId);
  if (userId) {
    await deps.users.grantPaidAccess(userId);
  }

  return { ok: true as const };
}
