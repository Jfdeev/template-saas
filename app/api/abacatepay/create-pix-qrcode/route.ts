import { auth } from "@/app/lib/auth";
import { abacatepayFetch } from "@/app/lib/abacatepay";
import { getDb } from "@/app/lib/db";
import { payments } from "@/app/lib/db/schema";
import { NextResponse } from "next/server";

type PixQrCode = {
  id: string;
  amount: number;
  status: "PENDING" | "PAID" | "EXPIRED" | "CANCELLED" | "REFUNDED" | string;
  brCode: string;
  brCodeBase64: string;
  expiresAt: string;
};

export async function POST() {
  const db = getDb();

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const configured = process.env.ABACATEPAY_PRICE_CENTS;
  const amount = configured ? Number(configured) : 590;

  if (!Number.isInteger(amount) || amount <= 0) {
    return NextResponse.json({ error: "Invalid ABACATEPAY_PRICE_CENTS" }, { status: 500 });
  }

  const pix = await abacatepayFetch<PixQrCode>("/pixQrCode/create", {
    method: "POST",
    body: JSON.stringify({
      amount,
      expiresIn: 60 * 60, // 1h
      description: process.env.ABACATEPAY_DESCRIPTION ?? "Pagamento avulso",
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
