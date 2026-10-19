"use client";

import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircleCheck,
  FaHeart,
  FaShieldHeart,
  FaClock,
  FaUserShield,
} from "react-icons/fa6";
import { GiLovers } from "react-icons/gi";

const ServiceDetailsPage = ({ serviceDetailsInfo}) => {
  const {
    _id,
    title,
    description,
    category,
    features = [],
    isActive,
  } =serviceDetailsInfo;
  
  // console.log("ServiceDetailsPage",serviceDetailsInfo)
  return (
    <main className="min-h-screen bg-[#f7f9fb] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">

        {/* ================= BACK BUTTON ================= */}
        <Link
          href="/service-page"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#1479C9] transition-colors hover:text-[#1065A8]"
        >
          <FaArrowLeft />
          Back to Services
        </Link>

        {/* ================= MAIN DETAILS CARD ================= */}
        <div className="overflow-hidden rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] shadow-lg">

          {/* ================= HEADER ================= */}
          <div className="relative bg-[#e5e9ec] px-6 py-8 md:px-10 md:py-10">

            {/* Decorative top pattern */}
            {/* <div className="absolute left-0 top-0 flex h-1.5 w-full">
              <div className="w-1/2 bg-[#1479C9]" />
              <div className="w-1/4 bg-[#5DA83C]" />
              <div className="w-1/4 bg-[#7C58C8]" />
            </div> */}

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              {/* LEFT SIDE */}
              <div className="flex items-center gap-5">

                {/* Service Icon */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#1479C9]/10 text-[#1479C9]">
                  <GiLovers className="text-5xl" />
                </div>

                {/* Title */}
                <div>
                  {/* Category */}
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#1479C9]">
                    <FaHeart className="text-[#1479C9]" />

                    <span className="capitalize">
                      {category?.replace("-", " ")}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold text-[#132e49] md:text-4xl">
                    {title}
                  </h1>
                </div>
              </div>

              {/* STATUS */}
              <div
                className={`badge gap-2 border-none px-4 py-4 text-xs font-semibold ${
                  isActive
                    ? "bg-[#5DA83C]/10 text-[#4ea12b]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isActive ? "bg-[#4ab41c]" : "bg-gray-500"
                  }`}
                />

                {isActive ? "Available" : "Unavailable"}
              </div>
            </div>
          </div>

          {/* ================= BODY ================= */}
          <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-3">

            {/* ================= LEFT CONTENT ================= */}
            <div className="lg:col-span-2">

              {/* About Service */}
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <FaShieldHeart className="text-xl text-[#5DA83C]" />

                  <h2 className="text-xl font-bold text-[#041320]">
                    About This Service
                  </h2>
                </div>

                <p className="text-base leading-8 text-[#041320]">
                  {description}
                </p>
              </section>

              {/* What We Offer */}
              <section className="mt-8">
                <div className="mb-5 flex items-center gap-2">
                  <FaShieldHeart className="text-xl text-[#5DA83C]" />

                  <h2 className="text-xl font-bold text-[#041320]">
                    What We Offer
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-xl bg-[#e5e9ec] px-4 py-4"
                    >
                      <FaCircleCheck className="mt-0.5 shrink-0 text-lg text-[#5c4db1]" />

                      <span className="text-sm font-medium leading-6 text-[#041320]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Choose Us */}
              <section className="mt-8">
                <div className="mb-5 flex items-center gap-2">
                  <FaUserShield className="text-xl text-[#1479C9]" />

                  <h2 className="text-xl font-bold text-[#041320]">
                    Why Choose Care.io?
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">

                  <div className="rounded-xl bg-[#e5e9ec] p-4">
                    <FaUserShield className="mb-3 text-2xl text-[#1479C9]" />

                    <h3 className="text-sm font-bold text-[#041320]">
                      Trusted Care
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      Responsible and dependable care support for your loved
                      ones.
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#e5e9ec] p-4">
                    <FaHeart className="mb-3 text-2xl text-[#1479C9]" />

                    <h3 className="text-sm font-bold text-[#041320]">
                      Compassionate
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      We focus on comfort, dignity, companionship, and respect.
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#e5e9ec] p-4">
                    <FaClock className="mb-3 text-2xl text-[#1479C9]" />

                    <h3 className="text-sm font-bold text-[#041320]">
                      Flexible Support
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      Care options designed around your family's routine.
                    </p>
                  </div>

                </div>
              </section>
            </div>

            {/* ================= BOOKING CARD ================= */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 rounded-2xl bg-[#e5e9ec] p-6 shadow-md">

                <div className="mb-5">
                  <h2 className="text-xl font-bold text-[#132e49]">
                    Need This Service?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Book our {title.toLowerCase()} service and let us help
                    your family with trusted care support.
                  </p>
                </div>

                {/* Availability */}
                <div className="mb-5 flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      isActive ? "bg-[#4ab41c]" : "bg-gray-400"
                    }`}
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Service Status
                    </p>

                    <p
                      className={`text-sm font-semibold ${
                        isActive ? "text-[#4ea12b]" : "text-gray-500"
                      }`}
                    >
                      {isActive ? "Currently Available" : "Currently Unavailable"}
                    </p>
                  </div>
                </div>

                {/* Book Button */}
                <Link
                  href={`/booking/${_id}`}
                  className={`btn w-full border-none text-white shadow-md transition-all ${
                    isActive
                      ? "bg-[#1479C9] hover:bg-[#1065A8]"
                      : "pointer-events-none bg-gray-300"
                  }`}
                >
                  Book Service
                  <FaArrowRight className="transition-transform hover:translate-x-1" />
                </Link>

                <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                  Book your preferred care service and provide the details
                  needed to arrange support.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailsPage;