"use server";

import { auth } from "@/app/lib/auth";
import { revalidatePath } from "next/cache";
import { createProductForUser } from "@/app/server/products/service";

export type CreateProductState =
  | { ok: false; error?: string }
  | { ok: true; id: string };

function getRequired(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return value.trim();
}

export async function createConceptualProduct(
  _prevState: CreateProductState,
  formData: FormData
): Promise<CreateProductState> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { ok: false, error: "Unauthorized" };

  const name = getRequired(formData, "name");
  const category = getRequired(formData, "category");
  const brand = getRequired(formData, "brand");
  const model = getRequired(formData, "model");
  const versionGeneration = getRequired(formData, "versionGeneration");

  const storage = getRequired(formData, "storage");
  const color = getRequired(formData, "color");
  const voltageRaw = getRequired(formData, "voltage");
  const defaultCondition = getRequired(formData, "defaultCondition");

  const marketRegion = getRequired(formData, "marketRegion");
  const baseCurrency = getRequired(formData, "baseCurrency");

  const collectionFrequencyMinutesRaw = getRequired(formData, "collectionFrequencyMinutes");
  const monitorType = getRequired(formData, "monitorType");

  const collectionFrequencyMinutes = Number(collectionFrequencyMinutesRaw);

  if (
    !name ||
    !category ||
    !brand ||
    !model ||
    !versionGeneration ||
    !storage ||
    !color ||
    !defaultCondition ||
    !marketRegion ||
    !baseCurrency ||
    !monitorType ||
    !Number.isFinite(collectionFrequencyMinutes) ||
    !Number.isInteger(collectionFrequencyMinutes) ||
    collectionFrequencyMinutes <= 0
  ) {
    return { ok: false, error: "Preencha todos os campos obrigatórios." };
  }

  const result = await createProductForUser(userId, {
    name,
    category,
    brand,
    model,
    versionGeneration,
    storage,
    color,
    voltage: voltageRaw || undefined,
    defaultCondition,
    marketRegion,
    baseCurrency,
    collectionFrequencyMinutes,
    monitorType,
  });

  if (!result.ok) {
    return { ok: false, error: result.message };
  }

  revalidatePath("/products");
  revalidatePath("/dashboard");

  return { ok: true, id: result.id };
}
