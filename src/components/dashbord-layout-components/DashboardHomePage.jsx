
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
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  complete: "bg-[#1479C9]/10 text-[#1479C9]",
  cancel: "bg-[#F34E65]/10 text-[#F34E65]",
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
      color: "text-[#1479C9]",
      bg: "bg-[#1479C9]/10",
    },
    {
      title: "Pending",
      value: pendingBookings,
      description: "Awaiting confirmation",
      icon: FaClock,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      title: "Confirmed",
      value: confirmedBookings,
      description: "Ready to serve",
      icon: FaCircleCheck,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Completed",
      value: completedBookings,
      description: "Successfully completed",
      icon: FaHeart,
      color: "text-[#F34E65]",
      bg: "bg-[#F34E65]/10",
    },
    {
      title: "Cancelled",
      value: cancelledBookings,
      description: "Cancelled bookings",
      icon: FaXmark,
      color: "text-[#F34E65]",
      bg: "bg-[#F34E65]/10",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f9fb] px-4 py-6 md:px-8 md:py-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Welcome Header */}
        <section className="relative overflow-hidden rounded-2xl border border-[#1479C9]/10 bg-[#e5e9ec] p-6 shadow-sm md:p-10">
          <div className="absolute left-0 top-0 flex h-1.5 w-full">
            <div className="w-1/2 bg-[#1479C9]/70" />
            <div className="w-1/4 bg-[#F34E65]/70" />
            <div className="w-1/4 bg-[#5DA83C]/70" />
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1479C9]">
                Care.io Dashboard
              </p>

              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Welcome back!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 md:text-base">
                Manage your bookings, track service updates, and
                find trusted care for the people who matter most.
              </p>
            </div>

            <Link
              href="/service-page"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1479C9] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#1068ad]"
            >
              <FaPlus />
              Book a Service
            </Link>
          </div>
        </section>

        {/* Dynamic Statistics */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Booking Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              A real-time summary of your booking records.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>

                      <h3 className="mt-2 text-3xl font-bold text-gray-800">
                        {stat.value.toLocaleString("en-BD")}
                      </h3>
                    </div>

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                    >
                      <Icon className="text-xl" />
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-gray-600">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
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
        <p className="pb-4 text-center text-sm text-gray-500">
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
