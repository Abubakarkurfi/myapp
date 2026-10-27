import { COURSES } from "./data/mockCourses";
import { Course } from "./types";

export function useCourses(): Course[] {
  return COURSES;
}
