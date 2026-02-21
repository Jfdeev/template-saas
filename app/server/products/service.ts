import "server-only";

import type { CreateConceptualProductInput } from "@/app/core/products/models";
import { createConceptualProduct } from "@/app/core/products/usecases/create-conceptual-product";
import { getProductsPageData } from "@/app/core/products/usecases/get-products-page-data";
import { getDb } from "@/app/lib/db";
import { makeDrizzleCreateConceptualProductPort, makeDrizzlePorts } from "../adapters/drizzle/products-ports";

export async function getProductsDataForUser(userId: string) {
  const db = getDb();
  const ports = makeDrizzlePorts(db);
  return getProductsPageData(ports, userId);
}

export async function createProductForUser(userId: string, input: CreateConceptualProductInput) {
  const db = getDb();
  const port = makeDrizzleCreateConceptualProductPort(db);
  return createConceptualProduct(port, userId, input);
}
