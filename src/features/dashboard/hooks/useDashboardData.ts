import { useCourses } from "../../courses";
import { useStudySessions } from "../../study";
import { getTaskStats, groupByStatus, useTaskStore } from "../../tasks";

export function useDashboardData() {
  const { tasks, toggleTask } = useTaskStore();
  const courses = useCourses();
  const sessions = useStudySessions();

  const groups = groupByStatus(tasks);
  const stats = getTaskStats(tasks);

  return {
    courses,
    sessions,
    stats,
    progress: stats.total === 0 ? 0 : stats.completed / stats.total,
    dueToday: groups.today,
    upcoming: groups.upcoming.slice(0, 3),
    toggleTask,
  };
}
