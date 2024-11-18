import { twMerge } from "tailwind-merge";

export const cn = (...classList: string[]): string => twMerge(...classList);