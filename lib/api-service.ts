"use server"

import { USE_MOCK_DATA, getIntegrationKey, getApiUrl } from "./config"

// עדכון הטיפוסים לפי הסכמה המפורטת שסופקה
export interface Property {
  id: string // מזהה ייחודי של הנכס (UUID)
  address: string // כתובת הנכס (שדה חובה)
  type: string // סוג הנכס: דירה, בית, משרד וכו' (שדה חובה)
  status?: string // סטטוס הנכס: active, sold, rented וכו'
  price: number // מחיר הנכס (שדה חובה)
  rooms?: number // מספר חדרים
  size?: number // גודל במ"ר
  floor?: number // קומה
  totalFloors?: number // סה"כ קומות בבניין
  parking?: boolean // האם יש חניה
  elevator?: boolean // האם יש מעלית
  description?: string // תיאור מפורט של הנכס
  features?: string[] // מאפיינים מיוחדים (מערך של מחרוזות)
  images?: string[] // קישורים לתמונות הנכס
  user_id?: string // מזהה המשתמש שיצר את הנכס
  metadata?: Record<string, any> // מידע נוסף על הנכס בפורמט חופשי
  published?: boolean // האם הנכס מפורסם
  created_at?: string // תאריך יצירת הנכס
  updated_at?: string // תאריך עדכון אחרון של הנכס

  // שדות אופציונליים נוספים
  location?: {
    // מיקום גיאוגרפי
    lat: number // קו רוחב
    lng: number // קו אורך
  }
  contact?: {
    // פרטי איש קשר
    name: string // שם
    phone: string // טלפון
    email: string // דוא"ל
  }

  // שדות נוספים לתצוגה באתר (לא חלק מהסכמה המקורית)
  title?: string // כותרת לתצוגה
  bathrooms?: number // מספר חדרי רחצה
  featured?: boolean // האם הנכס מוצג כמומלץ
}

// טיפוס לסטטוס של ליד
export type LeadStatus =
  | "new"
  | "in_progress"
  | "contacted"
  | "qualified"
  | "unqualified"
  | "converted"
  | "lost"
  | "closed"
  | string

// עדכון טיפוס הליד לפי הסכמה המפורטת
export interface Lead {
  id?: string // מזהה ייחודי של הליד (UUID)
  user_id?: string // מזהה המשתמש שיצר את הליד
  customer_id?: string // מזהה של לקוח קשור (אם קיים)
  property_id?: string // מזהה של נכס קשור (אם קיים)
  status?: LeadStatus // סטטוס הליד: new, in_progress, contacted וכו'
  source: string // מקור הליד: אתר, שיחת טלפון, פייסבוק וכו' (שדה חובה)
  notes?: string // הערות נוספות
  metadata?: Record<string, any> // מידע נוסף על הליד בפורמט חופשי
  created_at?: string // תאריך יצירת הליד
  updated_at?: string // תאריך עדכון אחרון של הליד

  // שדות שנשלחים בשורש אך נשמרים ב-metadata
  name: string // שם הליד (שדה חובה)
  email?: string // דוא"ל
  phone?: string // טלפון

  // יחסים (אופציונליים)
  customer?: {
    // פרטי הלקוח הקשור
    id: string
    name: string
    email?: string
    phone?: string
  }
  property?: {
    // פרטי הנכס הקשור
    id: string
    address: string
    price: number
    type: string
  }

  // פרופרטיז נוספות לנתונים קשורים
  related_properties?: Array<{
    id: string // מזהה של הקשר
    property_id: string // מזהה הנכס הקשור
    priority?: number // דירוג עדיפות
    notes?: string // הערות על הקשר
    property?: {
      // פרטי הנכס
      id: string
      address: string
      price: number
      type: string
    }
  }>
}

// Define LeadData interface
export interface LeadData {
  name: string
  source: string
  email?: string
  phone?: string
  property_id?: string
  notes?: string
}

// עדכון הפונקציה validateIntegrationKey כדי שתשתמש בנקודת הקצה get-published-properties

