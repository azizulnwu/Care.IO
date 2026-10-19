import { notFound } from "next/navigation";
import { serviceDetails } from "@/action/server/serviceAll";
import locations from "@/data/serviceLocation.json";
import { RATES } from "@/lib/pricing";
import BookingPage from "@/components/booking/BookingPage";


const Booking = async ({ params }) => {
  const { id } = await params;
//   console.log("Booking page params id:", id);
  const service = await serviceDetails(id);

  if (!service || !service.isActive || !RATES[service.category]) notFound();

  const districts = locations
    .filter((l) => l.status === "active")
    .map((l) => ({ district: l.district, areas: l.covered_area }));

  return (
    <BookingPage
      service={{
        _id: service._id.toString(),
        title: service.title,
        category: service.category,
        features: service.features || [],
        rate: RATES[service.category],
      }}
      districts={districts}
    />
  );
};

export default Booking;