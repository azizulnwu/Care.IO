import MyProfilePage from "@/components/my-profile/MyProfilePage";


// src/app/my-profile/page.js
export const metadata = {
  title: "My Profile",
  description:
    "View and manage your Care.io account details, contact information and profile photo.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
  },
};

export default function Page() {
  return <MyProfilePage />;
}