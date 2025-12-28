import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, ListTodo, Clock, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { Task, TaskStatus } from "@/types/task";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "@/components/common/EmptyState";

interface TaskBoardProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onCreateTask: (status: TaskStatus) => void;
}

const statusConfig = {
  todo: {
    title: "To Do",
    icon: ListTodo,
    color: "border-gray-300 dark:border-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-800/50",
  },
  "in-progress": {
    title: "In Progress",
    icon: Clock,
    color: "border-warning-300 dark:border-warning-600",
    bgColor: "bg-warning-50 dark:bg-warning-900/20",
  },
  done: {
    title: "Done",
    icon: CheckCircle2,
    color: "border-success-300 dark:border-success-600",
    bgColor: "bg-success-50 dark:bg-success-900/20",
  },
};

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
  onCreateTask,
}) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newStatus = over.id as TaskStatus;
      onStatusChange(active.id as string, newStatus);
    }

    setActiveTask(null);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const renderColumn = (status: TaskStatus) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    const columnTasks = getTasksByStatus(status);

    return (
      <div
        key={status}
        className={clsx(
          "flex-1 min-w-[300px] rounded-lg border-2 p-4",
          config.color,
          config.bgColor
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon size={20} className="text-gray-700 dark:text-gray-300" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              {config.title}
            </h2>
            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
              {columnTasks.length}
            </span>
          </div>
          <button
            onClick={() => onCreateTask(status)}
            className="p-1.5 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors rounded hover:bg-white dark:hover:bg-gray-700"
            aria-label="Add task"
          >
            <Plus size={20} />
          </button>
        </div>

        <SortableContext
          items={columnTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 min-h-[200px]">
            {columnTasks.length === 0 ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-400 dark:text-gray-600 text-sm">
                  No tasks yet
                </p>
              </div>
            ) : (
              columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4">
        {(["todo", "in-progress", "done"] as TaskStatus[]).map(renderColumn)}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 opacity-80">
            <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
