import type { CreditsPort, ConceptualProductsPort } from "@/backend/ports/products";

export async function getDashboardData(
  ports: { credits: CreditsPort; products: ConceptualProductsPort },
  userId: string
) {
  const [creditsBalance, productsCount, products] = await Promise.all([
    ports.credits.getBalance(userId),
    ports.products.countByUserId(userId),
    ports.products.listByUserId(userId, 20),
  ]);

  return { creditsBalance, productsCount, products };
}
