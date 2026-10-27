import { useState } from "react";
import { useCourses } from "../../courses";
import { STATUS_ORDER, groupByStatus } from "../taskRules";
import { useTaskStore } from "../TaskStore";
import { DeadlineStatus } from "../types";

export type Filter = "all" | DeadlineStatus;

export const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "overdue", label: "Overdue" },
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "done", label: "Done" },
];

const SECTION_TITLES: Record<DeadlineStatus, string> = {
  overdue: "Overdue",
  today: "Due today",
  upcoming: "Upcoming",
  done: "Completed",
};

export function useTaskList() {
  const { tasks, toggleTask } = useTaskStore();
  const courses = useCourses();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const search = query.trim().toLowerCase();
  const matchingTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search),
  );

  const groups = groupByStatus(matchingTasks);

  const sections = STATUS_ORDER.filter(
    (status) => filter === "all" || filter === status,
  )
    .filter((status) => groups[status].length > 0)
    .map((status) => ({
      key: status,
      title: SECTION_TITLES[status],
      data: groups[status],
    }));

  return { sections, courses, filter, setFilter, query, setQuery, toggleTask };
}
