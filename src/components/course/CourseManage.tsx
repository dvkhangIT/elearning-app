"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Heading from "../common/Heading";
import Image from "next/image";
import { commonClassName, courseStatus } from "@/constants";
import { cn } from "@/app/utils/common";
import { IconDelete, IconEdit, IconEye, IconStudy } from "../icons";
import Link from "next/link";
import { ICourse } from "@/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.action";
import { ECourseStatus } from "@/app/types/enums";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
const IconArrowLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
    />
  </svg>
);
const IconArrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>
);
const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      await updateCourse({
        slug,
        updateData: {
          status: ECourseStatus.PENDING,
          _destroy: true,
        },
        path: "/manage/course",
      });
      if (result.isConfirmed) toast.success("Xóa khóa học thành công!");
    });
  };
  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to change this course status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    try {
      const newStatus =
        status === ECourseStatus.PENDING
          ? ECourseStatus.APPROVED
          : ECourseStatus.PENDING;

      const response = await updateCourse({
        slug,
        updateData: {
          status: newStatus,
          _destroy: false,
        },
        path: "/manage/course",
      });

      if (response?.success) {
        toast.success("Cập nhật trạng thái thành công!");
      } else {
        toast.error(response?.message || "Cập nhật trạng thái thất bại!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      toast.error("Có lỗi xảy ra khi cập nhật!");
    }
  };
  return (
    <>
      <Link
        href="/manage/course/new"
        className="flexCenter size-10 rounded-full bg-primary text-white fixed right-5 bottom-5 animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
      <div className="flex lg:items-center justify-between mb-10 lg:flex-row gap-5">
        <Heading className="mb-10">Quản lý khóa học</Heading>
        <div className="w-full lg:w-[300px]">
          <Input placeholder="Tìm kiếm khóa học..."></Input>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 &&
            courses.map((course, index) => {
              const courseStatusItem = courseStatus.find(
                (item) => item.value === course.status,
              );
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={80}
                        height={80}
                        className="object-cover size-16 flex-shrink-0"
                      ></Image>
                      <div className="flex gap-1 flex-col">
                        <h3 className="font-bold text-sm lg:text-base whitespace-normal">
                          {course.title}
                        </h3>
                        <h4 className="text-sm text-slate-500">
                          {new Date(course.created_at).toLocaleDateString(
                            "vi-VI",
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-sm lg:text-base">
                      {course.price.toLocaleString()}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() =>
                        handleChangeStatus(course.slug, course.status)
                      }
                      className={cn(
                        commonClassName.status,
                        courseStatusItem?.className,
                      )}
                    >
                      {courseStatusItem?.title}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        href={`/manage/course/update-content?slug=${course.slug}`}
                        className={commonClassName.action}
                      >
                        <IconStudy />
                      </Link>
                      <Link
                        target="_blank"
                        href={`/course/${course.slug}`}
                        className={commonClassName.action}
                      >
                        <IconEye />
                      </Link>
                      <Link
                        target="_blank"
                        href={`/manage/course/update?slug=${course.slug}`}
                        className={commonClassName.action}
                      >
                        <IconEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(course.slug)}
                        className={commonClassName.action}
                      >
                        <IconDelete />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button className={commonClassName.paginationButton}>
          {IconArrowLeft}
        </button>
        <button className={commonClassName.paginationButton}>
          {IconArrowRight}
        </button>
      </div>
    </>
  );
};

export default CourseManage;
