import { serviceDetails } from "@/action/server/serviceAll";
import Navbar from "@/components/main-layout-components/Navbar";
import ServiceDetailsPage from "@/components/service/ServiceDetailsPage";

const ServiceDetails = async ({ params }) => {
  const { id } = await params;
  const serviceDetailsInfo = await serviceDetails(id);
  // console.log("serviceDetailsInfo", serviceDetailsInfo);
  return (
    <div>
      <main>
        <ServiceDetailsPage
          serviceDetailsInfo={{
            ...serviceDetailsInfo,
            _id: serviceDetailsInfo._id.toString(),
            
          }}
        />
      </main>
    </div>
  );
};

export default ServiceDetails;
