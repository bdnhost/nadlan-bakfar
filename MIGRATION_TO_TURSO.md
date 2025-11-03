# מדריך מעבר ל-Turso

## סקירה כללית

במקום להשתמש ב-Supabase Functions, נעביר ל:
- **Turso** - מסד נתונים SQLite serverless
- **Next.js API Routes** - במקום Supabase Functions

## יתרונות המעבר

1. ✅ **פשוט יותר** - SQLite + Next.js API Routes
2. ✅ **מהיר יותר** - Edge-ready, ללא cold starts
3. ✅ **זול יותר** - Free tier נדיב (9GB, 1B reads)
4. ✅ **משולב ב-Vercel** - דפלוי חלק
5. ✅ **קוד פתוח 100%** - libSQL

---

## שלב 1: הכנת הסביבה

### 1.1 צור DB ב-Turso דרך Vercel

```bash
# אופציה 1: דרך Vercel Dashboard
1. לך ל-Vercel Dashboard
2. בחר את הפרויקט שלך
3. Storage → Create Database
4. בחר Turso
5. תן שם למסד הנתונים: nadlan-bakfar-db

# אופציה 2: דרך Turso CLI
npm install -g @turso/cli
turso auth login
turso db create nadlan-bakfar-db
turso db show nadlan-bakfar-db --url  # קבל את ה-URL
turso db tokens create nadlan-bakfar-db  # קבל את ה-token
```

### 1.2 התקן את החבילות הנדרשות

