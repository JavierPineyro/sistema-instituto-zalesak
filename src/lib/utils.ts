import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StatusActive } from "./types";

// UTILITIES FUNCTIONS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTotal(amount: number, recharge = percentage): number {
  return amount * (1 + recharge / 100);
}

export function hasRecharge(month: string) {
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()]!;
  const currentDay = currentDate.getDay();

  if (months.indexOf(month) > months.indexOf(currentMonth)) {
    return false; // mes mayor que el actual
  } else if (month === currentMonth && currentDay <= limit_day) {
    return false; // dia no ha pasado del dia 10
  } else {
    return true; // dia actual paso del 10
  }
}

export function getIsActiveText(state: boolean): string {
  return state ? StatusActive.ACTIVE : StatusActive.INACTIVE;
}

export function parseToLocalDate(date: string) {
  const rawDate = date
    .split("-")
    .map((item, index) => (index === 1 ? Number(item) - 1 : item))
    .map((item) => Number(item)) as [number, number, number];

  const birthday = new Date(Date.UTC(...rawDate));

  let day: string | number = birthday.getDate() + 1;

  if (day < 10) day = "0" + day;

  let month: string | number = birthday.getMonth() + 1;
  if (month < 10) month = "0" + month;

  const year = birthday.getFullYear();

  return day + "/" + month + "/" + year;
}

export function calculateAge(date: string) {
  const birthday = new Date(date);
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function formatDateForDB(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

export function getMonthsToPay(paidMonths: { month: string }[] = []) {
  const paid = paidMonths.map((item) => item.month);
  const excludedMonths = ["Enero", "Febrero"];

  return months.filter(
    (month) => !paid.includes(month) && !excludedMonths.includes(month),
  );
}

// Error CLASSES
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// CONSTANTS
export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const percentage = 10;
export const limit_day = 10;
