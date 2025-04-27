import { useState, useEffect } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

export function useStripe(){
    const [stripe, setStripe] = useState<Stripe | null>(null);

    // This hook loads the Stripe.js library and initializes a Stripe instance
    useEffect(() => {
        async function loadStripeAsync() {
            const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!);
            setStripe(stripeInstance);
        }

        loadStripeAsync();
    }, []);

    // This function creates a Stripe Checkout session and redirects the user to the checkout page
    async function createPaymentStripeCheckout(checkoutData: any) {
        if (!stripe) return;

        try {
            const response = await fetch("/api/stripe/create-pay-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkoutData),
            });

            const data = await response.json();

            await stripe.redirectToCheckout({
                sessionId: data.id,
            });

        } catch (error) {
            console.log("Error creating payment checkout:", error);
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
        handleCreateSpritePortal,
    };
}