import { handleAuth } from "@/app/actions/handle-auth";

export default function Login() {
    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
                    <a href="/" className="text-base font-semibold tracking-tight text-gray-900">
                        PRICEFY
                    </a>

                    <a
                        href="/"
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                    >
                        Voltar
                    </a>
                </div>
            </header>

            <section className="py-16">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700">
                            Acesso rápido
                        </div>

                        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
                            Entre para monitorar preços
                            <br />
                            <span className="text-blue-600">automaticamente</span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-xl text-base text-gray-600 md:text-lg lg:mx-0">
                            Faça login com Google e comece em minutos — sem cartão de crédito.
                        </p>

                        <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-3 text-left text-sm text-gray-700 sm:grid-cols-2 lg:mx-0">
                            {[
                                "1 produto grátis",
                                "Sem assinatura",
                                "Histórico de preços",
                                "Alertas de queda",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <span className="inline-flex h-5 w-5 items-center justify-center text-green-600">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path
                                                d="M20 6L9 17l-5-5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mx-auto w-full max-w-md">
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                            <p className="text-sm font-semibold text-gray-900">Entrar</p>
                            <p className="mt-2 text-sm text-gray-600">
                                Use sua conta Google para acessar o Pricefy.
                            </p>

                            <form action={handleAuth} className="mt-6">
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                                >
                                    Entrar com Google
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path
                                            d="M5 12H19"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M13 6L19 12L13 18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </form>

                            <p className="mt-6 text-xs text-gray-600">
                                Primeiro uso gratuito: cadastre 1 produto sem pagar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}