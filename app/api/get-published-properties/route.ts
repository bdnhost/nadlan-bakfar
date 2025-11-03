import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db/client"
import { properties, integrationKeys } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
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

    // שליפת נכסים מפורסמים
    const publishedProperties = await db
      .select()
      .from(properties)
      .where(eq(properties.published, true))

    // המרת JSON strings בחזרה לאובייקטים
    const formattedProperties = publishedProperties.map((prop) => ({
      id: prop.id,
      address: prop.address,
      type: prop.type,
      status: prop.status || "active",
      price: prop.price,
      rooms: prop.rooms,
      size: prop.size,
      floor: prop.floor,
      totalFloors: prop.totalFloors,
      parking: Boolean(prop.parking),
      elevator: Boolean(prop.elevator),
      description: prop.description,
      features: prop.features ? JSON.parse(prop.features) : [],
      images: prop.images ? JSON.parse(prop.images) : [],
      userId: prop.userId,
      metadata: prop.metadata ? JSON.parse(prop.metadata) : null,
      published: Boolean(prop.published),
      featured: Boolean(prop.featured),
      bathrooms: prop.bathrooms,
      location: prop.location ? JSON.parse(prop.location) : null,
      contact: prop.contact ? JSON.parse(prop.contact) : null,
      created_at: prop.createdAt,
      updated_at: prop.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      properties: formattedProperties,
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
