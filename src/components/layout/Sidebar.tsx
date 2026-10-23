"use client";
import React from "react";
import { menuItems } from "@/constants";
import { TMenuItem } from "@/app/types";
import { ActiveLink } from "../common";
import { useAuth, UserButton } from "@clerk/nextjs";
import ModeToggle from "../common/ModeToggle";
import { IconUsers } from "../icons";
import Link from "next/link";
import Image from "next/image";
const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className="hidden border-r p-5 lg:flex flex-col dark:bg-grayDarker fixed top-0 bottom-0 left-0 w-[300px] borderDarkMode bgDarkMode">
      <a href="/" className="logo font-bold text-3xl mb-5 flex items-center">
        <span>
          <Image
            alt="logo"
            src="/logo.png"
            width={25}
            height={25}
            className="w-auto h-auto"
          ></Image>
        </span>
        <span className="text-primary">learning</span>
      </a>
      <ul className="flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          ></MenuItem>
        ))}
      </ul>
      <div className="flex justify-end items-center mt-auto gap-2">
        <ModeToggle></ModeToggle>
        {!userId ? (
          <Link
            href="/sign-in"
            className="size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1"
          >
            <IconUsers></IconUsers>
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};
export function MenuItem({ url = "/", title = "", icon, onlyIcon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  );
}
export default Sidebar;
