import ContactUsPage from "@/components/contact-us/ContactUsPage";





// src/app/contact/page.js
export const metadata = {
  title: "Contact Us",
  description:
    "Contact the Care.io team for questions about child care, elder care and family care services. Email, call or send a message and we will help you find the right care.",

  keywords: [
    "contact Care.io",
    "care service support",
    "book a caregiver",
    "care services Khulna",
    "child care inquiry",
    "elder care inquiry",
  ],

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    type: "website",
    url: "/contact",
    siteName: "Care.io",
    title: "Contact Us | Care.io",
    description:
      "Have questions about our care services? Our team is here to help you find the right care solution for your family.",
     images: ["/opengraph-image.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Care.io",
    description:
      "Questions about our care services? Reach the Care.io team by email, phone or message.",
     images: ["/opengraph-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default function Page() {
  return <ContactUsPage />;
}