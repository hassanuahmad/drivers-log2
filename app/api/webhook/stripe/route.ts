import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/utils/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEHBOOK_SECRET;

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    let data;
    let eventType;
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature!,
            webhookSecret!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    data = event.data.object as Stripe.Checkout.Session;
    eventType = event.type;

    try {
        switch (eventType) {
            case "checkout.session.completed": {
                const supabase = await supabaseAdmin();
                const userEmail = data.customer_details?.email;

                if (!userEmail) {
                    throw new Error("User email not found in session data");
                }

                const { data: user, error: user_id_error } = await supabase
                    .from("instructors")
                    .select("instructor_id")
                    .eq("email", userEmail)
                    .limit(1);

                if (user_id_error) {
                    console.error(
                        "Error getting id using email",
                        user_id_error
                    );
                    throw user_id_error;
                }

                if (!user || user.length === 0) {
                    throw new Error("User not found");
                }

                const user_id = user[0].instructor_id;

                const { error } = await supabase.auth.admin.updateUserById(
                    user_id,
                    {
                        user_metadata: { has_access: true },
                    }
                );

                if (error) {
                    console.error("Supabase updating user error:", error);
                    throw error;
                }

                // Send email to user that they purchased it

                break;
            }
            // Handle other event types if necessary
            default:
                console.warn(`Unhandled event type: ${eventType}`);
        }
    } catch (err: any) {
        console.error(
            `Stripe error: ` + err.message + " | Event Type: " + eventType
        );
    }

    return NextResponse.json({});
}
