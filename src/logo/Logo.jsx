import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <>
     
        <Image
          alt="care.io"
          src={"/assets/logo.png"}
          width={60}
          height={50}
        ></Image>
        {/* <h1 className="text-xl font-bold">
          <span className="text-blue-600">CARE</span>
          <span className="text-green-400">.IO</span>
        </h1> */}
     
    </>
  );
};

export default Logo;
