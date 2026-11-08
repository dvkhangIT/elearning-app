"use client";
import { cn } from "@/app/utils/common";
import { createHistory } from "@/lib/actions/history.action";
import Link from "next/link";
import { IconPlay } from "../icons";
import { Checkbox } from "../ui";

const LessonItem = ({
  lesson,
  url,
  isActive,
  isChecked = false,
}: {
  lesson: {
    title: string;
    duration: number;
    course: string;
    _id: string;
  };
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      const res = await createHistory({
        course: lesson.course,
        lesson: lesson._id,
        checked,
        path: url || "/",
      });
    } catch (error) {
      console.log(`🚀 ~ error:`, error);
    }
  };
  return (
    <div
      className={cn(
        "flex items-center gap-2 bgDarkMode border p-4 borderDarkMode rounded-lg text-sm whitespace-normal",
        isActive ? "font-bold" : "",
      )}
    >
      {url && (
        <Checkbox
          className="flex-shrink-0 size-5"
          defaultChecked={isChecked}
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        ></Checkbox>
      )}
      <IconPlay className="size-5 flex-shrink-0" />
      {url ? (
        <Link
          className={cn("line-clamp-1", isActive && "pointer-events-none")}
          href={url}
        >
          {lesson.title}
        </Link>
      ) : (
        <h4 className="line-clamp-1">{lesson.title}</h4>
      )}
      <span className="ml-auto text-sm font-medium">
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
