import { v4 as uuidv4 } from "uuid"
import { type ContentTemplate, ContentType, ContentCategory } from "./types"

// Define the ContentGenerationParams interface
export interface ContentGenerationParams {
  topic?: string
  length?: "short" | "medium" | "long"
  tone?: "professional" | "friendly" | "formal" | "enthusiastic" | "casual"
  keywords?: string[]
  additionalInstructions?: string
}

// עדכון התבניות הקיימות ליותר מותאמות לנדל"ן בגליל המערבי
let templateStore: ContentTemplate[] = [
  // תבנית לפוסט בלוג
  {
    id: uuidv4(),
    name: "פוסט בלוג סטנדרטי",
    description: 'תבנית סטנדרטית לפוסט בלוג בנושא נדל"ן בגליל המערבי',
    type: ContentType.BLOG_POST,
    systemPrompt: `
    אתה מומחה לכתיבת תוכן שיווקי בתחום הנדל"ן בישראל, עם התמחות ספציפית בגליל המערבי.
    אתה כותב תוכן איכותי, מעניין ומקצועי בעברית מושלמת.
    התוכן שלך מותאם לקהל היעד הישראלי וכולל מידע רלוונטי ומדויק על שוק הנדל"ן בגליל המערבי.
    אתה מתמחה בכתיבה עבור חברת "נדל"ן בכפר" שפועלת באזור הגליל המערבי, עם דגש על יישובים כמו שלומי, נהריה, מעלות, מטה אשר ומעלה יוסף.
    אתה מכיר היטב את היתרונות של מגורים באזור הגליל המערבי: איכות חיים גבוהה, קהילתיות, קרבה לטבע, מחירים נוחים יחסית למרכז, ופוטנציאל השקעה.
    אתה מודע לאתגרים של האזור: מרחק ממרכז הארץ, תעסוקה מוגבלת, ואתגרי תחבורה.
    אתה מכיר את המגמות העדכניות בשוק הנדל"ן הישראלי ויודע לקשר אותן לאזור הגליל המערבי.
    אתה מומחה בכתיבת פוסטים לבלוג נדל"ן שמושכים תשומת לב ומספקים ערך אמיתי לקוראים.
  `,
    userPrompt: `
    כתוב פוסט בלוג מקיף ומעמיק בנושא "{topic}" באורך של {length} ובטון {tone}.
    {keywords}
    {additionalInstructions}
    
    הפוסט צריך לכלול:
    1. כותרת מושכת ורלוונטית
    2. תקציר קצר (2-3 משפטים) שמסכם את הנקודות העיקריות
    3. פתיחה מעניינת שמציגה את הנושא ומסבירה את חשיבותו
    4. 4-6 כותרות משנה עם תוכן מפורט ומעמיק תחת כל אחת
    5. נתונים ועובדות רלוונטיות על שוק הנדל"ן בגליל המערבי
    6. טיפים מעשיים או תובנות שימושיות לקוראים
    7. דוגמאות ספציפיות מהאזור (שלומי, נהריה, מעלות וכו')
    8. סיכום שמחזק את המסר העיקרי
    9. קריאה לפעולה שמעודדת את הקוראים ליצור קשר עם "נדל"ן בכפר"
    
    פרמט את התוכן בצורה נקייה עם כותרות, פסקאות וסימני פיסוק נכונים.
    הקפד על עברית תקנית ברמה גבוהה.
  `,
    category: ContentCategory.MARKET_TRENDS,
    tags: ['נדל"ן', "גליל מערבי", "בלוג", "שלומי", "נהריה", "מעלות"],
  },

  // תבנית למדריך אזור
  {
    id: uuidv4(),
    name: "מדריך אזור מקיף",
    description: "תבנית למדריך מקיף על אזור מגורים בגליל המערבי",
    type: ContentType.AREA_GUIDE,
    systemPrompt: `
    אתה מומחה בכתיבת מדריכי אזור מקיפים שמספקים מידע מעמיק על אזורים שונים בגליל המערבי.
    המדריכים שלך מספקים מידע מדויק, עדכני ושימושי לאנשים ששוקלים לגור באזור.
    אתה מכיר היטב את היישובים בגליל המערבי: שלומי, נהריה, מעלות-תרשיחא, כפרי מטה אשר ומעלה יוסף.
    אתה מתמחה בכתיבה עבור חברת "נדל"ן בכפר" שפועלת באזור הגליל המערבי.
    אתה מכיר את היתרונות והאתגרים של כל אזור, כולל איכות חיים, חינוך, תעסוקה, תחבורה, ושירותים קהילתיים.
    אתה מעודכן במחירי הנדל"ן ובמגמות השוק בכל אזור.
  `,
    userPrompt: `
    כתוב מדריך מקיף ומעמיק על "{topic}" באורך של {length} ובטון {tone}.
    {keywords}
    {additionalInstructions}
    
    המדריך צריך לכלול:
    1. כותרת מושכת שמציינת את שם האזור
    2. תקציר קצר (2-3 משפטים) שמציג את היתרונות העיקריים של האזור
    3. רקע כללי על האזור: מיקום, היסטוריה, אופי
    4. מאפייני האוכלוסייה: דמוגרפיה, קהילות, אופי חברתי
    5. שוק הנדל"ן המקומי: מחירים, סוגי נכסים, מגמות עדכניות
    6. יתרונות המגורים באזור: איכות חיים, חינוך, תרבות, טבע
    7. אתגרים אפשריים: תעסוקה, תחבורה, שירותים
    8. שכונות ואזורים מומלצים: פירוט של אזורים ספציפיים
    9. חינוך ומוסדות לימוד: גנים, בתי ספר, חינוך בלתי פורמלי
    10. תרבות ופנאי: אטרקציות, מסעדות, קניות, טבע
    11. תחבורה ונגישות: כבישים, תחבורה ציבורית, מרחקים
    12. פוטנציאל השקעה: מגמות עתידיות, פיתוח מתוכנן
    13. סיכום והמלצות
    14. קריאה לפעולה שמעודדת את הקוראים לפנות ל"נדל"ן בכפר"
    
    פרמט את התוכן בצורה נקייה עם כותרות, פסקאות וסימני פיסוק נכונים.
    הקפד על עברית תקנית ברמה גבוהה ועל מידע מדויק ועדכני.
  `,
    category: ContentCategory.LIFESTYLE,
    tags: ["מדריך אזור", "גליל מערבי", "מגורים", "שלומי", "נהריה", "מעלות"],
  },

  // תבנית לניתוח שוק
  {
    id: uuidv4(),
    name: 'ניתוח שוק נדל"ן',
    description: 'תבנית לניתוח מגמות שוק הנדל"ן בגליל המערבי',
    type: ContentType.MARKET_ANALYSIS,
    systemPrompt: `
    אתה מומחה לניתוח שוק הנדל"ן בישראל, עם התמחות ספציפית בגליל המערבי.
    אתה מכיר היטב את מגמות השוק, מחירים, ביקוש והיצע באזור הגליל המערבי.
    אתה יודע לנתח נתונים ולהציג תובנות מעמיקות על שוק הנדל"ן.
    אתה מתמחה בכתיבה עבור חברת "נדל"ן בכפר" שפועלת באזור הגליל המערבי.
    אתה מעודכן במגמות העדכניות ביותר בשוק הנדל"ן הישראלי ויודע לקשר אותן לאזור הגליל המערבי.
    אתה מכיר את ההבדלים בין היישובים השונים באזור: שלומי, נהריה, מעלות, כפרי מטה אשר ומעלה יוסף.
  `,
    userPrompt: `
    כתוב ניתוח שוק מקיף ומעמיק בנושא "{topic}" באורך של {length} ובטון {tone}.
    {keywords}
    {additionalInstructions}
    
    הניתוח צריך לכלול:
    1. כותרת מושכת ורלוונטית
    2. תקציר מנהלים (2-3 משפטים) שמסכם את הממצאים העיקריים
    3. מבוא שמציג את הנושא והרקע
    4. סקירת מגמות עיקריות בשוק הנדל"ן באזור הגליל המערבי
    5. ניתוח מחירים: השוואה בין יישובים, מגמות שינוי, תחזיות
    6. ניתוח ביקוש והיצע: אזורים מבוקשים, סוגי נכסים מבוקשים
    7. גורמים משפיעים: פיתוח תשתיות, תעסוקה, מדיניות ממשלתית
    8. השוואה למרכז הארץ ולאזורים אחרים
    9. הזדמנויות השקעה: אזורים עם פוטנציאל צמיחה
    10. סיכונים ואתגרים בשוק המקומי
    11. תחזית לטווח הקצר והבינוני
    12. המלצות למשקיעים ורוכשים
    13. סיכום וקריאה לפעולה
    
    שלב נתונים מספריים ועובדות ככל האפשר (מחירים, אחוזי שינוי, מספר עסקאות וכו').
    פרמט את התוכן בצורה נקייה עם כותרות, פסקאות וסימני פיסוק נכונים.
    הקפד על עברית תקנית ברמה גבוהה.
    השתמש בגרפים וטבלאות להצגת נתונים בצורה ויזואלית.
  `,
    category: ContentCategory.MARKET_TRENDS,
    tags: ["ניתוח שוק", "גליל מערבי", 'נדל"ן', "השקעות", "מחירים"],
  },

  // תבנית לשאלות ותשובות נפוצות
  {
    id: uuidv4(),
    name: "שאלות ותשובות נפוצות",
    description: 'תבנית ליצירת שאלות ותשובות נפוצות בנושאי נדל"ן',
    type: ContentType.FAQ,
    systemPrompt: `
      אתה מומחה בתחום הנדל"ן בישראל ומתמחה במתן תשובות מקצועיות, ברורות ומדויקות לשאלות נפוצות.
      התשובות שלך צריכות להיות מועילות, תמציתיות ומבוססות על מידע עדכני.
      אתה מתמחה בכתיבה עבור חברת "נדל"ן בכפר" שפועלת באזור הגליל המערבי.
    `,
    userPrompt: `
      צור רשימה של 8-10 שאלות ותשובות נפוצות בנושא "{topic}" בטון {tone}.
      {keywords}
      {additionalInstructions}
      
      לכל שאלה:
      1. נסח שאלה ברורה וממוקדת
      2. ספק תשובה מקיפה אך תמציתית (3-5 משפטים)
      3. כלול מידע מעשי ורלוונטי
      4. הוסף טיפ או המלצה מועילה בסוף התשובה כאשר רלוונטי
      
      פרמט את התוכן בצורה נקייה עם כל שאלה ותשובה בפסקה נפרדת.
    `,
    category: ContentCategory.BUYING,
    tags: ["שאלות נפוצות", "מידע", 'נדל"ן'],
  },

  // תבנית לעדכון חדשות נדל"ן
  {
    id: uuidv4(),
    name: 'עדכון חדשות נדל"ן',
    description: 'תבנית לעדכוני חדשות בשוק הנדל"ן המקומי',
    type: ContentType.NEWS_UPDATE,
    systemPrompt: `
      אתה עיתונאי מומחה בתחום הנדל"ן בישראל. אתה מסקר חדשות ועדכונים בשוק הנדל"ן באופן מקצועי, מדויק ואובייקטיבי.
      העדכונים שלך צריכים להיות עדכניים, רלוונטיים ולספק תובנות מעמיקות על ההשלכות של החדשות.
      אתה מתמחה בכתיבה עבור חברת "נדל"ן בכפר" שפועלת באזור הגליל המערבי.
    `,
    userPrompt: `
      כתוב עדכון חדשות בנושא "{topic}" באורך של {length} ובטון {tone}.
      {keywords}
      {additionalInstructions}
      
      העדכון צריך לכלול:
      1. כותרת חדשותית מושכת
      2. פסקת פתיחה שמסכמת את החדשות העיקריות
      3. פירוט החדשות והתפתחויות אחרונות
      4. ציטוטים או נתונים רלוונטיים
      5. ניתוח ההשלכות על שוק הנדל"ן המקומי
      6. מבט לעתיד
      
      פרמט את התוכן בצורה נקייה עם כותרות, פסקאות וסימני פיסוק נכונים.
    `,
    category: ContentCategory.MARKET_TRENDS,
    tags: ['חדשות נדל"ן', "עדכונים", 'שוק הנדל"ן'],
  },

  // תבנית למדריך השקעות
  {
    id: uuidv4(),
    name: 'מדריך השקעות נדל"ן',
    description: 'תבנית למדריכי השקעות בנדל"ן',
    type: ContentType.INVESTMENT_GUIDE,
    systemPrompt: `
      אתה מומחה להשקעות נדל"ן בישראל עם ידע נרחב באסטרטגיות השקעה, ניתוח כדאיות ומגמות שוק.
      המדריכים שלך צריכים להיות מקצועיים, מעמיקים ולספק ערך רב למשקיעים פוטנציאליים.
      אתה מתמחה בכתיבה עבור חברת "נדל"ן בכפר" שפועלת באזור הגליל המערבי.
    `,
    userPrompt: `
      כתוב מדריך השקעות בנושא "{topic}" באורך של {length} ובטון {tone}.
      {keywords}
      {additionalInstructions}
      
      המדריך צריך לכלול:
      1. כותרת מושכת
      2. הקדמה שמסבירה את חשיבות הנושא למשקיעים
      3. רקע על מצב השוק הנוכחי
      4. אסטרטגיות השקעה מומלצות
      5. ניתוח סיכונים והזדמנויות
      6. דוגמאות מספריות או תרחישים
      7. טיפים מעשיים למשקיעים
      8. סיכום והמלצות
      
      פרמט את התוכן בצורה נקייה עם כותרות, פסקאות וסימני פיסוק נכונים.
    `,
    category: ContentCategory.INVESTING,
    tags: ['השקעות נדל"ן', "כדאיות", "אסטרטגיות השקעה"],
  },
]

