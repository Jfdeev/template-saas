import type { CreateConceptualProductInput } from "@/backend/domain/products/models";
import type { CreateConceptualProductPort } from "@/backend/ports/products";

export type CreateConceptualProductResult =
  | { ok: true; id: string }
  | { ok: false; error: "NO_CREDITS" | "VALIDATION" | "UNKNOWN"; message: string };

function normalize(value: string) {
  return value.trim();
}

export function validateCreateInput(input: CreateConceptualProductInput) {
  const name = normalize(input.name);
  const category = normalize(input.category);
  const brand = normalize(input.brand);
  const model = normalize(input.model);
  const versionGeneration = normalize(input.versionGeneration);
  const storage = normalize(input.storage);
  const color = normalize(input.color);
  const defaultCondition = normalize(input.defaultCondition);
  const marketRegion = normalize(String(input.marketRegion));
  const baseCurrency = normalize(String(input.baseCurrency));
  const monitorType = normalize(String(input.monitorType));

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
    !monitorType
  ) {
    return { ok: false as const, message: "Preencha todos os campos obrigatórios." };
  }

  if (!Number.isInteger(input.collectionFrequencyMinutes) || input.collectionFrequencyMinutes <= 0) {
    return { ok: false as const, message: "Frequência de coleta inválida." };
  }

  return { ok: true as const };
}

export async function createConceptualProduct(
  port: CreateConceptualProductPort,
  userId: string,
  input: CreateConceptualProductInput
): Promise<CreateConceptualProductResult> {
  const validation = validateCreateInput(input);
  if (!validation.ok) {
    return { ok: false, error: "VALIDATION", message: validation.message };
  }

  try {
    const created = await port.createDebitingOneCreditIfAvailable(userId, input);
    if (!created.ok) {
      return {
        ok: false,
        error: "NO_CREDITS",
        message: "Você não tem créditos. Compre créditos para cadastrar um novo produto.",
      };
    }

    return { ok: true, id: created.id };
  } catch (error) {
    console.error("createConceptualProduct failed", error);
    return { ok: false, error: "UNKNOWN", message: "Falha ao cadastrar produto. Tente novamente." };
  }
}