// פונקציה לבדיקת תקינות מפתח האינטגרציה
export async function validateIntegrationKey(key: string = getIntegrationKey()): Promise<any> {
  try {
    // בדיקה אם המפתח ריק
    if (!key) {
      return {
        success: false,
        error: "מפתח האינטגרציה חסר",
      }
    }

    // שימוש בנקודת הקצה get-published-properties שכבר עובדת במערכת
    const response = await fetch(`${getApiUrl()}/get-published-properties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-integration-key": key,
        Authorization: `Bearer ${key}`, // הוספת header אימות
      },
    })

    // בדיקת תקינות התשובה
    if (!response.ok) {
      let errorMessage = `שגיאת שרת: ${response.status}`

      if (response.status === 401) {
        errorMessage = "מפתח האינטגרציה אינו תקין או לא פעיל"
      } else if (response.status === 403) {
        errorMessage = "אין הרשאות מתאימות למפתח זה"
      }

      return {
        success: false,
        error: errorMessage,
      }
    }

    // החזרת התשובה מהשרת
    const result = await response.json()

    // בדיקה אם התשובה מכילה נתונים
    if (result && result.success) {
      return {
        success: true,
        message: "המפתח תקין ופעיל",
        permissions: {
          can_create_leads: true,
          can_manage_properties: true,
          can_fetch_published_properties: true,
        },
      }
    } else {
      return {
        success: false,
        error: result.error || "תשובת השרת אינה תקינה",
      }
    }
  } catch (error) {
    console.error("Error validating integration key:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "שגיאה לא ידועה בבדיקת המפתח",
    }
  }
}

// פונקציה לקבלת רשימת נכסים
export async function getProperties(): Promise<Property[]> {
  if (USE_MOCK_DATA) {
    return getMockProperties()
  }

  try {
    // בדיקה אם המפתח תקין
    const currentKey = getIntegrationKey()
    if (!currentKey || currentKey === "INTEGRATION_KEY") {
      console.warn("Integration key is missing or default - using mock data")
      return getMockProperties()
    }

    // שימוש בנקודת הקצה החדשה
    const response = await fetch(`${getApiUrl()}/get-published-properties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-integration-key": currentKey,
        Authorization: `Bearer ${currentKey}`, // הוספת header אימות
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.warn(`Failed to fetch properties: API error ${response.status} - using mock data`)
      return getMockProperties()
    }

    const data = await response.json()

    if (data.success && data.properties && data.properties.length > 0) {
      // בדיקה אם הנתונים הם נתוני דוגמה
      const isMockData = data.properties.some((p: Property) => p.id && p.id.toString().startsWith("mock-"))

      if (!isMockData) {
        // אם הנתונים אינם נתוני דוגמה, החזר אותם ללא הודעת שגיאה
        return data.properties
      }
    }

    return getMockProperties()
  } catch (error) {
    console.warn("Error fetching properties - using mock data:", error)
    return getMockProperties()
  }
}

// פונקציה לקבלת פרטי נכס ספציפי
export async function getPropertyById(id: string): Promise<Property | null> {
  if (USE_MOCK_DATA) {
    return getMockProperty(id)
  }

  try {
    // בדיקה אם המפתח תקין
    const currentKey = getIntegrationKey()
    if (!currentKey || currentKey === "INTEGRATION_KEY") {
      console.warn("Integration key is missing or default - using mock data")
      return getMockProperty(id)
    }

    // שליחת בקשה לקבלת פרטי נכס
    const response = await fetch(getApiUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-integration-key": currentKey,
        Authorization: `Bearer ${currentKey}`, // הוספת header אימות
      },
      body: JSON.stringify({
        type: "property",
        data: {
          id: id,
        },
      }),
    })

    if (!response.ok) {
      console.warn(`Failed to fetch property: API error ${response.status} - using mock data`)
      return getMockProperty(id)
    }

    const data = await response.json()

    if (data) {
      return data
    }

    return getMockProperty(id)
  } catch (error) {
    console.warn("Error fetching property - using mock data:", error)
    return getMockProperty(id)
  }
}

// עדכון הפונקציה submitLead כדי לוודא שהיא שולחת את מפתח האינטגרציה בצורה נכונה
export async function submitLead(leadData: LeadData): Promise<{ success: boolean; message: string }> {
  try {
    if (USE_MOCK_DATA) {
      console.log("Using mock data for submitLead:", leadData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true, message: "Lead submitted successfully (mock)" }
    }

    const key = getIntegrationKey()

    const response = await fetch(`${getApiUrl()}/submit-lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-integration-key": key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(leadData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`API error: ${response.status}. Details: ${JSON.stringify(data)}`)
    }

    return { success: true, message: "Lead submitted successfully" }
  } catch (error) {
    console.error("Error submitting lead:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// פונקציה לקבלת נתונים מדומים של נכסים
function getMockProperties(): Property[] {
  return [
    {
      id: "mock-1",
      address: "רחוב הזית 5, רמת גן",
      type: "apartment",
      price: 1850000,
      rooms: 4,
      size: 110,
      floor: 3,
      totalFloors: 5,
      parking: true,
      elevator: true,
      description: "דירת 4 חדרים מרווחת ומשופצת בלב רמת גן",
      features: ["מרפסת שמש", "מיזוג מרכזי", "מטבח משודרג"],
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      status: "active",
      featured: true,
      bathrooms: 2,
    },
    {
      id: "mock-2",
      address: "רחוב הדקל 12, הרצליה",
      type: "house",
      price: 4500000,
      rooms: 6,
      size: 220,
      floor: 0,
      totalFloors: 2,
      parking: true,
      elevator: false,
      description: "וילה מפוארת עם גינה גדולה בהרצליה פיתוח",
      features: ["גינה", "בריכה", "חניה כפולה", "מטבח מאובזר"],
      images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      status: "active",
      featured: true,
      bathrooms: 3,
    },
    {
      id: "mock-3",
      address: "רחוב הברוש 8, תל אביב",
      type: "apartment",
      price: 2200000,
      rooms: 3,
      size: 85,
      floor: 2,
      totalFloors: 4,
      parking: false,
      elevator: true,
      description: "דירת 3 חדרים במיקום מרכזי בתל אביב",
      features: ["מרפסת", "מיזוג", "סורגים"],
      images: ["/placeholder.svg?height=300&width=400"],
      status: "active",
      featured: false,
      bathrooms: 1,
    },
  ]
}

// פונקציה לקבלת נתונים מדומים של נכס ספציפי
function getMockProperty(id: string): Property | null {
  const properties = getMockProperties()
  const property = properties.find((p) => p.id === id)

  if (property) {
    return {
      ...property,
      description:
        property.description + "\n\nתיאור מורחב של הנכס עם פרטים נוספים על הסביבה, מצב הנכס, ואפשרויות תשלום.",
    }
  }

  return null
}

