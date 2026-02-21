import type { CreditsPort, ConceptualProductsPort } from "../../ports/products-ports";

export async function getProductsPageData(
  ports: { credits: CreditsPort; products: ConceptualProductsPort },
  userId: string
) {
  const [creditsBalance, products] = await Promise.all([
    ports.credits.getBalance(userId),
    ports.products.listByUserId(userId, 50),
  ]);

  return { creditsBalance, products };
}
