import { NextResponse } from "next/server"
import type { ContentGenerationParams } from "@/lib/content-generator/types"
import { createContent } from "@/lib/content-generator/content-service"
import { generateScheduledContent } from "@/lib/content-generator/scheduler"

// נקודת קצה ליצירת תוכן
export async function POST(request: Request) {
  try {
    // בדיקת אבטחה - במערכת אמיתית יש להוסיף אימות

    const data = await request.json()

    // אם נשלחו פרמטרים ספציפיים, השתמש בהם
    if (data.params) {
      const params: ContentGenerationParams = data.params
      const result = await createContent(params)
      return NextResponse.json(result)
    }

    // אחרת, צור תוכן אוטומטי
    const result = await generateScheduledContent()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Content generation API error:", error)
    return NextResponse.json(
      { error: "Failed to generate content", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

