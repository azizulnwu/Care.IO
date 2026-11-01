import {
  bookingServiceDataForAdmin,
  userBookingServiceData,
} from "@/action/server/bookingServiceData";

import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import DashboardHomePage from "../../../dashboard-layout-components/DashboardHomePage";
// src/app/dashboard/layout.js
export const metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard | Care.io",
  },
  description:
    "Manage your Care.io bookings, track service updates and review your care services from one place.",

  // Private, authenticated area: keep it out of search results and caches
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
  },

  // No canonical, Open Graph or Twitter tags: these pages are not meant to be shared or indexed
};

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
