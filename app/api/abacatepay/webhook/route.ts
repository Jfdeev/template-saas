import "server-only";

import crypto from "node:crypto";

import { getDb } from "@/app/lib/db";
import { paymentWebhookEvents, payments, users } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type AbacateWebhook = {
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

function safeEqual(a: string, b: string) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && crypto.timingSafeEqual(A, B);
}

function verifyHmac(rawBody: string, signatureFromHeader: string, key: string) {
  const expected = crypto.createHmac("sha256", key).update(Buffer.from(rawBody, "utf8")).digest("base64");
  return safeEqual(expected, signatureFromHeader);
}

export async function POST(req: NextRequest) {
  const db = getDb();

  const expectedSecret = process.env.ABACATEPAY_WEBHOOK_SECRET;
  if (expectedSecret) {
    const provided = req.nextUrl.searchParams.get("webhookSecret");
    if (!provided || provided !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const signature = req.headers.get("X-Webhook-Signature");
  const hmacKey = process.env.ABACATEPAY_PUBLIC_HMAC_KEY;

  const rawBody = await req.text();

  if (signature && hmacKey) {
    const ok = verifyHmac(rawBody, signature, hmacKey);
    if (!ok) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let payload: AbacateWebhook;
  try {
    payload = JSON.parse(rawBody) as AbacateWebhook;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const webhookId = payload.id;
  const event = payload.event;

  if (!webhookId || !event) {
    return NextResponse.json({ error: "Missing webhook id/event" }, { status: 400 });
  }

  const existing = await db
    .select({ id: paymentWebhookEvents.id })
    .from(paymentWebhookEvents)
    .where(eq(paymentWebhookEvents.id, webhookId))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const paymentId = payload.data?.pixQrCode?.id ?? null;

  await db.insert(paymentWebhookEvents).values({
    id: webhookId,
    provider: "abacatepay",
    event,
    paymentId,
  });

  if (paymentId) {
    await db
      .update(payments)
      .set({ status: payload.data?.pixQrCode?.status ?? event })
      .where(eq(payments.id, paymentId));

    const isPaid =
      event.toLowerCase().includes("paid") ||
      payload.data?.pixQrCode?.status === "PAID";

    if (isPaid) {
      const rows = await db
        .select({ userId: payments.userId })
        .from(payments)
        .where(eq(payments.id, paymentId))
        .limit(1);

      const userId = rows[0]?.userId;
      if (userId) {
        await db.update(users).set({ hasPaidAccess: true }).where(eq(users.id, userId));
      }
    }
  }

  return NextResponse.json({ ok: true });
}
