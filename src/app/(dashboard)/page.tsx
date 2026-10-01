import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import createUser from "@/lib/actions/user.action";
import React from "react";

const page = async () => {
  const user = await createUser({
    clerkId: "clerk_123",
    email_address: "khangduong.dev@gmail.com",
    username: "dvkhang",
  });
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </div>
  );
};
clearInterval;
export default page;
