"use client";

import Link from "next/link";
import {
  FaBaby,
  FaArrowRight,
  FaUser,
  FaHouse,
  FaCircleCheck,
  FaWheelchair,
  FaCalendarDays,
  FaHeart,
} from "react-icons/fa6";
import { GiLovers } from "react-icons/gi";

const ServicesPageCard = ({ service }) => {
  const iconMap = {
    baby: FaBaby,
    "heart-handshake": GiLovers,
    "user-round": FaUser,
    "house-heart": FaHouse,
    accessibility: FaWheelchair,
    "calendar-clock": FaCalendarDays,
  };

  const {
    _id,
    title,
    description,
    category,
    icon,
    features = [],
    isActive,
  } = service;

  const Icon = iconMap[service.icon] || FaHeart;

  return (
    <article
      aria-labelledby={`service-title-${_id}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition duration-300 motion-reduce:transition-none ${
        isActive
          ? "border-slate-200 shadow-[0_1px_2px_rgba(19,46,73,0.06),0_8px_24px_-12px_rgba(19,46,73,0.12)] hover:-translate-y-1 hover:border-[#1479C9]/40 hover:shadow-[0_2px_4px_rgba(19,46,73,0.06),0_24px_40px_-20px_rgba(20,121,201,0.35)] motion-reduce:hover:translate-y-0"
          : "border-slate-200 opacity-90"
      }`}
    >
      {/* Brand accent */}
      <div className="flex h-1 w-full" aria-hidden="true">
        <div className="w-2/3 bg-[#1479C9]" />
        <div className="w-1/3 bg-[#F34E65]" />
      </div>

      {/* ================= HEADER ================= */}
      <header className="px-6 pt-6 sm:px-7 sm:pt-7">
        <div className="flex items-start justify-between gap-4">
          {/* Service icon */}
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-colors duration-300 motion-reduce:transition-none ${
              isActive
                ? "bg-[#eaf4fc] text-[#1479C9] ring-[#1479C9]/15 group-hover:bg-[#1479C9] group-hover:text-white"
                : "bg-slate-100 text-slate-400 ring-slate-200"
            }`}
          >
            <Icon className="text-2xl" aria-hidden="true" />
          </div>

          {/* Availability status */}
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
              isActive
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-slate-100 text-slate-500 ring-slate-200"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                isActive ? "bg-emerald-500" : "bg-slate-400"
              }`}
            />
            {isActive ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* Category */}
        <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold capitalize text-[#1479C9]">
          <FaHeart className="text-[11px] text-[#F34E65]" aria-hidden="true" />
          {category?.replace("-", " ")}
        </p>

        {/* Title */}
        <h2
          id={`service-title-${_id}`}
          className="mt-1.5 text-balance break-words text-xl font-bold leading-snug tracking-tight text-[#132e49] sm:text-[1.375rem]"
        >
          {title}
        </h2>
      </header>

      {/* ================= BODY ================= */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-4 sm:px-7">
        {/* Description */}
        <p className="text-[0.9375rem] leading-7 text-slate-600">
          {description}
        </p>

        {/* Features */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <h3 className="text-sm font-semibold text-[#132e49]">
            What we offer
          </h3>

          <ul className="mt-3 space-y-2.5">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm leading-6 text-slate-700"
              >
                <FaCircleCheck
                  className="mt-1 h-4 w-4 shrink-0 text-[#1479C9]"
                  aria-hidden="true"
                />
                <span className="min-w-0 break-words">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Flexible spacer keeps footers aligned across a grid */}
        <div className="flex-1" />

        {/* ================= FOOTER ================= */}
        <div className="mt-7">
          <Link
            href={`/service-page/${_id}`}
            aria-disabled={!isActive}
            tabIndex={!isActive ? -1 : undefined}
            className={`group/button flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1479C9] focus-visible:ring-offset-2 motion-reduce:transition-none ${
              isActive
                ? "bg-[#1479C9] text-white shadow-sm hover:bg-[#1065A8] active:scale-[0.98] motion-reduce:active:scale-100"
                : "pointer-events-none bg-slate-100 text-slate-400"
            }`}
          >
            <span>Service Details</span>

            <FaArrowRight
              className="text-xs transition-transform duration-200 group-hover/button:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/button:translate-x-0"
              aria-hidden="true"
            />
          </Link>

          <p className="mt-3 text-center text-xs text-slate-500">
            {isActive
              ? "Discover the right care for your family"
              : "This service is currently unavailable"}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ServicesPageCard;