import { ELessonType } from "@/app/types/enums";
import { Document, model, models, Schema } from "mongoose";

export interface ILesson extends Document {
  _id: string;
  title: string;
  slug: string;
  lecture: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  type: ELessonType;
  order: Number;
  content: string;
  video_url: string;
  duration: number;
  _destroy: boolean;
  created_at: Date;
}

const lessonSchema = new Schema<ILesson>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
  },
  video_url: {
    type: String,
  },
  duration: {
    type: Number,
    default: 0,
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  lecture: {
    type: Schema.Types.ObjectId,
    ref: "Lecture",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  type: {
    type: String,
    enum: Object.values(ELessonType),
    default: ELessonType.VIDEO,
  },
});
const Lesson = models.Lesson || model<ILesson>("Lesson", lessonSchema);
export default Lesson;
