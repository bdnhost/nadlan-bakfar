# מדריך פריסה ל-Vercel - צעד אחר צעד 🚀

## לפני שמתחילים - ודא שיש לך:
- ✅ חשבון ב-[Vercel](https://vercel.com)
- ✅ הפרויקט מחובר ל-GitHub repository

---

## שלב 1: משוך את השינויים האחרונים

```bash
git pull origin claude/fix-peer-dependency-warnings-011CUkaGdKfyYHpYRL6SRtwz
```

---

## שלב 2: Merge ל-Main (אופציונלי אבל מומלץ)

```bash
git checkout main
git merge claude/fix-peer-dependency-warnings-011CUkaGdKfyYHpYRL6SRtwz
git push origin main
```

**או** תוכל לעשות deploy ישירות מה-branch הנוכחי.

---

## שלב 3: הגדרת Turso Database ב-Vercel

### אפשרות א': דרך Vercel Dashboard (הכי פשוט!)

1. לך ל-[Vercel Dashboard](https://vercel.com/dashboard)
2. בחר את הפרויקט `nadlan-bakfar`
3. לחץ על **Storage** בתפריט הצד
4. לחץ על **Create Database**
5. בחר **Turso**
6. הזן שם: `nadlan-bakfar-db`
7. לחץ **Create**

✅ Vercel יוסיף אוטומטית את משתני הסביבה:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`

### אפשרות ב': דרך Turso CLI

```bash
# התקן Turso CLI
npm install -g @turso/cli

# התחבר
turso auth login

# צור מסד נתונים
turso db create nadlan-bakfar-db

# קבל את ה-URL והטוקן
turso db show nadlan-bakfar-db --url
turso db tokens create nadlan-bakfar-db
```

אז הוסף ידנית ב-Vercel:
1. **Settings** → **Environment Variables**
2. הוסף: `TURSO_DATABASE_URL` = `libsql://...`
3. הוסף: `TURSO_AUTH_TOKEN` = `...`

---

## שלב 4: Deploy הקוד

### אם עשית merge ל-main:
Vercel יעשה deploy אוטומטית כשתעשה push.

### אם אתה על branch:
1. לך ל-Vercel Dashboard
2. בחר את הפרויקט
3. לחץ **Deployments**
4. מצא את ה-deployment האחרון מה-branch שלך
5. או: לחץ **Deploy** ידנית

---

## שלב 5: הרץ Migration בפעם הראשונה

אחרי שה-deployment הצליח, צריך ליצור את הטבלאות ב-production DB.

### אפשרות א': דרך Vercel CLI (מומלץ)

```bash
# התקן Vercel CLI אם אין לך
npm i -g vercel

# התחבר
vercel login

# קשר את הפרויקט
vercel link

# קבל את משתני הסביבה מ-production
vercel env pull .env.production

# הרץ migration עם משתני production
source .env.production && npm run db:migrate

# טען נתונים ראשוניים
source .env.production && npm run db:seed
```

### אפשרות ב': דרך Turso CLI ישירות

```bash
# התחבר ל-DB
turso db shell nadlan-bakfar-db

# העתק את ה-SQL מ-scripts/migrate.ts והרץ ידנית
```

### אפשרות ג': API Route למיגרציה (אני יכול ליצור אם צריך)

---

## שלב 6: בדיקה

לאחר ה-deployment והמיגרציה:

1. עבור ל-URL של האפליקציה ב-Vercel
2. נווט ל-`/property-catalog`
3. אם אתה רואה נכסים - **זה עבד!** 🎉

אם אין נכסים:
- ודא שהרצת `db:seed`
- בדוק את הלוגים ב-Vercel Dashboard

---

## שלב 7: (אופציונלי) משתני סביבה נוספים

אם צריך, הוסף ב-Vercel Settings → Environment Variables:

```bash
# מפתח אינטגרציה (אם רוצה override את ברירת המחדל)
NEXT_PUBLIC_INTEGRATION_KEY=your-custom-key-here

# אם יש URL מותאם
API_URL=your-custom-api-url
```

---

## בעיות נפוצות 🔧

### שגיאה: "TURSO_DATABASE_URL is not defined"
- ודא שהוספת את משתני הסביבה ב-Vercel
- Redeploy את האפליקציה אחרי הוספת משתנים

### שגיאה: "Table does not exist"
- צריך להריץ את ה-migration (שלב 5)

### שגיאה: "No properties found"
- צריך להריץ את ה-seed (שלב 5)

### הדף נראה ריק
- בדוק Console בדפדפן
- בדוק Logs ב-Vercel Dashboard → הפרויקט → Logs

---

## סיכום מהיר 📋

```bash
# 1. משוך שינויים
git pull origin claude/fix-peer-dependency-warnings-011CUkaGdKfyYHpYRL6SRtwz

# 2. (אופציונלי) Merge ל-main
git checkout main && git merge claude/fix-peer-dependency-warnings-011CUkaGdKfyYHpYRL6SRtwz && git push

# 3. הגדר Turso ב-Vercel Dashboard (Storage → Create → Turso)

# 4. Deploy יקרה אוטומטית

# 5. הרץ migration
vercel env pull .env.production
source .env.production && npm run db:migrate && npm run db:seed

# 6. בדוק: https://your-app.vercel.app/property-catalog
```

---

## צריך עזרה? 🆘

- **Vercel Docs**: https://vercel.com/docs
- **Turso Docs**: https://docs.turso.tech/
- **הקוד המלא**: ראה `SETUP.md` ו-`MIGRATION_TO_TURSO.md`

---

## מה הלאה?

אחרי פריסה מוצלחת:
1. ✅ החזר את הקבצים מ-backup (אם צריך)
2. ✅ הוסף נכסים אמיתיים
3. ✅ התאם אישית את העיצוב
4. ✅ הוסף תכונות נוספות

**בהצלחה! 🚀**
