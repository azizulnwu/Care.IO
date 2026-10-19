"use server";
import { collections, dbConnection } from "@/lib/dbConnection";
import { ObjectId } from "mongodb";

export const serviceOptions = async () => {
  const result = await dbConnection(collections.SERVICE).find().toArray();

  return result;
};

export const serviceDetails = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await dbConnection(collections.SERVICE).findOne(query);
  return result;
};
