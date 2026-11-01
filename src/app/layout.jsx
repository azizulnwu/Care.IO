import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["400", "500", "600", "800", "900"],
});

// src/app/layout.js
const siteUrl = process.env.NEXTAUTH_URL || "https://your-domain.com";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Care.io | Trusted Child, Elderly & Family Care Services",
    template: "Care.io | %s ",
  },

  description:
    "Care.io offers compassionate, reliable and professional care services for children, elderly people and your entire family. Book trusted caregivers by the hour, anytime.",

  applicationName: "Care.io",
  generator: "Next.js",

  keywords: [
    "Care.io",
    "child care",
    "elder care",
    "home care",
    "personal care",
    "special needs care",
    "flexible care plans",
    "caregiver booking",
    "family care services",
    "baby sitting",
    "Bangladesh care service",
  ],

  authors: [{ name: "Care.io Team", url: siteUrl }],
  creator: "Care.io",
  publisher: "Care.io",
  category: "Healthcare & Family Services",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Care.io",
    locale: "en_US",
    title: "Care.io | Trusted Care for Your Loved Ones",
    description:
      "Compassionate and reliable care services for children, elderly people and your entire family. Because every loved one deserves care, comfort and respect.",
    // images: [
    //   {
    //     url: "/og-image.png", // place a 1200x630 image in /public
    //     width: 1200,
    //     height: 630,
    //     alt: "Care.io – Trusted Care for Your Loved Ones",
    //   },
    // ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Care.io | Trusted Care for Your Loved Ones",
    description:
      "Reliable and trusted care service for children, elderly and other family members.",
    // images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  manifest: "/manifest.webmanifest",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Viewport and theme color live in their own export in Next.js 14+
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1479C9" },
    { media: "(prefers-color-scheme: dark)", color: "#132e49" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en" className={`${poppins.className} h-full antialiased`}>
        <body className="min-h-full flex flex-col max-w-[80%] mx-auto mt-2">
          {children}
             <Toaster position="top-right" />
        </body>
      </html>
    </NextAuthProvider>
  );
}
