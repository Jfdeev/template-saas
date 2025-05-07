import stripe from "@/app/lib/stripe";
import handleStripeSubscription from "@/app/server/stripe/handle-subscription";
import handleStripePayment from "@/app/server/stripe/handle-payment";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import handleStripeCancelSubscription from "@/app/server/stripe/handle-cancel";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    try {
        
        const body = await req.json();
        const headersList = await headers();
        const singnature = headersList.get("stripe-signature");
    
        if (!singnature || !secret) {
            return new Response("Missing signature or secret", { status: 400 });
        }
    
        const event = stripe.webhooks.constructEvent(body, singnature, secret);
    
        switch (event.type) {
            case "checkout.session.completed":
                const metadata = event.data.object.metadata;
    
                if(metadata?.price === process.env.SRIPE_PRICE_ID) {
                    await handleStripePayment(event);
                }
    
                if(metadata?.price === process.env.SRIPE_SUBSCRIPTION_ID) {
                    await handleStripeSubscription(event);
                }
                break;
                case "checkout.session.expired":
                    // Enviar email para o cliente informando que a sessão expirou
                    // Aqui você pode usar um serviço de envio de e-mail, como SendGrid ou Nodemailer
                    console.log("Session expired");
                break;
            case "checkout.session.async_payment_succeeded": // Boleto Pago
                console.log("Boleto pago");
                break;
            case "checkout.session.async_payment_failed": // Boleto não pago
                break;
            case "customer.subscription.created": // Assinatura criada
                console.log("Mensagem boas vindas");
                break;
            case "customer.subscription.updated": // Assinatura atualizada
                break;
            case "customer.subscription.deleted": // Assinatura cancelada
                await handleStripeCancelSubscription(event);
                break;
        }
    } catch (error) {
        console.error("Error processing webhook", error);
    }
}