import stripe from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const {testeid, userEmail} = await req.json();

    const price = process.env.STRIPE_PRICE_ID;

    if(!price) {
        return new Response("Price ID not found", { status: 500 });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            customer: testeid,
            mode: "payment",    
            line_items: [
                {
                    price,
                    quantity: 1,
                },
            ],
            payment_method_types: ["card", "boleto"],
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/`,
            ...(userEmail && {customer_email: userEmail}),
        })

        if (!session.url) {
            return NextResponse.json({ error: "Session URL not found" }, { status: 500 });
        }

        return NextResponse.json(session);
    } catch (error) {
        
    }
}