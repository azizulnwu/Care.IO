import React from "react";
import Logo from "@/logo/Logo";
import Link from "next/link";
import NavLink from "./NavLink";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Logout from "../components/button/Logout";
import Image from "next/image";

const Navbar = async () => {
  const session = (await getServerSession(authOptions)) || {};

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1479C9]/10  bg-[#80b7ed]">
      <nav
        aria-label="Main"
        className="navbar mx-auto min-h-16 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* ================= LEFT: MOBILE MENU + LOGO ================= */}
        <div className="navbar-start gap-1">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open navigation menu"
              aria-haspopup="menu"
              className="btn btn-ghost btn-square text-[#132e49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1479C9] lg:hidden"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content z-50 mt-3 w-56 gap-1 rounded-xl border border-slate-200 bg-base-100 p-2 shadow-lg"
            >
              <li>
                <NavLink href="/">Home</NavLink>
              </li>
              <li>
                <NavLink href="/service-page">All Service</NavLink>
              </li>
              {session.user ? (
                <li>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                </li>
              ) : null}
              <li>
                <NavLink href="/mission-and-vision">Mission And Vision</NavLink>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            aria-label="Care.io home"
            className="inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1479C9]"
          >
            <Logo />
          </Link>
        </div>

        {/* ================= CENTER: DESKTOP MENU ================= */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1 font-medium text-white">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/service-page">All Service</NavLink>
            </li>
            {/* <li>
              <NavLink href="/dashboard/my-booking">My Bookings</NavLink>
            </li> */}

            {session.user ? (
              <li>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </li>
            ) : null}
            <li>
              <NavLink href="/mission-and-vision">Mission And Vision</NavLink>
            </li>
          </ul>
        </div>

        {/* ================= RIGHT: PROFILE + AUTH ================= */}
        <div className="navbar-end gap-3">
          {/* Profile popover trigger */}
          {session.user && (
            <button
              type="button"
              aria-label="Open account menu"
              aria-haspopup="menu"
              className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1479C9]"
              popoverTarget="popover-1"
              style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
            >
              <Image
                alt="user logo"
                src={session.user.image}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#1479C9]/20 ring-offset-2 ring-offset-white transition hover:ring-[#1479C9]/60 motion-reduce:transition-none"
              />
            </button>
          )}

          {/* Profile popover menu */}
          <ul
            className="dropdown menu w-56 gap-1 rounded-xl border border-slate-200 bg-base-100 p-2 shadow-lg"
            popover="auto"
            id="popover-1"
            style={
              { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
            }
          >
            <li>
              <NavLink href="/my-profile">My Profile</NavLink>
            </li>
            {/* <li>
              <NavLink href="/dashboard/my-booking">My Bookings</NavLink>
            </li> */}
            {session.user ? (
              <li>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </li>
            ) : null}
            <li>
              <NavLink href="/mission-and-vision">Mission And Vision</NavLink>
            </li>
          </ul>

          {session.user ? (
            <Logout></Logout>
          ) : (
            <Link
              href="login"
              className="btn min-h-11 border-none bg-[#1479C9] px-6 font-semibold text-white shadow-sm transition-colors hover:bg-[#1065A8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1479C9] motion-reduce:transition-none"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
