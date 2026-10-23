"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassName } from "@/constants";
import React, { MouseEvent } from "react";
import { IconDelete, IconEdit } from "../icons";
import { Input } from "../ui/input";
import { Button } from "../ui";
import { createLecture, updateLecture } from "@/lib/actions/lecture.action";
import { toast } from "react-toastify";

const CourseUpdateContent = ({ course }: { course: any }) => {
  const lectures = course.lectures;
  const handleAddNewLecture = async () => {
    const res = await createLecture({
      title: "Chương mới",
      course: course._id,
      order: lectures.length + 1,
      path: `/manage/course/update-content?slug=${course.slug}`,
    });
    if (res?.success) {
      toast.success("Thêm chương mới thành công!");
    }
  };
  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          _destroy: true,
          path: `/manage/course/update-content?slug=${course.slug}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {lectures.map((lecture: any) => (
        <Accordion collapsible type="single" key={lecture._id}>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex gap-3 items-center w-full justify-between pr-5">
                <div>Chương 1: Giới thiệu khóa học</div>
                {/* <div className="w-full">
                <Input placeholder="Tên chương"></Input>
              </div> */}
                <div className="flex gap-2">
                  <span className={commonClassName.action}>
                    <IconEdit />
                  </span>
                  <span
                    className={commonClassName.action}
                    onClick={(e) => handleDeleteLecture(e, lecture._id)}
                  >
                    <IconDelete />
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}

      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
