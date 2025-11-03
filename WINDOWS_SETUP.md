# מדריך התקנה והרצה על Windows 10 💻

## דרישות מקדימות

### 1. ודא שיש לך Node.js מותקן

פתח **Command Prompt** או **PowerShell** והרץ:
```cmd
node --version
npm --version
```

אם אתה רואה מספרי גרסה (למשל `v18.0.0`) - מעולה! ✅

**אם לא מותקן:**
1. הורד מ-https://nodejs.org/
2. התקן את הגרסה LTS (מומלץ)
3. אתחל את ה-terminal ובדוק שוב

---

## התקנה והרצה - 5 צעדים פשוטים

### צעד 1: נווט לתיקיית הפרויקט

פתח **Command Prompt** או **PowerShell** ונווט לתיקייה:

```cmd
cd C:\path\to\nadlan-bakfar
```

(החלף `C:\path\to\nadlan-bakfar` בנתיב האמיתי שבו הורדת את הקבצים)

---

### צעד 2: התקן Dependencies

```cmd
npm install
```

זה ייקח בערך 2-3 דקות. אתה אמור לראות:
```
added 323 packages
```

✅ אם יש אזהרות (warnings) - זה תקין! התעלם מהן.

---

### צעד 3: צור קובץ סביבה מקומי

#### אפשרות א': העתקה ידנית (מומלץ)

1. עבור לתיקיית הפרויקט ב-Explorer
2. מצא את הקובץ `.env.local.example`
3. העתק אותו ושנה שם ל-`.env.local`

**או**, הרץ ב-Command Prompt:
```cmd
copy .env.local.example .env.local
```

#### אפשרות ב': יצירה ידנית

צור קובץ חדש בשם `.env.local` (בתיקיית הפרויקט) עם התוכן:

```
TURSO_DATABASE_URL=file:local.db
NEXT_PUBLIC_INTEGRATION_KEY=d22d8b05933905caee1f49348e556e7d43c0f38277b91258
```

💡 **טיפ Windows**: כדי ליצור קובץ שמתחיל ב-נקודה:
- פתח Notepad
- שמור בשם: `.env.local` (כולל הנקודה!)
- שנה "Save as type" ל-"All Files"

---

### צעד 4: צור את מסד הנתונים

```cmd
npm run db:migrate
```

אתה אמור לראות:
```
🚀 Starting database migration...
Creating properties table...
Creating leads table...
Creating integration_keys table...
✅ Migration completed successfully!
```

---

### צעד 5: טען נתונים לדוגמה

```cmd
npm run db:seed
```

אתה אמור לראות:
```
🌱 Starting database seeding...
✅ Integration key added: d22d8b05933905caee1f49348e556e7d43c0f38277b91258
✅ Sample properties added
✅ Database seeding completed successfully!
```

---

### צעד 6: הרץ את השרת! 🚀

```cmd
npm run dev
```

אתה אמור לראות:
```
▲ Next.js 15.2.4
- Local:        http://localhost:3000
✓ Ready in 2.1s
```

---

## 🎉 זהו! האתר רץ!

פתח דפדפן וגלוש ל:

🔗 **http://localhost:3000**

או לעמוד הנכסים:

🔗 **http://localhost:3000/property-catalog**

אתה אמור לראות **4 נכסים לדוגמה**! 🏠🏠🏠🏠

---

## 🛑 לעצור את השרת

לחץ על **Ctrl+C** ב-Command Prompt/PowerShell

---

## 🔧 פתרון בעיות נפוצות

### שגיאה: "node is not recognized"
❌ Node.js לא מותקן או לא ב-PATH

**פתרון:**
1. התקן Node.js מ-https://nodejs.org/
2. במהלך ההתקנה, ודא שסימנת "Add to PATH"
3. אתחל את ה-Command Prompt

---

### שגיאה: "Cannot find module"
❌ Dependencies לא מותקנים

**פתרון:**
```cmd
npm install
```

---

### שגיאה: "ENOENT: no such file or directory, open '.env.local'"
❌ קובץ `.env.local` לא קיים

**פתרון:**
```cmd
copy .env.local.example .env.local
```

---

### שגיאה: "Table does not exist"
❌ לא הרצת את ה-migration

**פתרון:**
```cmd
npm run db:migrate
```

---

### השרת רץ אבל אין נכסים
❌ לא הרצת את ה-seed

**פתרון:**
```cmd
npm run db:seed
```

---

### שגיאה: "Port 3000 is already in use"
❌ משהו אחר רץ על פורט 3000

**פתרון:**
```cmd
# אפשרות 1: סגור את מה שרץ על 3000
# אפשרות 2: השתמש בפורט אחר
set PORT=3001
npm run dev
```

---

## 📁 מבנה הקבצים (אחרי ההתקנה)

```
nadlan-bakfar/
├── node_modules/          (נוצר אחרי npm install)
├── .next/                 (נוצר בזמן dev)
├── local.db               (נוצר אחרי migration)
├── .env.local             (צריך ליצור ידנית!)
├── package.json
└── ...
```

---

## 🎯 סיכום מהיר

```cmd
# 1. נווט לפרויקט
cd C:\path\to\nadlan-bakfar

# 2. התקן
npm install

# 3. צור .env.local
copy .env.local.example .env.local

# 4. הרץ migration
npm run db:migrate

# 5. טען נתונים
npm run db:seed

# 6. הרץ שרת
npm run dev
```

**זמן כולל: ~5 דקות**

---

## 📞 עזרה נוספת?

אם משהו לא עובד, תעתיק לי:
1. את השגיאה המלאה מה-terminal
2. מה הפקודה שהרצת
3. מה הגרסה של Node.js (`node --version`)

---

## ✨ פקודות שימושיות

```cmd
# הרצת שרת פיתוח
npm run dev

# בנייה לפרודקשן
npm run build

# הרצת פרודקשן מקומית
npm run start

# איפוס מסד הנתונים
del local.db
npm run db:migrate
npm run db:seed
```

---

**בהצלחה! 🚀**
