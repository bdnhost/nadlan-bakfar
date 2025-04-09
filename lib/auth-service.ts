"use client"

// קבוע לשמירת מזהה האדמין ב-localStorage
const ADMIN_KEY = "nadlan_bakfar_admin_user"
const FIRST_VISIT_KEY = "nadlan_bakfar_first_visit"

/**
 * בדיקה אם המשתמש הוא אדמין
 */
export const isAdmin = (): boolean => {
  // בדיקה אם אנחנו בצד הלקוח
  if (typeof window === "undefined") {
    return false
  }

  return localStorage.getItem(ADMIN_KEY) === "true"
}

/**
 * הגדרת משתמש כאדמין
 */
export const setAdmin = (isAdminUser: boolean): void => {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem(ADMIN_KEY, isAdminUser ? "true" : "false")
}

/**
 * בדיקה אם זה הביקור הראשון ואם כן, הגדרת המשתמש כאדמין
 */
export const checkAndSetFirstVisit = (): void => {
  if (typeof window === "undefined") {
    return
  }

  // בדיקה אם זה הביקור הראשון באתר
  const isFirstVisit = localStorage.getItem(FIRST_VISIT_KEY) === null

  // אם זה הביקור הראשון, נגדיר את המשתמש כאדמין
  if (isFirstVisit) {
    localStorage.setItem(ADMIN_KEY, "true")
    localStorage.setItem(FIRST_VISIT_KEY, "false")
  }
}

