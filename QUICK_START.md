# התחלה מהירה - 5 דקות! ⚡

## המעבר ל-Turso הושלם! 🎉

המערכת עברה בהצלחה מ-Supabase ל-Turso. עכשיו צריך רק להתקין ולהריץ.

---

## צעד 1: התקן Dependencies (דקה 1️⃣)

```bash
npm install
```

---

## צעד 2: הגדר סביבת פיתוח (דקה 1️⃣)

צור קובץ `.env.local`:

```bash
# העתק את הדוגמה
cp .env.local.example .env.local
```

הקובץ כבר מוגדר עם SQLite מקומי - אין צורך לשנות כלום! 🚀

---

## צעד 3: צור את מסד הנתונים (דקה 1️⃣)

```bash
# צור טבלאות
npm run db:migrate

# טען נתונים לדוגמה (4 נכסים)
npm run db:seed
```

אתה אמור לראות:
```
✅ Migration completed successfully!
✅ Database seeding completed successfully!
```

---

## צעד 4: הרץ את השרת (דקה 1️⃣)

```bash
npm run dev
```

פתח: http://localhost:3000

---

## צעד 5: בדוק שזה עובד (דקה 1️⃣)

1. עבור ל: http://localhost:3000/property-catalog
2. אתה אמור לראות **4 נכסים לדוגמה** 🏠

אם אתה רואה נכסים - **זה עבד!** 🎊

---

## מה הלאה?

### אפשרות 1: Deploy ל-Vercel (מומלץ!)

```bash
git push
```

ב-Vercel Dashboard:
1. לך ל-**Storage** → **Create Database** → **Turso**
2. תן שם: `nadlan-bakfar-db`
3. Vercel יוסיף את משתני הסביבה אוטומטית
4. Redeploy
5. הרץ migration ב-Vercel (דרך Vercel CLI או script):
   ```bash
   vercel env pull .env.production
   npm run db:migrate
   npm run db:seed
   ```

### אפשרות 2: המשך בפיתוח מקומי

הכל מוכן! פשוט:
```bash
npm run dev
```

---

## בעיות? 🤔

### "Cannot find module '@libsql/client'"
```bash
npm install
```

### "Table already exists"
זה בסדר - הטבלאות כבר קיימות.

### "No properties found"
```bash
npm run db:seed
```

### עוד עזרה?
ראה את `SETUP.md` למדריך מפורט.

---

## מה השתנה?

| לפני (Supabase) | אחרי (Turso) |
|---|---|
| Supabase PostgreSQL | SQLite (Turso) |
| Supabase Functions | Next.js API Routes |
| כתובת חיצונית | API מקומי |
| 500MB / 50K reads | 9GB / 1B reads |

---

## קבצים חשובים

- `SETUP.md` - מדריך מפורט
- `DATABASE_ALTERNATIVES.md` - למה בחרנו Turso
- `MIGRATION_TO_TURSO.md` - כל הפרטים הטכניים
- `.env.local.example` - דוגמת סביבה

---

## API Endpoints חדשים

עכשיו במקום Supabase Functions:

- `GET /api/get-published-properties` - קבל נכסים
- `POST /api/submit-lead` - שלח ליד
- `POST /api/validate-key` - בדוק מפתח

---

## 🎯 סיימנו!

המערכת מוכנה לעבודה. תהנה! 🚀
