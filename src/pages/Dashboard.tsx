import React, { useState, useMemo } from "react";
import { Plus, Inbox } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "@/features/tasks/tasksSlice";
import {
  Task,
  TaskStatus,
  TaskFormData,
  TaskFilters as TaskFiltersType,
} from "@/types/task";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TaskBoard } from "@/components/tasks/TaskBoard";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskForm } from "@/components/tasks/TaskForm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>("todo");
  const [filters, setFilters] = useState<TaskFiltersType>({
    search: "",
    status: "all",
    priority: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) => task.userId === user?.id);

    // Search filter
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((task) => task.status === filters.status);
    }

    // Priority filter
    if (filters.priority !== "all") {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case "dueDate":
          comparison =
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        case "createdAt":
        default:
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [tasks, user?.id, debouncedSearch, filters]);

  const handleCreateTask = (status: TaskStatus = "todo") => {
    setDefaultStatus(status);
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleSubmitTask = (data: TaskFormData) => {
    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, data }));
    } else {
      dispatch(
        createTask({
          data: { ...data, status: defaultStatus },
          userId: user!.id,
        })
      );
    }
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              My Tasks
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"} found
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleCreateTask()}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            New Task
          </Button>
        </div>

        {/* Filters */}
        <TaskFilters filters={filters} onFiltersChange={setFilters} />

        {/* Task Board */}
        {filteredTasks.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title={
              debouncedSearch ||
              filters.status !== "all" ||
              filters.priority !== "all"
                ? "No tasks found"
                : "No tasks yet"
            }
            description={
              debouncedSearch ||
              filters.status !== "all" ||
              filters.priority !== "all"
                ? "Try adjusting your filters or search query"
                : "Create your first task to get started with managing your work"
            }
            action={
              debouncedSearch ||
              filters.status !== "all" ||
              filters.priority !== "all"
                ? undefined
                : {
                    label: "Create Task",
                    onClick: () => handleCreateTask(),
                  }
            }
          />
        ) : (
          <TaskBoard
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onCreateTask={handleCreateTask}
          />
        )}
      </div>

      {/* Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(undefined);
        }}
        title={editingTask ? "Edit Task" : "Create New Task"}
        size="lg"
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmitTask}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTask(undefined);
          }}
        />
      </Modal>
    </DashboardLayout>
  );
};
