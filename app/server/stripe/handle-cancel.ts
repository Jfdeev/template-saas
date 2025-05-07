import "server-only";

import Stripe from "stripe";

export default async function handleStripeCancelSubscription(event: Stripe.CustomerSubscriptionDeletedEvent) {
    console.error("Assinatura cancelada com sucesso");
}