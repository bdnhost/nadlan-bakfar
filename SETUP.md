# הגדרת המערכת - מעבר ל-Turso

## שינויים עיקריים

המערכת עברה מ-Supabase ל-**Turso** (SQLite Serverless) + Next.js API Routes.

### מה השתנה?

- ✅ **מסד נתונים**: Turso (SQLite) במקום Supabase PostgreSQL
- ✅ **API**: Next.js API Routes במקום Supabase Functions
- ✅ **אינטגרציה**: משולב ב-Vercel Marketplace
- ✅ **ביצועים**: מהיר יותר, ללא cold starts
- ✅ **מחיר**: Free tier נדיב (9GB, 1B reads/month)

---

## התקנה מהירה

### 1. התקן Dependencies

```bash
npm install
# או
yarn install
```

### 2. הגדר משתני סביבה

צור קובץ `.env.local`:

```bash
cp .env.local.example .env.local
```

ערוך את `.env.local`:

```bash
# לפיתוח מקומי (SQLite מקומי)
TURSO_DATABASE_URL=file:local.db

# או לחיבור ל-Turso בענן
# TURSO_DATABASE_URL=libsql://your-db.turso.io
# TURSO_AUTH_TOKEN=your-token-here
```

### 3. צור את מסד הנתונים

```bash
# צור את הטבלאות
npm run db:migrate

# טען נתונים ראשוניים
npm run db:seed
```

### 4. הרץ את השרת

```bash
npm run dev
```

גלוש ל-http://localhost:3000

---

## הגדרה עם Turso בענן (מומלץ)

### דרך Vercel Dashboard (הכי פשוט!)

