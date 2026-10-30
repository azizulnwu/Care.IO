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
  return (
    <section
      aria-labelledby="service-overview-title"
      className="bg-[#f5f9ff] px-4 py-16 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* ================= SECTION HEADER ================= */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1479C9]/15 bg-white px-4 py-1.5 text-sm font-semibold text-[#1479C9] shadow-sm">
            <FaHeart className="text-xs text-[#F34E65]" aria-hidden="true" />
            <span>Our Care Services</span>
          </div>

          <h2
            id="service-overview-title"
            className="text-balance text-3xl font-extrabold tracking-tight text-[#132e49] md:text-4xl"
          >
            Trusted Care for Every Family
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Care.io provides reliable and compassionate care solutions for
            children, elderly family members, individuals, and families who
            need dependable support in their daily lives.
          </p>
        </div>

        {/* ================= SERVICE GRID ================= */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {services[0].map((service) => {
            const Icon = iconMap[service.icon] || FaHeart;

            return (
              <article
                key={service._id || service.category}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition duration-300 motion-reduce:transition-none ${
                  service.isActive
                    ? "border-slate-200 shadow-[0_1px_2px_rgba(19,46,73,0.06),0_8px_24px_-12px_rgba(19,46,73,0.12)] hover:-translate-y-1 hover:border-[#1479C9]/40 hover:shadow-[0_2px_4px_rgba(19,46,73,0.06),0_24px_40px_-20px_rgba(20,121,201,0.35)] motion-reduce:hover:translate-y-0"
                    : "border-slate-200 opacity-90"
                }`}
              >
                {/* Brand accent */}
                <div className="flex h-1 w-full" aria-hidden="true">
                  <div className="w-2/3 bg-[#1479C9]" />
                  <div className="w-1/3 bg-[#F34E65]" />
                </div>

                {/* ================= CARD HEADER ================= */}
                <div className="px-6 pt-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* Icon */}
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-colors duration-300 motion-reduce:transition-none ${
                        service.isActive
                          ? "bg-[#eaf4fc] text-[#1479C9] ring-[#1479C9]/15 group-hover:bg-[#1479C9] group-hover:text-white"
                          : "bg-slate-100 text-slate-400 ring-slate-200"
                      }`}
                    >
                      <Icon className="text-2xl" aria-hidden="true" />
                    </div>

                    {/* Status */}
                    <div
                      className={`badge h-auto gap-2 border-none px-3 py-1.5 text-xs font-semibold ${
                        service.isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          service.isActive ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />

                      {service.isActive ? "Available" : "Unavailable"}
                    </div>
                  </div>

                  {/* Category */}
                  <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[#1479C9]">
                    <FaHeart
                      className="text-[11px] text-[#F34E65]"
                      aria-hidden="true"
                    />
                    <span className="capitalize">
                      {service.category?.replace("-", " ")}
                    </span>
                  </p>

                  {/* Title */}
                  <h3 className="mt-1.5 break-words text-xl font-bold leading-snug tracking-tight text-[#132e49]">
                    {service.title}
                  </h3>
                </div>

                {/* ================= CARD BODY ================= */}
                <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
                  {/* Description */}
                  <p className="text-[0.9375rem] leading-7 text-slate-600">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <h4 className="text-sm font-semibold text-[#132e49]">
                      Key Services
                    </h4>

                    <ul className="mt-3 space-y-2.5">
                      {service.features?.slice(0, 3).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                        >
                          <FaCircleCheck
                            className="mt-1 h-4 w-4 shrink-0 text-[#1479C9]"
                            aria-hidden="true"
                          />

                          <span className="min-w-0 break-words font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* CTA */}
                  <div className="mt-6">
                    <Link
                      href={`/service-page/${service._id}`}
                      aria-disabled={!service.isActive}
                      tabIndex={!service.isActive ? -1 : undefined}
                      className={`btn min-h-12 w-full gap-2.5 rounded-xl border-none font-semibold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1479C9] motion-reduce:transition-none ${
                        service.isActive
                          ? "bg-[#1479C9] text-white hover:bg-[#1065A8]"
                          : "pointer-events-none bg-slate-100 text-slate-400 shadow-none"
                      }`}
                    >
                      Explore Service
                      <FaArrowRight
                        className="text-xs transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;