// פונקציה לקבלת כל התבניות
export function getAllTemplates(): ContentTemplate[] {
  return [...templateStore]
}

// פונקציה לקבלת תבנית לפי מזהה
export function getTemplateById(id: string): ContentTemplate | undefined {
  return templateStore.find((template) => template.id === id)
}

// פונקציה לקבלת תבניות לפי סוג תוכן
export function getTemplatesByType(type: ContentType): ContentTemplate[] {
  return templateStore.filter((template) => template.type === type)
}

// פונקציה ליצירת תבנית חדשה
export function createTemplate(template: Omit<ContentTemplate, "id">): ContentTemplate {
  const newTemplate: ContentTemplate = {
    ...template,
    id: uuidv4(),
  }

  templateStore.push(newTemplate)
  return newTemplate
}

// פונקציה לעדכון תבנית
export function updateTemplate(id: string, updates: Partial<ContentTemplate>): ContentTemplate | null {
  const index = templateStore.findIndex((template) => template.id === id)

  if (index === -1) {
    return null
  }

  const updatedTemplate = {
    ...templateStore[index],
    ...updates,
  }

  templateStore[index] = updatedTemplate

  return updatedTemplate
}

// פונקציה למחיקת תבנית
export function deleteTemplate(id: string): boolean {
  const initialLength = templateStore.length
  templateStore = templateStore.filter((template) => template.id !== id)
  return templateStore.length < initialLength
}

