import { TUpdateCourseLecture } from "@/app/types";
import LessonItem from "@/components/lesson/LessonItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { ILesson } from "@/database/lesson.model";

const LessonContent = ({
  lectures,
  course,
  slug,
}: {
  lectures: TUpdateCourseLecture[];
  course?: string;
  slug?: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((lecture: any) => (
        <Accordion collapsible type="single" key={lecture._id}>
          <AccordionItem value={lecture._id.toString()}>
            <AccordionTrigger>
              <div className="flex gap-3 items-center w-full justify-between pr-5">
                <div className="line-clamp-1">{lecture.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className=" !bg-transparent border-none p-0">
              <div className="flex flex-col gap-5 mt-5">
                {lecture.lessons.map((lesson: ILesson) => (
                  <LessonItem
                    key={lesson._id}
                    lesson={lesson}
                    url={!course ? "" : `/${course}/lesson?slug=${lesson.slug}`}
                    isActive={!slug ? false : lesson.slug === slug}
                  ></LessonItem>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default LessonContent;
