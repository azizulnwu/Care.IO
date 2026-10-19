"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCircleCheck,
  FaLock,
  FaCreditCard,
  FaShieldHeart,
} from "react-icons/fa6";
import { useSession } from "next-auth/react";

const BookingPage = ({ service, districts }) => {
  const { data: session } = useSession();
  const { _id, title, category, features, rate } = service;
  // console.log(_id);
  const [form, setForm] = useState({
    hours: 1,
    date: "",
    time: "",
    district: "",
    area: "",
    address: `${session?.address || ""}`,
    phone: `${session?.contact || ""}`,
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const areas = useMemo(
    () => districts.find((d) => d.district === form.district)?.areas ?? [],
    [districts, form.district],
  );

  const hours = Number(form.hours) || 0;
  const total = rate * hours;

  const handlePay = async (e) => {
    console.log("payment");
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, serviceId: _id }),
      });
      const data = await res.json();
    
      if (!res.ok) throw new Error(data.error || "Payment failed");
      window.location.href = data.url; // Stripe Checkout
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  const field =
    "w-full rounded-xl border border-[#1479C9]/20 bg-white px-4 py-3 text-sm text-[#041320] outline-none transition focus:border-[#1479C9] focus:ring-2 focus:ring-[#1479C9]/20 disabled:bg-gray-100";
  const label = "mb-1.5 block text-sm font-semibold text-[#132e49]";

  return (
    <main className="min-h-screen bg-[#f7f9fb] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/service-page/${_id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#1479C9] transition-colors hover:text-[#1065A8]"
        >
          <FaArrowLeft />
          Back to Service
        </Link>

        <div className="mb-8">
          <p className="text-sm font-medium capitalize text-[#1479C9]">
            {category?.replace("-", " ")}
          </p>
          <h1 className="text-3xl font-bold text-[#132e49] md:text-4xl">
            Book {title}
          </h1>
        </div>

        <form onSubmit={handlePay} className="grid gap-8 lg:grid-cols-3">
          {/* ============== LEFT: BOOKING DETAILS ============== */}
          <div className="rounded-2xl border border-[#1479C9]/10 bg-[#e5e9ec] p-6 shadow-lg md:p-8 lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <FaShieldHeart className="text-xl text-[#5DA83C]" />
              <h2 className="text-xl font-bold text-[#041320]">
                Booking Details
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>Date</label>
                <input
                  type="date"
                  // required
                  className={field}
                  value={form.date}
                  onChange={set("date")}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className={label}>Start Time</label>
                <input
                  type="time"
                  required
                  className={field}
                  value={form.time}
                  onChange={set("time")}
                />
              </div>

              <div>
                <label className={label}>District</label>
                <select
                  required
                  className={field}
                  value={form.district}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      district: e.target.value,
                      area: "",
                    }))
                  }
                >
                  <option value="">Select district</option>
                  {districts.map((d) => (
                    <option key={d.district} value={d.district}>
                      {d.district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={label}>Area</label>
                <select
                  required
                  className={field}
                  value={form.area}
                  onChange={set("area")}
                  disabled={!areas.length}
                >
                  <option value="">Select area</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={label}>Full Address</label>
                <input
                  // required
                  // defaultValue={session?.address || ""}
                  className={field}
                  placeholder="House, road, landmark"
                  value={form.address}
                  onChange={set("address")}
                />
              </div>

              <div>
                <label className={label}>Phone Number</label>
                <input
                  type="tel"
                  // required
                  // defaultValue={session?.contact || ""}
                  className={field}
                  placeholder="01XXXXXXXXX"
                  value={form.phone}
                  onChange={set("phone")}
                />
              </div>

              <div>
                <label className={label}>Number of Hours</label>
                <input
                  type="number"
                  min={1}
                  max={72}
                  required
                  className={field}
                  value={form.hours}
                  onChange={set("hours")}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={label}>Notes (optional)</label>
                <textarea
                  rows={3}
                  className={field}
                  placeholder="Anything we should know before the visit?"
                  value={form.notes}
                  onChange={set("notes")}
                />
              </div>
            </div>
          </div>

          {/* ============== RIGHT: SUMMARY + PAY ============== */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl bg-[#e5e9ec] p-6 shadow-md">
              <h2 className="text-xl font-bold text-[#132e49]">
                Order Summary
              </h2>
              <p className="mt-1 text-sm text-gray-600">{title}</p>

              <div className="mt-5 space-y-3 rounded-xl bg-white p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Rate per hour</span>
                  <span className="font-semibold text-[#041320]">
                    {rate} tk
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hours</span>
                  <span className="font-semibold text-[#041320]">{hours}</span>
                </div>
                <div className="border-t border-dashed pt-3">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                    Total Cost
                  </label>
                  <input
                    readOnly
                    value={`${total} tk`}
                    className="w-full rounded-lg bg-[#1479C9]/10 px-3 py-2 text-lg font-bold text-[#1479C9] outline-none"
                  />
                </div>
              </div>

              {features.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-[#041320]"
                    >
                      <FaCircleCheck className="mt-0.5 shrink-0 text-[#5c4db1]" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading || total <= 0}
                className="btn mt-5 w-full border-none bg-[#1479C9] text-white shadow-md hover:bg-[#1065A8] disabled:bg-gray-300 disabled:text-gray-500"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <FaCreditCard />
                )}
                {loading ? "Redirecting..." : `Pay ${total} tk`}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
                <FaLock />
                Secure payment powered by Stripe
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default BookingPage;
