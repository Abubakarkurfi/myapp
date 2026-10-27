import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { formatDueDate } from "../../../shared/utils/date";
import { Course } from "../../courses";
import { PRIORITY_COLORS } from "../constants";
import { getDeadlineStatus } from "../taskRules";
import { Task } from "../types";

type TaskRowProps = {
  task: Task;
  course?: Course;
  onToggle: () => void;
  onPress: () => void;
};

export function TaskRow({ task, course, onToggle, onPress }: TaskRowProps) {
  const status = getDeadlineStatus(task);
  const priorityColor = PRIORITY_COLORS[task.priority];

  let dueTextColor = "text-slate-500";
  if (status === "overdue") dueTextColor = "text-red-600";
  if (status === "today") dueTextColor = "text-amber-600";
  if (task.completed) dueTextColor = "text-slate-400";

  return (
    <Pressable
      onPress={onPress}
      className="flex-row bg-white rounded-2xl mb-2 overflow-hidden border border-slate-100 active:bg-slate-50"
    >
      <View
        className="w-1.5"
        style={{ backgroundColor: course?.color ?? "#CBD5E1" }}
      />

      <View className="flex-1 flex-row items-center py-3 pl-3 pr-4">
        <Pressable
          onPress={onToggle}
          hitSlop={10}
          accessibilityLabel={
            task.completed ? "Mark as not done" : "Mark as done"
          }
        >
          <View
            className="w-6 h-6 rounded-full items-center justify-center border-2"
            style={{
              borderColor: priorityColor,
              backgroundColor: task.completed
                ? priorityColor
                : `${priorityColor}1A`,
            }}
          >
            {task.completed && (
              <Ionicons name="checkmark" size={15} color="#fff" />
            )}
          </View>
        </Pressable>

        <View className="flex-1 ml-3">
          <Text
            numberOfLines={1}
            className={`text-[15px] font-semibold ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}
          >
            {task.title}
          </Text>

          <View className="flex-row items-center mt-1">
            <Ionicons name="calendar-outline" size={12} color="#94A3B8" />
            <Text className={`text-xs ml-1 ${dueTextColor}`}>
              {formatDueDate(task.dueDate)}
            </Text>
            {course && (
              <Text className="text-xs text-slate-400 ml-2">{course.code}</Text>
            )}
            {task.reminder && (
              <Ionicons
                name="notifications-outline"
                size={12}
                color="#94A3B8"
                style={{ marginLeft: 8 }}
              />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
