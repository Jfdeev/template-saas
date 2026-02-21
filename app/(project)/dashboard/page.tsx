import { auth } from "@/app/lib/auth";
import { getDashboardDataForUser } from "@/app/server/dashboard/service";
import { redirect } from "next/navigation";
import { AppShell } from "../_components/app-shell";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const userId = session.user?.id;
    if (!userId) {
        redirect("/login");
    }

    const { creditsBalance: creditsAvailable, productsCount: monitoredCountNumber, products } =
        await getDashboardDataForUser(userId);

    const userName = session.user?.name ?? "Usuário";
    const userEmail = session.user?.email ?? "";
    const userInitial = (userName?.trim()?.[0] ?? "U").toUpperCase();
    return (
        <AppShell
            active="dashboard"
            creditsAvailable={creditsAvailable}
            user={{ name: userName, email: userEmail, initial: userInitial }}
        >
                    <main className="flex-1 px-4 py-10 md:px-10" id="top">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Acompanhe seus produtos e encontre as melhores oportunidades de compra
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-2xl border border-gray-200 bg-white p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Produtos Monitorados</p>
                                        <p className="mt-2 text-3xl font-extrabold text-gray-900">{monitoredCountNumber}</p>
                                        <p className="mt-1 text-xs text-gray-500">{monitoredCountNumber} no total</p>
                                    </div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path
                                                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                            />
                                            <path d="M3.3 7.5 12 12l8.7-4.5" stroke="currentColor" strokeWidth="2" />
                                            <path d="M12 22V12" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Créditos Disponíveis</p>
                                        <p className="mt-2 text-3xl font-extrabold text-gray-900">{creditsAvailable}</p>
                                        <p className="mt-1 text-xs text-gray-500">Use para cadastrar e monitorar produtos</p>
                                    </div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path
                                                d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M15 8h-1a2 2 0 0 0-2 2v6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M9 12h6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="mt-12" id="produtos">
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-lg font-extrabold text-gray-900">Produtos</h2>
                                <span className="text-sm font-semibold text-gray-500">{products.length} itens</span>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                {products.length === 0 ? (
                                    <div className="px-6 py-10">
                                        <p className="text-sm font-semibold text-gray-900">Nenhum produto cadastrado ainda</p>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Cadastre um produto conceitual para começarmos a descoberta automática e o monitoramento.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-100">
                                        {products.map((product) => (
                                            <div key={product.id} className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-extrabold text-gray-900">{product.name}</p>
                                                    <p className="mt-1 truncate text-xs text-gray-500">
                                                        {product.category} • {product.brand} • {product.model} • {product.versionGeneration}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={
                                                            "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                                                            (product.isActive ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700")
                                                        }
                                                    >
                                                        {product.isActive ? "Ativo" : "Pausado"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        <section id="historico" className="sr-only" />
                        <section id="recomendacoes" className="sr-only" />
                        <section id="creditos" className="sr-only" />
                        <section id="config" className="sr-only" />
                    </main>
        </AppShell>
    );
}