import { getMyPayments } from "@/action/server/paymentHistory";
import PaymentHistory from "../../../../dashboard-layout-components/PaymentHistory";

export const metadata = {
  title: "Payment History",
};

export default async function PaymentHistoryPage() {
  const payments = await getMyPayments();

  return (
    <div className="p-4">
      <PaymentHistory payments={payments} />
    </div>
  );
}
