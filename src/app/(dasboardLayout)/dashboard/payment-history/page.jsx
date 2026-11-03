import { getMyPayments } from "@/action/server/paymentHistory";
import PaymentHistory from "../../../../dashboard-layout-components/PaymentHistory";

export const metadata = {
  title: "Payment History",
};

export default async function PaymentHistoryPage() {
  const payments = await getMyPayments();

  return (
    <div className="min-w-0 flex-1 overflow-x-hidden p-4">
      <PaymentHistory payments={payments} />
    </div>
  );
}
