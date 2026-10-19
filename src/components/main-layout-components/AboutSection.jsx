import Link from "next/link";

import {
  FaHeart,
  FaShieldHeart,
  FaUsers,
  FaHandHoldingHeart,
} from "react-icons/fa6";

const AboutSection = () => {
  return (
    <section className="bg-[#F7FBFF] py-2 md:py-6">
      <div className="mx-auto px-4">
        {/* ================= ABOUT CONTENT ================= */}
        <div className="mx-auto max-w-5xl text-center">
          {/* Section Label */}
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#1479C9]/20 bg-[#1479C9]/5 px-4 py-2 text-sm font-semibold text-[#1479C9]">
            <FaHeart className=" text-[#1479C9]" />
            About Care.io
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight text-[#17324D] md:text-4xl lg:text-5xl">
            Caring for Your Family,
            <span className="block text-[#1479C9]">Like Our Own</span>
          </h2>

          {/* Description */}
          <div className="mx-auto mt-3 max-w-3xl">
            <p className="leading-7 text-gray-600">
              At Care.io, we believe that everyone deserves reliable,
              compassionate, and respectful care. Our mission is to connect
              families with dependable care services that support children,
              elderly people, and loved ones.We aim to make finding quality care
              simple, transparent, and convenient—so families can focus on what
              matters most.
            </p>
          </div>
        </div>

        {/* ================= CORE VALUES ================= */}
        <div className="mx-auto mt-3 grid max-w-5xl gap-5 sm:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[#1479C9]/10 bg-[#F7FBFF] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#1479C9]/10">
              <FaHandHoldingHeart className="text-2xl text-[#1479C9]" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#17324D]">
              Compassionate Care
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              We put the comfort, dignity, and well-being of every individual
              first.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[#1479C9]/10 bg-[#F7FBFF] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#5DA83C]/10">
              <FaShieldHeart className="text-2xl text-[#5DA83C]" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#17324D]">
              Safety & Trust
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              We aim to create a safe and dependable care experience for every
              family.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-[#1479C9]/10 bg-[#F7FBFF] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C58C8]/10">
              <FaUsers className="text-2xl text-[#7C58C8]" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#17324D]">
              Family-Centered Service
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              We work to make care more accessible and convenient for families.
            </p>
          </div>
        </div>

        {/* ================= BOTTOM VALUES ================= */}
        <div className="mx-auto mt-4 grid max-w-5xl gap-5 sm:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[#1479C9]/10 bg-[#F7FBFF] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F34E65]/10">
              <FaHeart className="text-2xl  text-[#1479C9]" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#17324D]">
              Family First
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Care designed around your loved ones.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[#1479C9]/10 bg-[#F7FBFF] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#5DA83C]/10">
              <FaShieldHeart className="text-2xl text-[#5DA83C]" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#17324D]">
              Reliable Care
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Support you can count on.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-[#1479C9]/10 bg-[#F7FBFF] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C58C8]/10">
              <FaHandHoldingHeart className="text-2xl text-[#7C58C8]" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#17324D]">
              Caring Community
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Building a better care experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
