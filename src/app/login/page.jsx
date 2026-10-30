import LoginPage from "@/components/login/LoginPage";
import { Suspense } from "react";


export const metadata = {
  title: "Sign In",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}