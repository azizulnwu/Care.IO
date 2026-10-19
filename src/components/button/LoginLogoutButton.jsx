"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const LoginLogoutButton = () => {
const { data: session, status }= useSession();
  console.log(session.user);
  return (
    <div>
     
    </div>
  );
};

export default LoginLogoutButton;
