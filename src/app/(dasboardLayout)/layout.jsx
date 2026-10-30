import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { VscPreview } from "react-icons/vsc";
import { LiaPagerSolid } from "react-icons/lia";
import { MdOutlineReviews, MdPayment } from "react-icons/md";
import {
  FaHouse,
  FaUsers,
  FaCalendarCheck,
  FaBars,
} from "react-icons/fa6";

import MobileDrawerLink from "./MobileDrawerLink";
import Signout from "@/components/button/Signout";

export default async function DashboardLayout({ children }) {
  const session = (await getServerSession(authOptions)) || {};

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Checkbox */}
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        aria-label="Toggle navigation menu"
      />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content flex min-h-screen flex-col bg-base-200">
        {/* Skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#1479C9] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        {/* ================= NAVBAR ================= */}
        <header className="navbar sticky top-0 z-40 min-h-16 gap-2 border-b border-base-300 bg-base-100/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-base-100/80 md:px-6">
          {/* Mobile Menu Button */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              aria-label="Open navigation menu"
              className="btn btn-square btn-ghost focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1479C9]"
            >
              <FaBars className="text-lg" aria-hidden="true" />
            </label>
          </div>

          {/* Dashboard Title */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold tracking-tight text-[#132e49] sm:text-xl">
              Care.io Dashboard
            </h1>
          </div>

          {/* Profile Dropdown */}
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                aria-label="Open account menu"
                aria-haspopup="menu"
                className="btn btn-ghost btn-circle avatar focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1479C9]"
              >
                <div className="w-10 rounded-full ring-2 ring-[#1479C9]/20 ring-offset-2 ring-offset-base-100">
                  <Image
                    src={session?.user?.image || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-cover"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                role="menu"
                className="menu dropdown-content z-50 mt-3 w-56 gap-1 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
              >
                <li role="none">
                  <Link href="/my-profile" role="menuitem" className="rounded-lg">
                    Profile
                  </Link>
                </li>

                <li role="none">
                  <Signout />
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main
          id="main-content"
          className="mx-auto w-full max-w-screen-2xl flex-1 p-4 md:p-6 lg:p-8"
        >
          {children}
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side z-50">
        {/* Overlay */}
        <label
          htmlFor="dashboard-drawer"
          aria-label="Close navigation menu"
          className="drawer-overlay"
        ></label>

        <aside className="flex min-h-full w-72 max-w-[85vw] flex-col border-r border-base-300 bg-base-100 lg:w-64">
          {/* ================= LOGO ================= */}
          <div className="flex h-16 items-center border-b border-base-300 px-6">
            <div className="text-2xl font-extrabold tracking-tight">
              <span className="text-[#1479C9]">Care</span>
              <span className="text-[#F34E65]">.io</span>
            </div>
          </div>

          {/* ================= MENU ================= */}
          <nav aria-label="Dashboard" className="flex-1 overflow-y-auto">
            <ul className="menu w-full gap-1 p-3">
              {/* Home */}
              <li>
                <MobileDrawerLink href="/">
                  <FaHouse />
                  Home
                </MobileDrawerLink>
              </li>

              {/* Users */}
              {session.role == "admin" ? (
                <li>
                  <MobileDrawerLink href="/dashboard/users">
                    <FaUsers />
                    Users
                  </MobileDrawerLink>
                </li>
              ) : null}

              {/* Bookings */}
              {session.role == "admin" ? (
                <li>
                  <MobileDrawerLink href="/dashboard/booking-services">
                    <FaCalendarCheck />
                    Bookings
                  </MobileDrawerLink>
                </li>
              ) : null}

              {/* Payment History */}
              {session.role == "admin" ? (
                <li>
                  <MobileDrawerLink href="/dashboard/payment-history">
                    <MdPayment />
                    Payment History
                  </MobileDrawerLink>
                </li>
              ) : null}

              {/* My Bookings */}
              {session.role == "user" ? (
                <li>
                  <MobileDrawerLink href="/dashboard/my-booking">
                    <LiaPagerSolid />
                    My Bookings
                  </MobileDrawerLink>
                </li>
              ) : null}

              {/* Give Review */}
              {session.role == "user" ? (
                <li>
                  <MobileDrawerLink href="/dashboard/user-review">
                    <MdOutlineReviews />
                    Give Review
                  </MobileDrawerLink>
                </li>
              ) : null}

              {/* My Reviews */}
              {session.role == "user" ? (
                <li>
                  <MobileDrawerLink href="/dashboard/my-review">
                    <VscPreview />
                    My Reviews
                  </MobileDrawerLink>
                </li>
              ) : null}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}