import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  View,
} from "react-native";
import { AddButton, Chip, Screen } from "../../../shared/components/ui";
import { TaskRow } from "../components/TaskRow";
import { FILTERS, useTaskList } from "../hooks/useTaskList";

const HEADING_COLORS: Record<string, string> = {
  overdue: "text-red-600",
  today: "text-amber-600",
  upcoming: "text-indigo-600",
  done: "text-green-600",
};

export default function TasksScreen() {
  const list = useTaskList();
  const router = useRouter();

  const findCourse = (id: string) =>
    list.courses.find((course) => course.id === id);

  return (
    <View className="flex-1">
      <Screen scroll={false}>
        <View className="px-5 pt-4">
          <Text className="text-2xl font-extrabold text-slate-900">Tasks</Text>

          <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 mt-4">
            <Ionicons name="search" size={18} color="#94A3B8" />
            <TextInput
              value={list.query}
              onChangeText={list.setQuery}
              placeholder="Search tasks"
              placeholderTextColor="#94A3B8"
              className="flex-1 py-3 ml-2 text-[15px] text-slate-900"
              returnKeyType="search"
            />
            {list.query.length > 0 && (
              <Pressable
                onPress={() => list.setQuery("")}
                hitSlop={8}
                accessibilityLabel="Clear search"
              >
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </Pressable>
            )}
          </View>
        </View>

        <View className="py-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          >
            {FILTERS.map((filter) => (
              <Chip
                key={filter.key}
                label={filter.label}
                active={list.filter === filter.key}
                onPress={() => list.setFilter(filter.key)}
              />
            ))}
          </ScrollView>
        </View>

        <SectionList
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
          sections={list.sections}
          keyExtractor={(task) => task.id}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => (
            <Text
              className={`text-sm font-bold mt-4 mb-2 ${HEADING_COLORS[section.key]}`}
            >
              {section.title}{" "}
              <Text className="text-slate-400 font-medium">
                {section.data.length}
              </Text>
            </Text>
          )}
          renderItem={({ item }) => (
            <TaskRow
              task={item}
              course={findCourse(item.courseId)}
              onToggle={() => list.toggleTask(item.id)}
              onPress={() =>
                router.push({ pathname: "/task-form", params: { id: item.id } })
              }
            />
          )}
          ListEmptyComponent={
            <View className="items-center mt-16 px-8">
              <Ionicons name="checkbox-outline" size={44} color="#CBD5E1" />
              <Text className="text-base font-bold text-slate-700 mt-3">
                No tasks here
              </Text>
              <Text className="text-sm text-slate-500 text-center mt-1">
                {list.query
                  ? "Try a different search or filter."
                  : "Tap + to add your first task."}
              </Text>
            </View>
          }
        />
      </Screen>

      <AddButton onPress={() => router.push("/task-form")} />
    </View>
  );
}
