import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StatusActive } from "./types";

// UTILITIES FUNCTIONS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
