import { allUsers } from "@/action/server/users";

import React from "react";
import UsersInformation from "../../../../dashboard-layout-components/UsersInformation";
export const metadata = {
  title: "All Users",
};
const AllUsers = async () => {
  const users = await allUsers();
  console.log("users");
  const userInfo = users.map((user) => ({ ...user, _id: user._id.toString() }));
  return <UsersInformation users={userInfo} />;
};

export default AllUsers;
