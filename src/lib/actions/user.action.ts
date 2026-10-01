"use server";

import User, { IUser } from "@/database/user.model";
import { connectionToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/app/types";

export default async function createUser(params: TCreateUserParams) {
  try {
    connectionToDatabase();
    const newUser = await User.create(params);
    return new newUser();
  } catch (error) {
    console.log(error);
  }
}
