import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { getProductsDataForUser } from "@/app/server/products/service";
import { AppShell } from "../_components/app-shell";

import { CreateProductModal } from "./create-product-modal";

export default async function ProductsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const userId = session.user?.id;
  if (!userId) redirect("/login");

  const { creditsBalance: creditsAvailable, products } = await getProductsDataForUser(userId);

  const userName = session.user?.name ?? "Usuário";
  const userEmail = session.user?.email ?? "";
  const userInitial = (userName?.trim()?.[0] ?? "U").toUpperCase();
  return (
    <AppShell
      active="products"
      creditsAvailable={creditsAvailable}
      user={{ name: userName, email: userEmail, initial: userInitial }}
    >
      <main className="flex-1 px-4 py-10 md:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Meus Produtos</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Cadastre produtos conceituais e deixe o sistema descobrir listings automaticamente.
                </p>
              </div>

              <CreateProductModal />
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              {products.length === 0 ? (
                <div className="px-6 py-12">
                  <p className="text-sm font-semibold text-gray-900">Nenhum produto cadastrado ainda</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Clique em <span className="font-semibold">Adicionar Produto</span> para começar.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <div key={p.id} className="px-6 py-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-gray-900">{p.name}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {p.category} • {p.brand} • {p.model} • {p.versionGeneration}
                          </p>
                          <p className="mt-2 text-xs text-gray-500">
                            {p.storage} • {p.color} • {p.defaultCondition} • {p.marketRegion}/{p.baseCurrency}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={
                              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                              (p.isActive ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700")
                            }
                          >
                            {p.isActive ? "Ativo" : "Pausado"}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {p.discoveryStatus}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        <span className="rounded-full bg-gray-50 px-3 py-1">
                          Monitoramento: {p.monitorType}
                        </span>
                        <span className="rounded-full bg-gray-50 px-3 py-1">
                          Coleta: {p.collectionFrequencyMinutes} min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
      </main>
    </AppShell>
  );
}
