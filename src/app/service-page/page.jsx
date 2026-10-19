import { serviceOptions } from "@/action/server/serviceAll";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/main-layout-components/Navbar";
import ServicesPageCard from "@/components/service/ServicesPageCard";
import React from "react";

const ServicePage = async () => {
  const services = await serviceOptions();
  // console.log("services", [...services]);
  return (
    <div>
     <header>
      <Navbar></Navbar>
     </header>
     <div className="bg-white w-full h-0.75"></div>
      
      <main className="bg-[#a9bdd1] p-10 ">
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
