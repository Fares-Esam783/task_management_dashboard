import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskStatus, TaskFormData } from "@/types/task";
import { loadTasks, saveTasks } from "@/utils/localStorage";

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: loadTasks(),
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (
      state,
      action: PayloadAction<{ data: TaskFormData; userId: string }>
    ) => {
      const newTask: Task = {
        id: `task_${Date.now()}`,
        ...action.payload.data,
        userId: action.payload.userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
      saveTasks(state.tasks);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; data: Partial<TaskFormData> }>
    ) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload.data,
          updatedAt: new Date().toISOString(),
        };
        saveTasks(state.tasks);
      }
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: TaskStatus }>
    ) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index].status = action.payload.status;
        state.tasks[index].updatedAt = new Date().toISOString();
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      saveTasks(state.tasks);
    },
  },
});

export const {
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  setTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
