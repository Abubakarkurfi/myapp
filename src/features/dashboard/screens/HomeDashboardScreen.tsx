import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import {
  AddButton,
  ProgressBar,
  Screen,
  SectionTitle,
} from "../../../shared/components/ui";
import { Course } from "../../courses";
import { StudySession } from "../../study";
import { TaskRow } from "../../tasks";
import { useDashboardData } from "../hooks/useDashboardData";

const USER_NAME = "User";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function StatCard(props: {
  label: string;
  value: number;
  icon: IconName;
  color: string;
  background: string;
}) {
  return (
    <View className="w-1/2 p-1">
      <View className="bg-white rounded-2xl p-4 flex-row items-center border border-slate-100">
        <View
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ backgroundColor: props.background }}
        >
          <Ionicons name={props.icon} size={20} color={props.color} />
        </View>
        <View className="ml-3">
          <Text className="text-xl font-extrabold text-slate-900">
            {props.value}
          </Text>
          <Text className="text-xs text-slate-500">{props.label}</Text>
        </View>
      </View>
    </View>
  );
}

function SessionRow({
  session,
  course,
}: {
  session: StudySession;
  course?: Course;
}) {
  return (
    <View className="flex-row items-center bg-white rounded-2xl p-4 mb-2 border border-slate-100">
      <View className="items-center mr-4 w-12">
        <Text className="text-base font-extrabold text-slate-900">
          {session.time}
        </Text>
        <Text className="text-xs text-slate-400">
          {session.durationMin} min
        </Text>
      </View>
      <View
        className="w-1 self-stretch rounded-full mr-3"
        style={{ backgroundColor: course?.color }}
      />
      <View className="flex-1">
        <Text className="text-[15px] font-semibold text-slate-900">
          {session.subject}
        </Text>
        <Text className="text-xs text-slate-500 mt-0.5">{course?.name}</Text>
      </View>
    </View>
  );
}

export default function HomeDashboardScreen() {
  const dashboard = useDashboardData();
  const router = useRouter();

  const findCourse = (id: string) =>
    dashboard.courses.find((course) => course.id === id);
  const openTask = (id: string) =>
    router.push({ pathname: "/task-form", params: { id } });
  const goToTasks = () => router.push("/tasks");

  const todayText = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const dueTodayText =
    dashboard.dueToday.length > 0
      ? `${dashboard.dueToday.length} due today`
      : "Nothing due today";

  return (
    <View className="flex-1">
      <Screen>
        <View className="flex-row items-center justify-between pt-4">
          <View>
            <Text className="text-sm text-slate-500">{todayText}</Text>
            <Text className="text-2xl font-extrabold text-slate-900">
              {getGreeting()}, {USER_NAME}
            </Text>
          </View>
          <Pressable
            className="w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center"
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#334155" />
          </Pressable>
        </View>

        <View className="mt-5 rounded-3xl bg-indigo-600 p-5">
          <Text className="text-indigo-100 text-sm font-medium">
            {dueTodayText}
          </Text>
          <Text className="text-white text-3xl font-extrabold mt-1">
            {dashboard.stats.completed} of {dashboard.stats.total} tasks done
          </Text>
          <View className="mt-4">
            <ProgressBar value={dashboard.progress} />
          </View>

          {dashboard.stats.overdue > 0 && (
            <Pressable
              onPress={goToTasks}
              className="flex-row items-center mt-4"
            >
              <Ionicons name="alert-circle" size={16} color="#FDE68A" />
              <Text className="text-amber-200 text-sm font-semibold ml-1.5">
                {dashboard.stats.overdue} overdue. Review them
              </Text>
            </Pressable>
          )}
        </View>

        <View className="flex-row flex-wrap -mx-1 mt-3">
          <StatCard
            label="Total"
            value={dashboard.stats.total}
            icon="layers-outline"
            color="#4F46E5"
            background="#E0E7FF"
          />
          <StatCard
            label="Completed"
            value={dashboard.stats.completed}
            icon="checkmark-done-outline"
            color="#15803D"
            background="#DCFCE7"
          />
          <StatCard
            label="Pending"
            value={dashboard.stats.pending}
            icon="time-outline"
            color="#B45309"
            background="#FEF3C7"
          />
          <StatCard
            label="Overdue"
            value={dashboard.stats.overdue}
            icon="alert-circle-outline"
            color="#B91C1C"
            background="#FEE2E2"
          />
        </View>

        <SectionTitle
          title="Due today"
          count={dashboard.dueToday.length}
          actionLabel="See all"
          onActionPress={goToTasks}
        />
        {dashboard.dueToday.length === 0 ? (
          <View className="bg-white rounded-2xl p-5 items-center border border-slate-100">
            <Ionicons name="sparkles-outline" size={22} color="#6366F1" />
            <Text className="text-slate-500 text-sm mt-2 text-center">
              You're clear for today. Add a task or plan a study session.
            </Text>
          </View>
        ) : (
          dashboard.dueToday.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              course={findCourse(task.courseId)}
              onToggle={() => dashboard.toggleTask(task.id)}
              onPress={() => openTask(task.id)}
            />
          ))
        )}

        <SectionTitle
          title="Study sessions"
          count={dashboard.sessions.length}
        />
        {dashboard.sessions.map((session) => (
          <SessionRow
            key={session.id}
            session={session}
            course={findCourse(session.courseId)}
          />
        ))}

        <SectionTitle title="Coming up" count={dashboard.upcoming.length} />
        {dashboard.upcoming.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            course={findCourse(task.courseId)}
            onToggle={() => dashboard.toggleTask(task.id)}
            onPress={() => openTask(task.id)}
          />
        ))}
      </Screen>

      <AddButton onPress={() => router.push("/task-form")} />
    </View>
  );
}
