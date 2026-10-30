"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  FaGoogle,
  FaHeart,
  FaArrowRight,
  FaArrowLeft,
  FaShieldHeart,
  FaTriangleExclamation,
} from "react-icons/fa6";

import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const field =
  "block w-full min-h-11 rounded-xl border border-[#132e49]/15 bg-white px-4 py-2.5 text-sm text-[#041320] shadow-sm placeholder:text-[#132e49]/40 outline-none transition-[border-color,box-shadow] duration-150 motion-reduce:transition-none hover:border-[#132e49]/30 focus-visible:border-[#1479C9] focus-visible:ring-4 focus-visible:ring-[#1479C9]/15";
const label = "mb-1.5 block text-sm font-medium text-[#132e49]";
const btnBase =
  "inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl px-5 text-sm font-semibold outline-none transition-colors duration-150 motion-reduce:transition-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base";
const btnPrimary = `${btnBase} bg-[#1479C9] text-white shadow-sm hover:bg-[#0f5f9f] active:bg-[#0d548e] focus-visible:ring-[#1479C9]/30`;
const btnSecondary = `${btnBase} border border-[#132e49]/20 bg-white text-[#132e49] hover:bg-[#f4f7fa] active:bg-[#e9eef3] focus-visible:ring-[#132e49]/15`;
const textLink =
  "rounded font-semibold text-[#1479C9] outline-none transition-colors hover:text-[#0f5f9f] hover:underline focus-visible:ring-4 focus-visible:ring-[#1479C9]/20";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  console.log(params, callbackUrl);
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
      redirect: false,
      callbackUrl: callbackUrl,
    });
console.log("signIn result:", result);
    if (result?.error) {
      setLoading(false);
      // alert("Invalid Email or Password.Try Google Login or register.")
      toast.error("Invalid Email or Password.Try Google Login or register.");
    } else {
      setLoading(false);
      toast.success("Login Successful");
      console.log("callbackUrl", callbackUrl);
      // router.refresh(); // clears the client router cache so the stale redirect is dropped
        window.location.replace(callbackUrl);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    const result = await signIn("google", {
      callbackUrl: callbackUrl,
    });

    if (result) {
      toast.success("Login Successful");
      router.push(callbackUrl);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fa] px-4 py-10 md:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full overflow-hidden rounded-3xl border border-[#132e49]/10 bg-white shadow-[0_1px_2px_rgba(19,46,73,0.04),0_16px_40px_-16px_rgba(19,46,73,0.18)]">
          {/* ================= HEADER ================= */}
          <div className="relative border-b border-[#132e49]/10 px-6 pb-7 pt-10 text-center md:px-8">
            {/* Care.io Color Pattern */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 flex h-1.5 w-full"
            >
              <div className="w-1/2 bg-[#1479C9]" />
              <div className="w-1/4 bg-[#5DA83C]" />
              <div className="w-1/4 bg-[#7C58C8]" />
            </div>

            {/* Logo Icon */}
            {/* <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1479C9]/10">
              <FaHeart className="text-3xl text-[#F34E65]" />
            </div> */}

            <h1 className="text-balance text-3xl font-bold tracking-tight text-[#132e49]">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-[#132e49]/70 sm:text-base">
              Sign in to continue to Care.io
            </p>
          </div>

          {/* ================= FORM ================= */}
          <div className="px-6 pb-8 pt-7 md:px-8">
            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm leading-snug text-rose-800"
              >
                <FaTriangleExclamation
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-rose-600"
                />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className={label}>
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  className={field}
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#132e49]"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className={`${textLink} px-0.5 text-xs`}
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className={field}
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className={btnPrimary}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight aria-hidden="true" className="text-sm" />
                  </>
                )}
              </button>
            </form>

            {/* ================= DIVIDER ================= */}
            <div className="my-7 flex items-center gap-3" role="separator">
              <div className="h-px flex-1 bg-[#132e49]/10" />
              <span className="text-xs font-medium text-[#132e49]/55">
                or continue with
              </span>
              <div className="h-px flex-1 bg-[#132e49]/10" />
            </div>

            {/* ================= GOOGLE LOGIN ================= */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              aria-busy={googleLoading}
              className={btnSecondary}
            >
              {googleLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Connecting...
                </>
              ) : (
                <>
                  <FaGoogle aria-hidden="true" className="text-[#4285F4]" />
                  Continue with Google
                </>
              )}
            </button>

            {/* ================= REGISTER ================= */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#132e49]/70">
                Don't have an account?
              </p>

              <Link
                href="/register"
                className={`${textLink} mt-1.5 inline-flex items-center gap-2 px-1 py-0.5`}
              >
                Create an Account
                <FaArrowRight aria-hidden="true" className="text-xs" />
              </Link>
            </div>

            {/* ================= TRUST MESSAGE ================= */}
            {/* <div className="mt-7 flex items-center justify-center gap-2 border-t border-gray-100 pt-5 text-xs text-gray-400">
              <FaShieldHeart className="text-[#5DA83C]" />
              Safe and trusted care with Care.io
            </div> */}

            {/* Back Home */}
            <div className="mt-6 border-t border-[#132e49]/10 pt-5 text-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded px-1 py-0.5 text-sm font-semibold text-[#132e49] outline-none transition-colors hover:text-[#1479C9] focus-visible:ring-4 focus-visible:ring-[#1479C9]/20"
              >
                <FaArrowLeft
                  aria-hidden="true"
                  className="text-xs transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transition-none"
                />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;