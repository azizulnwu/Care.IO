import React from "react";
import Logo from "@/logo/Logo";
import Link from "next/link";
import NavLink from "./NavLink";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Logout from "../button/Logout";
import Image from "next/image";
const Navbar = async () => {
  const session = (await getServerSession(authOptions)) || {};
  // console.log(session)
  return (
    <div className="navbar bg-[#acbed1] shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/booking-page">My Booking Page</NavLink>
            </li>
            {session.user ? (
              <li>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div>
          {" "}
          <Link href="/" className=" ">
            <Logo />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/service-page">All Service</NavLink>
          </li>
          <li>
            <NavLink href="/dashboard/my-booking">My Bookings</NavLink>
          </li>

          {session.user ? (
            <li>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="navbar-end ">
        {/* //droop down button// */}

        {session.user && (
          <button
            className="mr-3 mb-1"
            popoverTarget="popover-1"
            style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
          >
            <Image
              alt="user logo"
              src={session.user.image}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover hover:cursor-pointer hover:outline-1 ho"
            ></Image>
          </button>
        )}

        <ul
          className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
          popover="auto"
          id="popover-1"
          style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */}
        >
          <li>
            <NavLink href="/my-profile">My Profile</NavLink>
          </li>
          <li>
            <NavLink href="/dashboard/my-booking">My Bookings</NavLink>
          </li>
          {session.user ? (
            <li>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </li>
          ) : (
            ""
          )}
        </ul>
        {session.user ? (
          <Logout></Logout>
        ) : (
          <Link
            href="login"
            className="btn shadow-md border-none bg-[#59a2df] px-6 text-white hover:bg-[#2c7cb9]"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
