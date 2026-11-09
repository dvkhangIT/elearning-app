import Heading from "@/components/common/Heading";
import { getUserCourse } from "@/lib/actions/user.action";
import StudyCourse from "./StudyCourse";
const page = async () => {
  const courses = await getUserCourse();
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourse
        courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
      ></StudyCourse>
    </>
  );
};

export default page;
