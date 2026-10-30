"use client";

import Link from "next/link";
import {
  FaCalendarCheck,
  FaClock,
  FaCircleCheck,
  FaXmark,
  FaPlus,
  FaHeart,
} from "react-icons/fa6";

const statusStyles = {
  pending: "bg-amber-50 text-amber-800 ring-amber-200",
  confirmed: "bg-[#5DA83C]/12 text-[#2f6b19] ring-[#5DA83C]/30",
  complete: "bg-[#1479C9]/10 text-[#0f5f9f] ring-[#1479C9]/25",
  cancel: "bg-rose-50 text-rose-700 ring-rose-200",
};

const DashboardHomePage = ({ data = [] }) => {
  // Normalize the status values
  const getStatus = (booking) => {
    const status = String(booking?.status || "")
      .trim()
      .toLowerCase();

    if (status === "confirm") return "confirmed";
    if (status === "completed") return "complete";
    if (status === "cancelled" || status === "canceled") {
      return "cancel";
    }

    return status;
  };

  // Dynamic statistics from MongoDB bookings
  const totalBookings = data.length;

  const pendingBookings = data.filter(
    (booking) => getStatus(booking) === "pending",
  ).length;

  const confirmedBookings = data.filter(
    (booking) => getStatus(booking) === "confirmed",
  ).length;

  const completedBookings = data.filter(
    (booking) => getStatus(booking) === "complete",
  ).length;

  const cancelledBookings = data.filter(
    (booking) => getStatus(booking) === "cancel",
  ).length;

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      description: "All your bookings",
      icon: FaCalendarCheck,
      color: "text-white",
      bg: "bg-white/10",
    },
    {
      title: "Pending",
      value: pendingBookings,
      description: "Awaiting confirmation",
      icon: FaClock,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      title: "Confirmed",
      value: confirmedBookings,
      description: "Ready to serve",
      icon: FaCircleCheck,
      color: "text-[#3f8a22]",
      bg: "bg-[#5DA83C]/12",
    },
    {
      title: "Completed",
      value: completedBookings,
      description: "Successfully completed",
      icon: FaHeart,
      color: "text-[#0f5f9f]",
      bg: "bg-[#1479C9]/10",
    },
    {
      title: "Cancelled",
      value: cancelledBookings,
      description: "Cancelled bookings",
      icon: FaXmark,
      color: "text-rose-700",
      bg: "bg-rose-50",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f4f7fa] px-4 py-6 md:px-8 md:py-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Welcome Header */}
        <section className="relative overflow-hidden rounded-2xl border border-[#132e49]/10 bg-white p-6 pt-9 shadow-[0_1px_2px_rgba(19,46,73,0.04),0_8px_24px_-12px_rgba(19,46,73,0.12)] md:p-10 md:pt-12">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 flex h-1.5 w-full"
          >
            <div className="w-1/2 bg-[#1479C9]" />
            <div className="w-1/4 bg-[#F34E65]" />
            <div className="w-1/4 bg-[#5DA83C]" />
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-[#1479C9]">
                Care.io dashboard
              </p>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-[#132e49] md:text-4xl">
                Welcome back!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#132e49]/70 md:text-base">
                Manage your bookings, track service updates, and
                find trusted care for the people who matter most.
              </p>
            </div>

            <Link
              href="/service-page"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1479C9] px-6 text-sm font-semibold text-white shadow-sm outline-none transition-colors duration-150 motion-reduce:transition-none hover:bg-[#0f5f9f] focus-visible:ring-4 focus-visible:ring-[#1479C9]/30 active:bg-[#0d548e] sm:text-base"
            >
              <FaPlus aria-hidden="true" />
              Book a Service
            </Link>
          </div>
        </section>

        {/* Dynamic Statistics */}
        <section aria-labelledby="booking-overview">
          <div className="mb-5">
            <h2
              id="booking-overview"
              className="text-xl font-bold tracking-tight text-[#132e49]"
            >
              Booking Overview
            </h2>

            <p className="mt-1 text-sm text-[#132e49]/70">
              A real-time summary of your booking records.
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isTotal = index === 0;

              return (
                <div
                  key={stat.title}
                  className={
                    isTotal
                      ? "rounded-2xl bg-[#132e49] p-6 shadow-[0_8px_24px_-12px_rgba(19,46,73,0.5)] sm:col-span-2 xl:col-span-4 md:p-7"
                      : "rounded-2xl border border-[#132e49]/10 bg-white p-5 shadow-[0_1px_2px_rgba(19,46,73,0.04),0_8px_24px_-12px_rgba(19,46,73,0.12)]"
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <dt
                        className={`text-sm font-medium ${
                          isTotal ? "text-white/70" : "text-[#132e49]/70"
                        }`}
                      >
                        {stat.title}
                      </dt>

                      <dd
                        className={`mt-2 font-bold tabular-nums tracking-tight ${
                          isTotal
                            ? "text-5xl text-white"
                            : "text-4xl text-[#132e49]"
                        }`}
                      >
                        {stat.value.toLocaleString("en-BD")}
                      </dd>
                    </div>

                    <div
                      aria-hidden="true"
                      className={`flex shrink-0 items-center justify-center rounded-xl ${
                        isTotal ? "h-14 w-14" : "h-12 w-12"
                      } ${stat.bg} ${stat.color}`}
                    >
                      <Icon className="text-xl" />
                    </div>
                  </div>

                  <dd
                    className={`mt-4 text-xs ${
                      isTotal ? "text-white/70" : "text-[#132e49]/65"
                    }`}
                  >
                    {stat.description}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>

        {/* Recent Bookings
        <section className="overflow-hidden rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] shadow-sm">
          <div className="flex flex-col justify-between gap-3 bg-[#e5e9ec] px-5 py-5 sm:flex-row sm:items-center md:px-7">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Recent Bookings
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your five most recent bookings.
              </p>
            </div>

            <Link
              href="/dashboard/my-bookings"
              className="text-sm font-semibold text-[#1479C9] hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3 p-4 md:p-6">
            {data.length === 0 ? (
              <p className="rounded-xl bg-[#e5e9ec] p-6 text-center text-sm text-gray-600">
                You have no bookings yet.
              </p>
            ) : (
              [...data]
                .sort(
                  (a, b) =>
                    new Date(b.createAt || b.createdAt || 0).getTime() -
                    new Date(a.createAt || a.createdAt || 0).getTime(),
                )
                .slice(0, 5)
                .map((booking) => {
                  const status = getStatus(booking);

                  return (
                    <div
                      key={booking._id}
                      className="flex flex-col gap-3 rounded-xl border border-white/60 bg-[#e5e9ec] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {booking.serviceName || "Care Service"}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {booking.trackingNumber || booking._id}
                          {" · "}
                          {booking.serviceDate || "Date not provided"}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                          statusStyles[status] ||
                          "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {status || "Unknown"}
                      </span>
                    </div>
                  );
                })
            )}
          </div>
        </section> */}

        {/* Footer */}
        <p className="pb-4 text-center text-sm text-[#132e49]/65">
          Your family deserves the best care. Thank you for choosing{" "}
          <span className="font-semibold text-[#1479C9]">
            Care.io
          </span>
          .
        </p>
      </div>
    </main>
  );
};

export default DashboardHomePage;