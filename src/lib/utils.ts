import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StatusActive } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIsActiveText(state: boolean): string {
  return state ? StatusActive.ACTIVE : StatusActive.INACTIVE;
}
