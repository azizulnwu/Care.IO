import Link from "next/link";
import { BiSolidErrorCircle } from "react-icons/bi";
import { FaArrowRight, FaHouse } from "react-icons/fa6";

export const metadata = {
  title: "Page not found | Care.io",
  description: "The page you are looking for doesn't exist or has been moved.",
  robots: { index: false, follow: false },
};

const quickLinks = [
  { href: "/service-page", label: "Browse Services" },
  { href: "/login", label: "Sign In" },
  { href: "/register", label: "Create an Account" },
];

const PageNotFound = () => {
  return (
    <main className="min-h-screen bg-[#f4f7fa] px-4 py-10 md:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center">
        <section
          aria-labelledby="not-found-title"
          className="w-full overflow-hidden rounded-3xl border border-[#132e49]/10 bg-white text-center shadow-[0_1px_2px_rgba(19,46,73,0.04),0_16px_40px_-16px_rgba(19,46,73,0.18)]"
        >
          {/* Care.io color strip */}
          <div aria-hidden="true" className="flex h-1.5 w-full">
            <div className="w-1/2 bg-[#1479C9]" />
            <div className="w-1/4 bg-[#5DA83C]" />
            <div className="w-1/4 bg-[#7C58C8]" />
          </div>

          <div className="px-6 pb-10 pt-10 md:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1479C9]/10">
              <BiSolidErrorCircle
                aria-hidden="true"
                className="text-4xl text-[#1479C9]"
              />
            </div>

            <p className="mt-6 text-6xl font-bold tracking-tight text-[#1479C9]">
              404
            </p>

            <h1
              id="not-found-title"
              className="mt-3 text-balance text-2xl font-bold tracking-tight text-[#132e49] sm:text-3xl"
            >
              Page not found
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-pretty text-sm text-[#132e49]/70 sm:text-base">
              Sorry, we couldn't find the page you're looking for. It may have
              been moved, renamed, or never existed.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1479C9] px-5 text-sm font-semibold text-white shadow-sm outline-none transition-colors duration-150 hover:bg-[#0f5f9f] active:bg-[#0d548e] focus-visible:ring-4 focus-visible:ring-[#1479C9]/30 motion-reduce:transition-none sm:w-auto sm:text-base"
            >
              <FaHouse aria-hidden="true" className="text-sm" />
              Go to Home
            </Link>

            {/* Helpful links */}
            <nav
              aria-label="Helpful links"
              className="mt-8 border-t border-[#132e49]/10 pt-6"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[#132e49]/55">
                Or try one of these
              </p>
              <ul className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
                {quickLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-sm font-semibold text-[#132e49] outline-none transition-colors hover:text-[#1479C9] focus-visible:ring-4 focus-visible:ring-[#1479C9]/20 motion-reduce:transition-none"
                    >
                      {label}
                      <FaArrowRight
                        aria-hidden="true"
                        className="text-xs transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PageNotFound;