"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2, CheckCircle, AlertTriangle, Save } from "lucide-react"

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("general")
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // הגדרות כלליות
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'נדל"ן בכפר',
    siteDescription: 'פורטל נדל"ן מוביל בגליל המערבי',
    contactEmail: "info@nadlanbakfar.co.il",
    contactPhone: "04-9123456",
    enableContactForm: true,
    enableBlog: true,
    enablePropertySearch: true,
  })

  // הגדרות SEO
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'נדל"ן בכפר - נכסים בגליל המערבי',
    metaDescription: 'פורטל נדל"ן מוביל המתמחה בנכסים בגליל המערבי. מצאו את הנכס המושלם עבורכם.',
    ogImage: "/images/og-image.jpg",
    googleAnalyticsId: "",
    enableSitemap: true,
  })

  // הגדרות תוכן
  const [contentSettings, setContentSettings] = useState({
    postsPerPage: 6,
    featuredPropertiesCount: 3,
    enableAutoContentGeneration: true,
    contentGenerationFrequency: "weekly",
    enableComments: false,
  })

  // טעינת הגדרות מהשרת או מ-localStorage
  useEffect(() => {
    try {
      // נסה לטעון הגדרות מ-localStorage
      const savedGeneralSettings = localStorage.getItem("generalSettings")
      const savedSeoSettings = localStorage.getItem("seoSettings")
      const savedContentSettings = localStorage.getItem("contentSettings")

      if (savedGeneralSettings) {
        setGeneralSettings(JSON.parse(savedGeneralSettings))
      }

      if (savedSeoSettings) {
        setSeoSettings(JSON.parse(savedSeoSettings))
      }

      if (savedContentSettings) {
        setContentSettings(JSON.parse(savedContentSettings))
      }
    } catch (err) {
      console.error("Error loading settings:", err)
    }
  }, [])

  // עדכון הגדרות כלליות
  const handleGeneralSettingChange = (name: string, value: any) => {
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // עדכון הגדרות SEO
  const handleSeoSettingChange = (name: string, value: any) => {
    setSeoSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // עדכון הגדרות תוכן
  const handleContentSettingChange = (name: string, value: any) => {
    setContentSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // שמירת הגדרות
  const saveSettings = async () => {
    setIsSaving(true)
    setError(null)
    setIsSaved(false)

    try {
      // שמירה ב-localStorage
      localStorage.setItem("generalSettings", JSON.stringify(generalSettings))
      localStorage.setItem("seoSettings", JSON.stringify(seoSettings))
      localStorage.setItem("contentSettings", JSON.stringify(contentSettings))

      // דימוי השהיה של שמירה
      await new Promise((resolve) => setTimeout(resolve, 800))

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    } catch (err) {
      setError("אירעה שגיאה בשמירת ההגדרות")
      console.error("Error saving settings:", err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">הגדרות מערכת</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          ניהול הגדרות כלליות של האתר
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="general">הגדרות כלליות</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="content">הגדרות תוכן</TabsTrigger>
        </TabsList>

        {/* הגדרות כלליות */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>הגדרות כלליות</CardTitle>
              <CardDescription>הגדרות בסיסיות של האתר</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">שם האתר</Label>
                <Input
                  id="site-name"
                  value={generalSettings.siteName}
                  onChange={(e) => handleGeneralSettingChange("siteName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">תיאור האתר</Label>
                <Textarea
                  id="site-description"
                  value={generalSettings.siteDescription}
                  onChange={(e) => handleGeneralSettingChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">אימייל ליצירת קשר</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => handleGeneralSettingChange("contactEmail", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">טלפון ליצירת קשר</Label>
                  <Input
                    id="contact-phone"
                    value={generalSettings.contactPhone}
                    onChange={(e) => handleGeneralSettingChange("contactPhone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-contact-form">טופס יצירת קשר</Label>
                    <p className="text-sm text-muted-foreground">הפעל את טופס יצירת הקשר באתר</p>
                  </div>
                  <Switch
                    id="enable-contact-form"
                    checked={generalSettings.enableContactForm}
                    onCheckedChange={(checked) => handleGeneralSettingChange("enableContactForm", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-blog">בלוג</Label>
                    <p className="text-sm text-muted-foreground">הפעל את מערכת הבלוג באתר</p>
                  </div>
                  <Switch
                    id="enable-blog"
                    checked={generalSettings.enableBlog}
                    onCheckedChange={(checked) => handleGeneralSettingChange("enableBlog", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-property-search">חיפוש נכסים</Label>
                    <p className="text-sm text-muted-foreground">הפעל את מערכת חיפוש הנכסים באתר</p>
                  </div>
                  <Switch
                    id="enable-property-search"
                    checked={generalSettings.enablePropertySearch}
                    onCheckedChange={(checked) => handleGeneralSettingChange("enablePropertySearch", checked)}
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>שגיאה</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isSaved && (
                <Alert variant="default" className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">נשמר בהצלחה</AlertTitle>
                  <AlertDescription>ההגדרות נשמרו בהצלחה</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} disabled={isSaving} className="w-full">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    שומר...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    שמור הגדרות
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* הגדרות SEO */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>הגדרות SEO</CardTitle>
              <CardDescription>הגדרות לשיפור קידום האתר במנועי חיפוש</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="meta-title">כותרת Meta</Label>
                <Input
                  id="meta-title"
                  value={seoSettings.metaTitle}
                  onChange={(e) => handleSeoSettingChange("metaTitle", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">כותרת שתופיע בתוצאות החיפוש. מומלץ עד 60 תווים.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">תיאור Meta</Label>
                <Textarea
                  id="meta-description"
                  value={seoSettings.metaDescription}
                  onChange={(e) => handleSeoSettingChange("metaDescription", e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">תיאור שיופיע בתוצאות החיפוש. מומלץ עד 160 תווים.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="og-image">תמונת OG</Label>
                <Input
                  id="og-image"
                  value={seoSettings.ogImage}
                  onChange={(e) => handleSeoSettingChange("ogImage", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  נתיב לתמונה שתופיע בשיתופים ברשתות חברתיות. גודל מומלץ: 1200x630 פיקסלים.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ga-id">מזהה Google Analytics</Label>
                <Input
                  id="ga-id"
                  value={seoSettings.googleAnalyticsId}
                  onChange={(e) => handleSeoSettingChange("googleAnalyticsId", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-sitemap">מפת אתר (Sitemap)</Label>
                  <p className="text-sm text-muted-foreground">הפעל יצירה אוטומטית של מפת אתר</p>
                </div>
                <Switch
                  id="enable-sitemap"
                  checked={seoSettings.enableSitemap}
                  onCheckedChange={(checked) => handleSeoSettingChange("enableSitemap", checked)}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>שגיאה</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isSaved && (
                <Alert variant="default" className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">נשמר בהצלחה</AlertTitle>
                  <AlertDescription>ההגדרות נשמרו בהצלחה</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} disabled={isSaving} className="w-full">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    שומר...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    שמור הגדרות
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* הגדרות תוכן */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>הגדרות תוכן</CardTitle>
              <CardDescription>הגדרות לניהול התוכן באתר</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="posts-per-page">פוסטים בעמוד</Label>
                <Input
                  id="posts-per-page"
                  type="number"
                  min="1"
                  max="24"
                  value={contentSettings.postsPerPage}
                  onChange={(e) => handleContentSettingChange("postsPerPage", Number.parseInt(e.target.value) || 6)}
                />
                <p className="text-xs text-muted-foreground">מספר הפוסטים שיוצגו בכל עמוד בבלוג</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured-properties-count">נכסים מובילים</Label>
                <Input
                  id="featured-properties-count"
                  type="number"
                  min="1"
                  max="10"
                  value={contentSettings.featuredPropertiesCount}
                  onChange={(e) =>
                    handleContentSettingChange("featuredPropertiesCount", Number.parseInt(e.target.value) || 3)
                  }
                />
                <p className="text-xs text-muted-foreground">מספר הנכסים המובילים שיוצגו בעמוד הבית</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-auto-content">יצירת תוכן אוטומטית</Label>
                  <p className="text-sm text-muted-foreground">הפעל יצירת תוכן אוטומטית באמצעות DeepSeek</p>
                </div>
                <Switch
                  id="enable-auto-content"
                  checked={contentSettings.enableAutoContentGeneration}
                  onCheckedChange={(checked) => handleContentSettingChange("enableAutoContentGeneration", checked)}
                />
              </div>

              {contentSettings.enableAutoContentGeneration && (
                <div className="space-y-2">
                  <Label htmlFor="content-generation-frequency">תדירות יצירת תוכן</Label>
                  <select
                    id="content-generation-frequency"
                    value={contentSettings.contentGenerationFrequency}
                    onChange={(e) => handleContentSettingChange("contentGenerationFrequency", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="daily">יומי</option>
                    <option value="weekly">שבועי</option>
                    <option value="monthly">חודשי</option>
                  </select>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-comments">תגובות</Label>
                  <p className="text-sm text-muted-foreground">הפעל אפשרות להוספת תגובות בבלוג</p>
                </div>
                <Switch
                  id="enable-comments"
                  checked={contentSettings.enableComments}
                  onCheckedChange={(checked) => handleContentSettingChange("enableComments", checked)}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>שגיאה</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isSaved && (
                <Alert variant="default" className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">נשמר בהצלחה</AlertTitle>
                  <AlertDescription>ההגדרות נשמרו בהצלחה</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} disabled={isSaving} className="w-full">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    שומר...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    שמור הגדרות
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

