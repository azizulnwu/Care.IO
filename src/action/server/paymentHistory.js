"use server";

import authOptions from "@/lib/authOptions";
import { collections, dbConnection } from "@/lib/dbConnection";
import { sendBookingConfirmation } from "@/lib/mailer";
import { getServerSession } from "next-auth";

// import authOptions and your payments collection helper
export const savePayments = async (session) => {
  console.log("server", session);
  const alreadySaved = await dbConnection(collections.PAYMENTHISTORY).findOne({
    paymentToken: session?.id,
  });
  if (alreadySaved) {
    return { success: true, message: "Payment already saved." };
  }
  const paymentInfo = {
    userName: session?.customer_details?.name,
    userEmail: session?.customer_details?.email,
    userContractNumber: session?.metadata.phone,
    paymentCountry: session?.customer_details.address.country,
    paymentToken: session?.id,
    purchaseService: session?.metadata.category,
    purchaseServiceArea: session?.metadata.area,
    paymentCurrency: session?.currency,
    paymentAmount: session?.amount_total,
    paymentStatus: session?.payment_status,
    paymentMethod: session?.payment_method_types[0],
    createAt: new Date().toISOString(),
  };
  const result = await dbConnection(collections.PAYMENTHISTORY).insertOne(
    paymentInfo,
  );
  if (result.acknowledged) {
    const m = session.metadata || {};

    await sendBookingConfirmation({
      to: session.customer_details.email,
      name: session.customer_details.name,
      booking: {
        category: m.category,
        date: m.date,
        time: m.time,
        hours: m.hours,
        area: m.area,
        district: m.district,
        address: m.address,
        phone: m.phone,
        notes: m.notes,
        ref: session.id.slice(-8).toUpperCase(),
        paymentStatus:
          session.payment_status === "paid" ? "Paid" : session.payment_status,
        totalCost: `${(session.amount_total / 100).toFixed(2)} ${session.currency.toUpperCase()}`,
      },
    });
  } else {
    return { success: false, message: "Failed to save payment history" };
  }
};

export const getMyPayments = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];
  const payments = await dbConnection(collections.PAYMENTHISTORY)
    .find() // only this user's payments
    .sort({ createAt: -1 })
    .toArray();

  return payments.map((p) => ({ ...p, _id: p._id.toString() }));
};
