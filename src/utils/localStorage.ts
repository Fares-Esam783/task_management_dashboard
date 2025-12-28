import { Task } from "@/types/task";

const TASKS_KEY = "task_dashboard_tasks";

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};

export const loadTasks = (): Task[] => {
  try {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

export const saveTheme = (theme: "light" | "dark"): void => {
  try {
    localStorage.setItem("task_dashboard_theme", theme);
  } catch (error) {
    console.error("Error saving theme to localStorage:", error);
  }
};

export const loadTheme = (): "light" | "dark" => {
  try {
    const theme = localStorage.getItem("task_dashboard_theme");
    return (theme as "light" | "dark") || "light";
  } catch (error) {
    console.error("Error loading theme from localStorage:", error);
    return "light";
  }
};
