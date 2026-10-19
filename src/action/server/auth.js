"use server";
import { collections, dbConnection } from "@/lib/dbConnection";
import bcrypt from "bcryptjs";
export const registerUser = async (data) => {
  const query = { email: data.email, provider: data.provider };
  const result = await dbConnection(collections.USERS).findOne(query);
  if (result) {
    return { success: false, message: "User with this email already exists." };
  }

  const insertResult = await dbConnection(collections.USERS).insertOne(data);
  if (insertResult.acknowledged) {
    return { success: true, message: "User registered successfully." };
  } else {
    return { success: false, message: "Failed to register user." };
  }
};

export const loginUser = async (email, password) => {
  const query = { email: email, provider: "credentials" };

  const user = await dbConnection(collections.USERS).findOne(query);

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("isMatch", isMatch);
  if (isMatch) {
    return user;
  } else {
    return null;
  }
};
