"use server";

import { collections, dbConnection } from "@/lib/dbConnection";
import { authOptions } from "@/lib/authOptions";

import { getServerSession } from "next-auth";

export const bookingServices = async (data) => {
  const session = await getServerSession(authOptions);

  const query = {
    serviceName: data.serviceName,
    area: data.area,
    serviceDate: data.date,
  };

  const result = await dbConnection(collections.BOOKINGSERVICES)
    .find(query)
    .toArray();

  if (result.length >= 10) {
    return {
      success: false,
      message:
        "No available slots for the selected service in on date.Pls. Change date or service in selected area or try to another area",
    };
  }

  const bookingServiceData = {
    status: "pending",
    userEmail: session?.user?.email,
    userName: session?.user?.name,
    serviceName: data.serviceName,
    totalPrice: data.total,
    hours: data.hours,
    district: data.district,
    area: data.area,
    address: data.address,
    phone: data.phone,
    trackingNumber: `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    serviceDate: new Date().toISOString().split("T")[0],
    createTimeAt: new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };

  const insertResult = await dbConnection(
    collections.BOOKINGSERVICES,
  ).insertOne(bookingServiceData);
  if (insertResult.acknowledged) {
    await dbConnection(collections.BOOKINGSERVICESFORADMIN).insertOne(
      bookingServiceData,
    );
    return { success: true, message: "Service booked successfully." };
  } else {
    return { success: false, message: "Failed to book service." };
  }
};
