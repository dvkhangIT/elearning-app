"use server";

import User, { IUser } from "@/database/user.model";
import { connectionToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/app/types";

export async function createUser(params: TCreateUserParams) {
  try {
    await connectionToDatabase();

    console.log("=== CREATE USER ===");
    console.log("params:", JSON.stringify(params, null, 2));

    const newUser = await User.create(params);

    console.log("=== USER CREATED ===");
    console.log("user id:", newUser._id);
    console.log("clerk id:", newUser.clerkId);
    console.log("email:", newUser.email);
    console.log("username:", newUser.username);

    return newUser;
  } catch (error) {
    console.error("=== CREATE USER ERROR ===");
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
    await connectionToDatabase();

    const findUser = await User.findOne({ clerkId: userId });

    if (!findUser) return null;

    return findUser;
  } catch (error) {
    console.error("getUserInfo error:", error);
    throw error;
  }
}
