// מפתח האינטגרציה - ברירת מחדל
const DEFAULT_INTEGRATION_KEY = "d22d8b05933905caee1f49348e556e7d43c0f38277b91258"

// משתנה גלובלי לשמירת המפתח בזמן ריצה
let runtimeIntegrationKey: string | null = null

// פונקציה לקבלת מפתח האינטגרציה הנוכחי
export function getIntegrationKey(): string {
  // אם יש מפתח בזמן ריצה, החזר אותו
  if (runtimeIntegrationKey) {
    return runtimeIntegrationKey
  }

  // נסה לקבל מפתח מ-localStorage
  if (typeof window !== "undefined") {
    try {
      const storedKey = localStorage.getItem("INTEGRATION_KEY")
      if (storedKey) {
        runtimeIntegrationKey = storedKey
        return storedKey
      }
    } catch (error) {
      console.warn("Error reading from localStorage:", error)
    }
  }

  // אם אין מפתח ב-localStorage, השתמש במפתח מהסביבה או בברירת המחדל
  return process.env.NEXT_PUBLIC_INTEGRATION_KEY || DEFAULT_INTEGRATION_KEY
}

// פונקציה לעדכון מפתח האינטגרציה בזמן ריצה
export function setIntegrationKey(key: string): void {
  runtimeIntegrationKey = key

  // נסה לשמור ב-localStorage
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("INTEGRATION_KEY", key)
    } catch (error) {
      console.warn("Error saving to localStorage:", error)
    }
  }
}

// מפתח האינטגרציה - שימוש בפונקציה במקום בערך ישיר
export const INTEGRATION_KEY = getIntegrationKey()

// כתובת ה-API - עכשיו משתמשים ב-Next.js API Routes במקום Supabase
// הכתובת תהיה יחסית או מוחלטת בהתאם לסביבה
function getDefaultApiUrl(): string {
  // אם אנחנו ב-production עם VERCEL_URL
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  }

  // אם אנחנו ב-browser
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api`
  }

  // ברירת מחדל לפיתוח
  return "http://localhost:3000/api"
}

const DEFAULT_API_URL = getDefaultApiUrl()

// משתנה גלובלי לשמירת כתובת ה-API בזמן ריצה
let runtimeApiUrl: string | null = null

// פונקציה לקבלת כתובת ה-API הנוכחית
export function getApiUrl(): string {
  // אם יש כתובת בזמן ריצה, החזר אותה
  if (runtimeApiUrl) {
    return runtimeApiUrl
  }

  // נסה לקבל כתובת מ-localStorage (לצורך backward compatibility)
  if (typeof window !== "undefined") {
    try {
      const storedUrl = localStorage.getItem("API_URL")
      if (storedUrl) {
        runtimeApiUrl = storedUrl
        return storedUrl
      }
    } catch (error) {
      console.warn("Error reading from localStorage:", error)
    }
  }

  // השתמש בכתובת מהסביבה או בברירת המחדל
  return process.env.API_URL || DEFAULT_API_URL
}

// פונקציה לעדכון כתובת ה-API בזמן ריצה
export function setApiUrl(url: string): void {
  runtimeApiUrl = url

  // נסה לשמור ב-localStorage
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("API_URL", url)
    } catch (error) {
      console.warn("Error saving to localStorage:", error)
    }
  }
}

// כתובת ה-API - שימוש בפונקציה במקום בערך ישיר
export const API_URL = getApiUrl()

// הגדרה האם להשתמש בנתונים מדומים בלבד (ללא ניסיון לגשת ל-API)
export const USE_MOCK_DATA = false // שינוי ל-false כדי להשתמש במידע אמיתי

// בדיקה אם מפתח האינטגרציה קיים
if (!INTEGRATION_KEY && !USE_MOCK_DATA) {
  console.warn("Warning: INTEGRATION_KEY is not set. API calls will fail.")
}

// פונקציה לבדיקה אם אנחנו בסביבת פיתוח
export const isDevelopment =
  process.env.NODE_ENV === "development" || (typeof window !== "undefined" && window.location.hostname === "localhost")

// פורמט המפתח הוא בדיוק 48 תווים הקסדצימליים
export const isValidIntegrationKeyFormat = (key: string): boolean => {
  return /^[0-9a-f]{48}$/.test(key)
}

