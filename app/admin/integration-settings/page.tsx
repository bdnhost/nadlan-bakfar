"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, RefreshCw, CheckCircle, AlertTriangle, Copy, Eye, EyeOff } from "lucide-react"
import { INTEGRATION_KEY, API_URL } from "@/lib/config"

export default function IntegrationSettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("settings")
  const [integrationKey, setIntegrationKey] = useState<string>(INTEGRATION_KEY || "")
  const [apiUrl, setApiUrl] = useState<string>(API_URL || "")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [showKey, setShowKey] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  // פונקציה לשמירת הגדרות
  const saveSettings = async () => {
    setIsLoading(true)
    setError(null)
    setIsSaved(false)

    try {
      // במערכת אמיתית, כאן היינו שולחים בקשה לשרת לעדכון ההגדרות
      // לצורך הדוגמה, נדמה שמירה מוצלחת

      // שמירה ב-localStorage (לצורך הדוגמה בלבד - בפועל יש לשמור בסביבת השרת)
      localStorage.setItem("INTEGRATION_KEY", integrationKey)
      localStorage.setItem("API_URL", apiUrl)

      // דימוי השהיה של שמירה
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    } catch (err) {
      setError("אירעה שגיאה בשמירת ההגדרות")
      console.error("Error saving settings:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // פונקציה לחידוש מפתח האינטגרציה
  const refreshIntegrationKey = async () => {
    if (!confirm("האם אתה בטוח שברצונך לחדש את מפתח האינטגרציה? פעולה זו תבטל את המפתח הנוכחי.")) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // במערכת אמיתית, כאן היינו שולחים בקשה לשרת לחידוש המפתח
      // לצורך הדוגמה, נייצר מפתח אקראי

      const newKey = `int_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      setIntegrationKey(newKey)

      // דימוי השהיה של שמירה
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // שמירה ב-localStorage (לצורך הדוגמה בלבד)
      localStorage.setItem("INTEGRATION_KEY", newKey)

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    } catch (err) {
      setError("אירעה שגיאה בחידוש מפתח האינטגרציה")
      console.error("Error refreshing integration key:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // פונקציה לבדיקת החיבור
  const testConnection = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      // במערכת אמיתית, כאן היינו שולחים בקשה לשרת לבדיקת החיבור
      // לצורך הדוגמה, נדמה בדיקה מוצלחת

      // דימוי השהיה של בדיקה
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // בדיקה אם המפתח והכתובת לא ריקים
      if (!integrationKey || !apiUrl) {
        setTestResult({
          success: false,
          message: "מפתח האינטגרציה או כתובת ה-API חסרים",
        })
        return
      }

      // דימוי בדיקה מוצלחת
      setTestResult({
        success: true,
        message: "החיבור לשרת נחיל AI נבדק בהצלחה",
      })
    } catch (err) {
      setTestResult({
        success: false,
        message: "אירעה שגיאה בבדיקת החיבור",
      })
      console.error("Error testing connection:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // פונקציה להעתקת מפתח האינטגרציה
  const copyIntegrationKey = () => {
    navigator.clipboard.writeText(integrationKey)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">הגדרות אינטגרציה</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          ניהול הגדרות האינטגרציה עם נחיל AI
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="settings">הגדרות</TabsTrigger>
          <TabsTrigger value="logs">יומן אירועים</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>הגדרות אינטגרציה</CardTitle>
                <CardDescription>הגדרות החיבור לשרת נחיל AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="integration-key">מפתח אינטגרציה</Label>
                  <div className="flex">
                    <Input
                      id="integration-key"
                      type={showKey ? "text" : "password"}
                      value={integrationKey}
                      onChange={(e) => setIntegrationKey(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-url">כתובת API</Label>
                  <Input id="api-url" type="text" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
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
              <CardFooter className="flex justify-between">
                <Button onClick={saveSettings} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      שומר...
                    </>
                  ) : (
                    "שמור הגדרות"
                  )}
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={copyIntegrationKey} disabled={!integrationKey || isCopied}>
                    <Copy className="h-4 w-4 mr-2" />
                    {isCopied ? "הועתק!" : "העתק מפתח"}
                  </Button>

                  <Button variant="outline" onClick={refreshIntegrationKey} disabled={isLoading}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    חדש מפתח
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>בדיקת חיבור</CardTitle>
                <CardDescription>בדיקת החיבור לשרת נחיל AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  לחץ על הכפתור למטה כדי לבדוק את החיבור לשרת נחיל AI. הבדיקה תוודא שמפתח האינטגרציה וכתובת ה-API
                  תקינים.
                </p>

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
              <CardFooter>
                <Button onClick={testConnection} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      בודק...
                    </>
                  ) : (
                    "בדוק חיבור"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>יומן אירועי אינטגרציה</CardTitle>
              <CardDescription>רשימת האירועים האחרונים בחיבור לנחיל AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 h-[400px] overflow-y-auto">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">2024-05-01 14:32:15</span>
                    <span className="text-green-600 font-medium">הצלחה</span>
                  </div>
                  <p className="text-sm text-muted-foreground">שליחת ליד חדש: יוסי ישראלי</p>
                  <hr className="my-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">2024-05-01 12:15:42</span>
                    <span className="text-green-600 font-medium">הצלחה</span>
                  </div>
                  <p className="text-sm text-muted-foreground">קבלת רשימת נכסים מהשרת</p>
                  <hr className="my-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">2024-04-30 16:45:22</span>
                    <span className="text-red-600 font-medium">שגיאה</span>
                  </div>
                  <p className="text-sm text-muted-foreground">שגיאת חיבור לשרת: Timeout</p>
                  <hr className="my-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">2024-04-30 10:12:05</span>
                    <span className="text-green-600 font-medium">הצלחה</span>
                  </div>
                  <p className="text-sm text-muted-foreground">שליחת ליד חדש: שרה כהן</p>
                  <hr className="my-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">2024-04-29 15:30:18</span>
                    <span className="text-green-600 font-medium">הצלחה</span>
                  </div>
                  <p className="text-sm text-muted-foreground">עדכון פרטי נכס: דירה ברחוב הרצל 15</p>
                  <hr className="my-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                טען עוד אירועים
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

