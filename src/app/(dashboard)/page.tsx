import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import React from "react";

const page = async () => {
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
