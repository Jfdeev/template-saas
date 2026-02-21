import "server-only";

import { handleAbacatepayWebhook } from "@/backend/container";
import { verifyAbacatepayHmac } from "@/backend/adapters/abacatepay/webhook-signature";
import type { AbacateWebhook } from "@/backend/application/payments/handle-webhook";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    const ok = verifyAbacatepayHmac(rawBody, signature, hmacKey);
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

  const result = await handleAbacatepayWebhook(payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

