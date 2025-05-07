import "server-only";

import Stripe from "stripe";

export default function handleStripePayment(event: Stripe.CheckoutSessionCompletedEvent) {

    if (event.data.object.payment_status === "paid") {
        console.error("Pagamento realizado com sucesso");
    }
    
}