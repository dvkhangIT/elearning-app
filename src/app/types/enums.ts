enum EUserStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
  BANNED = "BANNED",
}
enum EUserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  EXPERT = "EXPERT",
}
enum ECourseStatus {
  APPROVED = "APPREVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}
enum ECouresLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
enum ELessonType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
  QUIZ = "QUIZ",
}
export { EUserStatus, EUserRole, ECouresLevel, ECourseStatus, ELessonType };
