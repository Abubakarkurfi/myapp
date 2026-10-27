import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Chip } from "../../../shared/components/ui";
import {
  daysFromNow,
  formatTime,
  startOfDay,
} from "../../../shared/utils/date";
import { PRIORITY_COLORS } from "../constants";
import { useTaskForm } from "../hooks/useTaskForm";
import { Priority } from "../types";

const PRIORITIES: Priority[] = ["high", "medium", "low"];

const QUICK_DATES = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "Next week", days: 7 },
];

function FieldLabel({ text }: { text: string }) {
  return (
    <Text className="text-sm font-semibold text-slate-700 mt-6 mb-2">
      {text}
    </Text>
  );
}

export default function TaskFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const form = useTaskForm(id);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [openPicker, setOpenPicker] = useState<"date" | "time" | null>(null);

  const dueDate = new Date(form.dueDate);

  function isQuickDateSelected(days: number): boolean {
    return (
      startOfDay(dueDate).getTime() ===
      startOfDay(new Date(daysFromNow(days))).getTime()
    );
  }

  function pickQuickDate(days: number) {
    const newDate = new Date(daysFromNow(days));
    newDate.setHours(dueDate.getHours(), dueDate.getMinutes());
    form.setDueDate(newDate.toISOString());
  }

  function togglePicker(which: "date" | "time") {
    setOpenPicker(openPicker === which ? null : which);
  }

  function handleSave() {
    const saved = form.save();
    if (saved) router.back();
  }

  function handleDelete() {
    Alert.alert("Delete this task?", "This can’t be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          form.remove();
          router.back();
        },
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        className="flex-row items-center justify-between px-5 pb-3 bg-slate-50 border-b border-slate-200"
        style={{ paddingTop: insets.top + 8 }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          accessibilityLabel="Close"
        >
          <Ionicons name="close" size={26} color="#334155" />
        </Pressable>
        <Text className="text-base font-bold text-slate-900">
          {form.isEditing ? "Edit task" : "New task"}
        </Text>
        <Pressable onPress={handleSave} hitSlop={10}>
          <Text className="text-base font-bold text-indigo-600">Save</Text>
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 64 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          value={form.title}
          onChangeText={form.changeTitle}
          placeholder="What do you need to do?"
          placeholderTextColor="#94A3B8"
          className="text-2xl font-bold text-slate-900 mt-6"
          multiline
          autoFocus={!form.isEditing}
        />
        {form.errors.title && (
          <Text className="text-sm text-red-600 mt-1">{form.errors.title}</Text>
        )}

        <TextInput
          value={form.notes}
          onChangeText={form.setNotes}
          placeholder="Add notes"
          placeholderTextColor="#94A3B8"
          className="text-[15px] text-slate-600 mt-3 min-h-[44px]"
          multiline
          textAlignVertical="top"
        />

        <FieldLabel text="Course" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {form.courses.map((course) => (
            <Chip
              key={course.id}
              label={course.code}
              dotColor={course.color}
              active={form.courseId === course.id}
              onPress={() => form.changeCourse(course.id)}
            />
          ))}
        </ScrollView>
        {form.errors.course && (
          <Text className="text-sm text-red-600 mt-2">
            {form.errors.course}
          </Text>
        )}

        <FieldLabel text="Due" />
        <View className="flex-row gap-2">
          {QUICK_DATES.map((quick) => (
            <Chip
              key={quick.label}
              label={quick.label}
              active={isQuickDateSelected(quick.days)}
              onPress={() => pickQuickDate(quick.days)}
            />
          ))}
        </View>

        <View className="flex-row gap-2 mt-3">
          <Pressable
            onPress={() => togglePicker("date")}
            className="flex-1 flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-3"
          >
            <Ionicons name="calendar-outline" size={18} color="#4F46E5" />
            <Text className="ml-2 text-[15px] font-semibold text-slate-800">
              {dueDate.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => togglePicker("time")}
            className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-3"
          >
            <Ionicons name="time-outline" size={18} color="#4F46E5" />
            <Text className="ml-2 text-[15px] font-semibold text-slate-800">
              {formatTime(form.dueDate)}
            </Text>
          </Pressable>
        </View>

        {openPicker !== null && (
          <DateTimePicker
            value={dueDate}
            mode={openPicker}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_event, selected) => {
              if (Platform.OS === "android") setOpenPicker(null);
              if (selected) form.setDueDate(selected.toISOString());
            }}
          />
        )}

        <FieldLabel text="Priority" />
        <View className="flex-row bg-slate-200/70 rounded-2xl p-1">
          {PRIORITIES.map((priority) => {
            const selected = form.priority === priority;
            return (
              <Pressable
                key={priority}
                onPress={() => form.setPriority(priority)}
                className={`flex-1 flex-row items-center justify-center py-2.5 rounded-xl ${selected ? "bg-white" : ""}`}
              >
                <Ionicons
                  name="flag"
                  size={14}
                  color={PRIORITY_COLORS[priority]}
                />
                <Text
                  className={`ml-1.5 text-sm font-semibold capitalize ${selected ? "text-slate-900" : "text-slate-500"}`}
                >
                  {priority}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="flex-row items-center justify-between bg-white border border-slate-200 rounded-2xl px-4 py-3 mt-6">
          <View className="flex-row items-center flex-1">
            <Ionicons name="notifications-outline" size={20} color="#4F46E5" />
            <View className="ml-3 flex-1">
              <Text className="text-[15px] font-semibold text-slate-800">
                Remind me
              </Text>
              <Text className="text-xs text-slate-500">
                Notify me before it’s due
              </Text>
            </View>
          </View>
          <Switch
            value={form.reminder}
            onValueChange={form.setReminder}
            trackColor={{ true: "#6366F1", false: "#CBD5E1" }}
            thumbColor="#fff"
          />
        </View>

        <Pressable
          onPress={handleSave}
          className="mt-8 bg-indigo-600 rounded-2xl py-4 items-center active:bg-indigo-700"
        >
          <Text className="text-white text-base font-bold">
            {form.isEditing ? "Save changes" : "Add task"}
          </Text>
        </Pressable>

        {form.isEditing && (
          <Pressable onPress={handleDelete} className="mt-3 py-3 items-center">
            <Text className="text-red-600 text-base font-semibold">
              Delete task
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
