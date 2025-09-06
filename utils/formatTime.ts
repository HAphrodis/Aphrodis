// utils\formatTime.ts
import moment from "moment";

export function formatDate(
  date: Date | string,
  format: string = "MMMM D, YYYY",
): string {
  return moment(date).format(format);
}

export function formatTimeAgo(date: Date | string): string {
  return moment(date).fromNow();
}

export function formatDateShort(
  date: Date | string,
  format: string = "MMM D, YYYY",
): string {
  return moment(date).format(format);
}

export function formatDateTime(
  date: Date | string,
  format: string = "DD/MM/YYYY -  HH:mm:ss",
): string {
  return moment(date).format(format);
}

export function formatTime(
  date: Date | string,
  format: string = "HH:mm - DD/MM/YY",
): string {
  return moment(date).format(format);
}
