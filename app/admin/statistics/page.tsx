"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getContentStats } from "@/lib/content-generator/content-service"
import { ContentStatus, ContentType, ContentCategory } from "@/lib/content-generator/types"
import DataVisualization from "@/components/data-visualization"
import { TrendingUp, FileText, Clock, Calendar } from "lucide-react"

export default function StatisticsPage() {
  const [stats, setStats] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<string>("overview")

  // טעינת הסטטיסטיקות בעת טעינת הדף
  useEffect(() => {
    const contentStats = getContentStats()
    setStats(contentStats)
  }, [])

  // אם אין סטטיסטיקות, הצג הודעת טעינה
  if (!stats) {
    return (
      <div className="container px-4 md:px-6 py-8 text-center">
        <p>טוען נתונים...</p>
      </div>
    )
  }

  // הכנת נתונים לגרף סטטוס
  const statusData = {
    labels: Object.keys(stats.byStatus).map((status) => getStatusLabel(status as ContentStatus)),
    values: Object.values(stats.byStatus) as number[],
  }

  // הכנת נתונים לגרף סוג תוכן
  const typeData = {
    labels: Object.keys(stats.byType).map((type) => getContentTypeLabel(type as ContentType)),
    values: Object.values(stats.byType) as number[],
  }

  // הכנת נתונים לגרף קטגוריות
  const categoryData = {
    labels: Object.keys(stats.byCategory).map((category) => getCategoryLabel(category as ContentCategory)),
    values: Object.values(stats.byCategory) as number[],
  }

  // הכנת נתונים לגרף פרסומים לפי חודש
  const publishingData = {
    labels: ["החודש", "חודש שעבר"],
    values: [stats.publishedThisMonth, stats.publishedLastMonth],
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">סטטיסטיקות תוכן</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          ניתוח וויזואליזציה של נתוני התוכן באתר
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
            <CardDescription>פורסמו החודש</CardDescription>
            <CardTitle className="text-4xl">{stats.publishedThisMonth}</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>פורסמו בחודש שעבר</CardDescription>
            <CardTitle className="text-4xl">{stats.publishedLastMonth}</CardTitle>
          </CardHeader>
          <CardContent>
            <Clock className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>שינוי</CardDescription>
            <CardTitle className="text-4xl">
              {stats.publishedLastMonth > 0
                ? `${Math.round(((stats.publishedThisMonth - stats.publishedLastMonth) / stats.publishedLastMonth) * 100)}%`
                : "N/A"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrendingUp className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="status">לפי סטטוס</TabsTrigger>
          <TabsTrigger value="type">לפי סוג תוכן</TabsTrigger>
          <TabsTrigger value="category">לפי קטגוריה</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DataVisualization
              title="תכנים לפי סטטוס"
              data={statusData}
              type="pie"
              colors={["#4CAF50", "#2196F3", "#FFC107", "#F44336", "#9C27B0", "#607D8B"]}
            />

            <DataVisualization
              title="תכנים לפי סוג"
              data={typeData}
              type="bar"
              colors={["#2196F3", "#0D47A1", "#64B5F6", "#BBDEFB"]}
            />

            <DataVisualization
              title="פרסומים לפי חודש"
              data={publishingData}
              type="bar"
              colors={["#9C27B0", "#4A148C", "#E1BEE7", "#F3E5F5"]}
            />

            <DataVisualization
              title="תכנים לפי קטגוריה"
              data={categoryData}
              type="pie"
              colors={["#FF9800", "#E65100", "#FFE0B2", "#FFF3E0"]}
            />
          </div>
        </TabsContent>

        <TabsContent value="status">
          <div className="grid grid-cols-1 gap-8">
            <DataVisualization
              title="תכנים לפי סטטוס"
              description="התפלגות התכנים לפי סטטוס הפרסום שלהם"
              data={statusData}
              type="bar"
              colors={["#4CAF50", "#2E7D32", "#81C784", "#C8E6C9"]}
            />
          </div>
        </TabsContent>

        <TabsContent value="type">
          <div className="grid grid-cols-1 gap-8">
            <DataVisualization
              title="תכנים לפי סוג"
              description="התפלגות התכנים לפי סוג התוכן"
              data={typeData}
              type="bar"
              colors={["#2196F3", "#0D47A1", "#64B5F6", "#BBDEFB"]}
            />
          </div>
        </TabsContent>

        <TabsContent value="category">
          <div className="grid grid-cols-1 gap-8">
            <DataVisualization
              title="תכנים לפי קטגוריה"
              description="התפלגות התכנים לפי קטגוריה"
              data={categoryData}
              type="pie"
              colors={["#FF9800", "#E65100", "#FFE0B2", "#FFF3E0"]}
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

