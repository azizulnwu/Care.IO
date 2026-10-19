
import {
  bookingServiceDataForAdmin,
  userBookingServiceData,
} from "@/action/server/bookingServiceData";
import DashboardHomePage from "@/components/dashbord-layout-components/DashboardHomePage";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const DashboardHome = async () => {
  const session = await getServerSession(authOptions);

  const results =
    session?.user?.role === "user"
      ? await userBookingServiceData(session.user.email)
      : await bookingServiceDataForAdmin();

  // MongoDB data safely serialize
  const bookings = (results || []).map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
  }));

  return <DashboardHomePage data={bookings} />;
};

export default DashboardHome;
