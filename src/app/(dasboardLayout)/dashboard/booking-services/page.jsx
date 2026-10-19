import { bookingServiceDataForAdmin } from "@/action/server/bookingServiceData";
import BookingService from "@/components/dashbord-layout-components/BookingService";

const BookingAllServiceData = async () => {
  const data = await bookingServiceDataForAdmin();

  return (
    <div className="space-y-6">
      {data?.map((booking) => (
        <BookingService
          key={booking._id.toString()}
          booking={{
            ...booking,
            _id: booking._id.toString(),
          }}
        />
      ))}
    </div>
  );
};

export default BookingAllServiceData;
