import { NextResponse } from "next/server"
import { generateScheduledContent } from "@/lib/content-generator/scheduler"

// פונקציה מתוזמנת לייצור תוכן אוטומטי
export async function GET(request: Request) {
  try {
    // בדיקת אבטחה - במערכת אמיתית יש להוסיף אימות
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // יצירת תוכן אוטומטי
    const result = await generateScheduledContent()

    return NextResponse.json({
      success: true,
      message: "Content generated successfully",
      content: result.content,
    })
  } catch (error) {
    console.error("Scheduled content generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate scheduled content",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

