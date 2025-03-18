import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "./dayjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a given date string into a specified format.
 *
 * @param {string} date - The date string to be formatted. The date string should be in a format that can be parsed by dayjs.
 * @param {string} format - The format string to use for formatting the date. This should be a valid dayjs format string.
 * @returns {string} - The formatted date string.
 *
 * @example
 * Returns '2023-11-25'
 * formatDate('2023-11-25T00:00:00Z', 'YYYY-MM-DD')
 *
 * @example
 * Returns 'November 25, 2023'
 * formatDate('2023-11-25T00:00:00Z', 'MMMM D, YYYY')
 */
export const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format)
}
