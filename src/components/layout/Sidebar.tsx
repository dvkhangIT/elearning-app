import React from "react";
import { menuItems } from "@/constants";
import { TMenuItem } from "@/app/types";
import { ActiveLink } from "../common";
import { UserButton } from "@clerk/nextjs";
import ModeToggle from "../common/ModeToggle";
const Sidebar = () => {
  return (
    <div className="border-r border-gray-200 p-5 bg-white flex flex-col dark:bg-grayDarker dark:border-opacity-10">
      <a href="/" className="logo font-bold text-3xl inline-block mb-5">
        <b className="text-primary">E</b>learning
      </a>
      <ul className="flex flex-col gap-2">
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
        <UserButton />
      </div>
    </div>
  );
};
function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}
export default Sidebar;
