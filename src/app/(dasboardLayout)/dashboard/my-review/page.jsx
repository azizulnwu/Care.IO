import { myAllReview } from "@/action/server/review";

import React from "react";
import MyReviewPage from "../../../../dashboard-layout-components/MyReviewPage";

export const metadata = {
  title: "My Review",
};

const MyReview = async () => {
  const data = await myAllReview();
  const myReview = data.map((myReview) => ({
    ...myReview,
    _id: myReview._id.toString(),
  }));

  return <MyReviewPage reviews={myReview} />;
};

export default MyReview;
