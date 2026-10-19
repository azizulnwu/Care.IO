import { userBookingServiceData } from "@/action/server/bookingServiceData";
import MyBookingPageComponents from "@/components/dashbord-layout-components/MyBookingPageComponent";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import { FaTicket } from "react-icons/fa6";

const MyBooking = async () => {
  const session = await getServerSession(authOptions);

  const results = await userBookingServiceData(session?.user?.email);

  return (
    <div className="space-y-6">
      <main className="mx-auto max-w-6xl space-y-6">
        <section className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-rose-50 p-6 shadow-sm md:p-8">
          <div className="absolute left-0 top-0 flex h-1.5 w-full">
            <div className="w-1/2 bg-[#1479C9]" />
            <div className="w-1/4 bg-[#F34E65]" />
            <div className="w-1/4 bg-[#5DA83C]" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1479C9]">
            Care.io Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
            My Bookings
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 md:text-base">
            Manage your care service bookings, track their status, and keep your
            booking information organized in one place.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-5 py-3 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#1479C9]">
              <FaTicket />
            </span>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Bookings
              </p>
              <p className="text-lg font-extrabold text-slate-800">
                {results.length}
              </p>
            </div>
          </div>
        </section>
      </main>
      {results?.map((booking) => (
        <MyBookingPageComponents
          key={booking._id.toString()}
          bookings={{
            ...booking,
            _id: booking._id.toString(),
          }}
        />
      ))}
      <footer className="px-4 pb-6 pt-2 text-center text-sm text-slate-500">
        Thank you for choosing{" "}
        <span className="font-bold text-[#1479C9]">Care.io</span>.
        <p className="mt-1 text-xs text-slate-400">
          Trusted care for the people who matter most.
        </p>
      </footer>
    </div>
  );
};

export default MyBooking;
