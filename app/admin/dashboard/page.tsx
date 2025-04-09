"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  BarChart3,
  FileText,
  PlusCircle,
  Image,
  Newspaper,
  Building,
  Users,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Bell,
  Eye,
  Activity,
  DollarSign,
  Layers,
} from "lucide-react"
import { motion } from "framer-motion"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // מידע לדוגמה עבור הדשבורד
  const dashboardData = {
    properties: {
      total: 24,
      active: 18,
      pending: 3,
      sold: 3,
      growth: 12,
    },
    leads: {
      total: 42,
      new: 8,
      contacted: 15,
      converted: 12,
      growth: 24,
    },
    content: {
      total: 36,
      posts: 12,
      guides: 8,
      tips: 10,
      analysis: 6,
      growth: 8,
    },
    activity: [
      { type: "property_added", title: "נכס חדש נוסף", time: "לפני 2 שעות", user: "יעקב" },
      { type: "lead_converted", title: "ליד הומר ללקוח", time: "לפני 5 שעות", user: "מיכל" },
      { type: "post_published", title: "פוסט חדש פורסם", time: "לפני 8 שעות", user: "מערכת" },
      { type: "property_sold", title: "נכס נמכר", time: "לפני יום", user: "יעקב" },
      { type: "lead_added", title: "ליד חדש התקבל", time: "לפני יומיים", user: "מערכת" },
    ],
    notifications: [
      { title: "3 לידים חדשים ממתינים לטיפול", priority: "high" },
      { title: "עדכון תוכן אוטומטי הושלם", priority: "medium" },
      { title: "תזכורת: פגישה עם לקוח ב-14:00", priority: "high" },
      { title: "5 נכסים ממתינים לאישור", priority: "medium" },
    ],
  }

  // אנימציות
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">דשבורד ניהול</h1>
          <p className="text-muted-foreground">ברוכים הבאים למערכת הניהול של נדל״ן בכפר</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4 mr-2" />
            התראות
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {dashboardData.notifications.length}
            </Badge>
          </Button>
          <Button asChild size="sm">
            <Link href="/">
              <Eye className="h-4 w-4 mr-2" />
              צפה באתר
            </Link>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-3 w-full bg-background border">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            סקירה כללית
          </TabsTrigger>
          <TabsTrigger value="properties" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            נכסים
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            תוכן
          </TabsTrigger>
        </TabsList>

        {/* סקירה כללית */}
        <TabsContent value="overview">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* כרטיסי סטטיסטיקה */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>נכסים פעילים</span>
                    <Building className="h-5 w-5 text-primary" />
                  </CardTitle>
                  <CardDescription>סה״כ נכסים במערכת</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardData.properties.total}</div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">{dashboardData.properties.growth}%</span>
                    <span className="text-muted-foreground mr-1">מהחודש שעבר</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>לידים</span>
                    <Users className="h-5 w-5 text-blue-500" />
                  </CardTitle>
                  <CardDescription>סה״כ לידים במערכת</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardData.leads.total}</div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">{dashboardData.leads.growth}%</span>
                    <span className="text-muted-foreground mr-1">מהחודש שעבר</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>תכנים</span>
                    <FileText className="h-5 w-5 text-amber-500" />
                  </CardTitle>
                  <CardDescription>סה״כ תכנים במערכת</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardData.content.total}</div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">{dashboardData.content.growth}%</span>
                    <span className="text-muted-foreground mr-1">מהחודש שעבר</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>המרות</span>
                    <Activity className="h-5 w-5 text-green-500" />
                  </CardTitle>
                  <CardDescription>לידים שהומרו ללקוחות</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardData.leads.converted}</div>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-muted-foreground">
                      {Math.round((dashboardData.leads.converted / dashboardData.leads.total) * 100)}% אחוז המרה
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* גרפים ונתונים */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">פעילות אחרונה</CardTitle>
                  <CardDescription>פעילות אחרונה במערכת</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.activity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === "property_added"
                              ? "bg-primary/10 text-primary"
                              : activity.type === "lead_converted"
                              ? "bg-green-500/10 text-green-500"
                              : activity.type === "post_published"
                              ? "bg-amber-500/10 text-amber-500"
                              : activity.type === "property_sold"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-gray-500/10 text-gray-500"
                          }`}
                        >
                          {activity.type === "property_added" ? (
                            <Building className="h-5 w-5" />
                          ) : activity.type === "lead_converted" ? (
                            <Users className="h-5 w-5" />
                          ) : activity.type === "post_published" ? (
                            <FileText className="h-5 w-5" />
                          ) : activity.type === "property_sold" ? (
                            <DollarSign className="h-5 w-5" />
                          ) : (
                            <Bell className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{activity.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {activity.time}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">על ידי: {activity.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/activity-log">
                      <Clock className="h-4 w-4 mr-2" />
                      צפה ביומן פעילות מלא
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">התראות</CardTitle>
                  <CardDescription>התראות והודעות מערכת</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.notifications.map((notification, index) => (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <div
                          className={`w-2 h-2 mt-2 rounded-full ${
                            notification.priority === "high" ? "bg-red-500" : "bg-amber-500"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className="text-sm">{notification.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/notifications">
                      <Bell className="h-4 w-4 mr-2" />
                      צפה בכל ההתראות
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* פעולות מהירות */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">פעולות מהירות</CardTitle>
                  <CardDescription>פעולות נפוצות</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
                      <Link href="/admin/content-creator">
                        <PlusCircle className="h-8 w-8 mb-2 text-primary" />
                        <span>צור תוכן חדש</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
                      <Link href="/admin/property-manager">
                        <Building className="h-8 w-8 mb-2 text-blue-500" />
                        <span>הוסף נכס</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
                      <Link href="/admin/leads">
                        <Users className="h-8 w-8 mb-2 text-amber-500" />
                        <span>נהל לידים</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
                      <Link href="/admin/statistics">
                        <BarChart3 className="h-8 w-8 mb-2 text-green-500" />
                        <span>סטטיסטיקות</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* נכסים */}
        <TabsContent value="properties">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* סטטיסטיקות נכסים */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">סה״כ נכסים</h3>
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-3xl font-bold">{dashboardData.properties.total}</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">נכסים פעילים</h3>
                    <Building className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold">{dashboardData.properties.active}</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">ממתינים לאישור</h3>
                    <Clock className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="text-3xl font-bold">{dashboardData.properties.pending}</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">נכסים שנמכרו</h3>
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold">{dashboardData.properties.sold}</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* פעולות נכסים */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ניהול נכסים</CardTitle>
                  <CardDescription>פעולות לניהול נכסים</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="w-full" asChild>
                      <Link href="/admin/property-manager">
                        <Building className="h-4 w-4 mr-2" />
                        נהל נכסים
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/admin/property-manager?action=add">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        הוסף נכס חדש
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/admin/property-statistics">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        סטטיסטיקות נכסים
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* נכסים אחרונים */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">נכסים אחרונים</CardTitle>
                  <CardDescription>נכסים שנוספו לאחרונה</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <div className="w-16 h-16 bg-muted rounded-md overflow-hidden relative">
                          <Image
                            src={`/placeholder.svg?height=64&width=64&text=נכס ${index + 1}`}
                            alt={`נכס ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">דירת {4 - index} חדרים בנהריה</p>
                            <Badge variant={index === 0 ? "default" : index === 1 ? "outline" : "secondary"}>
                              {index === 0 ? "חדש" : index === 1 ? "ממתין לאישור" : "פעיל"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">₪{(1500000 - index * 100000).toLocaleString()}</p>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/property-manager/${index + 1}`}>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/property-manager">
                      <Building className="h-4 w-4 mr-2" />
                      צפה בכל הנכסים
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* תוכן */}
        <TabsContent value="content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* סטטיסטיקות תוכן */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">סה״כ תכנים</h3>
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-3xl font-bold">{dashboardData.content.total}</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">פוסטים בבלוג</h3>
                    <Newspaper className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold">{dashboardData.content.posts}</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">מדריכים</h3>
                    <FileText className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="text-3xl font-bold">{dashboardData.content.guides}</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">מאמרי טיפים</h3>
                    <FileText className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold">{dashboardData.content.tips}</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* פעולות תוכן */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ניהול תוכן</CardTitle>
                  <CardDescription>פעולות לניהול תוכן</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="w-full" asChild>
                      <Link href="/admin/content-manager">
                        <FileText className="h-4 w-4 mr-2" />
                        נהל תכנים
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/admin/content-creator">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        צור תוכן חדש
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/admin/media-manager">
                        <Image className="h-4 w-4 mr-2" />
                        נהל מדיה
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* תכנים אחרונים */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">תכנים אחרונים</CardTitle>
                  <CardDescription>תכנים שנוצרו לאחרונה</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index % 3 === 0
                              ? "bg-blue-500/10 text-blue-500"
                              : index % 3 === 1
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-green-500/10 text-green-500"
                          }`}
                        >
                          {index % 3 === 0 ? (
                            <Newspaper className="h-5 w-5" />
                          ) : index % 3 === 1 ? (
                            <FileText className="h-5 w-5" />
                          ) : (
                            <FileText className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">
                              {index % 3 === 0
                                ? "איך לבחור נכס להשקעה בגליל המערבי"
                                : index % 3 === 1
                                ? "מדריך מקיף לנהריה והסביבה"
                                : "10 טיפים חיוניים לרכישת נכס ראשון"}
                            </p>
                            <Badge
                              variant={index === 0 ? "default" : index === 1 ? "outline" : "secondary"}
                              className={
                                index === 0 ? "bg-green-500" : index === 1 ? "border-amber-500 text-amber-500" : ""
                              }
                            >
                              {index === 0 ? "פורסם" : index === 1 ? "טיוטה" : "מתוזמן"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            נוצר לאחרונה על ידי מערכת
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/content-manager/${index + 1}`}>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/content-manager">
                      <FileText className="h-4 w-4 mr-2" />
                      צפה בכל התכנים
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>\

