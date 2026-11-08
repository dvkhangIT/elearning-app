"use server";

import { TCreateUserParams } from "@/app/types";
import { ICourse } from "@/database/course.model";
import User, { IUser } from "@/database/user.model";
import { auth } from "@clerk/nextjs/server";
import { connectionToDatabase } from "../mongoose";

export async function createUser(params: TCreateUserParams) {
  try {
    connectionToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    connectionToDatabase();

    const findUser = await User.findOne({ clerkId: userId });

    if (!findUser) return null;
    return findUser;
  } catch (error) {
    console.error("getUserInfo error:", error);
    throw error;
  }
}
export async function getUserCourse(): Promise<ICourse[] | undefined | null> {
  try {
    connectionToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId }).populate(
      "courses",
    );
    if (!findUser) return null;
    return findUser.courses;
  } catch (error) {
    console.log(error);
  }
}
