"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  FileText,
  Settings,
  PlusCircle,
  Image,
  LineChart,
  Newspaper,
  Home,
  Building,
  Users,
  MessageSquare,
  Cog,
  Bell,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// מידע לדוגמה
const mockData = {
  stats: {
    properties: 24,
    blogs: 12,
    leads: 18,
    views: 1254,
  },
  recentActivity: [
    { id: 1, type: "property", action: "added", time: "2 שעות", title: "דירת 4 חדרים בנהריה" },
    { id: 2, type: "lead", action: "received", time: "5 שעות", title: "פנייה חדשה מיוסי כהן" },
    { id: 3, type: "blog", action: "published", time: "יום", title: 'מדריך להשקעות נדל"ן בגליל המערבי' },
    { id: 4, type: "property", action: "updated", time: "2 ימים", title: "וילה בשלומי" },
  ],
  propertyStats: {
    forSale: 14,
    forRent: 8,
    commercial: 2,
    views: {
      thisWeek: 450,
      lastWeek: 380,
      change: 18.4,
    },
    leads: {
      thisWeek: 12,
      lastWeek: 9,
      change: 33.3,
    },
  },
  contentStats: {
    published: 18,
    draft: 5,
    scheduled: 3,
    views: {
      thisWeek: 804,
      lastWeek: 720,
      change: 11.7,
    },
  },
  tasks: [
    { id: 1, title: "לעדכן תמונות לנכס חדש", status: "pending", dueDate: "היום" },
    { id: 2, title: "לענות לפנייה של משפחת לוי", status: "pending", dueDate: "היום" },
    { id: 3, title: "לפרסם מאמר חדש בבלוג", status: "completed", dueDate: "אתמול" },
    { id: 4, title: "לעדכן מחירים לנכסים בנהריה", status: "pending", dueDate: "מחר" },
  ],
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard")
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container px-4 md:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-4 text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">פאנל ניהול</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          ניהול התוכן והגדרות האתר
        </p>
      </motion.div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">שלום, מנהל</span>
          <Badge variant="outline" className="ml-2">
            מנהל
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
              3
            </span>
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date().toLocaleDateString("he-IL")}</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger
            value="dashboard"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            לוח בקרה
          </TabsTrigger>
          <TabsTrigger value="content">ניהול תוכן</TabsTrigger>
          <TabsTrigger value="settings">הגדרות</TabsTrigger>
        </TabsList>

        {/* לוח בקרה */}
        <TabsContent value="dashboard">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">סטטיסטיקות תוכן</CardTitle>
                <CardDescription>סיכום התוכן באתר</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-muted-foreground ml-2" />
                      <span>פוסטים בבלוג</span>
                    </div>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-muted-foreground ml-2" />
                      <span>נכסים</span>
                    </div>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image className="h-5 w-5 text-muted-foreground ml-2" />
                      <span>תמונות</span>
                    </div>
                    <span className="font-medium">87</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-muted-foreground ml-2" />
                      <span>פניות</span>
                    </div>
                    <span className="font-medium">18</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/statistics">
                    <BarChart3 className="h-4 w-4 ml-2" />
                    צפה בסטטיסטיקות מפורטות
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">פעילות אחרונה</CardTitle>
                <CardDescription>פעילות אחרונה באתר</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium">פוסט חדש נוצר</p>
                    <p className="text-xs text-muted-foreground">לפני 2 שעות</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium">נכס חדש נוסף</p>
                    <p className="text-xs text-muted-foreground">לפני 5 שעות</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium">פנייה חדשה התקבלה</p>
                    <p className="text-xs text-muted-foreground">לפני 8 שעות</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">תמונה חדשה הועלתה</p>
                    <p className="text-xs text-muted-foreground">לפני יום</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/activity-log">
                    <LineChart className="h-4 w-4 ml-2" />
                    צפה ביומן פעילות
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">פעולות מהירות</CardTitle>
                <CardDescription>פעולות נפוצות</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/content-creator">
                      <PlusCircle className="h-4 w-4 ml-2" />
                      צור תוכן חדש
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/media-manager">
                      <Image className="h-4 w-4 ml-2" />
                      נהל מדיה
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/content-manager">
                      <Newspaper className="h-4 w-4 ml-2" />
                      נהל תוכן
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/system-settings">
                      <Cog className="h-4 w-4 ml-2" />
                      הגדרות מערכת
                    </Link>
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">
                    <Home className="h-4 w-4 ml-2" />
                    צפה באתר
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* ניהול תוכן */}
        <TabsContent value="content">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>בלוג</CardTitle>
                <CardDescription>ניהול פוסטים בבלוג</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  צור, ערוך ונהל את הפוסטים בבלוג. הוסף תמונות, תגיות וקטגוריות.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/content-manager">
                    <Newspaper className="h-4 w-4 ml-2" />
                    נהל פוסטים
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>נכסים</CardTitle>
                <CardDescription>ניהול נכסים</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  צור, ערוך ונהל את הנכסים באתר. הוסף תמונות, מפרטים ומחירים.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/property-manager">
                    <Building className="h-4 w-4 ml-2" />
                    נהל נכסים
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>מדיה</CardTitle>
                <CardDescription>ניהול תמונות וקבצים</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  העלה, ערוך ונהל את התמונות והקבצים באתר. ארגן בתיקיות וקטגוריות.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/media-manager">
                    <Image className="h-4 w-4 ml-2" />
                    נהל מדיה
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>יצירת תוכן</CardTitle>
                <CardDescription>יצירת תוכן חדש</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  צור תוכן חדש באמצעות DeepSeek. בחר סוג תוכן, הגדר פרמטרים וצור תוכן איכותי.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/content-creator">
                    <PlusCircle className="h-4 w-4 ml-2" />
                    צור תוכן חדש
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>פניות</CardTitle>
                <CardDescription>ניהול פניות מלקוחות</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  צפה ונהל את הפניות שהתקבלו מהטופס באתר. סמן כטופל, הוסף הערות ומעקב.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/leads">
                    <Users className="h-4 w-4 ml-2" />
                    נהל פניות
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>סטטיסטיקות</CardTitle>
                <CardDescription>ניתוח נתונים וסטטיסטיקות</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  צפה בסטטיסטיקות ונתונים על התוכן באתר. עקוב אחר מגמות ופופולריות.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/statistics">
                    <BarChart3 className="h-4 w-4 ml-2" />
                    צפה בסטטיסטיקות
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* הגדרות */}
        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>הגדרות מערכת</CardTitle>
                <CardDescription>הגדרות כלליות של האתר</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  הגדר את ההגדרות הכלליות של האתר, כולל שם האתר, תיאור, לוגו ופרטי קשר.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/system-settings">
                    <Settings className="h-4 w-4 ml-2" />
                    הגדרות מערכת
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>הגדרות DeepSeek</CardTitle>
                <CardDescription>הגדרות מנוע יצירת התוכן</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  הגדר את הפרמטרים של מנוע יצירת התוכן DeepSeek, כולל מפתח API, מודל ופרמטרים.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/deepseek-settings">
                    <Settings className="h-4 w-4 ml-2" />
                    הגדרות DeepSeek
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>הגדרות אינטגרציה</CardTitle>
                <CardDescription>הגדרות חיבור למערכות חיצוניות</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  הגדר את הפרמטרים של החיבור למערכות חיצוניות, כולל מפתח אינטגרציה וכתובת API.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/integration-key-simple">
                    <Settings className="h-4 w-4 ml-2" />
                    הגדרות אינטגרציה
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>תבניות תוכן</CardTitle>
                <CardDescription>ניהול תבניות ליצירת תוכן</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  צור וערוך תבניות ליצירת תוכן אוטומטי. הגדר פרומפטים, מבנה ופרמטרים.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/content-templates">
                    <FileText className="h-4 w-4 ml-2" />
                    נהל תבניות
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>תזמון תוכן</CardTitle>
                <CardDescription>הגדרות תזמון ליצירת תוכן</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  הגדר את התזמון ליצירת תוכן אוטומטי. קבע תדירות, שעה וסוגי תוכן.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/content-scheduler">
                    <Settings className="h-4 w-4 ml-2" />
                    הגדרות תזמון
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>הגדרות SEO</CardTitle>
                <CardDescription>הגדרות קידום האתר</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  הגדר את הפרמטרים לקידום האתר במנועי חיפוש, כולל כותרות, תיאורים ותגיות.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/seo-settings">
                    <Settings className="h-4 w-4 ml-2" />
                    הגדרות SEO
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

