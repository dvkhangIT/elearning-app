"user server";

import User, { IUser } from "@/database/user.model";
import { connectionToDatabase } from "../mongoose";

export default async function createUser(params: IUser) {
  try {
    connectionToDatabase();
    const newUser = await new User(params);
    return new newUser();
  } catch (error) {
    //
  }
}
