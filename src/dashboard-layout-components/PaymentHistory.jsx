"use client";

import {
  FaCircleCheck,
  FaClockRotateLeft,
  FaXmark,
  FaReceipt,
  FaCreditCard,
  FaLocationDot,
} from "react-icons/fa6";

// "child-care" -> "Child Care"
const formatCategory = (value = "") =>
  value
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// Stripe amounts are in cents: 10000 -> $100.00
const formatMoney = (cents, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(Number(cents || 0) / 100);

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const shortToken = (t = "") =>
  t.length > 18 ? `${t.slice(0, 12)}...${t.slice(-6)}` : t;

const statusStyles = {
  paid: "bg-[#5DA83C]/12 text-[#2f6b19] ring-[#5DA83C]/30",
  unpaid: "bg-amber-50 text-amber-800 ring-amber-200",
  failed: "bg-rose-50 text-rose-700 ring-rose-200",
};

/* Presentation-only class tokens */
const surface =
  "rounded-2xl border border-[#132e49]/10 bg-white shadow-[0_1px_2px_rgba(19,46,73,0.04),0_8px_24px_-12px_rgba(19,46,73,0.12)]";
const th =
  "sticky top-0 z-10 h-10 whitespace-nowrap bg-[#f4f7fa] px-4 text-left text-xs font-semibold tracking-wide text-[#132e49]/70 shadow-[inset_0_-1px_0_rgba(19,46,73,0.1)]";
const td = "px-4 align-middle";

// Fixed box: header (40px) + 7 rows (52px each) + scrollbar + border = ~420px
const scrollBox =
  "h-[420px] overflow-auto " +
  "[scrollbar-width:auto] [scrollbar-color:#1479C9_#e8eef4] " +
  "[&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar]:w-3 " +
  "[&::-webkit-scrollbar-track]:bg-[#e8eef4] " +
  "[&::-webkit-scrollbar-thumb]:rounded-full " +
  "[&::-webkit-scrollbar-thumb]:bg-[#1479C9]/60 " +
  "hover:[&::-webkit-scrollbar-thumb]:bg-[#1479C9]";

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
      statusStyles[status] || "bg-slate-100 text-slate-600 ring-slate-200"
    }`}
  >
    <span aria-hidden="true" className="flex">
      {status === "paid" ? (
        <FaCircleCheck />
      ) : status === "unpaid" ? (
        <FaClockRotateLeft />
      ) : (
        <FaXmark />
      )}
    </span>
    {status || "unknown"}
  </span>
);

const PaymentHistory = ({ payments = [] }) => {
  const totalPaid = payments
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + Number(p.paymentAmount || 0), 0);

  if (payments.length === 0) {
    return (
      <section className={`${surface} mx-auto max-w-xl px-6 py-14 text-center`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1479C9]/10 text-[#1479C9]">
          <FaReceipt aria-hidden="true" className="text-xl" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-[#132e49]">
          No Payments Yet
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#132e49]/70">
          Your payment history will appear here after you pay for a service.
        </p>
      </section>
    );
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-4 rounded-2xl bg-[#132e49] p-5 shadow-[0_8px_24px_-12px_rgba(19,46,73,0.5)] sm:p-6">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl text-white"
        >
          <FaCreditCard />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white/70">
            Total Paid ({payments.length} payment
            {payments.length > 1 ? "s" : ""})
          </p>
          <p className="mt-0.5 truncate text-3xl font-bold tabular-nums tracking-tight text-white">
            {formatMoney(totalPaid, payments[0]?.paymentCurrency)}
          </p>
        </div>
      </div>

      {/* Desktop table: shows 7 rows, vertical scroll for the rest,
          horizontal scrollbar always visible at the bottom of the box */}
      <div className={`${surface} hidden overflow-hidden md:block`}>
        <div
          role="region"
          aria-label="Payment history table"
          tabIndex={0}
          className={`${scrollBox} outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#1479C9]/20`}
        >
          <table className="min-w-full text-sm">
            <caption className="sr-only">
              Payment history with service, area, method, transaction, country,
              date, amount and status
            </caption>
            <thead>
              <tr>
                <th scope="col" className={th}>Service</th>
                <th scope="col" className={th}>Area</th>
                <th scope="col" className={th}>Method</th>
                <th scope="col" className={th}>Transaction</th>
                <th scope="col" className={th}>Payment Country</th>
                <th scope="col" className={th}>Date</th>
                <th scope="col" className={`${th} text-right`}>Amount</th>
                <th scope="col" className={th}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132e49]/8">
              {payments.map((p) => (
                <tr
                  key={p._id}
                  className="h-[52px] transition-colors duration-150 hover:bg-[#f4f7fa]/70 motion-reduce:transition-none"
                >
                  <td className={`${td} whitespace-nowrap font-semibold text-[#041320]`}>
                    {formatCategory(p.purchaseService) || "Care Service"}
                  </td>
                  <td className={`${td} whitespace-nowrap text-[#132e49]/80`}>
                    {p.purchaseServiceArea || "—"}
                  </td>
                  <td className={`${td} capitalize text-[#132e49]/80`}>
                    {p.paymentMethod || "—"}
                  </td>
                  <td
                    className={`${td} whitespace-nowrap font-mono text-xs text-[#132e49]/65`}
                    title={p.paymentToken}
                  >
                    {shortToken(p.paymentToken)}
                  </td>
                  <td className={`${td} whitespace-nowrap text-[#132e49]/80`}>
                    {p.paymentCountry || "—"}
                  </td>
                  <td className={`${td} whitespace-nowrap tabular-nums text-[#132e49]/80`}>
                    {formatDate(p.createAt)}
                  </td>
                  <td className={`${td} whitespace-nowrap text-right font-bold tabular-nums text-[#041320]`}>
                    {formatMoney(p.paymentAmount, p.paymentCurrency)}
                  </td>
                  <td className={td}>
                    <StatusBadge status={p.paymentStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {payments.map((p) => (
          <article key={p._id} className={`${surface} p-5`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-bold text-[#041320]">
                  {formatCategory(p.purchaseService) || "Care Service"}
                </h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#132e49]/70">
                  <FaLocationDot aria-hidden="true" className="text-[#1479C9]" />
                  {p.purchaseServiceArea || "—"}
                </p>
              </div>
              <StatusBadge status={p.paymentStatus} />
            </div>

            <div className="mt-4 flex items-end justify-between gap-4 border-t border-[#132e49]/10 pt-4">
              <div className="min-w-0">
                <p className="text-xs text-[#132e49]/70">
                  {formatDate(p.createAt)} •{" "}
                  <span className="capitalize">{p.paymentMethod}</span>
                </p>
                <p className="mt-1 break-all font-mono text-xs text-[#132e49]/50">
                  {shortToken(p.paymentToken)}
                </p>
              </div>
              <p className="shrink-0 text-xl font-bold tabular-nums text-[#041320]">
                {formatMoney(p.paymentAmount, p.paymentCurrency)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;