"use client";

import Link from "next/link";

export default function MobileDrawerLink({ href, children }) {
  const handleClick = () => {
    const drawer = document.getElementById("dashboard-drawer");

    if (drawer) {
      drawer.checked = false;
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}