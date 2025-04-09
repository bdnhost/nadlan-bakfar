"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getContentStats, getAllContent } from "@/lib/content-generator/content-service"
import { ContentStatus, ContentType, ContentCategory } from "@/lib/content-generator/types"
import DataVisualization from "@/components/data-visualization"
import { FileText, Image, Tag, BookOpen } from "lucide-react"

export default function AdvancedStatisticsPage() {
  const [stats, setStats] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<string>("content")
  const [contentData, setContentData] = useState<any>(null)

  // טעינת הסטטיסטיקות בעת טעינת הדף
  useEffect(() => {
    const contentStats = getContentStats()
    setStats(contentStats)

    // הכנת נתונים נוספים
    prepareContentData()
  }, [])

  // הכנת נתונים נוספים לגרפים
  const prepareContentData = () => {
    const allContent = getAllContent()

    // חישוב תכנים לפי חודש
    const contentByMonth: Record<string, number> = {}

    // חישוב תגיות נפוצות
    const tagsCount: Record<string, number> = {}

    // חישוב אורך תוכן ממוצע
    let totalLength = 0
    let contentWithImages = 0

    allContent.forEach((content) => {
      // חישוב תכנים לפי חודש
      const date = content.createdAt
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`

      if (!contentByMonth[monthYear]) {
        contentByMonth[monthYear] = 0
      }

      contentByMonth[monthYear]++

      // חישוב תגיות נפוצות
      if (content.tags) {
        content.tags.forEach((tag) => {
          if (!tagsCount[tag]) {
            tagsCount[tag] = 0
          }

          tagsCount[tag]++
        })
      }

      // חישוב אורך תוכן
      totalLength += content.content.length

      // ספירת תכנים עם תמונות
      if (content.featuredImage) {
        contentWithImages++
      }
    })

    // מיון חודשים
    const sortedMonths = Object.keys(contentByMonth).sort((a, b) => {
      const [monthA, yearA] = a.split("/").map(Number)
      const [monthB, yearB] = b.split("/").map(Number)

      if (yearA !== yearB) {
        return yearA - yearB
      }

      return monthA - monthB
    })

    // הכנת נתונים לגרף תכנים לפי חודש
    const contentByMonthData = {
      labels: sortedMonths,
      values: sortedMonths.map((month) => contentByMonth[month]),
    }

    // מיון תגיות לפי פופולריות
    const sortedTags = Object.entries(tagsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)

    // הכנת נתונים לגרף תגיות נפוצות
    const popularTagsData = {
      labels: sortedTags.map(([tag]) => tag),
      values: sortedTags.map(([, count]) => count),
    }

    // חישוב אורך תוכן ממוצע
    const averageContentLength = allContent.length > 0 ? Math.round(totalLength / allContent.length) : 0

    // חישוב אחוז תכנים עם תמונות
    const imagePercentage = allContent.length > 0 ? Math.round((contentWithImages / allContent.length) * 100) : 0

    // הכנת נתונים לגרף אורך תוכן
    const contentLengthDistribution = {
      labels: ["קצר (עד 1000)", "בינוני (1000-3000)", "ארוך (מעל 3000)"],
      values: [
        allContent.filter((c) => c.content.length < 1000).length,
        allContent.filter((c) => c.content.length >= 1000 && c.content.length < 3000).length,
        allContent.filter((c) => c.content.length >= 3000).length,
      ],
    }

    setContentData({
      contentByMonth: contentByMonthData,
      popularTags: popularTagsData,
      averageContentLength,
      imagePercentage,
      contentLengthDistribution,
    })
  }

  // אם אין סטטיסטיקות, הצג הודעת טעינה
  if (!stats || !contentData) {
    return (
      <div className="container px-4 md:px-6 py-8 text-center">
        <p>טוען נתונים...</p>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">סטטיסטיקות מתקדמות</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          ניתוח מעמיק של נתוני התוכן והמדיה באתר
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>סה"כ תכנים</CardDescription>
            <CardTitle className="text-4xl">{stats.totalContent}</CardTitle>
          </CardHeader>
          <CardContent>
            <FileText className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>אורך תוכן ממוצע</CardDescription>
            <CardTitle className="text-4xl">{contentData.averageContentLength}</CardTitle>
          </CardHeader>
          <CardContent>
            <BookOpen className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>תכנים עם תמונות</CardDescription>
            <CardTitle className="text-4xl">{contentData.imagePercentage}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Image className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>תגיות ייחודיות</CardDescription>
            <CardTitle className="text-4xl">{contentData.popularTags.labels.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tag className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="content">ניתוח תוכן</TabsTrigger>
          <TabsTrigger value="trends">מגמות</TabsTrigger>
          <TabsTrigger value="media">מדיה וגרפיקה</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DataVisualization
              title="תכנים לפי סוג"
              description="התפלגות התכנים לפי סוג התוכן"
              data={{
                labels: Object.keys(stats.byType).map((type) => getContentTypeLabel(type as ContentType)),
                values: Object.values(stats.byType) as number[],
              }}
              type="pie"
              colors={["#2196F3", "#0D47A1", "#64B5F6", "#BBDEFB", "#1565C0", "#42A5F5"]}
            />

            <DataVisualization
              title="תכנים לפי קטגוריה"
              description="התפלגות התכנים לפי קטגוריה"
              data={{
                labels: Object.keys(stats.byCategory).map((category) => getCategoryLabel(category as ContentCategory)),
                values: Object.values(stats.byCategory) as number[],
              }}
              type="bar"
              colors={["#FF9800", "#E65100", "#FFE0B2", "#FFF3E0"]}
            />

            <DataVisualization
              title="אורך תוכן"
              description="התפלגות התכנים לפי אורך"
              data={contentData.contentLengthDistribution}
              type="pie"
              colors={["#9C27B0", "#4A148C", "#E1BEE7", "#F3E5F5"]}
            />

            <DataVisualization
              title="תגיות נפוצות"
              description="התגיות הנפוצות ביותר בתכנים"
              data={contentData.popularTags}
              type="bar"
              colors={["#4CAF50", "#2E7D32", "#81C784", "#C8E6C9"]}
            />
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid grid-cols-1 gap-8">
            <DataVisualization
              title="תכנים לפי חודש"
              description="מספר התכנים שנוצרו בכל חודש"
              data={contentData.contentByMonth}
              type="line"
              colors={["#2196F3", "#0D47A1", "#64B5F6", "#BBDEFB"]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DataVisualization
                title="תכנים לפי סטטוס"
                description="התפלגות התכנים לפי סטטוס הפרסום שלהם"
                data={{
                  labels: Object.keys(stats.byStatus).map((status) => getStatusLabel(status as ContentStatus)),
                  values: Object.values(stats.byStatus) as number[],
                }}
                type="pie"
                colors={["#4CAF50", "#FFC107", "#F44336", "#9C27B0", "#607D8B", "#795548"]}
              />

              <DataVisualization
                title="פרסומים לפי חודש"
                description="השוואה בין החודש הנוכחי לחודש הקודם"
                data={{
                  labels: ["החודש", "חודש שעבר"],
                  values: [stats.publishedThisMonth, stats.publishedLastMonth],
                }}
                type="bar"
                colors={["#9C27B0", "#4A148C", "#E1BEE7", "#F3E5F5"]}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DataVisualization
              title="תכנים עם תמונות"
              description="אחוז התכנים עם תמונות ראשיות"
              data={{
                labels: ["עם תמונות", "ללא תמונות"],
                values: [stats.withImages, stats.totalContent - stats.withImages],
              }}
              type="pie"
              colors={["#4CAF50", "#F44336", "#81C784", "#C8E6C9"]}
            />

            <DataVisualization
              title="סוגי תמונות"
              description="התפלגות סוגי התמונות בתכנים"
              data={{
                labels: ["תמונות Unsplash", "גרפיקת SVG", "תמונות אחרות"],
                values: [
                  getAllContent().filter((c) => c.featuredImage && c.featuredImage.includes("unsplash")).length,
                  getAllContent().filter((c) => c.featuredImage && c.featuredImage.includes("svg")).length,
                  getAllContent().filter(
                    (c) => c.featuredImage && !c.featuredImage.includes("unsplash") && !c.featuredImage.includes("svg"),
                  ).length,
                ],
              }}
              type="bar"
              colors={["#2196F3", "#FF9800", "#9C27B0", "#BBDEFB"]}
            />

            <DataVisualization
              title="תכנים עם תמונות לפי סוג"
              description="אחוז התכנים עם תמונות לפי סוג התוכן"
              data={{
                labels: Object.keys(stats.byType)
                  .filter((type) => stats.byType[type as ContentType] > 0)
                  .map((type) => getContentTypeLabel(type as ContentType)),
                values: Object.keys(stats.byType)
                  .filter((type) => stats.byType[type as ContentType] > 0)
                  .map((type) => {
                    const typeContent = getAllContent().filter((c) => c.type === type)
                    const withImages = typeContent.filter((c) => c.featuredImage).length
                    return typeContent.length > 0 ? Math.round((withImages / typeContent.length) * 100) : 0
                  }),
              }}
              type="bar"
              colors={["#4CAF50", "#2E7D32", "#81C784", "#C8E6C9"]}
            />

            <DataVisualization
              title="תכנים עם תמונות לפי קטגוריה"
              description="אחוז התכנים עם תמונות לפי קטגוריה"
              data={{
                labels: Object.keys(stats.byCategory)
                  .filter((category) => stats.byCategory[category as ContentCategory] > 0)
                  .map((category) => getCategoryLabel(category as ContentCategory)),
                values: Object.keys(stats.byCategory)
                  .filter((category) => stats.byCategory[category as ContentCategory] > 0)
                  .map((category) => {
                    const categoryContent = getAllContent().filter((c) => c.category === category)
                    const withImages = categoryContent.filter((c) => c.featuredImage).length
                    return categoryContent.length > 0 ? Math.round((withImages / categoryContent.length) * 100) : 0
                  }),
              }}
              type="pie"
              colors={["#FF9800", "#E65100", "#FFE0B2", "#FFF3E0", "#F57C00", "#FFB74D"]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// פונקציה להצגת סטטוס התוכן
function getStatusLabel(status: ContentStatus): string {
  switch (status) {
    case ContentStatus.DRAFT:
      return "טיוטה"
    case ContentStatus.REVIEW:
      return "בבדיקה"
    case ContentStatus.PUBLISHED:
      return "פורסם"
    case ContentStatus.REJECTED:
      return "נדחה"
    case ContentStatus.SCHEDULED:
      return "מתוזמן"
    case ContentStatus.ARCHIVED:
      return "בארכיון"
    default:
      return status
  }
}

// פונקציה להצגת סוג התוכן
function getContentTypeLabel(type: ContentType): string {
  switch (type) {
    case ContentType.BLOG_POST:
      return "פוסט בלוג"
    case ContentType.PROPERTY_DESCRIPTION:
      return "תיאור נכס"
    case ContentType.MARKET_ANALYSIS:
      return "ניתוח שוק"
    case ContentType.TIPS_ARTICLE:
      return "מאמר טיפים"
    case ContentType.AREA_GUIDE:
      return "מדריך אזור"
    case ContentType.FAQ:
      return "שאלות ותשובות"
    case ContentType.NEWS_UPDATE:
      return "עדכון חדשות"
    case ContentType.TESTIMONIAL:
      return "המלצת לקוח"
    case ContentType.NEIGHBORHOOD_SPOTLIGHT:
      return "זרקור על שכונה"
    case ContentType.INVESTMENT_GUIDE:
      return "מדריך השקעות"
    default:
      return type
  }
}

// פונקציה להצגת קטגוריה
function getCategoryLabel(category: ContentCategory): string {
  switch (category) {
    case ContentCategory.BUYING:
      return "רכישה"
    case ContentCategory.SELLING:
      return "מכירה"
    case ContentCategory.INVESTING:
      return "השקעות"
    case ContentCategory.RENTING:
      return "השכרה"
    case ContentCategory.PROPERTY_MANAGEMENT:
      return "ניהול נכסים"
    case ContentCategory.MARKET_TRENDS:
      return "מגמות שוק"
    case ContentCategory.LIFESTYLE:
      return "סגנון חיים"
    case ContentCategory.LEGAL:
      return "משפטי"
    case ContentCategory.FINANCING:
      return "מימון"
    case ContentCategory.MAINTENANCE:
      return "תחזוקה"
    default:
      return category
  }
}

