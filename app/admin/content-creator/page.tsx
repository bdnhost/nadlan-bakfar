"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertTriangle, FileText, Sparkles } from "lucide-react"
import { ContentType, ContentCategory, type ContentGenerationParams } from "@/lib/content-generator/types"
import { createContent } from "@/lib/content-generator/content-service"
import { getAllTemplates } from "@/lib/content-generator/template-service"
import Link from "next/link"

export default function ContentCreator() {
  const [activeTab, setActiveTab] = useState<string>("basic")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationResult, setGenerationResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // פרמטרים ליצירת תוכן
  const [contentParams, setContentParams] = useState<ContentGenerationParams>({
    type: ContentType.BLOG_POST,
    topic: "",
    keywords: [],
    category: ContentCategory.MARKET_TRENDS,
    length: "medium",
    tone: "professional",
    targetAudience: 'רוכשי ומשקיעי נדל"ן בצפון',
  })

  // קבלת כל התבניות
  const templates = getAllTemplates()

  // עדכון פרמטרים
  const handleParamChange = (name: string, value: any) => {
    setContentParams((prev) => ({ ...prev, [name]: value }))
  }

  // עדכון מילות מפתח
  const handleKeywordsChange = (value: string) => {
    const keywords = value
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword !== "")
    setContentParams((prev) => ({ ...prev, keywords }))
  }

  // יצירת תוכן
  const handleGenerateContent = async () => {
    setIsGenerating(true)
    setError(null)
    setGenerationResult(null)

    try {
      // בדיקת תקינות הפרמטרים
      if (!contentParams.topic) {
        setError("נושא הוא שדה חובה")
        setIsGenerating(false)
        return
      }

      // יצירת התוכן
      const result = await createContent(contentParams)

      if (result.success && result.content) {
        setGenerationResult(result.content)
      } else {
        setError(result.error || "אירעה שגיאה ביצירת התוכן")
      }
    } catch (err) {
      console.error("Error generating content:", err)
      setError(err instanceof Error ? err.message : "אירעה שגיאה לא ידועה")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">יצירת תוכן חדש</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          יצירת תוכן חדש באמצעות מנוע ה-AI של DeepSeek
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>הגדרות יצירת תוכן</CardTitle>
              <CardDescription>הגדר את הפרמטרים ליצירת התוכן</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">בסיסי</TabsTrigger>
                  <TabsTrigger value="advanced">מתקדם</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="content-type">סוג תוכן</Label>
                    <Select value={contentParams.type} onValueChange={(value) => handleParamChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר סוג תוכן" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ContentType.BLOG_POST}>פוסט בלוג</SelectItem>
                        <SelectItem value={ContentType.AREA_GUIDE}>מדריך אזור</SelectItem>
                        <SelectItem value={ContentType.TIPS_ARTICLE}>מאמר טיפים</SelectItem>
                        <SelectItem value={ContentType.MARKET_ANALYSIS}>ניתוח שוק</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">נושא</Label>
                    <Input
                      id="topic"
                      value={contentParams.topic}
                      onChange={(e) => handleParamChange("topic", e.target.value)}
                      placeholder='לדוגמה: "השקעות נדל"ן בגליל המערבי"'
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">מילות מפתח (מופרדות בפסיקים)</Label>
                    <Input
                      id="keywords"
                      value={contentParams.keywords?.join(", ") || ""}
                      onChange={(e) => handleKeywordsChange(e.target.value)}
                      placeholder='לדוגמה: "נדל"ן, גליל מערבי, השקעות"'
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">קטגוריה</Label>
                    <Select
                      value={contentParams.category}
                      onValueChange={(value) => handleParamChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="בחר קטגוריה" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ContentCategory.BUYING}>רכישה</SelectItem>
                        <SelectItem value={ContentCategory.SELLING}>מכירה</SelectItem>
                        <SelectItem value={ContentCategory.RENTING}>השכרה</SelectItem>
                        <SelectItem value={ContentCategory.INVESTING}>השקעות</SelectItem>
                        <SelectItem value={ContentCategory.PROPERTY_MANAGEMENT}>ניהול נכסים</SelectItem>
                        <SelectItem value={ContentCategory.MARKET_TRENDS}>מגמות שוק</SelectItem>
                        <SelectItem value={ContentCategory.LIFESTYLE}>סגנון חיים</SelectItem>
                        <SelectItem value={ContentCategory.LEGAL}>משפטי</SelectItem>
                        <SelectItem value={ContentCategory.FINANCING}>מימון</SelectItem>
                        <SelectItem value={ContentCategory.MAINTENANCE}>תחזוקה</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">אורך התוכן</Label>
                    <Select value={contentParams.length} onValueChange={(value) => handleParamChange("length", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר אורך" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">קצר (300-500 מילים)</SelectItem>
                        <SelectItem value="medium">בינוני (500-800 מילים)</SelectItem>
                        <SelectItem value="long">ארוך (800-1200 מילים)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">טון התוכן</Label>
                    <Select value={contentParams.tone} onValueChange={(value) => handleParamChange("tone", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר טון" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">מקצועי</SelectItem>
                        <SelectItem value="friendly">חברותי</SelectItem>
                        <SelectItem value="formal">פורמלי</SelectItem>
                        <SelectItem value="enthusiastic">נלהב</SelectItem>
                        <SelectItem value="casual">קליל</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target-audience">קהל יעד</Label>
                    <Input
                      id="target-audience"
                      value={contentParams.targetAudience || ""}
                      onChange={(e) => handleParamChange("targetAudience", e.target.value)}
                      placeholder='לדוגמה: "רוכשי דירה ראשונה"'
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-instructions">הוראות נוספות</Label>
                    <Textarea
                      id="additional-instructions"
                      value={contentParams.additionalInstructions || ""}
                      onChange={(e) => handleParamChange("additionalInstructions", e.target.value)}
                      placeholder="הוראות נוספות ליצירת התוכן"
                      rows={3}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateContent} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    מייצר תוכן...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    צור תוכן
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>תבניות מוכנות</CardTitle>
                <CardDescription>השתמש בתבניות מוכנות ליצירת תוכן</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[300px] overflow-y-auto">
                <div className="space-y-2">
                  {templates.map((template) => (
                    <Button
                      key={template.id}
                      variant="outline"
                      className="w-full justify-start text-right"
                      onClick={() => {
                        setContentParams((prev) => ({
                          ...prev,
                          type: template.type,
                          category: template.category,
                          referenceData: { templateId: template.id },
                        }))
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {template.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:col-span-2">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>שגיאה</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isGenerating && (
            <Card className="mb-4">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium">מייצר תוכן...</p>
                <p className="text-muted-foreground mt-2">התהליך עשוי להימשך מספר שניות</p>
              </CardContent>
            </Card>
          )}

          {generationResult && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{generationResult.title}</CardTitle>
                    <CardDescription>
                      {contentParams.type === ContentType.BLOG_POST && "פוסט בלוג"}
                      {contentParams.type === ContentType.AREA_GUIDE && "מדריך אזור"}
                      {contentParams.type === ContentType.TIPS_ARTICLE && "מאמר טיפים"}
                      {contentParams.type === ContentType.MARKET_ANALYSIS && "ניתוח שוק"}
                    </CardDescription>
                  </div>
                  <Alert variant="default" className="w-auto p-2 bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-600 text-xs">התוכן נוצר בהצלחה</AlertTitle>
                  </Alert>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {generationResult.summary && (
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium">תקציר:</p>
                    <p className="text-muted-foreground">{generationResult.summary}</p>
                  </div>
                )}

                <div className="border rounded-md p-4 max-h-[500px] overflow-y-auto">
                  <div className="prose prose-sm max-w-none">
                    {generationResult.content.split("\n\n").map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {contentParams.keywords?.map(
                    (keyword, index) =>
                      (
                        <div key={index} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounde  => (
                    <div key={index} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md">
                      {keyword}
                    </div>
                      ),
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  שמור כטיוטה
                </Button>
                <Button asChild>
                  <Link href={`/admin/content-manager?edit=${generationResult.id}`}>ערוך תוכן</Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          {!isGenerating &&
            !generationResult &&
            (
              <Card>
              <CardContent className=\"p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                <Sparkles className="h-12 w-12 text-muted-foregroundd mb-4" />
                <h3 className="text-xl font-medium mb-2">יצירת תוכן חדש</h3>
                <p className="text-muted-foreground max-w-md">
                  הגדר את הפרמטרים ליצירת התוכן בצד שמאל ולחץ על "צור תוכן" כדי ליצור תוכן חדש באמצעות מנוע ה-AI של DeepSeek.
                </p>
              </CardContent>
            </Card>
            )}
        </div>
      </div>
    </div>
  )
}

