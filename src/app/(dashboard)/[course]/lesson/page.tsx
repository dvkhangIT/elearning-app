import PageNotFound from "@/app/not-found";
import LessonItem from "@/components/lesson/LessonItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { ILesson } from "@/database/lesson.model";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { findAllLesson, getLessonBySlug } from "@/lib/actions/lesson.action";
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
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex items-center">
          <LessonNavigation
            course={course}
            nextLesson={
              !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
            }
            prevLesson={
              !prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`
            }
          ></LessonNavigation>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-5">
          {lectures.map((lecture: any) => (
            <Accordion collapsible type="single" key={lecture._id}>
              <AccordionItem value={lecture._id.toString()}>
                <AccordionTrigger>
                  <div className="flex gap-3 items-center w-full justify-between pr-5">
                    <div>{lecture.title}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className=" !bg-transparent border-none p-0">
                  <div className="flex flex-col gap-5 mt-5">
                    {lecture.lessons.map((lesson: ILesson) => (
                      <LessonItem
                        key={lesson._id}
                        lesson={lesson}
                        url={lesson.slug}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
