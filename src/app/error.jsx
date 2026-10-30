"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BiSolidErrorCircle } from "react-icons/bi";
import { FaHouse, FaRotateRight } from "react-icons/fa6";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    // Replace with Sentry / LogRocket etc. in production
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#f4f7fa] px-4 py-10 md:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center">
        <section
          role="alert"
          aria-labelledby="error-title"
          className="w-full overflow-hidden rounded-3xl border border-[#132e49]/10 bg-white text-center shadow-[0_1px_2px_rgba(19,46,73,0.04),0_16px_40px_-16px_rgba(19,46,73,0.18)]"
        >
          {/* Care.io color strip */}
          <div aria-hidden="true" className="flex h-1.5 w-full">
            <div className="w-1/2 bg-[#1479C9]" />
            <div className="w-1/4 bg-[#5DA83C]" />
            <div className="w-1/4 bg-[#7C58C8]" />
          </div>

          <div className="px-6 pb-10 pt-10 md:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
              <BiSolidErrorCircle
                aria-hidden="true"
                className="text-4xl text-rose-500"
              />
            </div>

            <h1
              id="error-title"
              className="mt-6 text-balance text-2xl font-bold tracking-tight text-[#132e49] sm:text-3xl"
            >
              Something went wrong
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-pretty text-sm text-[#132e49]/70 sm:text-base">
              We hit an unexpected problem while loading this page. Please try
              again, or head back to the home page.
            </p>

            {error?.digest && (
              <p className="mt-4 text-xs text-[#132e49]/50">
                Error ID: <span className="font-mono">{error.digest}</span>
              </p>
            )}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-[#1479C9] px-5 text-sm font-semibold text-white shadow-sm outline-none transition-colors duration-150 hover:bg-[#0f5f9f] active:bg-[#0d548e] focus-visible:ring-4 focus-visible:ring-[#1479C9]/30 motion-reduce:transition-none sm:text-base"
              >
                <FaRotateRight aria-hidden="true" className="text-sm" />
                Try Again
              </button>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-[#132e49]/20 bg-white px-5 text-sm font-semibold text-[#132e49] outline-none transition-colors duration-150 hover:bg-[#f4f7fa] active:bg-[#e9eef3] focus-visible:ring-4 focus-visible:ring-[#132e49]/15 motion-reduce:transition-none sm:text-base"
              >
                <FaHouse aria-hidden="true" className="text-sm" />
                Go to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}