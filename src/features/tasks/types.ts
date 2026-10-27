export type Priority = "high" | "medium" | "low";

export type DeadlineStatus = "overdue" | "today" | "upcoming" | "done";

export type Task = {
  id: string;
  title: string;
  notes?: string;
  courseId: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  reminder: boolean;
};

export type NewTask = Omit<Task, "id" | "completed">;
