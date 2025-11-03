import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db/client"
import { integrationKeys } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key } = body

    if (!key) {
      return NextResponse.json({ success: false, error: "Missing integration key" }, { status: 400 })
    }

    // חיפוש המפתח במסד הנתונים
    const validKeys = await db
      .select()
      .from(integrationKeys)
      .where(and(eq(integrationKeys.key, key), eq(integrationKeys.active, true)))
      .limit(1)

    if (validKeys.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid or inactive integration key" }, { status: 401 })
    }

    const keyData = validKeys[0]
    const permissions = keyData.permissions ? JSON.parse(keyData.permissions) : {}

    return NextResponse.json({
      success: true,
      message: "Integration key is valid and active",
      permissions,
    })
  } catch (error) {
    console.error("Error validating key:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
