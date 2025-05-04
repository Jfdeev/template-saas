import stripe from "@/app/lib/stripe";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    const body = await req.json();
    const headersList = await headers();
    const singnature = headersList.get("stripe-signature");

    if (!singnature || !secret) {
        return new Response("Missing signature or secret", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, singnature, secret);
}