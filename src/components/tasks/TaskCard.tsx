import React from "react";
import { Edit2, Trash2, Calendar, AlertCircle } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Task, TaskPriority } from "@/types/task";
import { formatDate, isOverdue } from "@/utils/dateHelpers";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400",
  medium:
    "bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400",
  high: "bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400",
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isDueDateOverdue = isOverdue(task.dueDate);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700",
        "shadow-sm hover:shadow-md transition-all duration-200 cursor-move",
        isDragging && "opacity-50 shadow-lg scale-105"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg flex-1 pr-2">
          {task.title}
        </h3>
        <span
          className={clsx(
            "px-2 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap",
            priorityColors[task.priority]
          )}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <span
            className={clsx(
              "text-sm",
              isDueDateOverdue
                ? "text-danger-600 dark:text-danger-400 font-medium"
                : "text-gray-600 dark:text-gray-400"
            )}
          >
            {formatDate(task.dueDate)}
          </span>
          {isDueDateOverdue && (
            <AlertCircle
              size={16}
              className="text-danger-600 dark:text-danger-400"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1.5 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="p-1.5 text-gray-600 hover:text-danger-600 dark:text-gray-400 dark:hover:text-danger-400 transition-colors rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
