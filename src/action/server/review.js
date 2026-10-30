"use server";
import { collections, dbConnection } from "@/lib/dbConnection";
import { authOptions } from "@/lib/authOptions";

import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export const userReview = async (serviceCategory, rating, review) => {
  const session = await getServerSession(authOptions);
  console.log(review);
  const reviewData = {
    serviceCategory,
    rating,
    review,
    userEmail: session?.user?.email,
    userName: session?.user?.name,
    reviewDate: new Date().toISOString().split("T")[0],
    reviewTimeAt: new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
  const result = await dbConnection(collections.USERREVIEWS).insertOne(
    reviewData,
  );
  if (result.acknowledged) {
    return { success: true, message: "Review saved successfully." };
  } else {
    return { success: false, message: "Failed to saved review." };
  }
};

export const myAllReview = async () => {
  const session = await getServerSession(authOptions);
//   console.log("myReview",session)
  const query = { userEmail: session?.user?.email };
  const myReview = await dbConnection(collections.USERREVIEWS)
    .find(query)
    .sort({ reviewDate: -1,  reviewTimeAt: -1 })
    .toArray();
  return myReview;
};

export const myReviewDelete = async (id)=>{
    const query = {_id :new ObjectId(id)};
    const result = await dbConnection(collections.USERREVIEWS).deleteOne(query);
    return result
}