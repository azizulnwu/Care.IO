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
  FaShieldHeart,
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
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ================= CARD HEADER ================= */}
      <div className="relative bg-[#e5e9ec] px-6 pb-2 pt-2">
        {/* Decorative Color Pattern */}
        {/* <div className="absolute left-0 top-0 flex h-1.5 w-full">
          <div className="w-1/2 bg-[#1479C9]" />
          <div className="w-1/4 bg-[#5DA83C]" />
          <div className="w-1/4 bg-[#7C58C8]" />
        </div> */}

        <div className="flex items-start justify-between gap-4">
          {/* Service Icon */}
          <div className="flex h-8 w-10 items-center justify-center rounded-2xl bg-[#1479C9]/10 text-[#1479C9] transition-transform duration-300 group-hover:scale-110">
            {/* <FaBaby className="text-4xl" /> */}
            <Icon className="text-4xl" />
          </div>

          {/* Active Status */}
          <div
            className={`badge gap-1 border-none px-3 py-3 text-xs font-semibold ${
              isActive
                ? "bg-[#5DA83C]/10 text-[#4ea12b]"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-[#4ab41c]" : "bg-gray-500"
              }`}
            />
            {isActive ? "Available" : "Unavailable"}
          </div>
        </div>

        {/* Category */}
        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#1479C9]">
          <FaHeart className="text-[#1479C9]" />
          <span className="capitalize">{category?.replace("-", " ")}</span>
        </div>

        {/* Title */}
        <h2 className="mt-2 text-2xl font-bold text-[#132e49]">{title}</h2>
      </div>

      {/* ================= CARD BODY ================= */}
      <div className="flex flex-1 flex-col px-6 py-6">
        {/* Description */}
        <p className="text-[#041320]  leading-7 ">{description}</p>

        {/* Features */}
        <div className="mt-5">
          <div className="mb-3 flex items-center gap-2">
            <FaShieldHeart className="text-lg text-[#5DA83C]" />

            <h3 className="font-semibold text-[#041320]">What We Offer</h3>
          </div>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <FaCircleCheck className="mt-0.5 shrink-0 text-[#5c4db1]" />
                <span className="text-[#041320] font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* ================= CARD FOOTER ================= */}
        <div className="mt-6 border-t border-gray-100 pt-5 ">
          <Link
            href={`/service-page/${_id}`}
            className={`btn w-full border-none text-white shadow-md transition-all ${
              isActive
                ? "bg-[#1479C9] hover:bg-[#1065A8]"
                : "pointer-events-none bg-gray-300"
            }`}
          >
            Service Details
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPageCard;
