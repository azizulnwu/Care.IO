"use client";

import { bookingServiceStatusUpdate, bookingServiceStatusUpdateForAdmin, deleteBookingService } from "@/action/server/bookingServiceData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaCalendarDays,
  FaClock,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaMoneyBillWave,
  FaCircleCheck,
  FaClockRotateLeft,
  FaXmark,
  FaTrash,
  FaSpinner,
  FaCheck,
  FaTicket,
} from "react-icons/fa6";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  complete: "bg-blue-50 text-[#1479C9] ring-blue-200",
  cancel: "bg-rose-50 text-[#F34E65] ring-rose-200",
};

const MyBookingPageComponents = ({ bookings = [] }) => {
  const router = useRouter();

  const [loadingId, setLoadingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const Detail = ({ icon, label, value }) => (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 transition hover:border-blue-100">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1479C9]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value ?? "Not provided"}
        </p>
      </div>
    </div>
  );

  // update status
    const updateUserBookingStatus = async (id, status) => {
      setLoadingId(true);
      const response = await bookingServiceStatusUpdate (id, status);
      if (response.modifiedCount > 0) {
        setError("");
        await bookingServiceStatusUpdateForAdmin(id, status)
         setLoadingId(false);
        router.refresh();
        // onRefresh(); // Call the onRefresh function to refresh the data
      }
    };
    // Delete completed service
      const deleteBookingForUser = async (_id) => {
        setLoadingId(true);
        const response = await deleteBookingService(_id);
        console.log(response);
        if (response.deletedCount) {
          setError("");
          setLoadingId(false);
          router.refresh();
          // onRefresh(); // Call the onRefresh function to refresh the data
        }
      };

  // Keep your existing updateStatus and deleteBooking functions here.

  return (
    <main className="bg-slate-50">
      <div className="mx-auto max-w-6xl space-y-6">
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
          >
            {success}
          </div>
        )}

        {bookings.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1479C9]">
              <FaTicket className="text-2xl" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-800">
              No Bookings Found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              You have not booked any care services yet. Your bookings will
              appear here when you book a service.
            </p>
          </section>
        ) : (
          <div className="space-y-5">
            {/* Keep your existing booking data mapping here.
                Render each booking as the card below. */}

            {/*
              IMPORTANT:
              Your parent currently passes ONE booking object per component.
              Use bookings as an object, not an array.
            */}
            {(() => {
              const booking = bookings;
              const id = String(booking._id);
              const status = booking.status;

              const isCompleteLoading = loadingId === `${id}-complete`;
              const isDeleteLoading = loadingId === `${id}-delete`;

              return (
                <article
                  key={id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:shadow-md"
                >
                  {/* Card header */}
                  <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-rose-50 px-2 p-4 sm:px-7">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1479C9] text-xl text-white shadow-sm">
                          <FaTicket />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#1479C9]">
                            Booking Details
                          </p>

                          <h2 className="mt-1 text-lg font-bold text-slate-800 sm:text-xl">
                            {booking.serviceName || "Care Service"}
                          </h2>

                          <p className="mt-1 break-all text-xs text-slate-500">
                            Booking ID: {booking.trackingNumber || id}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold capitalize ring-1 ${
                          statusStyles[status] ||
                          "bg-slate-100 text-slate-600 ring-slate-200"
                        }`}
                      >
                        {status === "pending" ? (
                          <FaClockRotateLeft />
                        ) : status === "cancel" ? (
                          <FaXmark />
                        ) : (
                          <FaCircleCheck />
                        )}
                        {status || "unknown"}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="grid gap-4 p-2 sm:p-6 lg:grid-cols-2 lg:p-4">
                    <div className="space-y-3">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Service Information
                      </p>

                      <Detail
                        icon={<FaCalendarDays />}
                        label="Service Date"
                        value={booking.serviceDate}
                      />

                      <Detail
                        icon={<FaClock />}
                        label="Duration"
                        value={`${booking.hours ?? 0} ${
                          Number(booking.hours) === 1 ? "hour" : "hours"
                        }`}
                      />

                      <Detail
                        icon={<FaEnvelope />}
                        label="Email Address"
                        value={booking.userEmail}
                      />

                      <Detail
                        icon={<FaPhone />}
                        label="Phone Number"
                        value={booking.phone}
                      />
                    </div>

                    <div className="space-y-3">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Location & Payment
                      </p>

                      <Detail
                        icon={<FaLocationDot />}
                        label="Service Location"
                        value={[booking.area, booking.district]
                          .filter(Boolean)
                          .join(", ")}
                      />

                      <Detail
                        icon={<FaLocationDot />}
                        label="Full Address"
                        value={booking.address}
                      />

                      <Detail
                        icon={<FaClock />}
                        label="Booking Time"
                        value={booking.createTimeAt}
                      />

                      <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-[#1479C9] shadow-sm">
                          <FaMoneyBillWave />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-slate-500">
                            Total Booking Price
                          </p>

                          <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-800">
                            ৳
                            {Number(booking.totalPrice || 0).toLocaleString(
                              "en-BD"
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Existing action conditions and handlers should remain here. */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {status === "confirm" && (
                          <button
                            type="button"
                            disabled={Boolean(loadingId)}
                            onClick={() => updateUserBookingStatus(id, "completed")}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1479C9] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#1068ad] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isCompleteLoading ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              <FaCheck />
                            )}
                            Complete
                          </button>
                        )}

                        {(status === "completed" || status === "cancel") && (
                          <button
                            type="button"
                            disabled={Boolean(loadingId)}
                            onClick={() => deleteBookingForUser(id)}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F34E65] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#db3e54] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isDeleteLoading ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              <FaTrash />
                            )}
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })()}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingPageComponents;