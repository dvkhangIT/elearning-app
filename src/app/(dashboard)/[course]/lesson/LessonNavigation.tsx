"use client";

import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

const LessonNavigation = ({
  nextLesson,
  prevLesson,
}: {
  course: string;
  nextLesson: string;
  prevLesson: string;
}) => {
  const router = useRouter();
  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-1"
        onClick={() => (!prevLesson ? null : router.push(prevLesson))}
        disabled={!prevLesson}
      >
        <IconLeftArrow></IconLeftArrow>
      </Button>
      <Button
        className="size-10 p-1"
        onClick={() => (!nextLesson ? null : router.push(nextLesson))}
        disabled={!nextLesson}
      >
        <IconRightArrow></IconRightArrow>
      </Button>
    </div>
  );
};

export default LessonNavigation;
