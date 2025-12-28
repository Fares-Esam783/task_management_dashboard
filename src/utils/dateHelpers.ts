import { format, isPast, parseISO } from "date-fns";

export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), "MMM dd, yyyy");
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    return format(parseISO(dateString), "MMM dd, yyyy HH:mm");
  } catch {
    return dateString;
  }
};

export const isOverdue = (dateString: string): boolean => {
  try {
    return isPast(parseISO(dateString));
  } catch {
    return false;
  }
};

export const getDateInputValue = (dateString?: string): string => {
  if (!dateString) return "";
  try {
    return format(parseISO(dateString), "yyyy-MM-dd");
  } catch {
    return "";
  }
};
