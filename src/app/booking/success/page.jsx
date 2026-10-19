import Stripe from "stripe";
import Link from "next/link";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const SuccessPage = async ({ searchParams }) => {
  const { session_id } = await searchParams;
  const session = session_id
    ? await stripe.checkout.sessions.retrieve(session_id)
    : null;
  const paid = session?.payment_status === "paid";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f9fb] px-4">
      <div className="w-full max-w-lg rounded-2xl bg-[#e5e9ec] p-8 text-center shadow-lg">
        {paid ? (
          <FaCircleCheck className="mx-auto text-5xl text-[#4ea12b]" />
        ) : (
          <FaCircleXmark className="mx-auto text-5xl text-gray-500" />
        )}

        <h1 className="mt-4 text-2xl font-bold text-[#132e49]">
          {paid ? "Payment Successful" : "Payment Not Completed"}
        </h1>

        {paid && (
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Your booking for {session.metadata.date} at {session.metadata.time} is
            confirmed. Total paid: {session.amount_total / 100} tk.
          </p>
        )}

        <Link
          href="/"
          className="btn mt-6 border-none bg-[#1479C9] text-white hover:bg-[#1065A8]"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
};

export default SuccessPage;



// Route name: your details page is at /service-page/[id], so the Back link in the booking component points there. Change it if your route differs.
// Saving bookings: right now the booking only lives in Stripe metadata. The next step is a webhook (checkout.session.completed) that saves it to your MongoDB bookings collection, so it shows in the user's dashboard. I can write that if you want.