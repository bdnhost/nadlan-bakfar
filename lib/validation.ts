import type { Lead, Property } from "./api-service"

// פונקציה לתיקוף פרטי ליד - עודכנה לפי הסכמה החדשה
export function validateLead(lead: Lead): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // בדיקת שם
  if (!lead.name || lead.name.trim() === "") {
    errors.push("שם הוא שדה חובה")
  } else if (lead.name.length < 2) {
    errors.push("שם חייב להכיל לפחות 2 תווים")
  }

  // בדיקת מקור
  if (!lead.source || lead.source.trim() === "") {
    errors.push("מקור הוא שדה חובה")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// פונקציה לתיקוף פרטי נכס - עודכנה לפי הסכמה החדשה
export function validateProperty(property: Partial<Property>): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // בדיקות עבור יצירת נכס חדש
  if (!property.id) {
    // בדיקת כתובת
    if (!property.address || property.address.trim() === "") {
      errors.push("כתובת היא שדה חובה")
    }

    // בדיקת סוג נכס
    if (!property.type || property.type.trim() === "") {
      errors.push("סוג נכס הוא שדה חובה")
    }

    // בדיקת מחיר
    if (property.price === undefined || property.price <= 0) {
      errors.push("מחיר חייב להיות מספר חיובי")
    }
  }

  // בדיקות נוספות עבור שדות אופציונליים
  if (property.rooms !== undefined && (property.rooms < 0 || !Number.isInteger(property.rooms))) {
    errors.push("מספר חדרים חייב להיות מספר שלם חיובי")
  }

  if (property.floor !== undefined && !Number.isInteger(property.floor)) {
    errors.push("קומה חייבת להיות מספר שלם")
  }

  if (property.totalFloors !== undefined && (property.totalFloors < 0 || !Number.isInteger(property.totalFloors))) {
    errors.push("מספר קומות כולל חייב להיות מספר שלם חיובי")
  }

  if (property.bathrooms !== undefined && (property.bathrooms < 0 || !Number.isInteger(property.bathrooms))) {
    errors.push("מספר חדרי רחצה חייב להיות מספר שלם חיובי")
  }

  if (property.size !== undefined && property.size <= 0) {
    errors.push("שטח חייב להיות מספר חיובי")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

