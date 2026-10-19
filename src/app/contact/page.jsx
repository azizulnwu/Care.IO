"use client";

import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaClock,
  FaPaperPlane,
  FaHeart,
  FaShieldHeart,
} from "react-icons/fa6";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Connect this form to your API route later.
    // console.log("Contact form data:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#f7f9fb] px-4 py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1479C9] transition-colors hover:text-[#1065A8]"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
        {/* PAGE HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-[#1479C9]">
            <FaHeart />
            <span>Get In Touch</span>
          </div>

          <h1 className="text-3xl font-bold text-[#132e49] md:text-5xl">
            Contact Care.io
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#041320] md:text-base">
            Have questions about our care services? Our team is here to help you
            find the right care solution for your family.
          </p>
        </div>

        {/* CONTACT CONTENT */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* CONTACT INFORMATION */}
          <aside className="rounded-2xl bg-[#cfd6dd] p-6 shadow-md md:p-8">
            <div className="mb-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1479C9]/10 text-[#1479C9]">
                <FaShieldHeart className="text-3xl" />
              </div>

              <h2 className="text-2xl font-bold text-[#132e49]">Let’s Talk</h2>

              <p className="mt-3 text-sm leading-7 text-[#041320]">
                We are ready to answer your questions and help you choose
                dependable care for your loved ones.
              </p>
            </div>

            <div className="space-y-5">
              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e5e9ec] text-[#1479C9]">
                  <FaEnvelope />
                </div>

                <div>
                  <h3 className="font-semibold text-[#132e49]">Email Us</h3>
                  <p className="mt-1 text-sm text-[#041320]">support@care.io</p>
                  <p className="text-xs text-gray-600">
                    We reply as soon as possible.
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e5e9ec] text-[#1479C9]">
                  <FaPhone />
                </div>

                <div>
                  <h3 className="font-semibold text-[#132e49]">Call Us</h3>
                  <p className="mt-1 text-sm text-[#041320]">
                    +880 1910-123456
                  </p>
                  <p className="text-xs text-gray-600">
                    Available during business hours.
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e5e9ec] text-[#1479C9]">
                  <FaLocationDot />
                </div>

                <div>
                  <h3 className="font-semibold text-[#132e49]">Our Office</h3>
                  <p className="mt-1 text-sm text-[#041320]">
                    Khulna, Bangladesh
                  </p>
                  <p className="text-xs text-gray-600">
                    Office address will be updated soon.
                  </p>
                </div>
              </div>

              {/* WORKING HOURS */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e5e9ec] text-[#1479C9]">
                  <FaClock />
                </div>

                <div>
                  <h3 className="font-semibold text-[#132e49]">
                    Working Hours
                  </h3>
                  <p className="mt-1 text-sm text-[#041320]">
                    Saturday – Thursday
                  </p>
                  <p className="text-sm text-[#041320]">9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </aside>

          {/* CONTACT FORM */}
          <section className="rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] p-6 shadow-md md:p-8 lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#132e49]">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#041320]">
                Complete the form below and our team will get back to you.
              </p>
            </div>

            {submitted && (
              <div className="alert mb-6 border-none bg-[#5DA83C]/10 text-[#4ea12b]">
                <FaShieldHeart />
                <span>
                  Thank you! Your message has been submitted successfully.
                </span>
              </div>
            )}

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
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input w-full border-gray-200 bg-[#f7f9fb] text-[#041320] outline-none focus:border-[#1479C9]"
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
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input w-full border-gray-200 bg-[#f7f9fb] text-[#041320] outline-none focus:border-[#1479C9]"
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
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input w-full border-gray-200 bg-[#f7f9fb] text-[#041320] outline-none focus:border-[#1479C9]"
                  />
                </div>

                {/* SUBJECT */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-[#132e49]"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Enter message subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input w-full border-gray-200 bg-[#f7f9fb] text-[#041320] outline-none focus:border-[#1479C9]"
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[#132e49]"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="textarea w-full border-gray-200 bg-[#f7f9fb] text-[#041320] outline-none focus:border-[#1479C9]"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="btn w-full border-none bg-[#1479C9] text-white shadow-md transition-all hover:bg-[#1065A8] sm:w-auto"
              >
                Send Message
                <FaPaperPlane />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
