import PageNotFound from "@/app/not-found";
import Heading from "@/components/common/Heading";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui";
// import { ILesson } from "@/database/lesson.model";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { findAllLesson, getLessonBySlug } from "@/lib/actions/lesson.action";
import LessonContent from "./LessonContent";
import LessonNavigation from "./LessonNavigation";
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
  const lessonDetails = await getLessonBySlug({
    slug,
    course: courseId || "",
  });
  if (!lessonDetails) return null;
  const lessonList = await findAllLesson({ course: courseId });
  const currentLessonIndex =
    lessonList?.findIndex((el) => el.slug === lessonDetails.slug) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const prevLesson = lessonList?.[currentLessonIndex - 1];
  const videoId = lessonDetails?.video_url?.split("v=").at(-1);
  const lectures = findCourse.lectures || [];
  return (
    <div className="grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex items-center mb-10">
          <LessonNavigation
            course={course}
            nextLesson={
              !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
            }
            prevLesson={
              !prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`
            }
          ></LessonNavigation>
          <div></div>
        </div>
        <Heading className="mb-10">{lessonDetails.title}</Heading>
        <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}
          ></div>
        </div>
      </div>
      <div className="sticky top-5 right-0">
        <LessonContent
          course={course}
          slug={slug}
          lectures={lectures}
        ></LessonContent>
      </div>
    </div>
  );
};

export default page;
