import { startOfDay } from "../../shared/utils/date";
import { DeadlineStatus, Task } from "./types";

export const STATUS_ORDER: DeadlineStatus[] = [
  "overdue",
  "today",
  "upcoming",
  "done",
];

export function getDeadlineStatus(task: Task): DeadlineStatus {
  if (task.completed) return "done";

  const today = startOfDay(new Date()).getTime();
  const due = startOfDay(new Date(task.dueDate)).getTime();

  if (due < today) return "overdue";
  if (due === today) return "today";
  return "upcoming";
}

export function groupByStatus(tasks: Task[]): Record<DeadlineStatus, Task[]> {
  const groups: Record<DeadlineStatus, Task[]> = {
    overdue: [],
    today: [],
    upcoming: [],
    done: [],
  };

  for (const task of tasks) {
    groups[getDeadlineStatus(task)].push(task);
  }

  for (const status of STATUS_ORDER) {
    groups[status].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }

  return groups;
}

export function getTaskStats(tasks: Task[]) {
  const completed = tasks.filter((task) => task.completed).length;
  const overdue = tasks.filter(
    (task) => getDeadlineStatus(task) === "overdue",
  ).length;

  return {
    total: tasks.length,
    completed,
    pending: tasks.length - completed,
    overdue,
  };
}

export type TaskFormErrors = {
  title?: string;
  course?: string;
};

export function validateTaskInput(input: {
  title: string;
  courseId: string;
}): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (input.title.trim() === "") {
    errors.title = "Give your task a title.";
  }
  if (input.courseId === "") {
    errors.course = "Pick a course for this task.";
  }

  return errors;
}
