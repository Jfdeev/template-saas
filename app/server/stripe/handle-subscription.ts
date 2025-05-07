import { db } from "@/app/lib/firebase";
import stripe from "@/app/lib/stripe";
import "server-only";
import Stripe from "stripe";

export async function handleStripeSubscription(event: Stripe.CheckoutSessionCompletedEvent) {
    if (event.data.object.payment_status === "paid") {
        console.error("Assinatura realizada com sucesso");
        const metadata = event.data.object.metadata;
    
        const userId = metadata?.userId;
    
        if (!userId) {
            throw new Error("User ID is undefined");
        }
    
        await db.collection("users").doc(userId).update({
            stripeCustomerId: event.data.object.customer,
            stripeSubscriptionId: event.data.object.subscription,
            subscriptionStatus: "active"
        });
    }


}