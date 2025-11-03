import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db/client"
import { leads, integrationKeys } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { randomUUID } from "crypto"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    // בדיקת מפתח אינטגרציה
    const integrationKey = request.headers.get("x-integration-key") || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!integrationKey) {
      return NextResponse.json({ success: false, error: "Missing integration key" }, { status: 401 })
    }

    // ודא שהמפתח תקין
    const validKeys = await db
      .select()
      .from(integrationKeys)
      .where(and(eq(integrationKeys.key, integrationKey), eq(integrationKeys.active, true)))
      .limit(1)

    if (validKeys.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid or inactive integration key" }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, phone, source, property_id, notes } = body

    // ולידציה
    if (!name || !source) {
      return NextResponse.json({ success: false, error: "Name and source are required" }, { status: 400 })
    }

    // יצירת ליד חדש
    const leadId = randomUUID()
    await db.insert(leads).values({
      id: leadId,
      name,
      email,
      phone,
      source,
      propertyId: property_id,
      notes,
      status: "new",
    })

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully",
      leadId,
    })
  } catch (error) {
    console.error("Error submitting lead:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
