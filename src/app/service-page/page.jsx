import { serviceOptions } from "@/action/server/serviceAll";
import Footer from "@/components/footer/Footer";
import Navbar from "../../main-layout-components/Navbar";

import React from "react";
import ServicesPageCard from "../../../ServicesPageCard";

// src/app/all-service/page.js (or wherever your All Services page lives)
export const metadata = {
  title: "All Care Services",
  description:
    "Explore Care.io's trusted care services: child care, elder care, personal care, home care, special needs care and flexible care plans. Professional caregivers, booked by the hour.",

  keywords: [
    "care services",
    "child care service",
    "elder care service",
    "home care service",
    "personal care",
    "special needs care",
    "flexible care plans",
    "hourly caregiver booking",
    "Care.io services",
  ],

  alternates: {
    canonical: "/all-service", // match your actual route path
  },

  openGraph: {
    type: "website",
    url: "/all-service",
    siteName: "Care.io",
    title: "All Care Services | Care.io",
    description:
      "Compassionate, professional care for children, elderly people and your entire family. Browse every service and book trusted caregivers by the hour.",
     images: ["/opengraph-image.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "All Care Services | Care.io",
    description:
      "Child care, elder care, home care, special needs care and more. Book trusted caregivers with Care.io.",
    images: ["/opengraph-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
const ServicePage = async () => {
  const services = await serviceOptions();
  // console.log("services", [...services]);
  return (
    <div>
      <header className="sticky top-0 z-40">
        <Navbar></Navbar>
      </header>
      <div className="bg-white w-full h-0.75"></div>

      <main className="bg-[#c7d8e8] p-10 ">
        <h1 className=" text-4xl text-center text-[#1479C9]  font-bold mb-8 ">
          All Services
        </h1>

        {services.map((service) => (
          <ServicesPageCard
            key={service._id}
            service={{ ...service, _id: service._id.toString() }}
          />
        ))}
      </main>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default ServicePage;
