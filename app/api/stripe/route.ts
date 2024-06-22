import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: "payment",
            customer_email: email,
            success_url: `${BASE_URL}/instructor/lessons`,
            cancel_url: `${BASE_URL}/access`,
            automatic_tax: { enabled: true },
        });

        if (!session.url) {
            throw new Error("Stripe session URL is undefined");
        }

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error("Error creating checkout session:", err);
        return NextResponse.json(
            { error: "Error creating checkout session" },
            { status: 500 },
        );
    }
}
