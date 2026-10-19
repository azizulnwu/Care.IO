import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "800", "900"],
});

export const metadata = {
  title: "Care.io",
  description:
    "Reliable and trusted care service for children, elderly and other members",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en" className={`${poppins.className} h-full antialiased`}>
        <body className="min-h-full flex flex-col max-w-[80%] mx-auto mt-2">
          {children}
        </body>
      </html>
    </NextAuthProvider>
  );
}
