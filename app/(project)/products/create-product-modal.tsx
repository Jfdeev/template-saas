"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { createConceptualProduct, type CreateProductState } from "./actions";

const initialState: CreateProductState = { ok: false };

export function CreateProductModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createConceptualProduct, initialState);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setOpen(false);
    }
  }, [state]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    if (open) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        + Adicionar Produto
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">Cadastrar Produto</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Cadastre o Produto Conceitual. A descoberta de listings será automática.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
              >
                Fechar
              </button>
            </div>

            <form ref={formRef} action={formAction} className="px-6 py-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Nome do Produto</label>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    placeholder='Ex: iPhone 15 128GB Preto'
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Categoria</label>
                  <input
                    name="category"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    placeholder="Ex: Eletrônicos"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Marca</label>
                  <input
                    name="brand"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    placeholder="Ex: Apple"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Modelo</label>
                  <input
                    name="model"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    placeholder="Ex: iPhone 15"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Versão / geração</label>
                  <input
                    name="versionGeneration"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    placeholder="Ex: 128GB"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Armazenamento</label>
                  <input
                    name="storage"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    placeholder="Ex: 128GB"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Cor</label>
                  <input
                    name="color"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    placeholder="Ex: Preto"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Voltagem (se aplicável)</label>
                  <input
                    name="voltage"
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    placeholder="Ex: 110V"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Condição padrão</label>
                  <select
                    name="defaultCondition"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    defaultValue="novo"
                  >
                    <option value="novo">Novo</option>
                    <option value="seminovo">Seminovo</option>
                    <option value="usado">Usado</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Região de mercado</label>
                  <select
                    name="marketRegion"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    defaultValue="BR"
                  >
                    <option value="BR">Brasil</option>
                    <option value="US">Estados Unidos</option>
                    <option value="EU">Europa</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Moeda base</label>
                  <select
                    name="baseCurrency"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    defaultValue="BRL"
                  >
                    <option value="BRL">BRL</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Frequência de coleta</label>
                  <select
                    name="collectionFrequencyMinutes"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    defaultValue="1440"
                  >
                    <option value="60">A cada 1 hora</option>
                    <option value="360">A cada 6 horas</option>
                    <option value="720">A cada 12 horas</option>
                    <option value="1440">Diária</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Tipo de monitoramento</label>
                  <select
                    name="monitorType"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
                    defaultValue="price"
                  >
                    <option value="price">Preço</option>
                    <option value="availability">Disponibilidade</option>
                    <option value="price_and_availability">Preço + Disponibilidade</option>
                  </select>
                </div>
              </div>

              {state.ok === false && state.error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <p>{state.error}</p>
                  {state.error.toLowerCase().includes("crédit") && (
                    <p className="mt-2">
                      <Link href="/payment" className="font-semibold text-red-700 underline">
                        Comprar créditos
                      </Link>
                    </p>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  disabled={pending}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  disabled={pending}
                >
                  {pending ? "Salvando..." : "Cadastrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
