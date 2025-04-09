import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// פונקציה ליצירת slug מכותרת
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // הסרת תווים מיוחדים
    .replace(/[\s_-]+/g, "-") // החלפת רווחים וקווים תחתונים בקווים מפרידים
    .replace(/^-+|-+$/g, "") // הסרת קווים מפרידים מתחילת וסוף המחרוזת
    .normalize("NFD") // נרמול תווים עם ניקוד
    .replace(/[\u0300-\u036f]/g, "") // הסרת סימני ניקוד
}

