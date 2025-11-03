import { db } from "../lib/db/client"
import { properties, integrationKeys } from "../lib/db/schema"
import { randomUUID } from "crypto"

async function seed() {
  console.log("🌱 Starting database seeding...")

  try {
    // בדיקה אם כבר יש מפתח אינטגרציה
    const existingKeys = await db.select().from(integrationKeys).limit(1)

    if (existingKeys.length === 0) {
      // הוספת מפתח אינטגרציה ברירת מחדל
      console.log("Adding default integration key...")
      const integrationKey = "d22d8b05933905caee1f49348e556e7d43c0f38277b91258"

      await db.insert(integrationKeys).values({
        id: randomUUID(),
        key: integrationKey,
        name: "Default Integration Key",
        active: true,
        permissions: JSON.stringify({
          can_create_leads: true,
          can_manage_properties: true,
          can_fetch_published_properties: true,
        }),
      })
      console.log("✅ Integration key added:", integrationKey)
    } else {
      console.log("⏭️  Integration key already exists, skipping...")
    }

    // בדיקה אם כבר יש נכסים
    const existingProperties = await db.select().from(properties).limit(1)

    if (existingProperties.length === 0) {
      // הוספת נכסים לדוגמה
      console.log("Adding sample properties...")

      await db.insert(properties).values([
        {
          id: randomUUID(),
          address: "רחוב הזית 5, רמת גן",
          type: "apartment",
          price: 1850000,
          rooms: 4,
          size: 110,
          floor: 3,
          totalFloors: 5,
          parking: true,
          elevator: true,
          description: "דירת 4 חדרים מרווחת ומשופצת בלב רמת גן. הדירה כוללת מרפסת שמש, מיזוג מרכזי ומטבח משודרג.",
          features: JSON.stringify(["מרפסת שמש", "מיזוג מרכזי", "מטבח משודרג", "חניה"]),
          images: JSON.stringify([
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
          ]),
          published: true,
          featured: true,
          bathrooms: 2,
          status: "active",
        },
        {
          id: randomUUID(),
          address: "רחוב הדקל 12, הרצליה",
          type: "house",
          price: 4500000,
          rooms: 6,
          size: 220,
          floor: 0,
          totalFloors: 2,
          parking: true,
          elevator: false,
          description: "וילה מפוארת עם גינה גדולה בהרצליה פיתוח. הווילה כוללת בריכה פרטית, גינה מטופחת וחניה כפולה.",
          features: JSON.stringify(["גינה פרטית", "בריכה", "חניה כפולה", "מטבח מאובזר", "3 קומות"]),
          images: JSON.stringify([
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
          ]),
          published: true,
          featured: true,
          bathrooms: 3,
          status: "active",
        },
        {
          id: randomUUID(),
          address: "רחוב הברוש 8, תל אביב",
          type: "apartment",
          price: 2200000,
          rooms: 3,
          size: 85,
          floor: 2,
          totalFloors: 4,
          parking: false,
          elevator: true,
          description: "דירת 3 חדרים במיקום מרכזי בתל אביב. קרובה לתחבורה ציבורית ולמרכזי קניות.",
          features: JSON.stringify(["מרפסת", "מיזוג", "סורגים", "ממ\"ד"]),
          images: JSON.stringify(["/placeholder.svg?height=300&width=400"]),
          published: true,
          featured: false,
          bathrooms: 1,
          status: "active",
        },
        {
          id: randomUUID(),
          address: "רחוב השקד 3, פתח תקווה",
          type: "apartment",
          price: 1600000,
          rooms: 3,
          size: 75,
          floor: 5,
          totalFloors: 8,
          parking: true,
          elevator: true,
          description: "דירת 3 חדרים משופצת בפתח תקווה. נוף פתוח ומרפסת גדולה.",
          features: JSON.stringify(["נוף פתוח", "משופצת", "מרפסת גדולה"]),
          images: JSON.stringify([
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
          ]),
          published: true,
          featured: false,
          bathrooms: 1,
          status: "active",
        },
      ])

      console.log("✅ Sample properties added")
    } else {
      console.log("⏭️  Properties already exist, skipping...")
    }

    console.log("✅ Database seeding completed successfully!")
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    throw error
  }
}

// הרצת ה-seeding
seed()
  .then(() => {
    console.log("Done!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Failed:", error)
    process.exit(1)
  })
