import { serviceOptions } from "@/action/server/serviceAll";
import Footer from "@/components/footer/Footer";
import Navbar from "../../main-layout-components/Navbar";

import React from "react";
import ServicesPageCard from "../../../ServicesPageCard";

export const metadata = {
  title: "All Services",
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
