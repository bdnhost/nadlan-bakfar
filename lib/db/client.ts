import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "./schema"

// יצירת client ל-Turso
// אם משתני הסביבה לא מוגדרים, נשתמש בערכי ברירת מחדל למצב פיתוח מקומי
const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
})

// יצירת instance של drizzle עם הסכמה
export const db = drizzle(client, { schema })
export { client }
