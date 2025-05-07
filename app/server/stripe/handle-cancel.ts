import { db } from "@/app/lib/firebase";
import "server-only";

import Stripe from "stripe";

export default async function handleStripeCancelSubscription(event: Stripe.CustomerSubscriptionDeletedEvent) {
    console.error("Assinatura cancelada com sucesso");
    const metadata = event.data.object.metadata;
        
            const userId = metadata?.userId;
        
            if (!userId) {
                throw new Error("User ID is undefined");
            }
        
            await db.collection("users").doc(userId).update({
                subscriptionStatus: "inactive"
            });
}