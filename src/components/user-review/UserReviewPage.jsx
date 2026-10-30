"use client";

import { userReview } from "@/action/server/review";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SERVICES = [
  {
    title: "Trusted Child Care",
    category: "child-care",
  },
  {
    title: "Elder Care",
    category: "elder-care",
  },
  {
    title: "Personal Care Assistance",
    category: "personal-care",
  },
  {
    title: "Home Care Support",
    category: "home-care",
  },
  {
    title: "Special Needs Care",
    category: "special-care",
  },
  {
    title: "Flexible Care Plans",
    category: "care-plans",
  },
];

export default function UserReviewPage() {
  const router = useRouter();

  const [serviceCategory, setServiceCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const selectedService = SERVICES.find(
    (service) => service.category === serviceCategory,
  );

  async function handleSubmit(event) {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!serviceCategory) {
      setError("Please select a service.");
      return;
    }

    if (rating === 0) {
      setError("Please give a rating.");
      return;
    }

    if (review.trim().length < 10) {
      setError("Review must contain at least 10 characters.");
      return;
    }

    reviewSendToServer()
  }

  const reviewSendToServer = async () => {
    try {
      setLoading(true);
      // console.log(serviceCategory,rating,review)
      const response = await userReview(serviceCategory, rating, review);
      console.log(response);
      if (!response) {
        throw new Error("Unable to submit review.");
      }

      if (response.success === true) {
        console.log("user revier");
        setSuccess("Your review was submitted successfully.");
        setServiceCategory("");
        setRating(0);
        setReview("");
        // router.push("/dashboard");

      }
    } catch (submitError) {
      setError(submitError.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FBFF] px-4 py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="relative bg-[#F7FBFF] px-6 pb-8 pt-10 text-center">
            <div className="absolute left-0 top-0 flex h-1.5 w-full">
              <div className="w-1/2 bg-[#1479C9]" />
              <div className="w-1/4 bg-[#5DA83C]" />
              <div className="w-1/4 bg-[#7C58C8]" />
            </div>

            <h1 className="text-3xl font-extrabold text-[#17324D]">
              Share Your Experience
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Give us your honest feedback about our care service.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-10">
            {error && (
              <div className="rounded-lg bg-red-100 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg bg-green-100 p-3 text-sm text-green-700">
                {success}
              </div>
            )}

            <div>
              <label
                htmlFor="serviceCategory"
                className="mb-2 block text-sm font-semibold text-[#17324D]"
              >
                Select Service
              </label>

              <select
                id="serviceCategory"
                value={serviceCategory}
                onChange={(event) => setServiceCategory(event.target.value)}
                className="select select-bordered w-full border-gray-200 bg-white focus:border-[#1479C9] focus:outline-none"
                required
              >
                <option value="">Choose a service</option>

                {SERVICES.map((service) => (
                  <option key={service.category} value={service.category}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-[#17324D]">
                Your Rating
              </p>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`${star} star rating`}
                    className={`text-4xl transition ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <p className="mt-1 text-xs text-gray-400">
                {rating > 0 ? `${rating} out of 5 stars` : "Select your rating"}
              </p>
            </div>

            <div>
              <label
                htmlFor="review"
                className="mb-2 block text-sm font-semibold text-[#17324D]"
              >
                Your Review
              </label>

              <textarea
                id="review"
                value={review}
                onChange={(event) => setReview(event.target.value)}
                rows="6"
                minLength={10}
                maxLength={500}
                placeholder="Write your experience here..."
                className="textarea textarea-bordered w-full resize-none border-gray-200 bg-white focus:border-[#1479C9] focus:outline-none"
                required
              />

              <p className="mt-1 text-right text-xs text-gray-400">
                {review.length}/500
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full border-none bg-[#1479C9] text-white hover:bg-[#1065A8]"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}