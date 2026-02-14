"use client"

import { useMemo, useState } from "react";

type CreatePixPaymentResponse = {
  paymentId: string;
  status: string | null;
  pix: {
        brCode: string;
        qrCodeImage: string;
        expiresAt: string;
  };
};

export default function PaymentPage() {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<CreatePixPaymentResponse | null>(null);

    const qrImageSrc = useMemo(() => {
        const base64OrDataUrl = result?.pix?.qrCodeImage;
        if (!base64OrDataUrl) return null;

        if (base64OrDataUrl.startsWith("data:")) {
            return base64OrDataUrl;
        }

        // AbacatePay docs mention `brCodeBase64`, but the payload may represent a PNG or SVG.
        // Try to infer MIME type from base64 prefix.
        const mimeType = base64OrDataUrl.startsWith("PHN2Zy") ? "image/svg+xml" : "image/png";
        return `data:${mimeType};base64,${base64OrDataUrl}`;
    }, [result]);

    async function handleCreatePixPayment() {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await fetch("/api/abacatepay/create-pix-qrcode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    value: Number(value),
                }),
            });

            const data: unknown = await res.json();

            if (!res.ok) {
                const maybeError =
                    typeof data === "object" && data !== null && "error" in data
                        ? (data as { error?: unknown }).error
                        : undefined;
                setError(typeof maybeError === "string" ? maybeError : "Falha ao criar pagamento");
                return;
            }

            setResult(data as CreatePixPaymentResponse);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Erro inesperado";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    async function handleCopyPayload() {
        const brCode = result?.pix?.brCode;
        if (!brCode) return;
        await navigator.clipboard.writeText(brCode);
    }

    return (
        <div className="flex flex-col gap-10 items-center justify-center h-screen">
            <h1 className="font-bold text-4xl">Pagamentos</h1>
            <div className="flex flex-col gap-3 w-full max-w-md">
                <label className="flex flex-col gap-1">
                    <span>Valor (R$)</span>
                    <input
                        className="border rounded-md px-2 py-1"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Ex: 19.90"
                        inputMode="decimal"
                    />
                </label>

                <button
                    className="border rounded-md px-2 py-1 cursor-pointer disabled:opacity-50"
                    onClick={handleCreatePixPayment}
                    disabled={loading}
                >
                    {loading ? "Gerando Pix..." : "Gerar Pix (AbacatePay)"}
                </button>

                {error && <p className="text-red-600">{error}</p>}
            </div>

            {result && (
                <div className="flex flex-col gap-3 items-center">
                    <p>Status: {result.status ?? "-"}</p>
                    <p>Expira em: {new Date(result.pix.expiresAt).toLocaleString()}</p>

                    {qrImageSrc && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={qrImageSrc} alt="QR Code Pix" className="w-56 h-56" />
                    )}

                    {result.pix.brCode && (
                        <div className="flex flex-col gap-2 items-center max-w-md">
                            <p className="text-sm break-all">{result.pix.brCode}</p>
                            <button className="border rounded-md px-2 py-1 cursor-pointer" onClick={handleCopyPayload}>
                                Copiar código Pix
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}