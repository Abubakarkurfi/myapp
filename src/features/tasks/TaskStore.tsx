import { createContext, useContext, useState } from "react";
import { MOCK_TASKS } from "./data/mockTasks";
import { NewTask, Task } from "./types";

type TaskStore = {
  tasks: Task[];
  addTask: (data: NewTask) => void;
  updateTask: (id: string, changes: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
};

const TaskContext = createContext<TaskStore | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  function addTask(data: NewTask) {
    const newTask: Task = {
      ...data,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks((current) => [newTask, ...current]);
  }

  function updateTask(id: string, changes: Partial<Task>) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...changes } : task)),
    );
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskStore() {
  const store = useContext(TaskContext);
  if (!store) {
    throw new Error("useTaskStore must be used inside <TaskProvider>");
  }
  return store;
}
