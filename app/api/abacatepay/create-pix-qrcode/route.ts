import { auth } from "@/app/lib/auth";
import { abacatepayFetch } from "@/app/lib/abacatepay";
import { getDb } from "@/app/lib/db";
import { payments } from "@/app/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

type CreatePixBody = {
  value: number;
};

type PixQrCode = {
  id: string;
  amount: number;
  status: "PENDING" | "PAID" | "EXPIRED" | "CANCELLED" | "REFUNDED" | string;
  brCode: string;
  brCodeBase64: string;
  expiresAt: string;
};

export async function POST(req: NextRequest) {
  const db = getDb();

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: CreatePixBody;
  try {
    body = (await req.json()) as CreatePixBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const value = Number(body.value);
  if (!Number.isFinite(value) || value <= 0) {
    return NextResponse.json({ error: "value must be a positive number" }, { status: 400 });
  }

  const amount = Math.round(value * 100);

  const pix = await abacatepayFetch<PixQrCode>("/pixQrCode/create", {
    method: "POST",
    body: JSON.stringify({
      amount,
      expiresIn: 60 * 60, // 1h
      description: "Pagamento avulso",
      metadata: {
        userId,
      },
    }),
  });

  await db
    .insert(payments)
    .values({
      id: pix.id,
      userId,
      provider: "abacatepay",
      billingType: "PIX",
      valueCents: pix.amount,
      status: pix.status,
    })
    .onConflictDoUpdate({
      target: payments.id,
      set: {
        status: pix.status,
        valueCents: pix.amount,
        provider: "abacatepay",
        userId,
      },
    });

  return NextResponse.json({
    paymentId: pix.id,
    status: pix.status,
    pix: {
      brCode: pix.brCode,
      qrCodeImage: pix.brCodeBase64,
      expiresAt: pix.expiresAt,
    },
  });
}
