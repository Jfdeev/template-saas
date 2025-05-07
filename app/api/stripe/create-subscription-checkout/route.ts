import { auth } from '@/app/lib/auth';
import stripe from '@/app/lib/stripe';
import { NextResponse, NextRequest } from 'next/server';
import { getCustomerId } from '@/app/server/stripe/get-customer-id';

export async function POST(req: NextRequest) {
    const {testId} = await req.json();

    const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

    if (!price) {
        return new Response("Price ID not found", { status: 500 });
    }

    const session = await auth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    if(!userId || !userEmail) {
        return new Response("Unauthorized", { status: 401 });
    }

    const customerId = await getCustomerId(userId, userEmail);

    const metadata = {
        testId,
        price,
        userId
    }

    //Precisamos criar um cliente na stripa para ter referencia ao criar o portal

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            payment_method_types: ["card"],
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/`,
            metadata,
            customer: customerId,
        });

        if (!session.url) {
            return NextResponse.json({ error: "Session URL not found" }, { status: 500 });
        }

        return NextResponse.json(session);
    } catch (error) {
        console.error("Error creating Stripe portal session:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}