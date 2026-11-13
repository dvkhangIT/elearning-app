import { ECourseStatus } from "@/app/types/enums";
import CourseManage from "@/components/course/CourseManage";
import { getAllCourse } from "@/lib/actions/course.action";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: ECourseStatus;
  };
}) => {
  const courses = await getAllCourse({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search || "",
    status: searchParams.status || ECourseStatus.APPROVED,
  });
  return (
    <>
      <CourseManage
        courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
      ></CourseManage>
    </>
  );
};

export default page;
