import { v4 as uuidv4 } from "uuid"
import {
  type ContentGenerationParams,
  type ContentGenerationResult,
  ContentStatus,
  ContentType,
  type GeneratedContent,
  ContentCategory,
} from "./types"
import { generateContent } from "./deepseek-service"
import { createSlug } from "../utils"
import { type UnsplashImage, getRandomUnsplashImage, getRealEstateImage } from "../image-service"

// מאגר זמני לשמירת תכנים (במערכת אמיתית זה יהיה במסד נתונים)
let contentStore: GeneratedContent[] = []

// פונקציה ליצירת תוכן חדש - משופרת
export async function createContent(params: ContentGenerationParams): Promise<ContentGenerationResult> {
  try {
    // יצירת התוכן באמצעות DeepSeek
    const result = await generateContent(params)

    if (!result.success || !result.content) {
      return result
    }

    // יצירת מזהה ייחודי ו-slug
    const id = uuidv4()
    const title = result.content.title || "תוכן ללא כותרת"
    const slug = createSlug(title)

    // חיפוש תמונה מתאימה לנושא
    let featuredImage: string | undefined = undefined
    let imagePrompt: string | undefined = undefined

    try {
      if (params.topic) {
        // שימוש בפונקציה המשופרת לחיפוש תמונות נדל"ן
        const image: UnsplashImage = await getRealEstateImage(params.topic)
        featuredImage = image.urls.regular
        imagePrompt = params.topic
      }
    } catch (error) {
      console.error("Error getting featured image:", error)
      // ניסיון נוסף עם חיפוש כללי יותר
      try {
        const image: UnsplashImage = await getRandomUnsplashImage("real estate property galilee")
        featuredImage = image.urls.regular
      } catch (innerError) {
        console.error("Error getting fallback image:", innerError)
      }
    }

    // יצירת אובייקט התוכן המלא
    const content: GeneratedContent = {
      id,
      type: params.type,
      title,
      content: result.content.content || "",
      summary: result.content.summary,
      slug,
      tags: params.keywords,
      status: ContentStatus.DRAFT,
      category: params.category,
      author: params.author || 'צוות נדל"ן בכפר',
      createdAt: new Date(),
      updatedAt: new Date(),
      featuredImage,
      imagePrompt,
      scheduledFor: params.scheduledFor,
      publishToSocialMedia: params.publishToSocialMedia,
      socialMediaPlatforms: params.socialMediaPlatforms,
      socialMediaText: result.content.socialMediaText,
      seoTitle: result.content.seoTitle,
      seoDescription: result.content.seoDescription,
      metadata: result.content.metadata,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
    }

    // שמירת התוכן במאגר
    contentStore.push(content)

    return {
      success: true,
      content,
    }
  } catch (error) {
    console.error("Error creating content:", error)
    return {
      success: false,
      error: `Error creating content: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

// פונקציה לקבלת כל התכנים
export function getAllContent(): GeneratedContent[] {
  return [...contentStore]
}

// פונקציה לקבלת תוכן לפי מזהה
export function getContentById(id: string): GeneratedContent | undefined {
  return contentStore.find((content) => content.id === id)
}

// פונקציה לקבלת תוכן לפי slug
export function getContentBySlug(slug: string): GeneratedContent | undefined {
  return contentStore.find((content) => content.slug === slug)
}

// פונקציה לקבלת תכנים לפי סוג
export function getContentByType(type: ContentType): GeneratedContent[] {
  return contentStore.filter((content) => content.type === type)
}

// פונקציה לקבלת תכנים לפי קטגוריה
export function getContentByCategory(category: ContentCategory): GeneratedContent[] {
  return contentStore.filter((content) => content.category === category)
}

// פונקציה לקבלת תכנים לפי סטטוס
export function getContentByStatus(status: ContentStatus): GeneratedContent[] {
  return contentStore.filter((content) => content.status === status)
}

// פונקציה לקבלת תכנים מובלטים
export function getFeaturedContent(limit = 5): GeneratedContent[] {
  // קבלת תכנים מפורסמים בלבד
  const publishedContent = contentStore.filter((content) => content.status === ContentStatus.PUBLISHED)

  // מיון לפי תאריך פרסום (מהחדש לישן)
  const sortedContent = [...publishedContent].sort((a, b) => {
    const dateA = a.publishedAt || a.createdAt
    const dateB = b.publishedAt || b.createdAt
    return dateB.getTime() - dateA.getTime()
  })

  // בחירת תכנים עם תמונות ראשית
  const withImages = sortedContent.filter((content) => content.featuredImage)

  // אם יש מספיק תכנים עם תמונות, החזר אותם
  if (withImages.length >= limit) {
    return withImages.slice(0, limit)
  }

  // אחרת, השלם עם תכנים נוספים
  return [
    ...withImages,
    ...sortedContent.filter((content) => !content.featuredImage).slice(0, limit - withImages.length),
  ]
}

// פונקציה לקבלת תכנים קשורים
export function getRelatedContent(contentId: string, limit = 3): GeneratedContent[] {
  const content = getContentById(contentId)

  if (!content) {
    return []
  }

  // קבלת תכנים מפורסמים בלבד
  const publishedContent = contentStore.filter((c) => c.status === ContentStatus.PUBLISHED && c.id !== contentId)

  // חיפוש תכנים עם אותה קטגוריה
  const sameCategoryContent = publishedContent.filter((c) => c.category === content.category)

  // חיפוש תכנים עם תגיות משותפות
  const sharedTagsContent = publishedContent.filter((c) => {
    if (!content.tags || !c.tags) return false
    return c.tags.some((tag) => content.tags?.includes(tag))
  })

  // איחוד התוצאות ללא כפילויות
  const relatedContent = Array.from(new Set([...sameCategoryContent, ...sharedTagsContent]))

  // מיון לפי תאריך פרסום (מהחדש לישן)
  const sortedContent = relatedContent.sort((a, b) => {
    const dateA = a.publishedAt || a.createdAt
    const dateB = b.publishedAt || b.createdAt
    return dateB.getTime() - dateA.getTime()
  })

  return sortedContent.slice(0, limit)
}

// פונקציה לעדכון תוכן
export function updateContent(id: string, updates: Partial<GeneratedContent>): GeneratedContent | null {
  const index = contentStore.findIndex((content) => content.id === id)

  if (index === -1) {
    return null
  }

  const updatedContent = {
    ...contentStore[index],
    ...updates,
    updatedAt: new Date(),
  }

  // אם התוכן מפורסם, עדכן את תאריך הפרסום
  if (updates.status === ContentStatus.PUBLISHED && !contentStore[index].publishedAt) {
    updatedContent.publishedAt = new Date()
  }

  contentStore[index] = updatedContent

  return updatedContent
}

// פונקציה למחיקת תוכן
export function deleteContent(id: string): boolean {
  const initialLength = contentStore.length
  contentStore = contentStore.filter((content) => content.id !== id)
  return contentStore.length < initialLength
}

// פונקציה לקבלת סטטיסטיקות תוכן
export function getContentStats() {
  const totalContent = contentStore.length

  // ספירת תכנים לפי סטטוס
  const byStatus: Record<ContentStatus, number> = Object.values(ContentStatus).reduce(
    (acc, status) => ({ ...acc, [status]: 0 }),
    {} as Record<ContentStatus, number>,
  )

  // ספירת תכנים לפי סוג
  const byType: Record<ContentType, number> = Object.values(ContentType).reduce(
    (acc, type) => ({ ...acc, [type]: 0 }),
    {} as Record<ContentType, number>,
  )

  // ספירת תכנים לפי קטגוריה
  const byCategory: Record<ContentCategory, number> = Object.values(ContentCategory).reduce(
    (acc, category) => ({ ...acc, [category]: 0 }),
    {} as Record<ContentCategory, number>,
  )

  // חישוב תכנים שפורסמו החודש
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  let publishedThisMonth = 0
  let publishedLastMonth = 0

  // ספירת תכנים עם תמונות
  let withImages = 0

  // מיון תכנים לפי צפיות ולייקים
  const sortedByViews = [...contentStore].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
  const sortedByLikes = [...contentStore].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))

  // עיבוד הנתונים
  for (const content of contentStore) {
    // ספירה לפי סטטוס
    if (content.status in byStatus) {
      byStatus[content.status]++
    }

    // ספירה לפי סוג
    if (content.type in byType) {
      byType[content.type]++
    }

    // ספירה לפי קטגוריה
    if (content.category && content.category in byCategory) {
      byCategory[content.category]++
    }

    // ספירת פרסומים לפי חודש
    if (content.publishedAt) {
      if (content.publishedAt >= firstDayOfMonth) {
        publishedThisMonth++
      } else if (content.publishedAt >= firstDayOfLastMonth) {
        publishedLastMonth++
      }
    }

    // ספירת תכנים עם תמונות
    if (content.featuredImage) {
      withImages++
    }
  }

  // חישוב אחוז התכנים עם תמונות
  const imagePercentage = totalContent > 0 ? Math.round((withImages / totalContent) * 100) : 0

  return {
    totalContent,
    byStatus,
    byType,
    byCategory,
    publishedThisMonth,
    publishedLastMonth,
    withImages,
    imagePercentage,
    mostViewedContent: sortedByViews.slice(0, 5).map((c) => ({
      id: c.id,
      title: c.title,
      viewCount: c.viewCount || 0,
    })),
    mostLikedContent: sortedByLikes.slice(0, 5).map((c) => ({
      id: c.id,
      title: c.title,
      likeCount: c.likeCount || 0,
    })),
  }
}

// פונקציה לחיפוש תכנים
export function searchContent(query: string): GeneratedContent[] {
  if (!query || query.trim() === "") {
    return []
  }

  const normalizedQuery = query.trim().toLowerCase()

  return contentStore.filter((content) => {
    // חיפוש בכותרת
    if (content.title.toLowerCase().includes(normalizedQuery)) {
      return true
    }

    // חיפוש בתוכן
    if (content.content.toLowerCase().includes(normalizedQuery)) {
      return true
    }

    // חיפוש בתקציר
    if (content.summary && content.summary.toLowerCase().includes(normalizedQuery)) {
      return true
    }

    // חיפוש בתגיות
    if (content.tags && content.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))) {
      return true
    }

    return false
  })
}

// פונקציה לקבלת תכנים אחרונים
export function getLatestContent(limit = 10): GeneratedContent[] {
  // מיון לפי תאריך יצירה (מהחדש לישן)
  return [...contentStore].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit)
}

// פונקציה לקבלת תכנים פופולריים
export function getPopularContent(limit = 10): GeneratedContent[] {
  // מיון לפי מספר צפיות (מהגבוה לנמוך)
  return [...contentStore].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, limit)
}

// פונקציה לפרסום תוכן
export function publishContent(id: string): GeneratedContent | null {
  const content = getContentById(id)
  if (!content) return null

  return updateContent(id, {
    status: ContentStatus.PUBLISHED,
    publishedAt: new Date(),
  })
}

// פונקציה לתזמון פרסום תוכן
export function scheduleContent(id: string, scheduledDate: Date): GeneratedContent | null {
  const content = getContentById(id)
  if (!content) return null

  return updateContent(id, {
    status: ContentStatus.SCHEDULED,
    scheduledFor: scheduledDate,
  })
}

// פונקציה להוספת צפייה לתוכן
export function incrementViewCount(id: string): GeneratedContent | null {
  const content = getContentById(id)
  if (!content) return null

  return updateContent(id, {
    viewCount: (content.viewCount || 0) + 1,
  })
}

// פונקציה להוספת לייק לתוכן
export function incrementLikeCount(id: string): GeneratedContent | null {
  const content = getContentById(id)
  if (!content) return null

  return updateContent(id, {
    likeCount: (content.likeCount || 0) + 1,
  })
}

// יצירת תכנים לדוגמה
export function createSampleContent() {
  // בדיקה אם כבר יש תכנים במאגר
  if (contentStore.length > 0) {
    return
  }

  // יצירת תכנים לדוגמה
  const sampleContent: Partial<GeneratedContent>[] = [
    {
      id: "1",
      title: "איך לבחור נכס להשקעה בגליל המערבי: מדריך מקיף",
      summary:
        "מדריך מקיף לבחירת נכס להשקעה בגליל המערבי, כולל ניתוח אזורים, סוגי נכסים, תשואות צפויות, וטיפים מעשיים למשקיעים.",
      content: `# איך לבחור נכס להשקעה בגליל המערבי: מדריך מקיף

## תקציר
הגליל המערבי מציע הזדמנויות השקעה ייחודיות בשוק הנדל"ן הישראלי, עם פוטנציאל לתשואות גבוהות ומחירים נוחים יחסית למרכז הארץ. מדריך זה מציג את השיקולים המרכזיים בבחירת נכס להשקעה באזור, כולל ניתוח אזורים מומלצים, סוגי נכסים, וטיפים מעשיים למשקיעים.

## מבוא: למה להשקיע בגליל המערבי?

הגליל המערבי הפך בשנים האחרונות ליעד אטרקטיבי למשקיעי נדל"ן, וזאת בזכות מספר יתרונות בולטים:

1. **מחירים נוחים יחסית למרכז** - בעוד שמחירי הנדל"ן במרכז הארץ ממשיכים לטפס, הגליל המערבי מציע מחירי כניסה נמוכים יותר, המאפשרים תשואה גבוהה יותר על ההשקעה.

2. **פוטנציאל צמיחה** - השקעות ממשלתיות בתשתיות, פיתוח אזורי תעשייה, ושיפור מערך התחבורה מגדילים את הביקוש לדיור באזור.

3. **איכות חיים גבוהה** - הקרבה לטבע, לים ולנופים מרהיבים, יחד עם קהילות מגובשות, הופכים את האזור למבוקש בקרב משפחות ושוכרים פוטנציאליים.

4. **תיירות מתפתחת** - הגליל המערבי מושך תיירות פנים וחוץ, מה שמייצר הזדמנויות להשכרה לטווח קצר (Airbnb) עם תשואות גבוהות.`,
      slug: "how-to-choose-investment-property-in-western-galilee",
      type: ContentType.BLOG_POST,
      category: ContentCategory.INVESTING,
      tags: ['השקעות נדל"ן', "גליל מערבי", "תשואה", "נכס להשקעה"],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-04-15"),
      updatedAt: new Date("2024-04-15"),
      publishedAt: new Date("2024-04-15"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
      viewCount: 245,
      likeCount: 18,
      commentCount: 5,
    },
    {
      id: "2",
      title: "מדריך מקיף לנהריה והסביבה: כל מה שצריך לדעת",
      summary:
        'מדריך מקיף על העיר נהריה והסביבה, כולל מידע על שוק הנדל"ן המקומי, מחירים, סוגי נכסים, שכונות מומלצות, חינוך, תחבורה, תרבות ופנאי.',
      content: `# מדריך מקיף לנהריה והסביבה: כל מה שצריך לדעת

## תקציר
נהריה, עיר החוף הצפונית, מציעה איכות חיים גבוהה, נופים מרהיבים וקהילה מגובשת. מדריך זה מספק מידע מקיף על העיר והסביבה, כולל שוק הנדל"ן, שכונות מומלצות, חינוך, תחבורה, תרבות ופנאי.

## רקע כללי על נהריה

נהריה היא עיר חוף הממוקמת בגליל המערבי, כ-30 ק"מ צפונית לחיפה. העיר נוסדה בשנת 1934 על ידי מתיישבים יהודים מגרמניה, ומאז התפתחה לעיר תיירות ומגורים פופולרית.

### מיקום ואופי
נהריה שוכנת לחופו של הים התיכון ומשתרעת לאורך כ-5 ק"מ של קו חוף. העיר חצויה על ידי נחל הגעתון, היוצר טיילת מרכזית מקסימה. האקלים נעים יחסית, עם קיץ חם וחורף גשום אך מתון.

### אוכלוסייה
נהריה מונה כ-60,000 תושבים, עם אוכלוסייה מגוונת הכוללת תושבים ותיקים, עולים חדשים ומשפחות צעירות. בשנים האחרונות, העיר מושכת אליה יותר ויותר משפחות מהמרכז המחפשות איכות חיים גבוהה במחירים סבירים יותר.`,
      slug: "comprehensive-guide-to-nahariya",
      type: ContentType.AREA_GUIDE,
      category: ContentCategory.LIFESTYLE,
      tags: ["נהריה", "גליל מערבי", "מדריך אזור", "קניית דירה"],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-04-20"),
      updatedAt: new Date("2024-04-20"),
      publishedAt: new Date("2024-04-20"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
      viewCount: 312,
      likeCount: 24,
      commentCount: 7,
    },
    {
      id: "3",
      title: "10 טיפים חיוניים לרכישת נכס ראשון בגליל המערבי",
      summary:
        "מדריך מעשי עם 10 טיפים חיוניים לרוכשי דירה ראשונה בגליל המערבי, כולל בדיקות מקדימות, מימון, בחירת אזור, והתנהלות מול מוכרים וקבלנים.",
      content: `# 10 טיפים חיוניים לרכישת נכס ראשון בגליל המערבי

## תקציר
רכישת נכס ראשון היא אחת ההחלטות הפיננסיות המשמעותיות ביותר בחיים. בגליל המערבי, עם המגוון הרחב של יישובים ואפשרויות, התהליך יכול להיות מורכב במיוחד. מדריך זה מציע 10 טיפים חיוניים שיעזרו לכם לעבור את התהליך בהצלחה ולמצוא את הנכס המושלם עבורכם.

## 1. הגדירו את הצרכים והתקציב שלכם

לפני שאתם מתחילים בחיפוש, חשוב להגדיר במדויק מה אתם מחפשים ומהו התקציב העומד לרשותכם.

**מה לעשות:**
- ערכו רשימה של צרכים הכרחיים מול רצונות
- קבעו תקציב ריאלי, כולל עלויות נלוות (מס רכישה, עו"ד, שיפוצים)
- החליטו על גודל הנכס, מספר חדרים, וקומה מועדפת
- חשבו על צרכים עתידיים (הרחבת המשפחה, עבודה מהבית)

**למה זה חשוב:**
הגדרה ברורה של הצרכים והתקציב תמנע בזבוז זמן על נכסים שאינם מתאימים ותסייע לכם להתמקד בנכסים הרלוונטיים באמת.`,
      slug: "10-essential-tips-for-buying-first-property-in-western-galilee",
      type: ContentType.TIPS_ARTICLE,
      category: ContentCategory.BUYING,
      tags: ["טיפים לרכישה", "גליל מערבי", "דירה ראשונה", "קניית דירה"],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-04-25"),
      updatedAt: new Date("2024-04-25"),
      publishedAt: new Date("2024-04-25"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
      viewCount: 427,
      likeCount: 35,
      commentCount: 12,
    },
    {
      id: "4",
      title: 'מגמות שוק הנדל"ן בגליל המערבי: ניתוח מקיף לשנת 2024',
      summary:
        'ניתוח מעמיק של מגמות שוק הנדל"ן בגליל המערבי בשנת 2024, כולל מחירים, היקפי עסקאות, אזורים מבוקשים, תחזיות לעתיד ומשמעויות למשקיעים ורוכשים.',
      content: `# מגמות שוק הנדל"ן בגליל המערבי: ניתוח מקיף לשנת 2024

## תקציר מנהלים
שוק הנדל"ן בגליל המערבי מציג מגמות מעניינות בשנת 2024, עם עלייה ממוצעת של 8% במחירי הנדל"ן, גידול של 15% בהיקף העסקאות, וביקוש גובר לנכסים בערים כמו נהריה, עכו ומעלות-תרשיחא. ניתוח זה מספק תמונה מקיפה של המגמות העיקריות, האזורים המבוקשים, והתחזיות לעתיד.`,
      slug: "real-estate-trends-western-galilee-2024",
      type: ContentType.MARKET_ANALYSIS,
      category: ContentCategory.MARKET_TRENDS,
      tags: ["מגמות שוק", "גליל מערבי", 'ניתוח נדל"ן', "2024", "השקעות"],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-05-01"),
      updatedAt: new Date("2024-05-01"),
      publishedAt: new Date("2024-05-01"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
      viewCount: 189,
      likeCount: 14,
      commentCount: 3,
    },
    {
      id: "5",
      title: "מדריך להשכרת נכס ב-Airbnb בגליל המערבי",
      summary:
        "מדריך מקיף להשכרת נכס ב-Airbnb בגליל המערבי, כולל הכנת הנכס, תמחור, צילום, כתיבת תיאור, ניהול הזמנות, ועצות להצלחה בשוק התיירות המקומי.",
      content: `# מדריך להשכרת נכס ב-Airbnb בגליל המערבי

## תקציר
הגליל המערבי הפך ליעד תיירות פופולרי, המציע הזדמנויות מצוינות להשכרה לטווח קצר באמצעות Airbnb. מדריך זה מספק את כל המידע הדרוש להכנת הנכס, תמחור נכון, צילום מקצועי, כתיבת תיאור מושך, וניהול יעיל של ההזמנות.

## למה להשכיר נכס ב-Airbnb בגליל המערבי?

הגליל המערבי מציע יתרונות רבים למשכירים ב-Airbnb:

1. **ביקוש גובר לתיירות כפרית ואקולוגית** - יותר ויותר ישראלים מחפשים חופשות בטבע, הרחק מהערים הגדולות.

2. **עונתיות מאוזנת** - בניגוד לאזורים אחרים, הגליל המערבי מושך תיירים לאורך כל השנה: בחורף בזכות הנוף הירוק והפריחה, ובקיץ בזכות מזג האוויר הנעים יחסית והקרבה לחופי הים.

3. **תשואה גבוהה** - השכרה לטווח קצר יכולה להניב תשואה גבוהה משמעותית בהשוואה להשכרה לטווח ארוך, במיוחד בסופי שבוע ובחגים.

4. **מגוון אטרקציות** - האזור עשיר באטרקציות: חופי ים, שמורות טבע, מסלולי הליכה, אתרים היסטוריים, יקבים, ומסעדות איכותיות.`,
      slug: "guide-to-airbnb-rental-in-western-galilee",
      type: ContentType.TIPS_ARTICLE,
      category: ContentCategory.RENTING,
      tags: ["Airbnb", "השכרה לטווח קצר", "גליל מערבי", "תיירות", "השכרת נכס"],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-05-05"),
      updatedAt: new Date("2024-05-05"),
      publishedAt: new Date("2024-05-05"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
      viewCount: 276,
      likeCount: 22,
      commentCount: 8,
    },
  ]

  // הוספת התכנים למאגר
  sampleContent.forEach((content) => {
    contentStore.push(content as GeneratedContent)
  })

  // פרסום התכנים
  contentStore.forEach((content) => {
    if (!content.publishedAt) {
      content.publishedAt = new Date()
      content.status = ContentStatus.PUBLISHED
    }
  })

  console.log(`Created ${contentStore.length} sample content items`)
}

