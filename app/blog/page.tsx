import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BlogPostCard from "@/components/blog-post-card"
import { ContentStatus, ContentType, ContentCategory } from "@/lib/content-generator/types"
import { getAllContent, getContentByType, createSampleContent } from "@/lib/content-generator/content-service"

export default function Blog() {
  // יצירת תכנים לדוגמה אם אין תכנים במאגר
  createSampleContent()

  // קבלת כל התכנים המפורסמים
  const allContent = getAllContent().filter((content) => content.status === ContentStatus.PUBLISHED)

  // קבלת פוסטים בלבד
  const blogPosts = getContentByType(ContentType.BLOG_POST).filter((post) => post.status === ContentStatus.PUBLISHED)

  // קבלת מדריכי אזור
  const areaGuides = getContentByType(ContentType.AREA_GUIDE).filter(
    (guide) => guide.status === ContentStatus.PUBLISHED,
  )

  // קבלת מאמרי טיפים
  const tipsArticles = getContentByType(ContentType.TIPS_ARTICLE).filter(
    (article) => article.status === ContentStatus.PUBLISHED,
  )

  // קבלת ניתוחי שוק
  const marketAnalyses = getContentByType(ContentType.MARKET_ANALYSIS).filter(
    (analysis) => analysis.status === ContentStatus.PUBLISHED,
  )

  // אם אין תכנים, השתמש בנתונים מדומים
  const useMockData = allContent.length === 0

  // נתונים מדומים לבלוג
  const mockBlogPosts = [
    {
      id: "1",
      title: "איך תחזוקה שוטפת תרמה להעלאת ערך הנכסים",
      summary:
        "מדריך המציג כיצד תחזוקה נכונה ויעילה מעלה את ערך הנכס לאורך זמן, עם נקודות על שמירה על מצב תקין, מניעת נזקים, הארכת חיי הנכס, שביעות רצון שוכרים, עמידה בתקנים ושיפור מוניטין הבעלים.",
      content:
        "תחזוקה שוטפת של נכסים היא אחד המרכיבים החשובים ביותר בשמירה על ערך הנכס ואף בהעלאתו לאורך זמן. במאמר זה נסקור את הדרכים השונות בהן תחזוקה נכונה משפיעה על ערך הנכס ומדוע כדאי להשקיע בה...",
      slug: "how-maintenance-increases-property-value",
      type: ContentType.BLOG_POST,
      category: ContentCategory.MAINTENANCE,
      tags: ["תחזוקת נכסים", "ערך נכס", 'השקעות נדל"ן'],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-05-30"),
      updatedAt: new Date("2024-05-30"),
      publishedAt: new Date("2024-05-30"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
    },
    {
      id: "2",
      title: "מה חשוב לדעת לפני שמתחילים להשכיר נכסים לתיירים",
      summary:
        "נקודות חשובות להכנת נכס להשכרה לתיירים (ב-Airbnb וכד'), כולל הבנת חוקים ותקנות, הכנת הנכס (ניקיון ואבזור), אבטחה, פרסום נכון בפלטפורמות, ניהול הזמנות ותקשורת, תחזוקה שוטפת, תמחור וביטוח.",
      content:
        "השכרת נכסים לטווח קצר לתיירים הפכה לאפשרות הכנסה אטרקטיבית עבור בעלי נכסים. עם זאת, לפני שמתחילים בתהליך, ישנם מספר דברים חשובים שכדאי לדעת...",
      slug: "what-to-know-before-renting-to-tourists",
      type: ContentType.TIPS_ARTICLE,
      category: ContentCategory.RENTING,
      tags: ["השכרה לתיירים", "Airbnb", "השכרה לטווח קצר"],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-05-30"),
      updatedAt: new Date("2024-05-30"),
      publishedAt: new Date("2024-05-30"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
    },
    {
      id: "3",
      title: "10 טיפים לניהול נכסים יעיל בשלט רחוק",
      summary:
        "רשימת עשרה טיפים לניהול נכסים מרחוק, כגון בחירת חברת ניהול מקצועית, שימוש בטכנולוגיות ניהול, תכנון תחזוקה שוטפת, שיפור שירותי ניקיון, תחזוקת גינות, הסתייעות בייעוץ נדל\"ן, תקשורת שוטפת עם דיירים, וכו'.",
      content:
        "ניהול נכסים מרחוק יכול להיות אתגר, במיוחד כאשר אתם לא נמצאים באותו אזור גיאוגרפי. במאמר זה נציג 10 טיפים שיעזרו לכם לנהל את הנכסים שלכם ביעילות גם מרחוק...",
      slug: "10-tips-for-remote-property-management",
      type: ContentType.TIPS_ARTICLE,
      category: ContentCategory.PROPERTY_MANAGEMENT,
      tags: ["ניהול נכסים", "ניהול מרחוק", "טיפים"],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-05-30"),
      updatedAt: new Date("2024-05-30"),
      publishedAt: new Date("2024-05-30"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
    },
    {
      id: "4",
      title: "מדריך מקיף לשלומי והסביבה",
      summary:
        'מדריך מקיף על העיר שלומי והסביבה, כולל מידע על שוק הנדל"ן המקומי, מחירים, סוגי נכסים, שכונות מומלצות, חינוך, תחבורה, תרבות ופנאי.',
      content:
        "שלומי היא עיר קטנה ומקסימה בגליל המערבי, הממוקמת בסמוך לגבול לבנון. בשנים האחרונות, העיר עוברת תהליך התחדשות משמעותי והופכת ליעד אטרקטיבי למשפחות ומשקיעים...",
      slug: "comprehensive-guide-to-shlomi",
      type: ContentType.AREA_GUIDE,
      category: ContentCategory.LIFESTYLE,
      tags: ["שלומי", "גליל מערבי", "מדריך אזור"],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-05-17"),
      updatedAt: new Date("2024-05-17"),
      publishedAt: new Date("2024-05-17"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
    },
    {
      id: "5",
      title: 'ניתוח מגמות שוק הנדל"ן בגליל המערבי - רבעון אחרון',
      summary:
        'ניתוח מעמיק של מגמות שוק הנדל"ן בגליל המערבי ברבעון האחרון, כולל מחירים, היקפי עסקאות, אזורים מבוקשים, תחזיות לעתיד ומשמעויות למשקיעים.',
      content:
        'הרבעון האחרון הציג מספר מגמות מעניינות בשוק הנדל"ן בגליל המערבי. במאמר זה ננתח את הנתונים העדכניים ביותר ונבחן את המשמעויות עבור משקיעים ורוכשי דירות...',
      slug: "western-galilee-real-estate-trends-last-quarter",
      type: ContentType.MARKET_ANALYSIS,
      category: ContentCategory.MARKET_TRENDS,
      tags: ["מגמות שוק", "גליל מערבי", 'ניתוח נדל"ן'],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-05-17"),
      updatedAt: new Date("2024-05-17"),
      publishedAt: new Date("2024-05-17"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
    },
    {
      id: "6",
      title: "איך להכין את הנכס שלכם להשכרה ב-Airbnb",
      summary:
        "המדריך האולטימטיבי להכנת נכס להשכרה קצרה: הכנת הנכס ברמת בית מלון (ניקיון, מצעים, אביזרים מפנקים), צילומים מקצועיים, כתיבת תיאור מזמין ומפורט, קביעת מחיר תחרותי על סמך מחקר שוק, תקשורת מצוינת עם אורחים (מדריך מקומי, זמינות לשאלות), מתן שירות יוצא דופן לביקורות מצוינות, שיפור מתמיד על סמך משוב, ושמירה על בטיחות (גלאים, ביטוח).",
      content:
        "השכרת נכס ב-Airbnb יכולה להיות מקור הכנסה משמעותי, אך הצלחה בתחום דורשת הכנה נכונה של הנכס. במדריך זה נעבור על כל השלבים הנדרשים להכנת הנכס שלכם להשכרה מוצלחת ב-Airbnb...",
      slug: "how-to-prepare-property-for-airbnb",
      type: ContentType.TIPS_ARTICLE,
      category: ContentCategory.RENTING,
      tags: ["Airbnb", "השכרה לטווח קצר", "הכנת נכס"],
      status: ContentStatus.PUBLISHED,
      createdAt: new Date("2024-05-17"),
      updatedAt: new Date("2024-05-17"),
      publishedAt: new Date("2024-05-17"),
      featuredImage: "/placeholder.svg?height=600&width=800",
      author: 'צוות נדל"ן בכפר',
    },
  ]

  // בחירת הנתונים להצגה
  const displayPosts = useMockData ? mockBlogPosts : allContent

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">הבלוג שלנו</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          מאמרים, טיפים ומדריכים בנושא נדל"ן
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="all">הכל</TabsTrigger>
          <TabsTrigger value="blog">מאמרים</TabsTrigger>
          <TabsTrigger value="guides">מדריכי אזור</TabsTrigger>
          <TabsTrigger value="tips">טיפים</TabsTrigger>
          <TabsTrigger value="analysis">ניתוחי שוק</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {displayPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <BlogPostCard post={displayPosts[0]} variant="featured" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.slice(1).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="blog">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(useMockData ? mockBlogPosts.filter((p) => p.type === ContentType.BLOG_POST) : blogPosts).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(useMockData ? mockBlogPosts.filter((p) => p.type === ContentType.AREA_GUIDE) : areaGuides).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(useMockData ? mockBlogPosts.filter((p) => p.type === ContentType.TIPS_ARTICLE) : tipsArticles).map(
              (post) => (
                <BlogPostCard key={post.id} post={post} />
              ),
            )}
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(useMockData ? mockBlogPosts.filter((p) => p.type === ContentType.MARKET_ANALYSIS) : marketAnalyses).map(
              (post) => (
                <BlogPostCard key={post.id} post={post} />
              ),
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button variant="outline">טען עוד מאמרים</Button>
      </div>
    </div>
  )
}

