"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCircleCheck,
  FaLock,
  FaCreditCard,
  FaShieldHeart,
  FaChevronDown,
  FaTriangleExclamation,
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
    userAddress: `${session?.address || ""}`,
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

  /* ------------------------------------------------------------------ */
  /* Presentation only: class tokens                                     */
  /* ------------------------------------------------------------------ */
  const field =
    "block w-full min-h-11 rounded-xl border border-[#132e49]/15 bg-white px-4 py-2.5 text-sm text-[#041320] shadow-sm placeholder:text-[#132e49]/40 outline-none transition-[border-color,box-shadow] duration-150 motion-reduce:transition-none hover:border-[#132e49]/30 focus-visible:border-[#1479C9] focus-visible:ring-4 focus-visible:ring-[#1479C9]/15 disabled:cursor-not-allowed disabled:border-[#132e49]/10 disabled:bg-[#f1f4f7] disabled:text-[#132e49]/40 disabled:shadow-none";
  const select = `${field} appearance-none pr-10`;
  const label = "mb-1.5 block text-sm font-medium text-[#132e49]";
  const legend = "flex items-center gap-3 text-base font-semibold text-[#041320]";
  const req = (
    <span aria-hidden="true" className="ml-0.5 text-[#c0392b]">
      *
    </span>
  );

  return (
    <main className="min-h-screen bg-[#f4f7fa] px-4 py-8 sm:py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/service-page/${_id}`}
          className="group mb-8 inline-flex items-center gap-2 rounded-lg py-1 text-sm font-medium text-[#1479C9] outline-none transition-colors hover:text-[#0f5f9f] focus-visible:ring-4 focus-visible:ring-[#1479C9]/20"
        >
          <FaArrowLeft
            aria-hidden="true"
            className="text-xs transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transition-none"
          />
          Back to service
        </Link>

        <header className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-sm font-medium capitalize text-[#1479C9]">
            {category?.replace("-", " ")}
          </p>
          <h1 className="mt-1 text-balance text-3xl font-bold tracking-tight text-[#132e49] md:text-4xl">
            Book {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#132e49]/70 sm:text-base">
            Choose a time and place, then pay securely to confirm your visit.
          </p>
        </header>

        <form
          onSubmit={handlePay}
          className="grid items-start gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {/* ============== LEFT: BOOKING DETAILS ============== */}
          <div className="rounded-2xl border border-[#132e49]/10 bg-white p-5 shadow-[0_1px_2px_rgba(19,46,73,0.04),0_8px_24px_-12px_rgba(19,46,73,0.12)] sm:p-8 lg:col-span-2">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5DA83C]/12 text-[#5DA83C]">
                <FaShieldHeart aria-hidden="true" className="text-lg" />
              </span>
              <h2 className="text-xl font-bold text-[#041320]">
                Booking details
              </h2>
            </div>

            <div className="space-y-10">
              {/* ---- Schedule ---- */}
              <fieldset>
                <legend className={`${legend} mb-5 w-full`}>
                  <span>Schedule</span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-[#132e49]/10"
                  />
                </legend>
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label htmlFor="booking-date" className={label}>
                      Date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      // required
                      className={field}
                      value={form.date}
                      onChange={set("date")}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-time" className={label}>
                      Start time {req}
                    </label>
                    <input
                      id="booking-time"
                      type="time"
                      required
                      className={field}
                      value={form.time}
                      onChange={set("time")}
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-hours" className={label}>
                      Number of hours {req}
                    </label>
                    <input
                      id="booking-hours"
                      type="number"
                      min={1}
                      max={72}
                      required
                      inputMode="numeric"
                      className={`${field} tabular-nums`}
                      value={form.hours}
                      onChange={set("hours")}
                    />
                  </div>
                </div>
              </fieldset>

              {/* ---- Location ---- */}
              <fieldset>
                <legend className={`${legend} mb-5 w-full`}>
                  <span>Location</span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-[#132e49]/10"
                  />
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-district" className={label}>
                      District {req}
                    </label>
                    <div className="relative">
                      <select
                        id="booking-district"
                        required
                        className={select}
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
                      <FaChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#132e49]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-area" className={label}>
                      Area {req}
                    </label>
                    <div className="relative">
                      <select
                        id="booking-area"
                        required
                        className={select}
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
                      <FaChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#132e49]/50"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="booking-userAddress" className={label}>
                      User address
                    </label>
                    <input
                      id="booking-userAddress"
                      // required
                      // defaultValue={session?.address || ""}
                      autoComplete="street-address"
                      className={field}
                      placeholder="House, road, landmark"
                      value={form.userAddress}
                      onChange={set("userAddress")}
                    />
                  </div>
                </div>
              </fieldset>

              {/* ---- Contact ---- */}
              <fieldset>
                <legend className={`${legend} mb-5 w-full`}>
                  <span>Contact and notes</span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-[#132e49]/10"
                  />
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-phone" className={label}>
                      Phone number
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      // required
                      // defaultValue={session?.contact || ""}
                      autoComplete="tel"
                      className={`${field} tabular-nums`}
                      placeholder="01XXXXXXXXX"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="booking-notes" className={label}>
                      Notes{" "}
                      <span className="font-normal text-[#132e49]/50">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={4}
                      className={`${field} resize-y`}
                      placeholder="Anything we should know before the visit?"
                      value={form.notes}
                      onChange={set("notes")}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          {/* ============== RIGHT: SUMMARY + PAY ============== */}
          <aside className="lg:col-span-1" aria-label="Order summary">
            <div className="overflow-hidden rounded-2xl border border-[#132e49]/10 bg-white shadow-[0_1px_2px_rgba(19,46,73,0.04),0_8px_24px_-12px_rgba(19,46,73,0.12)] lg:sticky lg:top-6">
              <div className="p-5 sm:p-6">
                <h2 className="text-lg font-bold text-[#132e49]">
                  Order summary
                </h2>
                <p className="mt-1 text-sm text-[#132e49]/70">{title}</p>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-[#132e49]/65">Rate per hour</dt>
                    <dd className="font-semibold tabular-nums text-[#041320]">
                      {rate} tk
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-[#132e49]/65">Hours</dt>
                    <dd className="font-semibold tabular-nums text-[#041320]">
                      {hours}
                    </dd>
                  </div>
                </dl>

                {features.length > 0 && (
                  <ul className="mt-5 space-y-2.5 border-t border-[#132e49]/10 pt-5">
                    {features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm leading-snug text-[#132e49]"
                      >
                        <FaCircleCheck
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-[#5DA83C]"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Total + pay: the one high-contrast block on the page */}
              <div className="bg-[#132e49] p-5 sm:p-6">
                <label
                  htmlFor="booking-total"
                  className="block text-sm font-medium text-white/70"
                >
                  Total cost
                </label>
                <input
                  id="booking-total"
                  readOnly
                  value={`${total} tk`}
                  aria-live="polite"
                  className="mt-1 w-full cursor-default bg-transparent text-4xl font-bold tabular-nums tracking-tight text-white outline-none"
                />

                {error && (
                  <div
                    role="alert"
                    className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-300/40 bg-red-50 px-3.5 py-3 text-sm leading-snug text-red-800"
                  >
                    <FaTriangleExclamation
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-red-600"
                    />
                    <p>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || total <= 0}
                  aria-busy={loading}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1d8fe8] px-5 text-base font-semibold text-white shadow-lg shadow-black/20 outline-none transition-colors duration-150 motion-reduce:transition-none hover:bg-[#2a9bf2] focus-visible:ring-4 focus-visible:ring-white/40 active:bg-[#1479C9] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/50 disabled:shadow-none"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <FaCreditCard aria-hidden="true" />
                  )}
                  {loading ? "Redirecting..." : `Pay ${total} tk`}
                </button>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-white/60">
                  <FaLock aria-hidden="true" />
                  Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default BookingPage;