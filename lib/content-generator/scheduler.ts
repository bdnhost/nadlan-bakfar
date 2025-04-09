import { type ContentGenerationParams, ContentType } from "./types"
import { createContent } from "./content-service"

// נושאים אפשריים לתוכן אוטומטי
const blogTopics = [
  "טיפים לרכישת נכס ראשון בגליל המערבי",
  'איך לבחור משקיע נדל"ן אמין',
  'מדריך להשקעה בנדל"ן בצפון',
  "5 טעויות נפוצות ברכישת נכס להשקעה",
  'מגמות בשוק הנדל"ן בגליל המערבי לשנת 2024',
  'השוואה בין השקעה בנדל"ן בצפון לעומת מרכז הארץ',
  "איך להכין נכס למכירה בצורה אופטימלית",
  "מדריך למשכנתאות לרוכשי דירה ראשונה",
  "יתרונות המגורים בגליל המערבי",
  'השפעת התשתיות החדשות על שוק הנדל"ן בצפון',
]

const areaGuideTopics = [
  "מדריך מקיף לשלומי והסביבה",
  "נהריה - מדריך מקיף למשקיעים ורוכשים",
  'מעלות-תרשיחא - הזדמנויות נדל"ן ואיכות חיים',
  "יישובי מטה אשר - מדריך מקיף",
  "יישובי מעלה יוסף - מדריך למתעניינים",
]

const tipsTopics = [
  "10 טיפים לתחזוקת נכס להשכרה",
  "מדריך להכנת נכס ל-Airbnb",
  "איך לבחור מנהל נכסים מקצועי",
  "טיפים לשיפוץ נכס בתקציב מוגבל",
  "מדריך לבדיקת נכס לפני רכישה",
]

const marketAnalysisTopics = [
  'ניתוח מגמות שוק הנדל"ן בגליל המערבי - רבעון אחרון',
  'השוואת מחירי נדל"ן בין יישובי הצפון',
  'השפעת פרויקטי תשתית על שוק הנדל"ן בצפון',
  'תחזית שוק הנדל"ן בגליל המערבי לשנה הקרובה',
  'ניתוח עסקאות נדל"ן בשלומי והסביבה',
]

// פונקציה לבחירה אקראית מתוך מערך
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// פונקציה ליצירת תוכן אוטומטי
export async function generateScheduledContent() {
  // בחירת סוג תוכן אקראי
  const contentTypes = [
    ContentType.BLOG_POST,
    ContentType.AREA_GUIDE,
    ContentType.TIPS_ARTICLE,
    ContentType.MARKET_ANALYSIS,
  ]

  const selectedType = getRandomItem(contentTypes)

  // בחירת נושא בהתאם לסוג התוכן
  let topic: string
  let keywords: string[] = []

  switch (selectedType) {
    case ContentType.BLOG_POST:
      topic = getRandomItem(blogTopics)
      keywords = ['נדל"ן', "גליל מערבי", "השקעות", "נכסים", "שלומי"]
      break
    case ContentType.AREA_GUIDE:
      topic = getRandomItem(areaGuideTopics)
      keywords = ["מדריך אזור", "גליל מערבי", "מגורים", "קהילה", "איכות חיים"]
      break
    case ContentType.TIPS_ARTICLE:
      topic = getRandomItem(tipsTopics)
      keywords = ["טיפים", 'נדל"ן', "תחזוקה", "השכרה", "ניהול נכסים"]
      break
    case ContentType.MARKET_ANALYSIS:
      topic = getRandomItem(marketAnalysisTopics)
      keywords = ["ניתוח שוק", "מגמות", 'מחירי נדל"ן', "השקעות", "תחזית"]
      break
    default:
      topic = getRandomItem(blogTopics)
      keywords = ['נדל"ן', "גליל מערבי", "השקעות"]
  }

  // הגדרת פרמטרים ליצירת התוכן
  const params: ContentGenerationParams = {
    type: selectedType,
    topic,
    keywords,
    length: "medium",
    tone: "professional",
    targetAudience: 'רוכשי ומשקיעי נדל"ן בצפון',
  }

  // יצירת התוכן
  console.log(`Generating scheduled content: ${topic}`)
  const result = await createContent(params)

  if (result.success) {
    console.log(`Successfully generated content: ${result.content?.title}`)
  } else {
    console.error(`Failed to generate content: ${result.error}`)
  }

  return result
}

