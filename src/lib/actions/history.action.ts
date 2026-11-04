"use server";

import { TCreateHistoryParams } from "@/app/types";
import History, { IHistory } from "@/database/history.model";
import User from "@/database/user.model";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { connectionToDatabase } from "../mongoose";

export async function createHistory(params: TCreateHistoryParams) {
  try {
    connectionToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return;
    if (params.checked) {
      await History.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    } else {
      await History.findOneAndDelete({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    }
    revalidatePath(params.path);
    console.log("path", params.path);
  } catch (error) {
    console.log(`🚀 ~ error:`, error);
  }
}
export async function getHistory(params: {
  course: string;
}): Promise<IHistory[] | undefined> {
  try {
    connectionToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return;
    const histories = await History.find({
      course: params.course,
      user: findUser._id,
    });
    return histories;
  } catch (error) {
    console.log(`🚀 ~ error:`, error);
  }
}
