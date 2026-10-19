import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { VscPreview } from "react-icons/vsc";
import { LiaPagerSolid } from "react-icons/lia";
import {
  FaHouse,
  FaUsers,
  FaHeart,
  FaCalendarCheck,
  FaUser,
  FaBars,
} from "react-icons/fa6";

import MobileDrawerLink from "./MobileDrawerLink";
import { signOut } from "next-auth/react";
import Signout from "@/components/button/Signout";

export default async function DashboardLayout({ children }) {
  const session = (await getServerSession(authOptions)) || {};

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Checkbox */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content bg-base-200 min-h-screen">
        {/* ================= NAVBAR ================= */}
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-40">
          {/* Mobile Menu Button */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <FaBars className="text-xl" />
            </label>
          </div>

          {/* Dashboard Title */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#1479C9]">
              Care.io Dashboard
            </h1>
          </div>

          {/* Profile Dropdown */}
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    src={session?.user?.image || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/my-profile">Profile</Link>
                </li>

                <li>
                  <Signout />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= PAGE CONTENT ================= */}
        <main className="p-4 md:p-6">{children}</main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side z-50">
        {/* Overlay */}
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="bg-base-100 min-h-full w-64">
          {/* ================= LOGO ================= */}
          <div className="flex items-center gap-2 p-4 border-b">
            <div className="text-2xl font-bold">
              <span className="text-[#1479C9]">Care</span>
              <span className="text-[#F34E65]">.io</span>
            </div>
          </div>

          {/* ================= MENU ================= */}
          <ul className="menu p-4 gap-1 text-base">
            {/* Dashboard */}
            <li>
              <MobileDrawerLink href="/">
                <FaHouse />
                Home
              </MobileDrawerLink>
            </li>
            {/* <li>
              <MobileDrawerLink href="/dashboard">
                <MdSpaceDashboard />
                Dashboard
              </MobileDrawerLink>
            </li> */}

            {/* Users */}
            {session.role == "admin" ? (
              <li>
                <MobileDrawerLink href="/dashboard/users">
                  <FaUsers />
                  Users
                </MobileDrawerLink>
              </li>
            ) : (
              ""
            )}
            {/* Services */}
            <li>
              <MobileDrawerLink href="/dashboard/services">
                <FaHeart />
                Services
              </MobileDrawerLink>
            </li>

            {/* Bookings */}
            {session.role == "admin" ? (
              <li>
                <MobileDrawerLink href="/dashboard/booking-services">
                  <FaCalendarCheck />
                  Bookings
                </MobileDrawerLink>
              </li>
            ) : (
              ""
            )}
            {session.role == "user" ? (
              <li>
                <MobileDrawerLink href="/dashboard/my-booking">
                  <LiaPagerSolid />
                  My Bookings
                </MobileDrawerLink>
              </li>
            ) : (
              ""
            )}
            {session.role == "user" ? (
              <li>
                <MobileDrawerLink href="/dashboard/bookings">
                  <VscPreview />
                  My Reviews
                </MobileDrawerLink>
              </li>
            ) : (
              ""
            )}

            {/* My Profile */}
            {/* <li>
              <MobileDrawerLink href="/dashboard/my-profile">
                <FaUser />
                My Profile
              </MobileDrawerLink>
            </li> */}
          </ul>
        </aside>
      </div>
    </div>
  );
}
