"use client"

import { useStripe } from "@/app/hooks/useStripe"
import test from "node:test";

export default function PaymentPage() {

    const { createPaymentStripeCheckout, createSubscriptionStripeCheckout, handleCreateSpritePortal } = useStripe();


    return (
        <div className="flex flex-col gap-10 items-center justify-center h-screen">
            <h1 className="font-bold text-4xl">Pagamentos</h1>
            <button className="border rounded-md px-1 cursor-pointer" onClick={() => createPaymentStripeCheckout({
                testId: "123",
            })
            }>Criar Pagamento Stripe</button>
            <button className="border rounded-md px-1 cursor-pointer" onClick={() => createSubscriptionStripeCheckout({
                testId: "123",
            })}>Criar Assinatura Stripe</button>
            <button className="border rounded-md px-1 cursor-pointer" onClick={handleCreateSpritePortal}>Criar Portal Stripe</button>
        </div>
    )
}