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
    <section className="bg-[#f7f9fb] px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* SECTION HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-[#1479C9]">
            <FaHeart />
            <span>Our Client Reviews</span>
          </div>

          <h2 className="text-3xl font-bold text-[#132e49] md:text-4xl">
            What Families Say About Us
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#041320] md:text-base">
            Discover how Care.io helps families find reliable, compassionate,
            and trusted care services for their loved ones.
          </p>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* TOP COLOR PATTERN */}
              <div className="absolute left-0 top-0 flex h-1.5 w-full">
                <div className="w-1/2 bg-[#1479C9]" />
                <div className="w-1/4 bg-[#5DA83C]" />
                <div className="w-1/4 bg-[#7C58C8]" />
              </div>

              <div className="flex flex-1 flex-col px-6 pb-6 pt-8">
                {/* QUOTE ICON */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1479C9]/10 text-[#1479C9]">
                    <FaQuoteLeft className="text-xl" />
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        className={
                          index < testimonial.rating
                            ? "text-[#F5B301]"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* MESSAGE */}
                <p className="flex-1 text-sm leading-7 text-[#041320]">
                  “{testimonial.message}”
                </p>

                {/* USER INFORMATION */}
                <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1479C9] font-bold text-white">
                    {testimonial.initials ||
                      testimonial.name
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-bold text-[#132e49]">
                      {testimonial.name}
                    </h3>

                    <p className="text-xs text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>

                  <FaShieldHeart className="ml-auto text-xl text-[#5DA83C]" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* TRUST MESSAGE */}
        <div className="mt-12 rounded-2xl bg-[#e5e9ec] px-6 py-8 text-center shadow-sm">
          <FaHeart className="mx-auto mb-3 text-2xl text-[#1479C9]" />

          <h3 className="text-xl font-bold text-[#132e49]">
            Care That Your Family Can Trust
          </h3>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#041320]">
            Your comfort, safety, and peace of mind are at the heart of
            everything we do.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;