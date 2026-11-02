import { cn } from "@/app/utils/common";
import Link from "next/link";
import { IconPlay } from "../icons";

const LessonItem = ({
  lesson,
  url,
  isActive,
}: {
  lesson: {
    title: string;
    duration: number;
  };
  url?: string;
  isActive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bgDarkMode border p-4 borderDarkMode rounded-lg text-sm whitespace-normal",
        isActive ? "text-primary font-semibold pointer-events-none" : "",
      )}
    >
      <IconPlay className="size-5 flex-shrink-0" />
      {url ? (
        <Link className="line-clamp-1" href={url}>
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
