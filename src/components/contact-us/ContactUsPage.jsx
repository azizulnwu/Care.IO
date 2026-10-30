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

const field =
  "block w-full min-h-11 rounded-xl border border-[#132e49]/15 bg-white px-4 py-2.5 text-sm text-[#041320] shadow-sm placeholder:text-[#132e49]/40 outline-none transition-[border-color,box-shadow] duration-150 motion-reduce:transition-none hover:border-[#132e49]/30 focus-visible:border-[#1479C9] focus-visible:ring-4 focus-visible:ring-[#1479C9]/15";
const label = "mb-1.5 block text-sm font-medium text-[#132e49]";

const contactItems = [
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    lines: ["support@care.io"],
    note: "We reply as soon as possible.",
    href: "mailto:support@care.io",
  },
  {
    icon: <FaPhone />,
    title: "Call Us",
    lines: ["+880 1910-123456"],
    note: "Available during business hours.",
    href: "tel:+8801910123456",
  },
  {
    icon: <FaLocationDot />,
    title: "Our Office",
    lines: ["Khulna, Bangladesh"],
    note: "Office address will be updated soon.",
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    lines: ["Saturday – Thursday", "9:00 AM – 6:00 PM"],
  },
];

const ContactUsPage = () => {
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
    <main className="min-h-screen bg-[#f4f7fa] px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* BACK LINK */}
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 rounded px-1 py-0.5 text-sm font-semibold text-[#1479C9] outline-none transition-colors hover:text-[#0f5f9f] focus-visible:ring-4 focus-visible:ring-[#1479C9]/20"
        >
          <FaArrowLeft
            aria-hidden="true"
            className="text-xs transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transition-none"
          />
          Back to Home
        </Link>

        {/* PAGE HEADER */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1479C9]/10 px-4 py-1.5 text-sm font-semibold text-[#1479C9]">
            <FaHeart aria-hidden="true" className="text-xs" />
            <span>Get In Touch</span>
          </div>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-[#132e49] md:text-5xl">
            Contact Care.io
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-7 text-[#132e49]/75 md:text-base">
            Have questions about our care services? Our team is here to help you
            find the right care solution for your family.
          </p>
        </header>

        {/* CONTENT */}
        <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:gap-8">
          {/* CONTACT INFORMATION */}
          <aside className="relative overflow-hidden rounded-3xl bg-[#132e49] p-6 text-white shadow-[0_16px_40px_-16px_rgba(19,46,73,0.45)] md:p-8 lg:col-span-2">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 flex h-1.5 w-full"
            >
              <div className="w-1/2 bg-[#1479C9]" />
              <div className="w-1/4 bg-[#5DA83C]" />
              <div className="w-1/4 bg-[#7C58C8]" />
            </div>

            <div className="mb-8 mt-2">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#7cc0f5]">
                <FaShieldHeart aria-hidden="true" className="text-3xl" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight">Let’s Talk</h2>

              <p className="mt-3 text-sm leading-7 text-white/75">
                We are ready to answer your questions and help you choose
                dependable care for your loved ones.
              </p>
            </div>

            <ul className="space-y-6">
              {contactItems.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#7cc0f5]"
                  >
                    {item.icon}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>

                    {item.lines.map((line) =>
                      item.href ? (
                        <a
                          key={line}
                          href={item.href}
                          className="mt-1 block break-words rounded text-sm text-white/90 outline-none transition-colors hover:text-white hover:underline focus-visible:ring-4 focus-visible:ring-white/30"
                        >
                          {line}
                        </a>
                      ) : (
                        <p
                          key={line}
                          className="mt-1 break-words text-sm text-white/90 first:mt-1 [&:not(:first-of-type)]:mt-0"
                        >
                          {line}
                        </p>
                      ),
                    )}

                    {item.note && (
                      <p className="mt-1 text-xs text-white/55">{item.note}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          {/* CONTACT FORM */}
          <section
            aria-labelledby="contact-form-title"
            className="rounded-3xl border border-[#132e49]/10 bg-white p-6 shadow-[0_1px_2px_rgba(19,46,73,0.04),0_16px_40px_-16px_rgba(19,46,73,0.18)] md:p-8 lg:col-span-3"
          >
            <div className="mb-6">
              <h2
                id="contact-form-title"
                className="text-2xl font-bold tracking-tight text-[#132e49]"
              >
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#132e49]/70">
                Complete the form below and our team will get back to you.
              </p>
            </div>

            {submitted && (
              <div
                role="status"
                className="mb-6 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm leading-snug text-emerald-800"
              >
                <FaShieldHeart
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                <span>
                  Thank you! Your message has been submitted successfully.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                {/* NAME */}
                <div>
                  <label htmlFor="name" className={label}>
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={field}
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label htmlFor="email" className={label}>
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={field}
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label htmlFor="phone" className={label}>
                    Phone Number{" "}
                    <span className="font-normal text-[#132e49]/50">
                      (optional)
                    </span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={field}
                  />
                </div>

                {/* SUBJECT */}
                <div>
                  <label htmlFor="subject" className={label}>
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
                    className={field}
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label htmlFor="message" className={label}>
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
                  className={`${field} resize-y`}
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1479C9] px-6 text-sm font-semibold text-white shadow-sm outline-none transition-colors duration-150 hover:bg-[#0f5f9f] focus-visible:ring-4 focus-visible:ring-[#1479C9]/30 active:bg-[#0d548e] motion-reduce:transition-none sm:w-auto sm:text-base"
              >
                Send Message
                <FaPaperPlane aria-hidden="true" className="text-sm" />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ContactUsPage;