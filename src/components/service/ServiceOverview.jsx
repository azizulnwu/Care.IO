"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaBaby,
  FaCalendarDays,
  FaCircleCheck,
  FaHouse,
  FaHeart,
  FaUser,
  FaWheelchair,
} from "react-icons/fa6";
import { GiLovers } from "react-icons/gi";

const iconMap = {
  baby: FaBaby,
  "heart-handshake": GiLovers,
  "user-round": FaUser,
  "house-heart": FaHouse,
  accessibility: FaWheelchair,
  "calendar-clock": FaCalendarDays,
};

const ServiceOverview = ({ services }) => {
    // console.log("services",services)
  return (
    <section className="bg-[#f7f9fb] px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* ================= SECTION HEADER ================= */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-[#1479C9]">
            <FaHeart className="text-[#1479C9]" />

            <span>Our Care Services</span>
          </div>

          <h2 className="text-3xl font-bold text-[#132e49] md:text-4xl">
            Trusted Care for Every Family
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#041320] md:text-base">
            Care.io provides reliable and compassionate care solutions for
            children, elderly family members, individuals, and families who
            need dependable support in their daily lives.
          </p>
        </div>

        {/* ================= SERVICE GRID ================= */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {services[0].map((service) => {
            const Icon = iconMap[service.icon] || FaHeart;

            return (
              <div
                key={service._id || service.category}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* ================= CARD HEADER ================= */}
                <div className="relative bg-[#e5e9ec] px-6 pb-5 pt-7">

                  {/* Top Color Pattern */}
                  {/* <div className="absolute left-0 top-0 flex h-1.5 w-full">
                    <div className="w-1/2 bg-[#1479C9]" />
                    <div className="w-1/4 bg-[#5DA83C]" />
                    <div className="w-1/4 bg-[#7C58C8]" />
                  </div> */}

                  <div className="flex items-start justify-between gap-4">

                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1479C9]/10 text-[#1479C9] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="text-3xl" />
                    </div>

                    {/* Status */}
                    <div
                      className={`badge gap-1 border-none px-3 py-3 text-xs font-semibold ${
                        service.isActive
                          ? "bg-[#5DA83C]/10 text-[#4ea12b]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          service.isActive
                            ? "bg-[#4ab41c]"
                            : "bg-gray-500"
                        }`}
                      />

                      {service.isActive ? "Available" : "Unavailable"}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#1479C9]">
                    <FaHeart className="text-[#1479C9]" />

                    <span className="capitalize">
                      {service.category?.replace("-", " ")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-xl font-bold text-[#132e49]">
                    {service.title}
                  </h3>
                </div>

                {/* ================= CARD BODY ================= */}
                <div className="flex flex-1 flex-col px-6 py-5">

                  {/* Description */}
                  <p className="text-sm leading-7 text-[#041320]">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mt-4">

                    <h4 className="mb-3 text-sm font-semibold text-[#041320]">
                      Key Services
                    </h4>

                    <ul className="space-y-2">
                      {service.features?.slice(0, 3).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <FaCircleCheck className="mt-0.5 shrink-0 text-[#5c4db1]" />

                          <span className="font-medium text-[#041320]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* CTA */}
                  <div className="mt-5 border-t border-gray-200 pt-4">
                    <Link
                      href={`/service-page/${service._id}`}
                      className={`btn w-full border-none text-white shadow-md transition-all ${
                        service.isActive
                          ? "bg-[#1479C9] hover:bg-[#1065A8]"
                          : "pointer-events-none bg-gray-300"
                      }`}
                    >
                      Explore Service

                      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM CTA ================= */}
        {/* <div className="mt-12 text-center">

          <p className="mb-4 text-sm text-gray-600">
            Need help choosing the right care service for your family?
          </p>

          <Link
            href="/services"
            className="btn border-none bg-[#132e49] px-6 text-white shadow-md hover:bg-[#0b2237]"
          >
            View All Services
            <FaArrowRight />
          </Link>
        </div> */}

      </div>
    </section>
  );
};

export default ServiceOverview;