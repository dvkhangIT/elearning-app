import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { getHistory } from "@/lib/actions/history.action";
import { countLessonByCourseId } from "@/lib/actions/lesson.action";
import LessonContent from "../LessonContent";

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  const course = params.course.toString();
  const slug = searchParams.slug;
  if (!course || !slug) return <PageNotFound />;
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const histories = await getHistory({ course: courseId });
  const lectures = findCourse.lectures || [];
  const lessonCount = await countLessonByCourseId({ courseId });
  const completePercentage =
    ((histories?.length || 0) / (lessonCount || 1)) * 100;
  return (
    <div className="sticky top-5 right-0">
      <div className="h-3 bgDarkMode mb-2 rounded-full border borderDarkMode">
        <div
          className="w-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
          style={{
            width: `${completePercentage}%`,
          }}
        ></div>
      </div>
      <LessonContent
        course={course}
        slug={slug}
        lectures={lectures}
        histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
      ></LessonContent>
    </div>
  );
};

export default page;
