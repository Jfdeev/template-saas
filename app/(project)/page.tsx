import Link from "next/link";
import { PriceHistoryChart } from "./components/price-history-chart";
import { Reveal } from "./components/reveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div className="text-base font-semibold tracking-tight text-gray-900">PRICEFY</div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
            <a href="#como-funciona" className="hover:text-gray-900">
              Como funciona
            </a>
            <a href="#multi-fonte" className="hover:text-gray-900">
              Recursos
            </a>
            <a href="#precos" className="hover:text-gray-900">
              Preços
            </a>
          </nav>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Começar Grátis
          </Link>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 17L17 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 7H17V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Economize de forma inteligente
            </div>
          </Reveal>

          <Reveal delayMs={80}>
            <h1 className="mt-10 text-5xl font-bold tracking-tight text-gray-900 md:text-7xl">
              Nunca mais pague
              <br />
              <span className="text-blue-600">mais caro</span>
            </h1>
          </Reveal>

          <Reveal delayMs={140}>
            <p className="mt-8 max-w-3xl text-lg text-gray-600 md:text-xl">
              O Pricefy monitora preços automaticamente e te avisa quando
              <br className="hidden sm:block" />
              for o momento ideal para comprar
            </p>
          </Reveal>

          <Reveal delayMs={220}>
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Começar Grátis
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
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-7 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Ver demonstração
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={300}>
            <p className="mt-10 text-sm text-gray-500">
              1 produto grátis para testar • Sem cartão de crédito • Sem assinatura
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-sm text-gray-700">
                O problema
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <h2 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                Comprar online deveria ser mais inteligente
              </h2>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="mt-5 max-w-3xl text-lg text-gray-600 md:text-xl">
                Mas a realidade é que você está sempre na dúvida se está fazendo um bom
                <br className="hidden sm:block" />
                negócio
              </p>
            </Reveal>
          </div>

          <Reveal delayMs={200}>
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6H21L20 14H7L6 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L5 3H2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18 20C18.5523 20 19 19.5523 19 19C19 18.4477 18.5523 18 18 18C17.4477 18 17 18.4477 17 19C17 19.5523 17.4477 20 18 20Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="mt-6 text-base font-semibold text-gray-900">Perde promoções</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Você vê um produto, mas não compra na hora. Quando volta, o preço já subiu.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-6 text-base font-semibold text-gray-900">Perde tempo</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Acompanhar preços manualmente em várias lojas é cansativo e ineficiente.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 17L9 11L13 15L21 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 7V13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 7H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-6 text-base font-semibold text-gray-900">Compra no momento errado</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Sem dados históricos, você não sabe se o preço está bom ou se vai cair.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 9V13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.29 3.86L1.82 18A2 2 0 0 0 3.53 21H20.47A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-6 text-base font-semibold text-gray-900">Paga mais caro</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Não tem como saber qual loja tem o melhor preço sem pesquisar tudo de novo.
              </p>
            </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="como-funciona" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700">
                Simples e poderoso
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <h2 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">Como funciona</h2>
            </Reveal>
            <Reveal delayMs={140}>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
                Em 4 passos simples, você economiza tempo e dinheiro
              </p>
            </Reveal>
          </div>

          <Reveal delayMs={200}>
            <div className="mt-16 space-y-12">
            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M10 13a5 5 0 0 1 0-7l.5-.5a5 5 0 0 1 7 7l-.5.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 11a5 5 0 0 1 0 7l-.5.5a5 5 0 0 1-7-7l.5-.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-1 gap-5">
                <div className="text-5xl font-bold leading-none text-gray-800 sm:text-6xl">01</div>
                <div>
                  <p className="text-xl font-bold text-gray-900">Cole o link do produto</p>
                  <p className="mt-2 text-base leading-relaxed text-gray-600">
                    Basta copiar a URL de qualquer produto de lojas como Amazon, Magalu, Americanas e mais.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 19V5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 19V11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 19V7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 19H2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-1 gap-5">
                <div className="text-5xl font-bold leading-none text-gray-800 sm:text-6xl">02</div>
                <div>
                  <p className="text-xl font-bold text-gray-900">Acompanhe automaticamente</p>
                  <p className="mt-2 text-base leading-relaxed text-gray-600">
                    O Pricefy monitora o preço 24/7 em tempo real e registra todo o histórico de variações.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 22a2 2 0 0 0 2-2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-1 gap-5">
                <div className="text-5xl font-bold leading-none text-gray-800 sm:text-6xl">03</div>
                <div>
                  <p className="text-xl font-bold text-gray-900">Receba alertas e insights</p>
                  <p className="mt-2 text-base leading-relaxed text-gray-600">
                    Você recebe avisos quando o preço cai e entende tendências para decidir com segurança.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 7h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 7l1 14h12l1-14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 7V5a3 3 0 0 1 6 0v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-1 gap-5">
                <div className="text-5xl font-bold leading-none text-gray-800 sm:text-6xl">04</div>
                <div>
                  <p className="text-xl font-bold text-gray-900">Compre no momento certo</p>
                  <p className="mt-2 text-base leading-relaxed text-gray-600">
                    Com dados e tendências, você toma a decisão certa e economiza de verdade.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="multi-fonte" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-sm text-gray-700">
                Recursos
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <h2 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                Tudo que você precisa para economizar
              </h2>
            </Reveal>
            <Reveal delayMs={140}>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
                Automatize suas compras e tome decisões baseadas em dados reais
              </p>
            </Reveal>
          </div>

          <Reveal delayMs={200}>
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-blue-500">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 7l5 5L18 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 17l5 5L21 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-6 text-base font-semibold text-gray-900">Monitoramento 24/7</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                O Pricefy trabalha pra você o tempo todo, verificando preços automaticamente.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-blue-500">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 7h10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 12h10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 17h10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-6 text-base font-semibold text-gray-900">Múltiplas lojas</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Compare preços entre Amazon, Magalu, Americanas e dezenas de outras lojas.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-blue-500">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 19V5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 19H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 15l3-3 3 2 5-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-6 text-base font-semibold text-gray-900">Histórico completo</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Veja gráficos de evolução de preço e identifique padrões ao longo do tempo.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-blue-500">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-6 text-base font-semibold text-gray-900">Indicador inteligente</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Algoritmo analisa tendências e indica se é hora de comprar ou esperar.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-blue-500">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-6 text-base font-semibold text-gray-900">Alertas instantâneos</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Receba notificações quando o preço atingir o valor desejado ou cair.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-blue-500">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-6 text-base font-semibold text-gray-900">Confiável e preciso</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Dados atualizados em tempo real com precisão para suas decisões.
              </p>
            </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-medium text-green-700">
              Economia real
            </div>

            <h2 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Veja o impacto nas suas compras
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-600 md:text-xl">
              Exemplo: como R$ 300 poderiam ter sido economizados com o Pricefy
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xl font-bold text-gray-900">Histórico de Preços</p>
                  <p className="mt-1 text-sm text-gray-600">Smartphone XYZ · Últimos 6 meses</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 17L17 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 7H17V15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  -23%
                </div>
              </div>

              <div className="mt-6">
                <PriceHistoryChart
                  data={[
                    { label: "Jan", value: 1350 },
                    { label: "Fev", value: 1260 },
                    { label: "Mar", value: 1295 },
                    { label: "Abr", value: 1210 },
                    { label: "Mai", value: 999 },
                    { label: "Jun", value: 1060 },
                  ]}
                />
              </div>

              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                <span className="font-semibold">💡 Recomendação:</span> Ótimo momento para comprar! O preço está 23%
                abaixo da média histórica.
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div>
                <p className="text-xl font-bold text-gray-900">Comparação de Lojas</p>
                <p className="mt-1 text-sm text-gray-600">Mesmo produto, preços diferentes</p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-green-500 bg-green-50 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-semibold text-gray-900">Loja A</p>
                        <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                          Melhor preço
                        </span>
                      </div>
                      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">R$ 999</p>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 19V5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M7 14l5 5 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        R$ 300
                      </div>
                      <p className="mt-1 text-xs font-medium text-green-700">economizados</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <p className="text-sm font-semibold text-gray-900">Loja B</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">R$ 1049</p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <p className="text-sm font-semibold text-gray-900">Loja C</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">R$ 1249</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">R$ 1299</p>
                  <p className="mt-1 text-xs text-gray-600">Preço inicial</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">R$ 999</p>
                  <p className="mt-1 text-xs text-gray-600">Preço atual</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">23%</p>
                  <p className="mt-1 text-xs text-gray-600">Economia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="precos" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-sm text-gray-700">
                Preços
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <h2 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                Preço justo e transparente
              </h2>
            </Reveal>
            <Reveal delayMs={140}>
              <p className="mt-4 max-w-3xl text-lg text-gray-600 md:text-xl">
                Sem assinatura mensal. Você paga apenas pelo que usar.
              </p>
            </Reveal>
          </div>

          <Reveal delayMs={220}>
            <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-10">
              <p className="text-xs font-semibold tracking-widest text-gray-500">TESTE GRÁTIS</p>
              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Gratuito</p>
              <p className="mt-2 text-sm text-gray-600">Experimente antes de decidir</p>

              <p className="mt-10 text-5xl font-bold tracking-tight text-gray-900">R$ 0</p>
              <p className="mt-2 text-sm text-gray-600">1 produto para sempre</p>

              <div className="mt-10 border-t border-gray-200 pt-8">
                <ul className="space-y-4 text-sm text-gray-700">
                  {[
                    "Monitoramento de 1 produto",
                    "Histórico de 30 dias",
                    "Comparação de lojas",
                    "Alertas básicos",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center text-green-600">
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
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link
                    href="/login"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50"
                  >
                    Começar Grátis
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-600 p-10 text-white">
              <div className="flex items-start justify-between gap-6">
                <p className="text-xs font-semibold tracking-widest text-blue-100">PAGUE POR CRÉDITO</p>
                <span className="inline-flex items-center rounded-full bg-green-500 px-4 py-1 text-xs font-bold text-white">
                  RECOMENDADO
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold tracking-tight">Créditos</p>
              <p className="mt-2 text-sm text-blue-100">Monitore quantos produtos quiser</p>

              <p className="mt-10 text-5xl font-bold tracking-tight">R$ 5,90</p>
              <p className="mt-2 text-sm text-blue-100">= 2 créditos (R$ 2,95/produto)</p>

              <div className="mt-10 border-t border-white/20 pt-8">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-6">
                  <p className="text-sm font-semibold">Como funciona:</p>
                  <ul className="mt-3 space-y-2 text-sm text-blue-50">
                    {[
                      "Cada produto = 1 crédito",
                      "Sem validade, use quando quiser",
                      "Sem renovação automática",
                      "Compre mais quando precisar",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-50" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="mt-8 space-y-4 text-sm text-blue-50">
                  {[
                    "Monitore 1 produto gratuitamente",
                    "Histórico completo de preços",
                    "Comparação entre lojas",
                    "Alertas de queda de preço",
                    "Análise de tendências",
                    "Suporte prioritário",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center text-green-300">
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
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link
                    href="/payment"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    Comprar Créditos
                  </Link>
                </div>
              </div>
            </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="rounded-3xl bg-blue-600 px-6 py-16 text-center text-white shadow-xl sm:px-12">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Pronto para economizar de forma
              <br />
              inteligente?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base text-blue-50 sm:text-lg">
              Comece agora gratuitamente. Sem cartão de crédito. Sem compromisso.
            </p>

            <div className="mt-10 flex justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                Começar Agora Grátis
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
              </Link>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 text-left text-sm text-blue-50 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "1 produto grátis",
                "Sem assinatura",
                "Ative em 2 minutos",
                "Cancele quando quiser",
              ].map((item) => (
                <div key={item} className="flex items-center justify-center gap-3 sm:justify-start">
                  <span className="inline-flex h-5 w-5 items-center justify-center text-green-300">
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
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-base font-semibold tracking-tight text-gray-900">PRICEFY</p>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-600">
                Monitore preços automaticamente e economize de forma inteligente.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">Produto</p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#como-funciona" className="hover:text-gray-900">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#multi-fonte" className="hover:text-gray-900">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#precos" className="hover:text-gray-900">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-gray-900">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">Empresa</p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">Legal</p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Licenças
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-200 pt-8 text-sm text-gray-600 sm:flex-row">
            <p>© {new Date().getFullYear()} Pricefy. Todos os direitos reservados.</p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M22 5.92c-.72.32-1.5.54-2.32.63.84-.5 1.48-1.3 1.78-2.26-.78.46-1.64.8-2.56.98A4.1 4.1 0 0 0 12 6.96c0 .32.04.64.1.94-3.4-.18-6.42-1.86-8.44-4.42a4.2 4.2 0 0 0-.56 2.06c0 1.42.7 2.68 1.78 3.42-.66-.02-1.28-.2-1.82-.52v.06c0 2 1.38 3.66 3.22 4.04-.34.1-.72.14-1.1.14-.26 0-.52-.02-.76-.08.52 1.68 2.06 2.9 3.88 2.94A8.26 8.26 0 0 1 2 18.38a11.65 11.65 0 0 0 6.32 1.88c7.58 0 11.72-6.44 11.72-12.02 0-.18 0-.36-.02-.54.82-.6 1.52-1.34 2.08-2.18Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M17.5 6.5h.01"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a4.5 4.5 0 0 1 2-3Z"
                    fill="currentColor"
                  />
                  <path d="M2 9h4v12H2V9Z" fill="currentColor" />
                  <path d="M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fill="currentColor" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 4h16v16H4V4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6l-10 7L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
