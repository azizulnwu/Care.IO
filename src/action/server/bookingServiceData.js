"use server";

import { collections, dbConnection } from "@/lib/dbConnection";
import { ObjectId } from "mongodb";

export const bookingServiceData = async () => {
  const result = await dbConnection(collections.BOOKINGSERVICES)
    .find()
    .sort({ createTimeAt: -1 })
    .toArray();
  //   console.log(result)
  return result;
};
export const userBookingServiceData = async (email) => {
  const query = { userEmail: email };
  const result = await dbConnection(collections.BOOKINGSERVICES)
    .find(query)
    .sort({ createTimeAt: -1 })
    .toArray();
  //   console.log(result)
  return result;
};

export const bookingServiceStatusUpdate = async (id, status) => {
  console.log(id, status);
  const result = await dbConnection(collections.BOOKINGSERVICES).updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: status } },
  );
  return result;
};

export const deleteBookingService = async (id) => {
  const result = await dbConnection(collections.BOOKINGSERVICES).deleteOne({
    _id: new ObjectId(id),
  });
  console.log(result);
  return result;
};

// admin section

export const bookingServiceDataForAdmin = async () => {
  const result = await dbConnection(collections.BOOKINGSERVICESFORADMIN)
    .find()
    .sort({ createTimeAt: -1 })
    .toArray();
  //   console.log(result)
  return result;
};

export const bookingServiceStatusUpdateForAdmin = async (id, status) => {
  console.log(id, status);
  const result = await dbConnection(
    collections.BOOKINGSERVICESFORADMIN,
  ).updateOne({ _id: new ObjectId(id) }, { $set: { status: status } });
  return result;
};

export const deleteBookingServiceForAdmin = async (id) => {
  const result = await dbConnection(
    collections.BOOKINGSERVICESFORADMIN,
  ).deleteOne({ _id: new ObjectId(id) });
  console.log(result);
  return result;
};
