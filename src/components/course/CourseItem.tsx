import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconClock, IconEye, IconStar } from "../icons";

const courseInfo = [
  {
    title: "3000",
    icon: (className?: string) => <IconEye className={className}></IconEye>,
  },
  {
    title: "5.0",
    icon: (className?: string) => <IconStar className={className}></IconStar>,
  },
  {
    title: "3h25p",
    icon: (className?: string) => <IconClock className={className}></IconClock>,
  },
];

const CourseItem = () => {
  return (
    <div className="bg-white border-gray-500 p-4 rounded-lg dark:bg-grayDarker dark:border-opacity-10">
      <Link href="#" className="block h-[180px] relative">
        <Image
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media(min-width:640px) 300px,100vw"
        ></Image>
        <span className=" absolute text-white bg-green-500 inline-block top-3 right-3 z-10 font-medium rounded-full text-xs py-1 px-3">
          New
        </span>
      </Link>
      <div className="pt-4">
        <h3 className="font-bold text-lg mb-5">
          Khóa học NextJs Pro - Xây dựng E-learning system hoàn chỉnh
        </h3>
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark">
          {courseInfo.map((item, index) => (
            <div key={index} className="flex items-center justify-center gap-2">
              {item.icon("size-4")}
              {item.title}
            </div>
          ))}
          <span className="font-bold text-primary ml-auto text-base">
            799.000
          </span>
        </div>
        <Link
          href="#"
          className="flex items-center justify-center mt-10 text-white bg-primary w-full h-12 rounded-lg font-semibold"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