\`\`\`bash
npm install @libsql/client drizzle-orm
npm install -D drizzle-kit
\`\`\`

---

## שלב 2: הגדרת מסד הנתונים

### 2.1 צור את סכמת הטבלאות

צור קובץ: \`lib/db/schema.ts\`

\`\`\`typescript
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// טבלת נכסים
export const properties = sqliteTable('properties', {
  id: text('id').primaryKey(),
  address: text('address').notNull(),
  type: text('type').notNull(),
  status: text('status').default('active'),
  price: real('price').notNull(),
  rooms: integer('rooms'),
  size: real('size'),
  floor: integer('floor'),
  totalFloors: integer('total_floors'),
  parking: integer('parking', { mode: 'boolean' }),
  elevator: integer('elevator', { mode: 'boolean' }),
  description: text('description'),
  features: text('features'), // JSON string
  images: text('images'), // JSON string
  userId: text('user_id'),
  metadata: text('metadata'), // JSON string
  published: integer('published', { mode: 'boolean' }).default(true),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  bathrooms: integer('bathrooms'),
  location: text('location'), // JSON: {lat, lng}
  contact: text('contact'), // JSON: {name, phone, email}
  createdAt: text('created_at').default(sql\`CURRENT_TIMESTAMP\`),
  updatedAt: text('updated_at').default(sql\`CURRENT_TIMESTAMP\`)
});

// טבלת לידים
export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  source: text('source').notNull(),
  propertyId: text('property_id'),
  status: text('status').default('new'),
  notes: text('notes'),
  metadata: text('metadata'), // JSON string
  userId: text('user_id'),
  customerId: text('customer_id'),
  createdAt: text('created_at').default(sql\`CURRENT_TIMESTAMP\`),
  updatedAt: text('updated_at').default(sql\`CURRENT_TIMESTAMP\`)
});

// טבלת מפתחות אינטגרציה
export const integrationKeys = sqliteTable('integration_keys', {
  id: text('id').primaryKey(),
  key: text('key').notNull().unique(),
  name: text('name'),
  active: integer('active', { mode: 'boolean' }).default(true),
  permissions: text('permissions'), // JSON string
  createdAt: text('created_at').default(sql\`CURRENT_TIMESTAMP\`)
});
\`\`\`

### 2.2 צור את קובץ החיבור למסד הנתונים

צור קובץ: \`lib/db/client.ts\`

\`\`\`typescript
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
});

export const db = drizzle(client, { schema });
export { client };
\`\`\`

### 2.3 הרץ migration ליצירת הטבלאות

צור קובץ: \`scripts/migrate.ts\`

\`\`\`typescript
import { client } from '../lib/db/client';

async function migrate() {
  console.log('Creating tables...');

  await client.execute(\`
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
  \`);

  await client.execute(\`
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
  \`);

  await client.execute(\`
    CREATE TABLE IF NOT EXISTS integration_keys (
      id TEXT PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      name TEXT,
      active INTEGER DEFAULT 1,
      permissions TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  \`);

  console.log('Tables created successfully!');
}

migrate().catch(console.error);
\`\`\`

הרץ:
\`\`\`bash
npx tsx scripts/migrate.ts
\`\`\`

---

## שלב 3: יצירת API Routes חדשים

### 3.1 API לקבלת נכסים

צור קובץ: \`app/api/get-published-properties/route.ts\`

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { properties } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // בדיקת מפתח אינטגרציה
    const integrationKey = request.headers.get('x-integration-key');
    if (!integrationKey) {
      return NextResponse.json(
        { success: false, error: 'Missing integration key' },
        { status: 401 }
      );
    }

    // TODO: ודא שהמפתח תקין (השווה לטבלת integration_keys)

    // שליפת נכסים מפורסמים
    const publishedProperties = await db
      .select()
      .from(properties)
      .where(eq(properties.published, true));

    // המרת JSON strings בחזרה לאובייקטים
    const formattedProperties = publishedProperties.map(prop => ({
      ...prop,
      features: prop.features ? JSON.parse(prop.features) : [],
      images: prop.images ? JSON.parse(prop.images) : [],
      location: prop.location ? JSON.parse(prop.location) : null,
      contact: prop.contact ? JSON.parse(prop.contact) : null,
      metadata: prop.metadata ? JSON.parse(prop.metadata) : null,
      parking: Boolean(prop.parking),
      elevator: Boolean(prop.elevator),
      published: Boolean(prop.published),
      featured: Boolean(prop.featured)
    }));

    return NextResponse.json({
      success: true,
      properties: formattedProperties
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
\`\`\`

### 3.2 API לשליחת לידים

צור קובץ: \`app/api/submit-lead/route.ts\`

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { leads } from '@/lib/db/schema';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // בדיקת מפתח אינטגרציה
    const integrationKey = request.headers.get('x-integration-key');
    if (!integrationKey) {
      return NextResponse.json(
        { success: false, error: 'Missing integration key' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email, phone, source, property_id, notes } = body;

    // ולידציה
    if (!name || !source) {
      return NextResponse.json(
        { success: false, error: 'Name and source are required' },
        { status: 400 }
      );
    }

    // יצירת ליד חדש
    const leadId = randomUUID();
    await db.insert(leads).values({
      id: leadId,
      name,
      email,
      phone,
      source,
      propertyId: property_id,
      notes,
      status: 'new'
    });

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      leadId
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
\`\`\`

---

## שלב 4: עדכון lib/config.ts

עדכן את \`lib/config.ts\`:

\`\`\`typescript
// במקום כתובת Supabase, השתמש בכתובת API המקומית
export function getApiUrl(): string {
  // אם אנחנו ב-production, החזר את כתובת ה-Vercel
  if (process.env.VERCEL_URL) {
    return \`https://\${process.env.VERCEL_URL}/api\`;
  }

  // אם אנחנו ב-development, החזר localhost
  return 'http://localhost:3000/api';
}
\`\`\`

---

## שלב 5: טעינת נתונים ראשוניים

צור סקריפט לטעינת נתוני דוגמה:

\`scripts/seed.ts\`:

\`\`\`typescript
import { db } from '../lib/db/client';
import { properties, integrationKeys } from '../lib/db/schema';
import { randomUUID } from 'crypto';

async function seed() {
  console.log('Seeding database...');

  // הוסף מפתח אינטגרציה
  const integrationKey = 'd22d8b05933905caee1f49348e556e7d43c0f38277b91258';
  await db.insert(integrationKeys).values({
    id: randomUUID(),
    key: integrationKey,
    name: 'Default Integration Key',
    active: true,
    permissions: JSON.stringify({
      can_create_leads: true,
      can_manage_properties: true,
      can_fetch_published_properties: true
    })
  });

  // הוסף נכסים לדוגמה
  await db.insert(properties).values([
    {
      id: randomUUID(),
      address: 'רחוב הזית 5, רמת גן',
      type: 'apartment',
      price: 1850000,
      rooms: 4,
      size: 110,
      floor: 3,
      totalFloors: 5,
      parking: 1,
      elevator: 1,
      description: 'דירת 4 חדרים מרווחת ומשופצת בלב רמת גן',
      features: JSON.stringify(['מרפסת שמש', 'מיזוג מרכזי', 'מטבח משודרג']),
      images: JSON.stringify(['/placeholder.svg?height=300&width=400']),
      published: 1,
      featured: 1,
      bathrooms: 2
    },
    // הוסף עוד נכסים...
  ]);

  console.log('Database seeded successfully!');
}

seed().catch(console.error);
\`\`\`

הרץ:
\`\`\`bash
npx tsx scripts/seed.ts
\`\`\`

---

## שלב 6: בדיקה

### 6.1 בדיקה מקומית

\`\`\`bash
npm run dev
\`\`\`

נסה לגשת ל:
- http://localhost:3000/api/get-published-properties (עם header x-integration-key)
- http://localhost:3000/property-catalog

### 6.2 דפלוי ל-Vercel

\`\`\`bash
git add .
git commit -m "Migrate to Turso database"
git push
\`\`\`

Vercel יעשה deploy אוטומטית.

---

## שלב 7: ניקוי והסרת Supabase

1. הסר את ההתייחסות ל-Supabase מ-\`lib/config.ts\`
2. עדכן את \`.env.example\`:

\`\`\`bash
# Turso Database
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token

# Integration Key (optional - for testing)
NEXT_PUBLIC_INTEGRATION_KEY=your-integration-key
\`\`\`

---

## השוואת קוד: לפני ואחרי

### לפני (Supabase):
\`\`\`typescript
// קריאה ל-Supabase Function
const response = await fetch(
  'https://waatnnddbujgohmegmeu.supabase.co/functions/v1/external-integration/get-published-properties',
  {
    headers: { 'x-integration-key': key }
  }
);
\`\`\`

### אחרי (Turso + Next.js API Routes):
\`\`\`typescript
// קריאה ל-API Route מקומי
const response = await fetch('/api/get-published-properties', {
  headers: { 'x-integration-key': key }
});
\`\`\`

---

## תמחור

| Feature | Supabase Free | Turso Free |
|---|---|---|
| **Storage** | 500MB | 9GB (18x יותר) |
| **Reads** | 50K/month | 1B/month (20,000x יותר) |
| **Writes** | 50K/month | 25M/month (500x יותר) |
| **Databases** | 2 | 500 |
| **Edge locations** | לא | כן |

---

## סיכום

המעבר ל-Turso מביא:
- ✅ פשטות - Next.js API Routes במקום Supabase Functions
- ✅ ביצועים - Edge-ready, ללא cold starts
- ✅ חיסכון - Free tier נדיב פי 500
- ✅ קוד פתוח - 100% libSQL
- ✅ אינטגרציה - מובנה ב-Vercel

**אני יכול לעזור לך בביצוע המעבר. רוצה שאתחיל?**
