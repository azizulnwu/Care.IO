"use client";

import {
  bookingServiceStatusUpdate,
  bookingServiceStatusUpdateForAdmin,
  deleteBookingService,
  deleteBookingServiceForAdmin,
} from "@/action/server/bookingServiceData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaCalendarDays,
  FaClock,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaTicket,
  FaMoneyBillWave,
  FaCircleCheck,
  FaClockRotateLeft,
  FaXmark,
  FaTrash,
  FaSpinner,
} from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  complete: "bg-[#1479C9]/10 text-[#1479C9]",
  cancel: "bg-[#F34E65]/10 text-[#F34E65]",
};

const BookingService = ({ booking }) => {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!booking) return null;

  const {
    _id,
    status,
    userName,
    userEmail,
    serviceName,
    totalPrice,
    hours,
    district,
    area,
    phone,
    trackingNumber,
    serviceDate,
  } = booking;

  const updateAdminBookingStatus = async (_id, status) => {
    setLoading(true);
    const response = await bookingServiceStatusUpdateForAdmin(_id, status);
    if (response.modifiedCount > 0) {
      setError("");
      await bookingServiceStatusUpdate(_id, status)
      router.refresh();
      // onRefresh(); // Call the onRefresh function to refresh the data
    }
  };

  const deleteBookingForAdmin = async (_id) => {
    setLoading(true);
    const response = await deleteBookingServiceForAdmin(_id);
    console.log(response);
    if (response.deletedCount) {
      setError("");
      setLoading(false);
      router.refresh();
      // onRefresh(); // Call the onRefresh function to refresh the data
    }
  };

  const Detail = ({ icon, label, value }) => (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5e9ec] text-[#1479C9]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-gray-800">
          {value ?? "Not provided"}
        </p>
      </div>
    </div>
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] shadow-md">
      {/* Header */}
      <div className="bg-[#e5e9ec] px-5 py-5 md:px-7">
        <div className="mb-4 flex h-1.5 overflow-hidden rounded-full">
          <div className="w-1/2 bg-[#1479C9]" />
          <div className="w-1/4 bg-[#F34E65]" />
          <div className="w-1/4 bg-[#5DA83C]" />
        </div>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1479C9]">
              Booking Details
            </p>

            <h2 className="mt-2 text-xl font-bold text-gray-800">
              {serviceName}
            </h2>

            <p className="mt-2 break-all text-xs text-gray-500">
              Tracking: {trackingNumber}
            </p>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold capitalize ${
              statusStyles[status] || "bg-gray-200 text-gray-700"
            }`}
          >
            {status === "pending" ? (
              <FaClockRotateLeft />
            ) : status === "cancel" ? (
              <FaXmark />
            ) : (
              <FaCircleCheck />
            )}
            {status}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="grid gap-6 p-5 md:grid-cols-2 md:p-7">
        <div className="space-y-5">
          <Detail
            icon={<FaCalendarDays />}
            label="Service Date"
            value={serviceDate}
          />

          <Detail
            icon={<FaClock />}
            label="Duration"
            value={`${hours} ${Number(hours) === 1 ? "hour" : "hours"}`}
          />
          <Detail icon={<FaUser />} label="Customer Name" value={userName} />

          <Detail
            icon={<FaEnvelope />}
            label="Customer Email"
            value={userEmail}
          />

          <Detail icon={<FaPhone />} label="Phone Number" value={phone} />
        </div>

        <div className="space-y-5">
          <Detail
            icon={<FaLocationDot />}
            label="Service Location"
            value={`${area}, ${district}`}
          />

          <div className="flex items-center gap-3 rounded-xl bg-[#e5e9ec] p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1479C9]/10 text-xl text-[#1479C9]">
              <FaMoneyBillWave />
            </div>

            <div>
              <p className="text-xs text-gray-500">Total Price</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">
                ৳{Number(totalPrice).toLocaleString("en-BD")}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {/* Confirm & Cancel Buttons */}
            {status === "pending" && (
              <div className="flex w-full flex-wrap gap-3">
                <button
                  type="button"
                  disabled={loadingAction !== ""}
                  onClick={() => updateAdminBookingStatus(_id, "confirm")}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1479C9] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1068ad] disabled:opacity-60"
                >
                  {loadingAction === "confirmed" ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaCircleCheck />
                  )}
                  Confirm
                </button>

                <button
                  type="button"
                  disabled={loadingAction !== ""}
                  onClick={() => updateAdminBookingStatus(_id, "cancel")}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#F34E65]/30 bg-white px-4 py-3 text-sm font-semibold text-[#F34E65] transition hover:bg-[#F34E65] hover:text-white disabled:opacity-60"
                >
                  {loadingAction === "cancel" ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaXmark />
                  )}
                  Cancel Booking
                </button>
              </div>
            )}

            Delete Button
            {(status === "confirmed" || status === "cancel") && (
              <div className="w-full">
                <button
                  type="button"
                  disabled={loadingAction !== ""}
                  onClick={() => deleteBookingForAdmin(_id)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F34E65] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#db3e54] disabled:opacity-60"
                >
                  {loadingAction === "delete" ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTrash />
                  )}
                  Delete
                </button>
              </div>
            )}


            {/* Completed Message */}
            {status === "complete" && (
              <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-100 px-4 py-3 text-sm font-semibold text-green-700">
                <FaCircleCheck />
                Service Completed
              </div>
            )}
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default BookingService;
