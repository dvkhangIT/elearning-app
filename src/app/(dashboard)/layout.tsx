import Sidebar, { MenuItem } from "@/components/layout/Sidebar";
import { menuItems } from "@/constants";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper block lg:grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen lg:pb-0 pb-20">
      <Sidebar />
      <ul
        className="flex justify-center h-16 border-t fixed bgDarkMode borderDarkMode bottom-0 left-0 w-full lg:hidden gap-5 items-center
      "
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
            onlyIcon
          ></MenuItem>
        ))}
      </ul>
      <div className="hidden lg:block"></div>
      <main className="p-5">{children}</main>
    </div>
  );
};

export default layout;
