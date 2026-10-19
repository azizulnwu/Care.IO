"use client";
import bcrypt from "bcryptjs";
import { registerUser } from "@/action/server/auth";
import Link from "next/link";
import { useState } from "react";
import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaHeart,
  FaShieldHeart,
} from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const form = e.target;

    const nid = form.nid.value.trim();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const contact = form.contact.value.trim();
    const address = form.address.value.trim();
    const password = form.password.value;
    // const confirmPassword = form.confirmPassword.value;
    const imageFile = form.image.files[0];

    // console.log(nid, name, email, contact, address, password, imageFile);

    // ImageBB upload api
    const imageData = new FormData();

    imageData.append("image", imageFile);

    const imageResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
      {
        method: "POST",
        body: imageData,
      },
    );

    const imageResult = await imageResponse.json();

    const imageUrl = imageResult.data.url;

    const userData = {
      role: "user",
      name: name,
      email: email,
      contact: contact,
      address: address,
      password: await bcrypt.hash(password, 10),
      image: imageUrl,
      nid: nid,
      createAt: new Date().toISOString(),
      provider: "credentials",
    };

    const result = await registerUser(userData);

    if (result.success) {
      toast(result.message);
      form.reset();
      router.push("/login")

    } else {
      toast(result.message);
    }

    // ================= VALIDATION =================

    // NID validation
    // if (!/^\d{10,17}$/.test(nid)) {
    //   setError("NID number must contain 10 to 17 digits.");
    //   return;
    // }

    // // Name validation
    //  if (name.length < 3) {
    //   setError("Name must contain at least 3 characters.");
    //   return;
    // }

    // Email validation
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   setError("Please enter a valid email address.");
    //   return;
    // }

    // Bangladesh contact validation
    // if (!/^01[3-9]\d{8}$/.test(contact)) {
    //   setError("Please enter a valid Bangladesh mobile number.");
    //   return;
    // }

    // Address validation
    // if (address.length < 5) {
    //   setError("Please enter a valid address.");
    //   return;
    // }

    // Password validation
    // if (password.length < 8) {
    //   setError("Password must contain at least 8 characters.");
    //   return;
    // }

    // if (!/[A-Z]/.test(password)) {
    //   setError("Password must contain at least one uppercase letter.");
    //   return;
    // }

    // if (!/[a-z]/.test(password)) {
    //   setError("Password must contain at least one lowercase letter.");
    //   return;
    // }

    // if (!/\d/.test(password)) {
    //   setError("Password must contain at least one number.");
    //   return;
    // }

    // if (!/[!@#$%^&*]/.test(password)) {
    //   setError(
    //     "Password must contain at least one special character (!@#$%^&*)."
    //   );
    //   return;
    // }

    // // Confirm password
    // if (password !== confirmPassword) {
    //   setError("Password and confirm password do not match.");
    //   return;
    // }

    // ================= API REQUEST =================

    // try {
    //   setLoading(true);

    //   const response = await fetch("/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       nid,
    //       name,
    //       email,
    //       contact,
    //       address,
    //       password,
    //     }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     setError(data.message || "Registration failed.");
    //     return;
    //   }

    //   setSuccess("Registration successful! You can now login.");

    //   form.reset();
    // } catch (error) {
    //   console.error(error);
    //   setError("Something went wrong. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <main className="min-h-screen bg-[#F7FBFF] px-4 py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-3xl border border-[#1479C9]/10 bg-white shadow-xl">
          {/* ================= HEADER ================= */}

          <div className="relative bg-[#F7FBFF] px-6 pb-7 pt-8 text-center">
            {/* Care.io Color Pattern */}

            <div className="absolute left-0 top-0 flex h-1.5 w-full">
              <div className="w-1/2 bg-[#1479C9]" />
              <div className="w-1/4 bg-[#5DA83C]" />
              <div className="w-1/4 bg-[#7C58C8]" />
            </div>

            {/* Logo */}

            {/* <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1479C9]/10">
              <FaHeart className="text-3xl text-[#F34E65]" />
            </div> */}

            <h1 className="mt-4 text-3xl font-extrabold text-[#17324D]">
              Create Your Account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Join Care.io and create a trusted care profile
            </p>
          </div>

          {/* ================= FORM ================= */}

          <div className="px-6 pb-8 pt-6 md:px-10">
            {/* Error */}

            {error && (
              <div className="alert mb-5 border-none bg-[#F34E65]/10 text-sm text-[#F34E65]">
                <span>{error}</span>
              </div>
            )}

            {/* Success */}

            {success && (
              <div className="alert mb-5 border-none bg-[#5DA83C]/10 text-sm text-[#5DA83C]">
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              {/* ================= NID ================= */}

              <div>
                <label
                  htmlFor="nid"
                  className="mb-2 block text-sm font-semibold text-[#17324D]"
                >
                  NID Number
                </label>

                <input
                  id="nid"
                  name="nid"
                  type="text"
                  inputMode="numeric"
                  maxLength={17}
                  placeholder="Enter your NID number"
                  required
                  className="input input-bordered w-full border-gray-200 bg-white focus:border-[#1479C9] focus:outline-none focus:ring-1 focus:ring-[#1479C9]"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Enter your 10, 13, or 17 digit NID number.
                </p>
              </div>

              {/* ================= NAME + EMAIL ================= */}

              <div className="grid gap-5 md:grid-cols-2">
                {/* Name */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#17324D]"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    minLength={3}
                    required
                    className="input input-bordered w-full border-gray-200 bg-white focus:border-[#1479C9] focus:outline-none focus:ring-1 focus:ring-[#1479C9]"
                  />
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#17324D]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    className="input input-bordered w-full border-gray-200 bg-white focus:border-[#1479C9] focus:outline-none focus:ring-1 focus:ring-[#1479C9]"
                  />
                </div>
              </div>
              {/* ================= PROFILE IMAGE ================= */}

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-[#17324D]"
                >
                  Profile Image
                </label>

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  // onChange={(e) => setImage(e.target.files[0])}
                  className="file-input file-input-bordered w-full border-gray-200 bg-white focus:border-[#1479C9] focus:outline-none"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Upload a clear profile image. JPG, PNG or WEBP.
                </p>
              </div>

              {/* ================= CONTACT ================= */}

              <div>
                <label
                  htmlFor="contact"
                  className="mb-2 block text-sm font-semibold text-[#17324D]"
                >
                  Contact Number
                </label>

                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="01XXXXXXXXX"
                  required
                  className="input input-bordered w-full border-gray-200 bg-white focus:border-[#1479C9] focus:outline-none focus:ring-1 focus:ring-[#1479C9]"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Example: 01712345678
                </p>
              </div>

              {/* ================= ADDRESS ================= */}

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold text-[#17324D]"
                >
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  minLength={5}
                  placeholder="Enter your complete address"
                  required
                  className="textarea textarea-bordered w-full resize-none border-gray-200 bg-white focus:border-[#1479C9] focus:outline-none focus:ring-1 focus:ring-[#1479C9]"
                />
              </div>

              {/* ================= PASSWORD ================= */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#17324D]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    minLength={8}
                    required
                    className="input input-bordered w-full border-gray-200 bg-white pr-12 focus:border-[#1479C9] focus:outline-none focus:ring-1 focus:ring-[#1479C9]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1479C9]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                  At least 8 characters, including uppercase, lowercase, number,
                  and special character.
                </p>
              </div>

              {/* ================= CONFIRM PASSWORD ================= */}

              {/* <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-[#17324D]"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    minLength={8}
                    required
                    className="input input-bordered w-full border-gray-200 bg-white pr-12 focus:border-[#1479C9] focus:outline-none focus:ring-1 focus:ring-[#1479C9]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1479C9]"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div> */}

              {/* ================= TERMS ================= */}

              {/* <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="checkbox checkbox-sm mt-0.5 border-[#1479C9] [--chkbg:#1479C9] [--chkfg:white]"
                />

                <span className="text-xs leading-5 text-gray-500">
                  I agree to the Care.io terms of service and privacy policy.
                </span>
              </label> */}

              {/* ================= REGISTER BUTTON ================= */}

              <button
                type="submit"
                disabled={loading}
                className="btn w-full border-none bg-[#1479C9] text-white shadow-md hover:bg-[#1065A8]"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            {/* ================= LOGIN ================= */}

            <div className="mt-7 text-center">
              <p className="text-sm text-gray-500">Already have an account?</p>

              <Link
                href="/login"
                className="mt-2 inline-flex items-center gap-2 font-semibold text-[#1479C9] hover:text-[#1065A8] hover:underline"
              >
                Sign In
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* ================= TRUST ================= */}

            <div className="mt-2 flex items-center justify-center gap-2 border-t border-gray-100 pt-5 text-xs text-gray-400">
              <FaShieldHeart className="text-[#5DA83C]" />
              Your information is securely handled by Care.io
            </div>

            {/* ================= HOME ================= */}

            <div className="mt-1 text-center">
              <Link
                href="/"
                className=" block text-[15px] font-bold text-[#17324D] hover:text-[#1479C9]"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default RegisterPage;
