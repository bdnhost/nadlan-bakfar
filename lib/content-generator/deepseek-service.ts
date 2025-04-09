import { type ContentGenerationParams, type ContentGenerationResult, ContentStatus, type ContentType } from "./types"
import { getTemplateById, applyTemplateVariables } from "./template-service"

// מפתח ה-API של DeepSeek
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || ""
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

// פונקציה לשליחת בקשה ל-DeepSeek API
async function callDeepSeekAPI(prompt: string, systemPrompt: string): Promise<string> {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error calling DeepSeek API:", error)
    throw error
  }
}

// פונקציה לייצור תוכן באמצעות DeepSeek
export async function generateContent(params: ContentGenerationParams): Promise<ContentGenerationResult> {
  try {
    let prompt: string
    let systemPrompt: string

    // אם יש מזהה תבנית, השתמש בתבנית
    if (params.referenceData?.templateId) {
      const template = getTemplateById(params.referenceData.templateId)

      if (!template) {
        return {
          success: false,
          error: `Template with ID ${params.referenceData.templateId} not found`,
        }
      }

      const templateWithVars = applyTemplateVariables(template, params)
      prompt = templateWithVars.prompt
      systemPrompt = templateWithVars.systemPrompt
    } else {
      // אחרת, השתמש בפרומפט הרגיל
      const promptTemplate = getPromptTemplate(params)
      prompt = promptTemplate.prompt
      systemPrompt = promptTemplate.systemPrompt
    }

    // שליחת הבקשה ל-DeepSeek
    const generatedText = await callDeepSeekAPI(prompt, systemPrompt)

    // עיבוד התוצאה
    const processedContent = processGeneratedContent(generatedText, params.type)

    // הכנת תוכן SEO
    const seoTitle =
      processedContent.title.length > 60 ? processedContent.title.substring(0, 57) + "..." : processedContent.title

    const seoDescription = processedContent.summary
      ? processedContent.summary.length > 160
        ? processedContent.summary.substring(0, 157) + "..."
        : processedContent.summary
      : processedContent.content.length > 160
        ? processedContent.content.substring(0, 157) + "..."
        : processedContent.content

    // הכנת טקסט לרשתות חברתיות
    const socialMediaText = params.publishToSocialMedia
      ? prepareSocialMediaText(processedContent.title, processedContent.summary || processedContent.content)
      : undefined

    return {
      success: true,
      content: {
        type: params.type,
        title: processedContent.title,
        content: processedContent.content,
        summary: processedContent.summary,
        tags: params.keywords,
        status: ContentStatus.DRAFT,
        category: params.category,
        author: params.author,
        createdAt: new Date(),
        updatedAt: new Date(),
        scheduledFor: params.scheduledFor,
        seoTitle,
        seoDescription,
        publishToSocialMedia: params.publishToSocialMedia,
        socialMediaPlatforms: params.socialMediaPlatforms,
        socialMediaText,
        metadata: {
          generationParams: params,
          rawResponse: generatedText,
        },
      },
    }
  } catch (error) {
    console.error("Content generation error:", error)
    return {
      success: false,
      error: `Error generating content: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

// פונקציה להכנת טקסט לרשתות חברתיות
function prepareSocialMediaText(title: string, content: string): string {
  // הסרת תגיות HTML אם יש
  const plainContent = content.replace(/<[^>]*>/g, "")

  // קיצור התוכן ל-200 תווים
  const shortContent = plainContent.length > 200 ? plainContent.substring(0, 197) + "..." : plainContent

  // יצירת טקסט לרשתות חברתיות
  return `${title}

${shortContent}

לקריאת הפוסט המלא: [קישור]
#נדלןבכפר #נדלן #גלילמערבי`
}

// פונקציה לעיבוד התוכן המיוצר
function processGeneratedContent(
  text: string,
  type: ContentType,
): { title: string; content: string; summary?: string } {
  // חיפוש כותרת בתוכן המיוצר
  const titleMatch = text.match(/^#\s+(.+)$|^כותרת:\s*(.+)$|^Title:\s*(.+)$/m)
  const title = titleMatch ? (titleMatch[1] || titleMatch[2] || titleMatch[3]).trim() : "תוכן ללא כותרת"

  // חיפוש תקציר בתוכן המיוצר
  const summaryMatch = text.match(/^תקציר:\s*(.+)$|^Summary:\s*(.+)$/m)
  const summary = summaryMatch ? summaryMatch[1] || summaryMatch[2] : undefined

  // ניקוי התוכן מתגיות מיוחדות
  const content = text
    .replace(/^#\s+.+$|^כותרת:\s*.+$|^Title:\s*.+$/m, "")
    .replace(/^תקציר:\s*.+$|^Summary:\s*.+$/m, "")
    .trim()

  return { title, content, summary }
}

// פונקציה לקבלת תבנית הפרומפט המתאימה לסוג התוכן
function getPromptTemplate(params: ContentGenerationParams): { prompt: string; systemPrompt: string } {
  const { type, topic, keywords, targetAudience, length, tone, additionalInstructions, referenceData } = params

  // הגדרת אורך התוכן
  const contentLength = length === "short" ? "300-500 מילים" : length === "medium" ? "500-800 מילים" : "800-1200 מילים"

  // הגדרת טון התוכן
  const contentTone =
    tone === "professional"
      ? "מקצועי ועסקי"
      : tone === "friendly"
        ? "חברותי ונגיש"
        : tone === "formal"
          ? "פורמלי ומכובד"
          : tone === "enthusiastic"
            ? "נלהב ומעורר השראה"
            : "קליל ונגיש"

  // בניית רשימת מילות מפתח
  const keywordsText = keywords && keywords.length > 0 ? `מילות מפתח שיש לשלב: ${keywords.join(", ")}` : ""

  // בניית הוראות נוספות
  const additionalText = additionalInstructions ? `הוראות נוספות: ${additionalInstructions}` : ""

  // בניית פרומפט מערכת מותאם לנדל"ן בגליל המערבי
  const systemPrompt = `
    אתה מומחה לכתיבת תוכן שיווקי בתחום הנדל"ן בישראל, עם התמחות ספציפית בגליל המערבי. 
    אתה כותב תוכן איכותי, מעניין ומקצועי בעברית מושלמת.
    התוכן שלך מותאם לקהל היעד הישראלי וכולל מידע רלוונטי ומדויק על שוק הנדל"ן בגליל המערבי.
    אתה מתמחה בכתיבה עבור חברת "נדל"ן בכפר" שפועלת באזור הגליל המערבי, עם דגש על יישובים כמו שלומי, נהריה, מעלות, מטה אשר ומעלה יוסף.
    אתה מכיר היטב את היתרונות של מגורים באזור הגליל המערבי: איכות חיים גבוהה, קהילתיות, קרבה לטבע, מחירים נוחים יחסית למרכז, ופוטנציאל השקעה.
    אתה מודע לאתגרים של האזור: מרחק ממרכז הארץ, תעסוקה מוגבלת, ואתגרי תחבורה.
    אתה מכיר את המגמות העדכניות בשוק הנדל"ן הישראלי ויודע לקשר אותן לאזור הגליל המערבי.
  `

  // בניית פרומפט משתמש בהתאם לסוג התוכן
  let prompt = ""

  switch (type) {
    case ContentType.BLOG_POST:
      prompt = `
        כתוב פוסט בלוג מקיף ומעמיק בנושא "${topic || 'נדל"ן בגליל המערבי'}" באורך של ${contentLength} ובטון ${contentTone}.
        ${keywordsText}
        ${additionalText}
        
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
      `
      break

    case ContentType.AREA_GUIDE:
      prompt = `
        כתוב מדריך מקיף ומעמיק על "${topic || "אזור בגליל המערבי"}" באורך של ${contentLength} ובטון ${contentTone}.
        ${keywordsText}
        ${additionalText}
        
        המדריך צריך לכלול:
        1. כותרת מושכת שמציינת את שם האזור
        2. תקציר קצר (2-3 משפטים) שמציג את היתרונות העיקריים של האזור
        3. רקע כללי על האזור: מיקום, היסטוריה, אופי
        4. מאפייני האוכלוסייה: דמוגרפיה, קהילות, אופי חברתי
        5. שוק הנדל"ן המקומי: מחירים, סוגי נכסים, מגמות עדכניות
        6. יתרונות המגורים באזור: איכות חיים, חינוך, תרבות, טבע
        7. אתגרים אפשריים: תעסוקה, תחבורה, שירותים
        8. אטרקציות ומוקדי עניין בסביבה
        9. פוטנציאל השקעה: מגמות עתידיות, פיתוח מתוכנן
        10. המלצות ספציפיות לאזורים/שכונות מומלצים
        11. סיכום וקריאה לפעולה
        
        פרמט את התוכן בצורה נקייה עם כותרות, פסקאות וסימני פיסוק נכונים.
        הקפד על עברית תקנית ברמה גבוהה ועל מידע מדויק ועדכני.
      `
      break

    case ContentType.MARKET_ANALYSIS:
      prompt = `
        כתוב ניתוח שוק מקיף ומעמיק בנושא "${topic || 'שוק הנדל"ן בגליל המערבי'}" באורך של ${contentLength} ובטון ${contentTone}.
        ${keywordsText}
        ${additionalText}
        
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
        
        שלב נתונים מספריים ועובדות ככל האפשר (מחירים, אחוזי שינוי, מספר עסקאות וכו').
        פרמט את התוכן בצורה נקייה עם כותרות, פסקאות וסימני פיסוק נכונים.
        הקפד על עברית תקנית ברמה גבוהה.
      `
      break

    case ContentType.TIPS_ARTICLE:
      prompt = `
        כתוב מאמר טיפים מקיף ומעמיק בנושא "${topic || 'טיפים לרכישת נדל"ן בגליל המערבי'}" באורך של ${contentLength} ובטון ${contentTone}.
        ${keywordsText}
        ${additionalText}
        
        המאמר צריך לכלול:
        1. כותרת מושכת שמבטיחה ערך לקורא
        2. תקציר קצר (2-3 משפטים) שמציג את התועלת העיקרית של המאמר
        3. פתיחה שמסבירה את חשיבות הנושא
        4. 7-10 טיפים מעשיים ושימושיים, כאשר כל טיפ כולל:
           - כותרת ברורה
           - הסבר מפורט
           - דוגמה מעשית או מקרה בוחן מהגליל המערבי
           - "למה זה חשוב" - הסבר על התועלת של הטיפ
        5. טיפים ספציפיים לאזור הגליל המערבי
        6. מידע על מה להימנע ממנו או טעויות נפוצות
        7. סיכום שמחזק את הערך של הטיפים
        8. קריאה לפעולה שמעודדת את הקוראים לפנות ל"נדל"ן בכפר" לייעוץ מקצועי
        
        פרמט את התוכן בצורה נקייה עם כותרות, פסקאות וסימני פיסוק נכונים.
        הקפד על עברית תקנית ברמה גבוהה ועל טיפים מעשיים ורלוונטיים.
      `
      break

    case ContentType.INVESTMENT_GUIDE:
      prompt = `
        כתוב מדריך השקעות מקיף ומעמיק בנושא "${topic || 'השקעות נדל"ן בגליל המערבי'}" באורך של ${contentLength} ובטון ${contentTone}.
        ${keywordsText}
        ${additionalText}
        
        המדריך צריך לכלול:
        1. כותרת מושכת שמדגישה את פוטנציאל ההשקעה
        2. תקציר מנהלים (2-3 משפטים) שמציג את ההזדמנויות העיקריות
        3. מבוא שמסביר מדוע הגליל המערבי הוא אזור אטרקטיבי להשקעה
        4. סקירת שוק: מחירים, מגמות, תשואות
        5. אזורים מומלצים להשקעה בגליל המערבי
        6. סוגי נכסים מומלצים להשקעה (דירות, בתים, מסחרי)
        7. אסטרטגיות השקעה: השכרה לטווח ארוך, השכרה לטווח קצר (Airbnb), קנה-שפץ-מכור
        8. ניתוח כדאיות כלכלית: דוגמאות מספריות, חישובי תשואה
        9. סיכונים וכיצד להתמודד איתם
        10. היבטים משפטיים ומיסויים ייחודיים לאזור
        11. תחזית לטווח הארוך: פיתוח עתידי, תוכניות ממשלתיות
        12. טיפים מעשיים למשקיעים
        13. סיכום וקריאה לפעולה
        
        שלב דוגמאות מספריות ותרחישי השקעה מציאותיים.
        פרמט את התוכן בצורה נקייה עם כותרות, פסקאות וסימני פיסוק נכונים.
        הקפד על עברית תקנית ברמה גבוהה.
      `
      break

    default:
      // פרומפט כללי למקרה שסוג התוכן לא מוכר
      prompt = `
        כתוב תוכן מקיף ומעמיק בנושא "${topic || 'נדל"ן בגליל המערבי'}" באורך של ${contentLength} ובטון ${contentTone}.
        ${keywordsText}
        ${additionalText}
        
        התוכן צריך לכלול:
        1. כותרת מושכת ורלוונטית
        2. תקציר קצר (2-3 משפטים)
        3. מבוא מעניין
        4. 4-6 חלקים עיקריים עם כותרות משנה
        5. מידע מדויק ורלוונטי על הנושא
        6. דוגמאות ספציפיות מהגליל המערבי
        7. סיכום וקריאה לפעולה
        
        פרמט את התוכן בצורה נקייה עם כותרות, פסקאות וסימני פיסוק נכונים.
        הקפד על עברית תקנית ברמה גבוהה.
      `
  }

  return { prompt, systemPrompt }
}

