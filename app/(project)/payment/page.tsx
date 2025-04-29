"use client"

import { useStripe } from "@/app/hooks/useStripe"

export default function PaymentPage() {

    const { createPaymentStripeCheckout, createSubscriptionStripeCheckout, handleCreateSpritePortal  } = useStripe();


    return (
        <div className="flex flex-col gap-10 items-center justify-center h-screen">
            <h1 className="font-bold text-4xl">Pagamentos</h1>
            <button className="border rounded-md px-1" onClick={createPaymentStripeCheckout}>Criar Pagamento Stripe</button>
            <button className="border rounded-md px-1" onClick={createSubscriptionStripeCheckout}>Criar Assinatura Stripe</button>
            <button className="border rounded-md px-1" onClick={handleCreateSpritePortal}>Criar Portal Stripe</button>
        </div>
    )
}