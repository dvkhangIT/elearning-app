import PageNotFound from "@/app/not-found";
import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import { Button } from "@/components/ui";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { getLessonBySlug } from "@/lib/actions/lesson.action";

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
  const course = params.course;
  const slug = searchParams.slug;
  if (!course || !slug) return <PageNotFound />;
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const lessonDetails = await getLessonBySlug({
    slug,
    course: findCourse?._id.toString() || "",
  });
  if (!lessonDetails) return null;
  const videoId = lessonDetails.video_url.split("v=").at(-1);
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
        <div className="flex items-center justify-center">
          <div className="flex gap-3">
            <Button className="size-10 p-1">
              <IconLeftArrow></IconLeftArrow>
            </Button>
            <Button className="size-10 p-1">
              <IconRightArrow></IconRightArrow>
            </Button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;
