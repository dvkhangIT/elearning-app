import PageNotFound from "@/app/not-found";
import { ECourseStatus } from "@/app/types/enums";
import { IconPlay, IconStudy, IconUsers } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@/components/ui";
import { courseLevelTitle } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.action";
import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getCourseBySlug({
    slug: params.slug,
  });
  if (!data) return null;
  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />;
  const videoId = data.intro_url?.split("v=")[1];
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div>
          <div className=" relative aspect-video mb-5">
            {data.intro_url ? (
              <>
                <iframe
                  width="1053"
                  height="592"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Hoa - Chung Thanh Duy | Kiều Thơ Cover - Lạc Trong Mơ, Tôi Cất Bước Đi Giữa Khu Rừng..."
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full object-fill rounded-lg"
                ></iframe>
              </>
            ) : (
              <Image
                src={data.image}
                alt=""
                fill
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        </div>
        <h1 className="font-bold text-3xl mb-5">{data.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal">{data.desc}</div>
        </BoxSection>
        <BoxSection title="Thông tin">
          <div className="grid grid-cols-4 gap-5 mb-10">
            <BoxInfo title="Bài học">100</BoxInfo>
            <BoxInfo title="Lượt xem">{data.views.toLocaleString()}</BoxInfo>
            <BoxInfo title="Trình độ">{courseLevelTitle[data.level]}</BoxInfo>
            <BoxInfo title="Thời lượng">100</BoxInfo>
          </div>
        </BoxSection>
        <div className="leading-normal mb-10">{data.desc}</div>
        <BoxSection title="Yêu cầu">
          <div className="leading-normal mb-10">
            {data.info.requirements.map((r, index) => (
              <div className="flex items-center gap-2" key={index}>
                <span className="flex items-center justify-center flex-shrink-0 size-5 text-white bg-primary p-1 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Lợi ích">
          <div className="leading-normal mb-10">
            {data.info.benefits.map((b, index) => (
              <div className="flex items-center gap-2" key={index}>
                <span className="flex items-center justify-center flex-shrink-0 size-5 text-white bg-primary p-1 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Mô tả">
          <div className="leading-normal mb-10">
            {data.info.benefits.map((b, index) => (
              <div key={index}>{b}</div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Q&A">
          <div className="leading-normal mb-10">
            {data.info.qa.map((qa, index) => (
              <Accordion collapsible type="single" key={index}>
                <AccordionItem value={qa.question}>
                  <AccordionTrigger>{qa.question}</AccordionTrigger>
                  <AccordionContent>{qa.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </BoxSection>
      </div>
      <div>
        <div className="bg-white rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <strong className="text-primary font-bold text-lg">
              {data.price}
            </strong>
            <span className="text-slate-400 line-through text-sm">
              {data.sale_price}
            </span>
            <span className="inline-block ml-auto px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
              {Math.floor((data.price / data.sale_price) * 100)}%
            </span>
          </div>
          <h3 className="font-bold mb-2 text-sm">Khóa học bao gồm:</h3>
          <ul className="mb-5 flex flex-col gap-3 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <IconPlay className="size-4" />
              <span>30h học</span>
            </li>
            <li className="flex items-center gap-2">
              <IconPlay className="size-4" />
              <span>Video full HD</span>
            </li>
            <li className="flex items-center gap-2">
              <IconUsers className="size-4" />
              <span>Có nhóm hỗ trợ</span>
            </li>
            <li className="flex items-center gap-2">
              <IconStudy className="size-4" />
              <span>Tài liệu kèm theo</span>
            </li>
          </ul>
          <Button variant="primary" className="w-full">
            Mua khóa học
          </Button>
        </div>
      </div>
    </div>
  );
};
function BoxInfo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-white rounded-lg p-5">
        <h4 className="text-sm text-slate-400 font-normal">{title}</h4>
        <h3 className="font-bold">{children}</h3>
      </div>
    </>
  );
}
function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">{title}</h2>
      <div className="leading-normal mb-10">{children}</div>
    </>
  );
}
export default page;
