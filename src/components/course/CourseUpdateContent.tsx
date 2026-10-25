"use client";
import { TCourseUpdateContent } from "@/app/types";
import { cn } from "@/app/utils/common";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassName } from "@/constants";
import { ILecture } from "@/database/lecture.model";
import { createLecture, updateLecture } from "@/lib/actions/lecture.action";
import { MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { IconCheck, IconClose, IconDelete, IconEdit } from "../icons";
import { Button } from "../ui";
import { Input } from "../ui/input";
const CourseUpdateContent = ({ course }: { course: TCourseUpdateContent }) => {
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
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateLecture({
            lectureId,
            updateData: {
              _destroy: true,
              path: `/manage/course/update-content?slug=${course.slug}`,
            },
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/course/update-content?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        setlectureEdit("");
        setlectureIdEdit("");
        toast.success("Cập nhật chương mới thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [lectureEdit, setlectureEdit] = useState("");
  const [lectureIdEdit, setlectureIdEdit] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture: ILecture) => (
          <Accordion
            collapsible={!lectureIdEdit}
            type="single"
            key={lecture._id}
          >
            <AccordionItem value={lecture._id}>
              <AccordionTrigger>
                <div className="flex gap-3 items-center w-full justify-between pr-5">
                  {lecture._id === lectureIdEdit ? (
                    <>
                      <div className="w-full">
                        <Input
                          placeholder="Tên chương"
                          defaultValue={lecture.title}
                          onChange={(e) => setlectureEdit(e.target.value)}
                        ></Input>
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={cn(
                            commonClassName.action,
                            "text-green-500",
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateLecture(e, lecture._id);
                          }}
                        >
                          <IconCheck />
                        </span>
                        <span
                          className={cn(commonClassName.action, "text-red-500")}
                          onClick={(e) => {
                            e.stopPropagation();
                            setlectureIdEdit("");
                          }}
                        >
                          <IconClose />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>{lecture.title}</div>
                      <div className="flex gap-2">
                        <span
                          className={cn(
                            commonClassName.action,
                            "text-blue-500",
                          )}
                          onClick={(e) => {
                            setlectureIdEdit(lecture._id);
                          }}
                        >
                          <IconEdit />
                        </span>
                        <span
                          className={cn(commonClassName.action, "text-red-500")}
                          onClick={(e) => handleDeleteLecture(e, lecture._id)}
                        >
                          <IconDelete />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
