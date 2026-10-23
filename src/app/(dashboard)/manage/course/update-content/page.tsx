import Heading from "@/components/common/Heading";
import CourseUpdateContent from "@/components/course/CourseUpdateContent";
import { getCourseBySlug } from "@/lib/actions/course.action";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    slug: string;
  };
}) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug });
  if (!findCourse) return <div>Không tìm thấy khóa học</div>;
  return (
    <div>
      <Heading className="mb-10">
        Nội dung: <strong className=" text-primary">{findCourse.title}</strong>
      </Heading>
      <CourseUpdateContent
        course={JSON.parse(JSON.stringify(findCourse))}
      ></CourseUpdateContent>
    </div>
  );
};

export default page;
