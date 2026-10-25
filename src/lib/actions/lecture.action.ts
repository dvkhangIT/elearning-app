"use server";
import { TCreateLectureParams, TUpdateLectureParams } from "@/app/types";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";
import { connectionToDatabase } from "../mongoose";
export async function createLecture(params: TCreateLectureParams) {
  try {
    connectionToDatabase();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function updateLecture(params: TUpdateLectureParams) {
  try {
    connectionToDatabase();
    const res = await Lecture.findByIdAndUpdate(
      params.lectureId,
      params.updateData,
      {
        new: true,
      },
    );
    revalidatePath(params.updateData.path || "/");
    if (!res) return;
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
