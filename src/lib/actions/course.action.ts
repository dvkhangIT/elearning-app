"use server";
import {
  TCourseUpdateContent,
  TCreateCouseParams,
  TUpdateCourseParams,
} from "@/app/types";
import Course, { ICourse } from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import { revalidatePath } from "next/cache";
import { connectionToDatabase } from "../mongoose";
// fetching
export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCourseUpdateContent | undefined> {
  try {
    connectionToDatabase();
    const findCourse = await Course.findOne({ slug }).populate({
      path: "lectures",
      model: Lecture,
      select: "_id title",
      match: {
        _destroy: false,
      },
      populate: {
        path: "lessons",
        model: Lesson,
        match: {
          _destroy: false,
        },
      },
    });
    return findCourse;
  } catch (error) {
    console.log(`🚀 ~ getCourseBySlug ~ error:`, error);
  }
}
export async function getAllCourse(): Promise<ICourse[] | undefined> {
  try {
    connectionToDatabase();
    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.log(`🚀 ~ getAllCourse ~ error:`, error);
  }
}

// crud
export async function createCourse(params: TCreateCouseParams) {
  try {
    await connectionToDatabase();
    const existCourse = await Course.findOne({ slug: params.slug });
    if (existCourse) {
      return {
        success: false,
        message: "Đường dẫn khóa học đã tồn tại!",
      };
    }
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(`🚀 ~ createCourse ~ error:`, error);
  }
}
export async function updateCourse(params: TUpdateCourseParams) {
  try {
    connectionToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || "/");
    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (error) {
    console.log(`🚀 ~ updateCourse ~ error:`, error);
  }
}
