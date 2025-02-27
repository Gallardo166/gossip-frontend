import { format } from "date-fns";

export function getDate() {
  return format(new Date(), "yyyy-MM-dd HH:mm:ss");
}

export function formatDate(date: string) {
  return format(date, "MMM dd, yyyy");
}