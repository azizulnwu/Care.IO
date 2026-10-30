"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { deleteReview } from "@/action/server/reviewData";
import { FaStar, FaTrash, FaSpinner, FaCalendarDays, FaClock } from "react-icons/fa6";
import { MdOutlineReviews } from "react-icons/md";
import { myReviewDelete } from "@/action/server/review";
import Swal from "sweetalert2";

// "special-care" -> "Special Care"
const formatCategory = (category = "") =>
  category
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const Stars = ({ value = 0 }) => (
  <div className="flex gap-1" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <FaStar
        key={n}
        className={n <= value ? "text-yellow-400" : "text-slate-200"}
      />
    ))}
  </div>
);

const MyReviewPage = ({ reviews = [] }) => {
  const router = useRouter();

  const [loadingId, setLoadingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

 const handleDelete = async (id) => {
  const { isConfirmed } = await Swal.fire({
    title: "Delete this review?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#F34E65",
    confirmButtonText: "Yes, delete it",
  });
  if (!isConfirmed) return;

  setLoadingId(id);
  try {
    const res = await myReviewDelete(id);
    if (!res?.deletedCount) throw new Error(res?.error);
    Swal.fire({ title: "Deleted!", icon: "success", timer: 1200, showConfirmButton: false });
    router.refresh();
  } catch (err) {
    Swal.fire({ title: "Error", text: err.message || "Could not delete the review.", icon: "error" });
  } finally {
    setLoadingId("");
  }
};

  return (
    <main className="bg-slate-50">
      <div className="mx-auto max-w-4xl space-y-5">
        {error && (
          <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}
        {success && (
          <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {reviews.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1479C9]">
              <MdOutlineReviews className="text-3xl" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-800">No Reviews Yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              You have not reviewed any service yet. Your reviews will appear here.
            </p>
          </section>
        ) : (
          reviews.map((item) => {
            const id = String(item._id);
            const isDeleting = loadingId === id;

            return (
              <article
                key={id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-rose-50 px-5 py-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1479C9] text-xl text-white">
                      <MdOutlineReviews />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#1479C9]">
                        Service
                      </p>
                      <h2 className="text-lg font-bold text-slate-800">
                        {formatCategory(item.serviceCategory) || "Care Service"}
                      </h2>
                    </div>
                  </div>

                  <Stars value={Number(item.rating)} />
                </div>

                <div className="space-y-4 p-5">
                  <p className="break-words text-sm leading-6 text-slate-700">
                    {item.review}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <FaCalendarDays className="text-[#1479C9]" />
                        {item.reviewDate}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FaClock className="text-[#1479C9]" />
                        {item.reviewTimeAt}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={Boolean(loadingId)}
                      onClick={() => handleDelete(id)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F34E65] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#db3e54] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeleting ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </main>
  );
};

export default MyReviewPage;