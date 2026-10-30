import { collections, dbConnection } from "@/lib/dbConnection";

export const allUsers = async () => {
  const result = await dbConnection(collections.USERS)
    .find()
    .sort({ createAt: -1 })
    .toArray();
    console.log(result)
  return result;
};
