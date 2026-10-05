import PageNotFound from "@/app/not-found";
import { EUserRole } from "@/app/types/enums";
import { getUserInfo } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { use } from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  const user = await getUserInfo({ userId });
  if (user && user.role !== EUserRole.ADMIN)
    return <PageNotFound></PageNotFound>;
  return <div>{children}</div>;
};

export default AdminLayout;
