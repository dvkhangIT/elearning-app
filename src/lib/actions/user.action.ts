"use server";

import User, { IUser } from "@/database/user.model";
import { connectionToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/app/types";

export async function createUser(params: TCreateUserParams) {
  try {
    await connectionToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    await connectionToDatabase();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return null;
    return findUser;
  } catch (error) {
    console.log(error);
  }
}
