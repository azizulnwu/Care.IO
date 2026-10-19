import Stripe from "stripe";
import { NextResponse } from "next/server";
import { serviceDetails } from "@/action/server/serviceAll";
import { RATES } from "@/lib/pricing";
import { bookingServices } from "@/action/server/order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  // const session = await getServerSession(authOptions)
  try {
    const body = await req.json();
    // console.log("Request body:", body);
    const service = await serviceDetails(body.serviceId);
    const rate = service ? RATES[service.category] : null;

    if (!service || !service.isActive || !rate) {
      return NextResponse.json({ error: "Invalid service" }, { status: 400 });
    }

    const hours = Number(body.hours);
    if (!Number.isInteger(hours) || hours < 1 || hours > 72) {
      return NextResponse.json({ error: "Invalid hours" }, { status: 400 });
    }

    if (
      !body.date ||
      !body.time ||
      !body.district ||
      !body.area ||
      !body.address ||
      !body.phone
    ) {
      return NextResponse.json(
        { error: "Missing booking details" },
        { status: 400 },
      );
    }

    const total = rate * hours;
    const id = service._id.toString();
    const orderData = {
      id: id,
      total: total,
      serviceName: service.title,
      ...body,
    };
    // saving order data to the database using bookingServices function
   const result = await bookingServices(orderData);
   if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
   }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: total * 100,
            product_data: {
              name: service.title,
              description: `${hours} hour(s) × ${rate} tk — ${body.date} ${body.time}`,
            },
          },
        },
      ],
      metadata: {
        serviceId: id,
        category: service.category,
        hours: String(hours),
        date: body.date,
        time: body.time,
        district: body.district,
        area: body.area,
        address: String(body.address).slice(0, 400),
        phone: body.phone,
        notes: String(body.notes || "").slice(0, 400),
      },
      success_url: `${process.env.NEXTAUTH_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/booking/${id}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not start payment" },
      { status: 500 },
    );
  }
}
