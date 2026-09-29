"use client";
import { TActiveLinkProps } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({ url, children }: TActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = url === pathname;
  return (
    <Link
      className={`p-3 rounded-md flex items-center gap-3 ${isActive ? "text-white bg-primary svg-animate" : "hover:text-primary hover:bg-primary hover:bg-opacity-10 transition-all"}`}
      href={url}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