1. עבור ל-[Vercel Dashboard](https://vercel.com/dashboard)
2. בחר את הפרויקט שלך
3. לך ל-**Storage** → **Create Database**
4. בחר **Turso**
5. תן שם למסד הנתונים: `nadlan-bakfar-db`
6. Vercel יוסיף אוטומטית את משתני הסביבה:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`

### דרך Turso CLI

```bash
# התקן את Turso CLI
npm install -g @turso/cli

# התחבר
turso auth login

# צור מסד נתונים
turso db create nadlan-bakfar-db

# קבל את ה-URL
turso db show nadlan-bakfar-db --url

# צור token
turso db tokens create nadlan-bakfar-db
```

הוסף למשתני הסביבה ב-Vercel או ל-`.env.local`.

---

## בעיות ידועות ופתרונות (אחרי המעבר ל-Turso)

### ✅ 1. אזהרות Peer Dependency - **נפתר!**

**הפתרון שבוצע**:
- הורדנו את React מ-19 ל-18.3.1
- הורדנו את date-fns מ-4.1 ל-3.6.0
- הוספנו `.npmrc` עם `legacy-peer-deps=true`

### ✅ 2. שגיאת חיבור לSupabase - **נפתר!**

**הפתרון שבוצע**:
- עברנו ל-Turso במקום Supabase
- השתמשנו ב-Next.js API Routes במקום Supabase Functions
- אין יותר תלות בשרתים חיצוניים

---

## API Endpoints

המערכת כוללת 3 API Routes:

### 1. GET /api/get-published-properties
קבלת כל הנכסים המפורסמים

**Headers**:
```
x-integration-key: your-key-here
```

**Response**:
```json
{
  "success": true,
  "properties": [...]
}
```

### 2. POST /api/submit-lead
שליחת ליד חדש

**Headers**:
```
x-integration-key: your-key-here
Content-Type: application/json
```

**Body**:
```json
{
  "name": "שם",
  "email": "email@example.com",
  "phone": "050-1234567",
  "source": "website",
  "property_id": "uuid",
  "notes": "הערות"
}
```

### 3. POST /api/validate-key
בדיקת תקינות מפתח אינטגרציה

**Body**:
```json
{
  "key": "your-key-here"
}
```

---

## Scripts זמינים

```bash
# פיתוח
npm run dev

# בנייה
npm run build

# הרצה בייצור
npm start

# מסד נתונים
npm run db:migrate  # יצירת טבלאות
npm run db:seed     # טעינת נתונים ראשוניים
```

---

## Deploy ל-Vercel

### אוטומטי

פשוט תעשה push ל-Git:

```bash
git add .
git commit -m "המעבר ל-Turso הושלם"
git push
```

Vercel יעשה deploy אוטומטית.

### הגדרת משתני סביבה ב-Vercel

1. לך ל-Vercel Dashboard → הפרויקט שלך → **Settings** → **Environment Variables**
2. הוסף:
   - `TURSO_DATABASE_URL` (מ-Turso או Vercel Storage)
   - `TURSO_AUTH_TOKEN` (מ-Turso או Vercel Storage)
   - `NEXT_PUBLIC_INTEGRATION_KEY` (אופציונלי)

---

## מבנה הפרויקט (אחרי המעבר)

```
nadlan-bakfar/
├── app/
│   ├── api/                        # API Routes חדשים (מחליף Supabase Functions)
│   │   ├── get-published-properties/
│   │   │   └── route.ts
│   │   ├── submit-lead/
│   │   │   └── route.ts
│   │   └── validate-key/
│   │       └── route.ts
│   └── ...
├── lib/
│   ├── db/                         # חדש - Turso/Drizzle
│   │   ├── schema.ts              # הגדרת טבלאות
│   │   └── client.ts              # חיבור למסד נתונים
│   ├── config.ts                  # עודכן - API URL מקומי
│   └── api-service.ts             # עודכן - קריאות ל-API Routes
├── scripts/
│   ├── migrate.ts                 # יצירת טבלאות
│   └── seed.ts                    # טעינת נתונים
├── .env.example                   # משתני סביבה - עודכן
├── .env.local.example             # דוגמה לפיתוח מקומי
├── package.json                   # עודכן עם Turso packages
├── DATABASE_ALTERNATIVES.md       # מסמך השוואה
└── MIGRATION_TO_TURSO.md          # מדריך מעבר מפורט
```

---

## תמחור Turso (Free Tier)

- ✅ **9GB Storage** (פי 18 מ-Supabase)
- ✅ **1 Billion Reads/month** (פי 20,000 מ-Supabase)
- ✅ **25 Million Writes/month** (פי 500 מ-Supabase)
- ✅ **500 Databases**
- ✅ **Unlimited compute**

---

## תמיכה ועזרה

- **מסמכי Turso**: https://docs.turso.tech/
- **Vercel Docs**: https://vercel.com/docs
- **מדריך מעבר מפורט**: ראה `MIGRATION_TO_TURSO.md`
- **השוואת אלטרנטיבות**: ראה `DATABASE_ALTERNATIVES.md`

---

## FAQ

### איך אני יודע שהמעבר עבד?

הרץ:
```bash
npm run dev
```

אם אתה רואה את הנכסים בדף `/property-catalog`, זה עובד! 🎉

### איך אני מוסיף נכסים חדשים?

כרגע, הוסף ישירות ל-Turso DB או עדכן את `scripts/seed.ts` והרץ `npm run db:seed` שוב.

### מה קורה עם הנתונים הישנים מ-Supabase?

אם היו לך נתונים ב-Supabase, תצטרך ליבא אותם ידנית ל-Turso. ניתן ליצור script migration מותאם.

### האם אני יכול לחזור ל-Supabase?

כן, אבל לא מומלץ. Turso פשוט יותר, זול יותר ומהיר יותר.

---

## עדכונים אחרונים

- **2025-01-XX**: המעבר מ-Supabase ל-Turso הושלם
- **2025-01-XX**: תיקון בעיות peer dependencies (React 18, date-fns 3.6)
- **2025-01-XX**: הוספת מסמכי תיעוד מפורטים