// פונקציה להחלפת משתנים בפרומפט
export function applyTemplateVariables(
  template: ContentTemplate,
  params: ContentGenerationParams,
): { prompt: string; systemPrompt: string } {
  let userPrompt = template.userPrompt

  // החלפת משתנים בפרומפט
  userPrompt = userPrompt.replace("{topic}", params.topic || 'נדל"ן בגליל המערבי')

  // הגדרת אורך התוכן
  const contentLength =
    params.length === "short" ? "300-500 מילים" : params.length === "medium" ? "500-800 מילים" : "800-1200 מילים"
  userPrompt = userPrompt.replace("{length}", contentLength)

  // הגדרת טון התוכן
  const contentTone =
    params.tone === "professional"
      ? "מקצועי ועסקי"
      : params.tone === "friendly"
        ? "חברותי ונגיש"
        : params.tone === "formal"
          ? "פורמלי ומכובד"
          : params.tone === "enthusiastic"
            ? "נלהב ומעורר השראה"
            : "קליל ונגיש"
  userPrompt = userPrompt.replace("{tone}", contentTone)

  // הוספת מילות מפתח
  const keywordsText =
    params.keywords && params.keywords.length > 0 ? `מילות מפתח שיש לשלב: ${params.keywords.join(", ")}` : ""
  userPrompt = userPrompt.replace("{keywords}", keywordsText)

  // הוספת הוראות נוספות
  const additionalText = params.additionalInstructions ? `הוראות נוספות: ${params.additionalInstructions}` : ""
  userPrompt = userPrompt.replace("{additionalInstructions}", additionalText)

  return {
    prompt: userPrompt.trim(),
    systemPrompt: template.systemPrompt.trim(),
  }
}

