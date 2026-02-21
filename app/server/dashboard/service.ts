import "server-only";

import { getDb } from "@/app/lib/db";
import { makeDrizzlePorts } from "../adapters/drizzle/products-ports";

export async function getDashboardDataForUser(userId: string) {
  const db = getDb();
  const ports = makeDrizzlePorts(db);

  const [creditsBalance, productsCount, products] = await Promise.all([
    ports.credits.getBalance(userId),
    ports.products.countByUserId(userId),
    ports.products.listByUserId(userId, 20),
  ]);

  return { creditsBalance, productsCount, products };
}
