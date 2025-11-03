import { client } from "../lib/db/client"

async function migrate() {
  console.log("🚀 Starting database migration...")

  try {
    // יצירת טבלת נכסים
    console.log("Creating properties table...")
    await client.execute(`
      CREATE TABLE IF NOT EXISTS properties (
        id TEXT PRIMARY KEY,
        address TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        price REAL NOT NULL,
        rooms INTEGER,
        size REAL,
        floor INTEGER,
        total_floors INTEGER,
        parking INTEGER,
        elevator INTEGER,
        description TEXT,
        features TEXT,
        images TEXT,
        user_id TEXT,
        metadata TEXT,
        published INTEGER DEFAULT 1,
        featured INTEGER DEFAULT 0,
        bathrooms INTEGER,
        location TEXT,
        contact TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // יצירת טבלת לידים
    console.log("Creating leads table...")
    await client.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        source TEXT NOT NULL,
        property_id TEXT,
        status TEXT DEFAULT 'new',
        notes TEXT,
        metadata TEXT,
        user_id TEXT,
        customer_id TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // יצירת טבלת מפתחות אינטגרציה
    console.log("Creating integration_keys table...")
    await client.execute(`
      CREATE TABLE IF NOT EXISTS integration_keys (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        name TEXT,
        active INTEGER DEFAULT 1,
        permissions TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log("✅ Migration completed successfully!")
  } catch (error) {
    console.error("❌ Migration failed:", error)
    throw error
  }
}

// הרצת המיגרציה
migrate()
  .then(() => {
    console.log("Done!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Failed:", error)
    process.exit(1)
  })
