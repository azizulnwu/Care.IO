"use client";

import {
  FaQuoteLeft,
  FaStar,
  FaHeart,
  FaShieldHeart,
} from "react-icons/fa6";

const defaultTestimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Parent",
    message:
      "Care.io made finding a trustworthy caregiver for my child much easier. The service was reliable, caring, and professional.",
    rating: 5,
    initials: "SA",
  },
  {
    id: 2,
    name: "Rahim Hasan",
    role: "Family Member",
    message:
      "The elder care service gave our family peace of mind. The caregiver was respectful, friendly, and very responsible.",
    rating: 5,
    initials: "RH",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Service User",
    message:
      "I appreciate the compassionate support and flexible care arrangements. Care.io truly understands the needs of families.",
    rating: 4,
    initials: "NJ",
  },
];

const Testimonials = ({ testimonials = defaultTestimonials }) => {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="bg-[#f5f9ff] px-4 py-16 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* SECTION HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1479C9]/15 bg-white px-4 py-1.5 text-sm font-semibold text-[#1479C9] shadow-sm">
            <FaHeart className="text-xs text-[#F34E65]" aria-hidden="true" />
            <span>Our Client Reviews</span>
          </div>

          <h2
            id="testimonials-title"
            className="text-balance text-3xl font-extrabold tracking-tight text-[#132e49] md:text-4xl"
          >
            What Families Say About Us
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Discover how Care.io helps families find reliable, compassionate,
            and trusted care services for their loved ones.
          </p>
        </div>

        {/* TESTIMONIAL CARDS */}
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id} className="flex">
              <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(19,46,73,0.06),0_8px_24px_-12px_rgba(19,46,73,0.12)] transition duration-300 hover:-translate-y-1 hover:border-[#1479C9]/40 hover:shadow-[0_2px_4px_rgba(19,46,73,0.06),0_24px_40px_-20px_rgba(20,121,201,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                {/* BRAND ACCENT */}
                <div className="flex h-1 w-full" aria-hidden="true">
                  <div className="w-2/3 bg-[#1479C9]" />
                  <div className="w-1/3 bg-[#F34E65]" />
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
                  {/* QUOTE ICON + RATING */}
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf4fc] text-[#1479C9] ring-1 ring-inset ring-[#1479C9]/15">
                      <FaQuoteLeft className="text-lg" aria-hidden="true" />
                    </div>

                    <div
                      role="img"
                      aria-label={`Rated ${testimonial.rating} out of 5`}
                      className="flex gap-1"
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar
                          key={index}
                          aria-hidden="true"
                          className={`text-sm ${
                            index < testimonial.rating
                              ? "text-[#F5B301]"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <blockquote className="flex-1 text-[0.9375rem] leading-7 text-slate-700">
                    <p>“{testimonial.message}”</p>
                  </blockquote>

                  {/* USER INFORMATION */}
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <div
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1479C9] text-sm font-bold text-white"
                    >
                      {testimonial.initials ||
                        testimonial.name
                          ?.split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-[#132e49]">
                        {testimonial.name}
                      </h3>

                      <p className="truncate text-xs text-slate-500">
                        {testimonial.role}
                      </p>
                    </div>

                    <FaShieldHeart
                      className="ml-auto shrink-0 text-xl text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* TRUST MESSAGE */}
        <div className="mt-12 flex flex-col items-center rounded-2xl border border-[#1479C9]/15 bg-[#eaf4fc] px-6 py-9 text-center lg:mt-14">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#1479C9] shadow-sm ring-1 ring-inset ring-[#1479C9]/15">
            <FaHeart className="text-xl" aria-hidden="true" />
          </div>

          <h3 className="mt-4 text-xl font-bold tracking-tight text-[#132e49] sm:text-2xl">
            Care That Your Family Can Trust
          </h3>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Your comfort, safety, and peace of mind are at the heart of
            everything we do.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;