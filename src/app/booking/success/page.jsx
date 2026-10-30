import Stripe from "stripe";
import Link from "next/link";
import {
  FaCircleCheck,
  FaCircleXmark,
  FaShieldHeart,
  FaArrowRight,
  FaHouse,
  FaCalendarDays,
  FaClock,
} from "react-icons/fa6";
import { savePayments } from "@/action/server/paymentHistory";
import { sendBookingConfirmation } from "@/lib/mailer";
export const metadata = {
  title: "Success Page",
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const SuccessPage = async ({ searchParams }) => {
  const { session_id } = await searchParams;

  const session = session_id
    ? await stripe.checkout.sessions.retrieve(session_id)
    : null;

  // Payment status
  const paid = session?.payment_status === "paid";

  // Save payment data in database and send confirmation mail
  await savePayments(session);


  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-[#edf5fc] to-[#fff0f2] px-4 py-12">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#1479C9]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#F34E65]/10 blur-3xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_25px_80px_-25px_rgba(19,46,73,0.2)]">
        {/* Top Accent */}
        <div className="flex h-2 w-full">
          <div
            className={`w-2/3 ${
              paid ? "bg-[#1479C9]" : "bg-slate-400"
            }`}
          />
          <div className="w-1/3 bg-[#F34E65]" />
        </div>

        <div className="px-6 py-10 text-center sm:px-10 sm:py-12">
          {/* Status Icon */}
          <div
            className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${
              paid
                ? "bg-emerald-50 ring-8 ring-emerald-50/60"
                : "bg-slate-100 ring-8 ring-slate-50"
            }`}
          >
            {paid ? (
              <FaCircleCheck className="text-5xl text-emerald-500" />
            ) : (
              <FaCircleXmark className="text-5xl text-slate-400" />
            )}
          </div>

          {/* Status Badge */}
          <div
            className={`mx-auto mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${
              paid
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                paid ? "bg-emerald-500" : "bg-slate-400"
              }`}
            />
            {paid ? "Payment Confirmed" : "Payment Incomplete"}
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#132e49] sm:text-4xl">
            {paid ? "Payment Successful!" : "Payment Not Completed"}
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-slate-500 sm:text-base">
            {paid
              ? "Thank you for choosing Care.io. Your payment has been received successfully."
              : "Your payment has not been completed. Please check your payment status before trying again."}
          </p>

          {/* Payment Details */}
          {paid && (
            <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="font-bold text-[#132e49]">
                  Booking Summary
                </h2>

                <FaShieldHeart className="text-xl text-[#1479C9]" />
              </div>

              <div className="space-y-4">
                {/* Booking Date */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1479C9]/10 text-[#1479C9]">
                    <FaCalendarDays />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-400">
                      Booking Date
                    </p>
                    <p className="mt-1 font-semibold text-[#132e49]">
                      {session.metadata.date}
                    </p>
                  </div>
                </div>

                {/* Booking Time */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F34E65]/10 text-[#F34E65]">
                    <FaClock />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-400">
                      Booking Time
                    </p>
                    <p className="mt-1 font-semibold text-[#132e49]">
                      {session.metadata.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="mt-6 border-t border-dashed border-slate-200 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Total Amount Paid
                    </p>
                    <p className="mt-1 text-xs text-emerald-600">
                      Payment verified
                    </p>
                  </div>

                  <p className="text-2xl font-extrabold text-[#1479C9]">
                    ৳{(session.amount_total / 100).toLocaleString("en-BD")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Message */}
          {paid && (
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#1479C9]/5 p-4 text-left">
              <FaShieldHeart className="mt-0.5 shrink-0 text-lg text-[#1479C9]" />

              <p className="text-xs leading-6 text-slate-600">
                Your booking information has been submitted. Thank you for
                trusting Care.io to support your family.
              </p>
            </div>
          )}

          {/* Home Button */}
          <Link
            href="/"
            className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#1479C9] px-6 py-3 font-bold text-white shadow-lg shadow-[#1479C9]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1065A8] hover:shadow-xl hover:shadow-[#1479C9]/30 active:translate-y-0"
          >
            <FaHouse />
            <span>Go to Home</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <p className="mt-5 text-xs text-slate-400">
            Care.io — Trusted Care for Your Loved Ones
          </p>
        </div>
      </div>
    </main>
  );
};

export default SuccessPage;