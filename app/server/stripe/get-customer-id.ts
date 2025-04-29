import { db } from "@/app/lib/firebase";
import stripe from "@/app/lib/stripe";
import "server-only";

export async function getCustomerId(userId: string, userEmail: string) {
    try {
        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            throw new Error("User not found");
        }
        const stripeCustomerId = userDoc.data()?.stripeCustomerId;

        if(stripeCustomerId) {
            return stripeCustomerId;
        }

        const userName = userDoc.data()?.name;

        const stripeCustumer = await stripe.customers.create({
            email: userEmail,
            ...(userName && { name: userName }),
            metadata: {
                userId,
            },
        });

        await userRef.update({
            stripeCustomerId: stripeCustumer.id,
        });
        
        return stripeCustumer.id;
    } catch (error) {
        console.error("Error getting customer ID:", error);
        throw new Error("Failed to get customer ID");
    }
}