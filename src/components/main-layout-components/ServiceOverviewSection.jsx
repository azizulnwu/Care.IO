import { serviceOptions } from "@/action/server/serviceAll";

import ServiceOverview from "../service/ServiceOverview";

const ServiceOverviewSection = async () => {
  const services = [];
  const data = await serviceOptions();
  services.push(
    data.map((service) => ({ ...service, _id: service._id.toString()})),
  );
  // console.log(services);
  return (
    <div>
      <ServiceOverview services={services}></ServiceOverview>
    </div>
  );
};

export default ServiceOverviewSection;
