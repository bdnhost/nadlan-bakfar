import { NextResponse } from "next/server"
import { INTEGRATION_KEY } from "@/lib/config"

// נקודת קצה לקבלת עדכונים מהמערכת
export async function POST(request: Request) {
  try {
    // בדיקת אבטחה - וידוא שהבקשה מגיעה עם מפתח האינטגרציה הנכון
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== INTEGRATION_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // טיפול בסוגי עדכונים שונים
    switch (data.type) {
      case "property_update":
        console.log("Property update received:", data.property.id)
        // כאן ניתן להוסיף לוגיקה לטיפול בעדכון נכס
        break
      case "lead_status_update":
        console.log("Lead status update received:", data.lead.id)
        // כאן ניתן להוסיף לוגיקה לטיפול בעדכון סטטוס ליד
        break
      default:
        console.log("Unknown webhook type:", data.type)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

