"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  FaGoogle,
  FaHeart,
  FaArrowRight,
  FaShieldHeart,
} from "react-icons/fa6";

import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams()
  const callbackUrl = params.get("callbackUrl") || "/";

  // ================= EMAIL LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      // redirect: false,
      callbackUrl: callbackUrl,
    });
    console.log(result);
    if (result?.error) {
      setLoading(false);
      toast.error("Invalid Email or Password.Try Google Login or register.");
    } else {
      setLoading(false);
      toast.success("Login Successful");
      console.log("callbackUrl", callbackUrl);
      router.push(callbackUrl);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    const result = await signIn("google", {
      callbackUrl: callbackUrl,
    });
    if (result?.ok) {
      toast.success("Login Successful");
    } else {
      toast.error("Invalid Email or Password.Try Google Login or register.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FBFF] px-4 py-10 md:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full overflow-hidden rounded-3xl border border-[#1479C9]/10 bg-white shadow-xl">
          {/* ================= HEADER ================= */}
          <div className="relative bg-[#F7FBFF] px-6 pb-7 pt-8 text-center">
            {/* Care.io Color Pattern */}
            <div className="absolute left-0 top-0 flex h-1.5 w-full">
              <div className="w-1/2 bg-[#1479C9]" />
              <div className="w-1/4 bg-[#5DA83C]" />
              <div className="w-1/4 bg-[#7C58C8]" />
            </div>

            {/* Logo Icon */}
            {/* <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1479C9]/10">
              <FaHeart className="text-3xl text-[#F34E65]" />
            </div> */}

            <h1 className="mt-4 text-3xl font-extrabold text-[#17324D]">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue to Care.io
            </p>
          </div>

          {/* ================= FORM ================= */}
          <div className="px-6 pb-8 pt-6 md:px-8">
            {/* Error */}
            {error && (
              <div className="alert mb-5 border-none bg-[#F34E65]/10 text-sm text-[#F34E65]">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="Enter your email"
                  required
                  className="input input-bordered w-full border-gray-200 bg-white focus:border-[#1479C9] focus:outline-none focus:ring-1 focus:ring-[#1479C9]"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#17324D]"
                  >
                    Password
                  </label>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="input input-bordered w-full border-gray-200 bg-white focus:border-[#1479C9] focus:outline-none focus:ring-1 focus:ring-[#1479C9]"
                />
                <div className="flex justify-end mt-2 p-1">
                  <Link
                    href="/forgot-password"
                    className="text-xs  font-semibold text-[#1479C9] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn w-full border-none bg-[#1479C9] text-white shadow-md hover:bg-[#1065A8]"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            {/* ================= DIVIDER ================= */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* ================= GOOGLE LOGIN ================= */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="btn w-full border border-gray-200 bg-white text-[#17324D] shadow-sm hover:border-[#1479C9]/30 hover:bg-[#F7FBFF]"
            >
              {googleLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Connecting...
                </>
              ) : (
                <>
                  <FaGoogle className="text-[#4285F4]" />
                  Continue with Google
                </>
              )}
            </button>

            {/* ================= REGISTER ================= */}
            <div className="mt-7 text-center">
              <p className="text-sm text-gray-500">Don't have an account?</p>

              <Link
                href="/register"
                className="mt-2 inline-flex items-center gap-2 font-semibold text-[#1479C9] hover:text-[#1065A8] hover:underline"
              >
                Create an Account
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* ================= TRUST MESSAGE ================= */}
            {/* <div className="mt-7 flex items-center justify-center gap-2 border-t border-gray-100 pt-5 text-xs text-gray-400">
              <FaShieldHeart className="text-[#5DA83C]" />
              Safe and trusted care with Care.io
            </div> */}

            {/* Back Home */}
            <div className="mt-4 text-center">
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
    </main>
  );
};

export default LoginPage;
