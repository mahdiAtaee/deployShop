/* eslint-disable react/prop-types */
import React from 'react'

import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ children, ...rest }) => {
    const { href, containerClass } = rest;
    const pathName = usePathname();

    const isActive = pathName === href;
    return (
        <Link {...rest} className={`${containerClass} ${isActive ? "active" : ""}`}>
            {children}
        </Link>
    );
};

export default ActiveLink;