import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { TaskFilters as TaskFiltersType } from "@/types/task";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      search: "",
      status: "all",
      priority: "all",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.sortBy !== "createdAt";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            icon={<Search size={20} className="text-gray-400" />}
          />
        </div>
        <Button
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
          className="sm:w-auto"
        >
          <SlidersHorizontal size={20} className="mr-2" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4 animate-slide-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Status"
              value={filters.status}
              onChange={(e) =>
                onFiltersChange({ ...filters, status: e.target.value as any })
              }
              options={[
                { value: "all", label: "All Statuses" },
                { value: "todo", label: "To Do" },
                { value: "in-progress", label: "In Progress" },
                { value: "done", label: "Done" },
              ]}
            />

            <Select
              label="Priority"
              value={filters.priority}
              onChange={(e) =>
                onFiltersChange({ ...filters, priority: e.target.value as any })
              }
              options={[
                { value: "all", label: "All Priorities" },
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />

            <Select
              label="Sort By"
              value={filters.sortBy}
              onChange={(e) =>
                onFiltersChange({ ...filters, sortBy: e.target.value as any })
              }
              options={[
                { value: "createdAt", label: "Created Date" },
                { value: "dueDate", label: "Due Date" },
                { value: "priority", label: "Priority" },
              ]}
            />
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
