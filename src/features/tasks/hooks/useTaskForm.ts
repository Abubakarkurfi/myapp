import { useState } from "react";
import { daysFromNow } from "../../../shared/utils/date";
import { useCourses } from "../../courses";
import { TaskFormErrors, validateTaskInput } from "../taskRules";
import { useTaskStore } from "../TaskStore";
import { Priority } from "../types";

export function useTaskForm(taskId?: string) {
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
  const courses = useCourses();

  const existingTask = taskId
    ? tasks.find((task) => task.id === taskId)
    : undefined;

  const [title, setTitle] = useState(existingTask?.title ?? "");
  const [notes, setNotes] = useState(existingTask?.notes ?? "");
  const [courseId, setCourseId] = useState(existingTask?.courseId ?? "");
  const [dueDate, setDueDate] = useState(
    existingTask?.dueDate ?? daysFromNow(1),
  );
  const [priority, setPriority] = useState<Priority>(
    existingTask?.priority ?? "medium",
  );
  const [reminder, setReminder] = useState(existingTask?.reminder ?? false);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  function changeTitle(text: string) {
    setTitle(text);
    setErrors((current) => ({ ...current, title: undefined }));
  }

  function changeCourse(id: string) {
    setCourseId(id);
    setErrors((current) => ({ ...current, course: undefined }));
  }

  function save(): boolean {
    const foundErrors = validateTaskInput({ title, courseId });
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return false;

    const data = {
      title: title.trim(),
      notes: notes.trim(),
      courseId,
      dueDate,
      priority,
      reminder,
    };

    if (existingTask) {
      updateTask(existingTask.id, data);
    } else {
      addTask(data);
    }
    return true;
  }

  function remove() {
    if (existingTask) deleteTask(existingTask.id);
  }

  return {
    isEditing: existingTask !== undefined,
    courses,
    title,
    changeTitle,
    notes,
    setNotes,
    courseId,
    changeCourse,
    dueDate,
    setDueDate,
    priority,
    setPriority,
    reminder,
    setReminder,
    errors,
    save,
    remove,
  };
}
