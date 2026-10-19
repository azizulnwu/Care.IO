"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCamera, FaEnvelope, FaHeart, FaPhone, FaUser } from "react-icons/fa";
import {
  FaFloppyDisk,
  FaLocationDot,
  FaPenToSquare,
  FaRegPenToSquare,
  FaShieldHeart,
  FaXmark,
} from "react-icons/fa6";
import MyProfileLoading from "./loading";
// ...your icon imports

const MyProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <MyProfileLoading></MyProfileLoading>;
  }

  if (status === "unauthenticated") {
    return <p className="p-10">Please log in to view your profile.</p>;
  }

  return <ProfileContent session={session} />;
};

const ProfileContent = ({ session }) => {
  const initialData = {
    name: session.user?.name || "",
    email: session.user?.email || "",
    phone: session.contact || "",
    address: session.address || "",
    role: session.role || "",
    photo: session.user?.image || "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  // ...handleChange and handleSubmit unchanged

  const handleCancel = () => {
    setProfileData(initialData); // was `user`, which is not defined
    setSavedMessage("");
    setIsEditing(false);
  };
  const getInitials = (name = "") => {
    return (
      name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U"
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f9fb] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* BACK TO HOME */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1479C9] hover:text-[#1065A8]"
        >
          ← Back to Home
        </Link>

        {/* PAGE HEADER */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#1479C9]">
            <FaHeart />
            <span>My Account</span>
          </div>

          <h1 className="text-3xl font-bold text-[#132e49] md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#041320]">
            Manage your personal information and account details.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="overflow-hidden rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] shadow-lg">
          {/* PROFILE HEADER */}
          <div className="relative bg-[#e5e9ec] px-6 py-8 md:px-10">
            <div className="absolute left-0 top-0 flex h-1.5 w-full">
              <div className="w-1/2 bg-[#1479C9]" />
              <div className="w-1/4 bg-[#5DA83C]" />
              <div className="w-1/4 bg-[#7C58C8]" />
            </div>

            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {/* AVATAR */}
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1479C9] text-3xl font-bold text-white ring-4 ring-white">
                {profileData.photo ? (
                  <Image
                    width={150}
                    height={140}
                    src={profileData.photo}
                    alt={"Profile photo"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(profileData.name)
                )}

                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <FaCamera className="text-2xl text-white" />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-[#132e49]">
                  {profileData.name || "Your Name"}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  {profileData.email || "your-email@example.com"}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#5DA83C]/10 px-3 py-1 text-xs font-semibold text-[#4ea12b]">
                  <FaShieldHeart />
                  Care.io Member
                </div>
                <div className=" max-w-36 mt-1 items-center gap-2 rounded-full bg-[#5DA83C]/10 px-3 py-1 text-xs font-semibold text-[#4ea12b]">
                  <h1>
                    Role : {session.role}
                  </h1>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setSavedMessage("");
                }}
                className="btn mt-3 border-none bg-[#1479C9] text-white hover:bg-[#1065A8] sm:ml-auto sm:mt-0"
              >
                <FaRegPenToSquare />
                Edit Profile
              </button>
            </div>
          </div>

          {/* PROFILE DETAILS */}
          <div className="px-6 py-8 md:px-10">
            {savedMessage && (
              <div className="alert mb-6 border-none bg-[#5DA83C]/10 text-[#4ea12b]">
                <FaShieldHeart />
                <span>{savedMessage}</span>
              </div>
            )}

            {!isEditing ? (
              <div className="grid gap-5 md:grid-cols-2">
                <ProfileInfo
                  icon={<FaUser />}
                  label="Full Name"
                  value={profileData.name || "Not provided"}
                />

                <ProfileInfo
                  icon={<FaEnvelope />}
                  label="Email Address"
                  value={profileData.email || "Not provided"}
                />

                <ProfileInfo
                  icon={<FaPhone />}
                  label="Phone Number"
                  value={profileData.phone || "Not provided"}
                />

                <ProfileInfo
                  icon={<FaLocationDot />}
                  label="Address"
                  value={profileData.address || "Not provided"}
                />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#132e49]"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={profileData.name}
                      onChange={handleChange}
                      required
                      className="input w-full border-gray-200 bg-[#f7f9fb] text-[#041320] focus:border-[#1479C9]"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#132e49]"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleChange}
                      required
                      className="input w-full border-gray-200 bg-[#f7f9fb] text-[#041320] focus:border-[#1479C9]"
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-[#132e49]"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="input w-full border-gray-200 bg-[#f7f9fb] text-[#041320] focus:border-[#1479C9]"
                    />
                  </div>

                  {/* PHOTO URL */}
                  <div>
                    <label
                      htmlFor="photo"
                      className="mb-2 block text-sm font-semibold text-[#132e49]"
                    >
                      Profile Photo URL
                    </label>

                    <input
                      id="photo"
                      name="photo"
                      type="url"
                      value={profileData.photo}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                      className="input w-full border-gray-200 bg-[#f7f9fb] text-[#041320] focus:border-[#1479C9]"
                    />
                  </div>
                </div>

                {/* ADDRESS */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-[#132e49]"
                  >
                    Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={profileData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="textarea w-full border-gray-200 bg-[#f7f9fb] text-[#041320] focus:border-[#1479C9]"
                  />
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-5">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn border-none bg-gray-200 text-[#132e49] hover:bg-gray-300"
                  >
                    <FaXmark />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn border-none bg-[#1479C9] text-white hover:bg-[#1065A8]"
                  >
                    <FaFloppyDisk />
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const ProfileInfo = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-[#e5e9ec] p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1479C9]/10 text-[#1479C9]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-600">{label}</p>
        <p className="mt-1 break-words font-semibold text-[#041320]">{value}</p>
      </div>
    </div>
  );

  // ...rest of your JSX unchanged
};

export default MyProfile;
