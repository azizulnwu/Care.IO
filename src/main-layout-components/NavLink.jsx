"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({href,children}) => {
    const pathName = usePathname();
    const isActive = pathName === "/" ? "/" : pathName
    return (
        <div>
            <Link href={href} className={`${isActive === href && "underline underline-offset-2"} `}>
                {children}
            </Link>
        </div>
    );
};

export default NavLink;