import type { ReactNode } from "react";

import Link from "next/link";

import { handleAuth } from "@/app/actions/handle-auth";
import {
  LayoutDashboard,
  Package,
  TrendingDown,
  Lightbulb,
  Wallet,
  Settings,
} from "lucide-react";

export type AppNavKey =
  | "dashboard"
  | "products"
  | "history"
  | "recommendations"
  | "credits"
  | "settings";

type AppShellProps = {
  active: AppNavKey;
  creditsAvailable: number;
  user: {
    name: string;
    email: string;
    initial: string;
  };
  children: ReactNode;
};

export function AppShell({ active, creditsAvailable, user, children }: AppShellProps) {
  const navItems: Array<{
    key: AppNavKey;
    label: string;
    href: string;
    icon: ReactNode;
  }> = [
    {
      key: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard width={18} height={18} aria-hidden="true" />,
    },
    {
      key: "products",
      label: "Meus Produtos",
      href: "/products",
      icon: <Package width={18} height={18} aria-hidden="true" />,
    },
    {
      key: "history",
      label: "Histórico de Preços",
      href: "/dashboard#historico",
      icon: <TrendingDown width={18} height={18} aria-hidden="true" />,
    },
    {
      key: "recommendations",
      label: "Recomendações",
      href: "/dashboard#recomendacoes",
      icon: <Lightbulb width={18} height={18} aria-hidden="true" />,
    },
    {
      key: "credits",
      label: "Créditos",
      href: "/payment",
      icon: <Wallet width={18} height={18} aria-hidden="true" />,
    },
    {
      key: "settings",
      label: "Configurações",
      href: "/dashboard#config",
      icon: <Settings width={18} height={18} aria-hidden="true" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen w-full">
        <aside className="hidden w-[280px] shrink-0 border-r border-gray-200 bg-white px-4 py-6 md:block">
          <div className="flex items-center gap-3 px-2">
            <p className="text-lg font-bold tracking-tight text-blue-600">Pricefy</p>
          </div>

          <nav className="mt-8 space-y-1 px-2 text-sm">
            {navItems.map((item) => {
              const isActive = item.key === active;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-colors " +
                    (isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900")
                  }
                >
                  <span className={isActive ? "text-blue-600" : "text-gray-500"}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 px-2">
            <form action={handleAuth}>
              <button type="submit" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                Sair
              </button>
            </form>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-10">
              <div className="flex items-center gap-3 md:hidden">
                <p className="text-sm font-bold tracking-tight text-blue-600">PRICEFY</p>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="hidden items-center gap-3 rounded-xl bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 sm:flex">
                  <span className="text-blue-600">
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
                      <path d="M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span>Créditos</span>
                  <span className="text-gray-900">{creditsAvailable}</span>
                </div>

                <Link
                  href="/payment"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Comprar Créditos
                </Link>

                <div className="flex items-center gap-3 rounded-xl px-2 py-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-700">
                    {user.initial}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {children}
        </div>
      </div>
    </div>
  );
}
