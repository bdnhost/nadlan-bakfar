# הגדרת המערכת

## בעיות ידועות ופתרונות

### 1. אזהרות Peer Dependency

אם אתה רואה אזהרות כמו:
```
warn: incorrect peer dependency "react@19.2.0"
warn: incorrect peer dependency "date-fns@4.1.0"
```

**פתרון**: הורדנו את React ל-18.3.1 ואת date-fns ל-3.6.0 כדי לתמוך בכל החבילות.
הוספנו גם `.npmrc` עם `legacy-peer-deps=true` כדי להתעלם מאזהרות שנותרו.

### 2. שגיאת חיבור לSupabase

אם אתה רואה שגיאה:
```
Error fetching properties: TypeError: fetch failed
ENOTFOUND waatnnddbujgohmegmeu.supabase.co
```

**הסיבה**: כתובת ה-Supabase הקיימת אינה נגישה.

**פתרון**:
1. ודא שיש לך פרויקט Supabase פעיל
2. עדכן את כתובת ה-API באחת מהדרכים הבאות:

#### אפשרות א': משתני סביבה
צור קובץ `.env.local` עם:
```bash
API_URL=https://your-project.supabase.co/functions/v1/external-integration
NEXT_PUBLIC_INTEGRATION_KEY=your-integration-key-here
```

#### אפשרות ב': דרך ממשק הניהול
1. עבור לדף `/admin/integration-key`
2. הזן את כתובת ה-API והמפתח החדשים
3. שמור ורענן את הדף

### 3. התקנת Dependencies

לאחר שליפת הקוד, יש להריץ:

```bash
# עם npm
npm install

# או עם yarn
yarn install

# או עם pnpm
pnpm install
```

### 4. בניית הפרויקט

```bash
# עם npm
npm run build

# או עם yarn
yarn build

# או עם pnpm
pnpm build
```

## הפעלת המערכת

### מצב פיתוח
```bash
npm run dev
```

### מצב ייצור
```bash
npm run build
npm start
```

## קבצי הגדרה חשובים

- `.env.example` - דוגמה למשתני סביבה נדרשים
- `.npmrc` - הגדרות npm (כולל legacy-peer-deps)
- `lib/config.ts` - ניהול הגדרות וקונפיגורציה

## תמיכה

אם אתה נתקל בבעיות:
1. ודא שכל משתני הסביבה מוגדרים נכון
2. בדוק שכתובת ה-Supabase נגישה
3. ודא שמפתח האינטגרציה תקין (48 תווים הקסדצימליים)
