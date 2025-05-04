import { useState, useEffect } from "react"
import { loadStripe, Stripe } from "@stripe/stripe-js"

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!)
      .then((inst) => setStripe(inst))
      .catch((err) => console.error("Falha ao carregar Stripe.js", err))
  }, [])

  async function createPaymentStripeCheckout(checkoutData: any) {
    if (!stripe) {
      console.error("Stripe.js ainda não carregado")
      return
    }

    try {
      const res = await fetch("/api/stripe/create-pay-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutData),
      })
      const data = await res.json()
      if (!res.ok) {
        console.error("Erro na API:", data)
        return
      }
      await stripe.redirectToCheckout({ sessionId: data.id })
    } catch (err) {
      console.error("Erro ao criar checkout de pagamento:", err)
    }
  }

  async function createSubscriptionStripeCheckout(checkoutData: any) {
    if (!stripe) {
      console.error("Stripe.js ainda não carregado")
      return
    }

    try {
      const res = await fetch("/api/stripe/create-subscription-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutData),
      })
      const data = await res.json()
      if (!res.ok) {
        console.error("Erro na API:", data)
        return
      }
      await stripe.redirectToCheckout({ sessionId: data.id })
    } catch (err) {
      console.error("Erro ao criar checkout de assinatura:", err)
    }
  }

    // This function handles the creation of a Stripe customer portal session
    async function handleCreateSpritePortal() {
        const response = await fetch("/api/stripe/create-portal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ returnUrl: window.location.origin }),
        });
        const data = await response.json();
        window.location.href = data.url;
    }

    return {
        stripe,
        createPaymentStripeCheckout,
        createSubscriptionStripeCheckout,
        handleCreateSpritePortal,
    };
}