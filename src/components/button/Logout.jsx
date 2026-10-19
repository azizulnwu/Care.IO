"use client";
import { signOut } from "next-auth/react";
const Logout = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <button
        className="btn shadow-md border-none bg-[#59a2df] px-6 text-white hover:bg-[#2c7cb9]"
        onClick={() => handleLogout()}
      >
        Sign out
      </button>
    </div>
  );
};

export default Logout;
