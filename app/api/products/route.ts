import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";

import { createProductForUser, getProductsDataForUser } from "@/app/server/products/service";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getProductsDataForUser(userId);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const input = body as Record<string, unknown>;

  const result = await createProductForUser(userId, {
    name: String(input.name ?? ""),
    category: String(input.category ?? ""),
    brand: String(input.brand ?? ""),
    model: String(input.model ?? ""),
    versionGeneration: String(input.versionGeneration ?? ""),
    storage: String(input.storage ?? ""),
    color: String(input.color ?? ""),
    voltage: input.voltage == null ? undefined : String(input.voltage),
    defaultCondition: String(input.defaultCondition ?? ""),
    marketRegion: String(input.marketRegion ?? ""),
    baseCurrency: String(input.baseCurrency ?? ""),
    collectionFrequencyMinutes: Number(input.collectionFrequencyMinutes ?? 0),
    monitorType: String(input.monitorType ?? ""),
  });

  if (!result.ok) {
    const status = result.error === "NO_CREDITS" ? 402 : 400;
    return NextResponse.json({ error: result.message, code: result.error }, { status });
  }

  return NextResponse.json({ ok: true, id: result.id });
}
