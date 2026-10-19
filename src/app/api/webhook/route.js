import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/sendBookingEmail";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  // console.log("WEBHOOK HIT");
  const body = await req.text(); // raw body is required for signature check
  const signature = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const m = session.metadata;
    const total = session.amount_total / 100;
    const hours = Number(m.hours);
    console.log(
      "Booking confirmed for:",
      m.title,
      "on",
      m.date,
      "at",
      m.time,
      "for",
      hours,
      "hour(s). Total paid:",
      total,
      "tk. Sending confirmation email to:",
      session.customer_details?.email,
    );

    try {
      await sendBookingEmail({
        to: session.customer_details?.email,
        title: m.title,
        hours,
        date: m.date,
        time: m.time,
        district: m.district,
        area: m.area,
        address: m.address,
        phone: m.phone,
        total,
      });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
