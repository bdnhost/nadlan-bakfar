"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Loader2, CheckCircle, AlertTriangle, Key, Eye, EyeOff, Copy, Save } from "lucide-react"

export default function DeepSeekSettings() {
  const [activeTab, setActiveTab] = useState<string>("api")
  const [isSaving, setIsSaving] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [showKey, setShowKey] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // הגדרות DeepSeek
  const [settings, setSettings] = useState({
    apiKey: process.env.DEEPSEEK_API_KEY || "",
    model: "deepseek-chat",
    temperature: 0.7,
    maxTokens: 4000,
    systemPrompt: `אתה מומחה לכתיבת תוכן שיווקי בתחום הנדל"ן בישראל, עם התמחות ספציפית בגליל המערבי. 
אתה כותב תוכן איכותי, מעניין ומקצועי בעברית מושלמת.
התוכן שלך מותאם לקהל היעד הישראלי וכולל מידע רלוונטי ומדויק על שוק הנדל"ן בגליל המערבי.`,
    autoGeneration: {
      enabled: false,
      frequency: "weekly",
      day: "1",
      time: "09:00",
      contentTypes: ["blog_post", "tips_article"],
    },
  })

  // טעינת הגדרות מהשרת
  useEffect(() => {
    // במערכת אמיתית, כאן היינו טוענים את ההגדרות מהשרת
    // לצורך הדוגמה, נשתמש בהגדרות ברירת המחדל
  }, [])

  // עדכון הגדרות
  const handleSettingChange = (name: string, value: any) => {
    setSettings((prev) => {
      // טיפול בשדות מקוננים
      if (name.includes(".")) {
        const [parent, child] = name.split(".")
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev],
            [child]: value,
          },
        }
      }

      // טיפול בשדות רגילים
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  // שמירת הגדרות
  const saveSettings = async () => {
    setIsSaving(true)
    setError(null)
    setIsSaved(false)

    try {
      // במערכת אמיתית, כאן היינו שולחים את ההגדרות לשרת
      // לצורך הדוגמה, נדמה שמירה מוצלחת
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    } catch (err) {
      setError("אירעה שגיאה בשמירת ההגדרות")
      console.error("Error saving settings:", err)
    } finally {
      setIsSaving(false)
    }
  }

  // בדיקת חיבור ל-API
  const testConnection = async () => {
    setIsTesting(true)
    setTestResult(null)
    setError(null)

    try {
      // בדיקה אם המפתח ריק
      if (!settings.apiKey) {
        setTestResult({
          success: false,
          message: "מפתח ה-API חסר",
        })
        setIsTesting(false)
        return
      }

      // במערכת אמיתית, כאן היינו שולחים בקשת בדיקה ל-API
      // לצורך הדוגמה, נדמה בדיקה מוצלחת
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setTestResult({
        success: true,
        message: "החיבור ל-API של DeepSeek נבדק בהצלחה",
      })
    } catch (err) {
      setTestResult({
        success: false,
        message: `אירעה שגיאה בבדיקת החיבור: ${err instanceof Error ? err.message : String(err)}`,
      })
    } finally {
      setIsTesting(false)
    }
  }

  // העתקת מפתח ה-API
  const copyApiKey = () => {
    navigator.clipboard.writeText(settings.apiKey)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">הגדרות DeepSeek</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          הגדרת מפתח ה-API של DeepSeek ופרמטרים ליצירת תוכן
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="api">הגדרות API</TabsTrigger>
          <TabsTrigger value="model">הגדרות מודל</TabsTrigger>
          <TabsTrigger value="auto">יצירה אוטומטית</TabsTrigger>
        </TabsList>

        {/* הגדרות API */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>הגדרות API של DeepSeek</CardTitle>
              <CardDescription>הגדרת מפתח ה-API ופרטי החיבור ל-DeepSeek</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">מפתח API</Label>
                <div className="flex">
                  <Input
                    id="api-key"
                    type={showKey ? "text" : "password"}
                    value={settings.apiKey}
                    onChange={(e) => handleSettingChange("apiKey", e.target.value)}
                    className="rounded-r-none font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-l-none rounded-r-none border-l-0 border-r-0"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-l-none"
                    onClick={copyApiKey}
                    disabled={!settings.apiKey || isCopied}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  מפתח ה-API של DeepSeek. ניתן לקבל מפתח API באתר של DeepSeek.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">מודל</Label>
                <Select value={settings.model} onValueChange={(value) => handleSettingChange("model", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר מודל" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deepseek-chat">DeepSeek Chat</SelectItem>
                    <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                    <SelectItem value="deepseek-llm">DeepSeek LLM</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">המודל של DeepSeek שישמש ליצירת תוכן.</p>
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

              {testResult && (
                <Alert
                  variant={testResult.success ? "default" : "destructive"}
                  className={testResult.success ? "bg-green-50 border-green-200" : ""}
                >
                  {testResult.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <AlertTitle className={testResult.success ? "text-green-600" : ""}>
                    {testResult.success ? "בדיקה הצליחה" : "בדיקה נכשלה"}
                  </AlertTitle>
                  <AlertDescription>{testResult.message}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={testConnection} disabled={isTesting || isSaving} variant="outline">
                {isTesting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    בודק...
                  </>
                ) : (
                  <>
                    <Key className="mr-2 h-4 w-4" />
                    בדוק חיבור
                  </>
                )}
              </Button>
              <Button onClick={saveSettings} disabled={isSaving || isTesting}>
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

        {/* הגדרות מודל */}
        <TabsContent value="model">
          <Card>
            <CardHeader>
              <CardTitle>הגדרות מודל</CardTitle>
              <CardDescription>הגדרת פרמטרים למודל ה-AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="temperature">טמפרטורה: {settings.temperature}</Label>
                  <span className="text-sm text-muted-foreground">{settings.temperature}</span>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[settings.temperature]}
                  onValueChange={(value) => handleSettingChange("temperature", value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  טמפרטורה גבוהה יותר תיצור תוכן יותר יצירתי, אך פחות עקבי. טמפרטורה נמוכה יותר תיצור תוכן יותר עקבי, אך
                  פחות יצירתי.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="max-tokens">מקסימום טוקנים: {settings.maxTokens}</Label>
                  <span className="text-sm text-muted-foreground">{settings.maxTokens}</span>
                </div>
                <Slider
                  id="max-tokens"
                  min={1000}
                  max={8000}
                  step={100}
                  value={[settings.maxTokens]}
                  onValueChange={(value) => handleSettingChange("maxTokens", value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  מספר הטוקנים המקסימלי שהמודל יכול לייצר. טוקן הוא בערך 4 תווים בעברית.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-prompt">פרומפט מערכת</Label>
                <Textarea
                  id="system-prompt"
                  value={settings.systemPrompt}
                  onChange={(e) => handleSettingChange("systemPrompt", e.target.value)}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  פרומפט המערכת מגדיר את ההתנהגות הכללית של המודל. הוא משמש כהקשר כללי לכל השיחות עם המודל.
                </p>
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

        {/* יצירה אוטומטית */}
        <TabsContent value="auto">
          <Card>
            <CardHeader>
              <CardTitle>יצירת תוכן אוטומטית</CardTitle>
              <CardDescription>הגדרת תזמון ליצירת תוכן אוטומטית</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-generation">יצירת תוכן אוטומטית</Label>
                  <p className="text-sm text-muted-foreground">הפעל יצירת תוכן אוטומטית לפי תזמון קבוע</p>
                </div>
                <Switch
                  id="auto-generation"
                  checked={settings.autoGeneration.enabled}
                  onCheckedChange={(checked) => handleSettingChange("autoGeneration.enabled", checked)}
                />
              </div>

              {settings.autoGeneration.enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">תדירות</Label>
                    <Select
                      value={settings.autoGeneration.frequency}
                      onValueChange={(value) => handleSettingChange("autoGeneration.frequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="בחר תדירות" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">יומי</SelectItem>
                        <SelectItem value="weekly">שבועי</SelectItem>
                        <SelectItem value="monthly">חודשי</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {settings.autoGeneration.frequency === "weekly" && (
                    <div className="space-y-2">
                      <Label htmlFor="day">יום בשבוע</Label>
                      <Select
                        value={settings.autoGeneration.day}
                        onValueChange={(value) => handleSettingChange("autoGeneration.day", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="בחר יום" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">ראשון</SelectItem>
                          <SelectItem value="1">שני</SelectItem>
                          <SelectItem value="2">שלישי</SelectItem>
                          <SelectItem value="3">רביעי</SelectItem>
                          <SelectItem value="4">חמישי</SelectItem>
                          <SelectItem value="5">שישי</SelectItem>
                          <SelectItem value="6">שבת</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {settings.autoGeneration.frequency === "monthly" && (
                    <div className="space-y-2">
                      <Label htmlFor="day">יום בחודש</Label>
                      <Select
                        value={settings.autoGeneration.day}
                        onValueChange={(value) => handleSettingChange("autoGeneration.day", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="בחר יום" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 28 }, (_, i) => (
                            <SelectItem key={i} value={String(i + 1)}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="time">שעה</Label>
                    <Input
                      id="time"
                      type="time"
                      value={settings.autoGeneration.time}
                      onChange={(e) => handleSettingChange("autoGeneration.time", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>סוגי תוכן</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id="blog_post"
                          checked={settings.autoGeneration.contentTypes.includes("blog_post")}
                          onCheckedChange={(checked) => {
                            const contentTypes = checked
                              ? [...settings.autoGeneration.contentTypes, "blog_post"]
                              : settings.autoGeneration.contentTypes.filter((type) => type !== "blog_post")
                            handleSettingChange("autoGeneration.contentTypes", contentTypes)
                          }}
                        />
                        <Label htmlFor="blog_post" className="font-normal">
                          פוסט בלוג
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id="area_guide"
                          checked={settings.autoGeneration.contentTypes.includes("area_guide")}
                          onCheckedChange={(checked) => {
                            const contentTypes = checked
                              ? [...settings.autoGeneration.contentTypes, "area_guide"]
                              : settings.autoGeneration.contentTypes.filter((type) => type !== "area_guide")
                            handleSettingChange("autoGeneration.contentTypes", contentTypes)
                          }}
                        />
                        <Label htmlFor="area_guide" className="font-normal">
                          מדריך אזור
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id="tips_article"
                          checked={settings.autoGeneration.contentTypes.includes("tips_article")}
                          onCheckedChange={(checked) => {
                            const contentTypes = checked
                              ? [...settings.autoGeneration.contentTypes, "tips_article"]
                              : settings.autoGeneration.contentTypes.filter((type) => type !== "tips_article")
                            handleSettingChange("autoGeneration.contentTypes", contentTypes)
                          }}
                        />
                        <Label htmlFor="tips_article" className="font-normal">
                          מאמר טיפים
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id="market_analysis"
                          checked={settings.autoGeneration.contentTypes.includes("market_analysis")}
                          onCheckedChange={(checked) => {
                            const contentTypes = checked
                              ? [...settings.autoGeneration.contentTypes, "market_analysis"]
                              : settings.autoGeneration.contentTypes.filter((type) => type !== "market_analysis")
                            handleSettingChange("autoGeneration.contentTypes", contentTypes)
                          }}
                        />
                        <Label htmlFor="market_analysis" className="font-normal">
                          ניתוח שוק
                        </Label>
                      </div>
                    </div>
                  </div>
                </>
              )}

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

