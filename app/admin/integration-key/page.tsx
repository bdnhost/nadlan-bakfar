"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertTriangle, Eye, EyeOff, Copy, RefreshCw } from "lucide-react"
import { getIntegrationKey, getApiUrl, setIntegrationKey, setApiUrl, isValidIntegrationKeyFormat } from "@/lib/config"

export default function IntegrationKeyPage() {
  // שימוש בפונקציות החדשות לקבלת הערכים הנוכחיים
  const [integrationKey, setIntegrationKeyState] = useState<string>("")
  const [apiUrl, setApiUrlState] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [showKey, setShowKey] = useState<boolean>(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(false)

  // טעינת הערכים הנוכחיים בעת טעינת הדף
  useEffect(() => {
    setIntegrationKeyState(getIntegrationKey())
    setApiUrlState(getApiUrl())
  }, [])

  // פונקציה לשמירת הגדרות
  const saveSettings = async () => {
    setIsLoading(true)
    setError(null)
    setIsSaved(false)
    setNeedsRefresh(false)

    try {
      // בדיקת תקינות המפתח
      if (integrationKey && !isValidIntegrationKeyFormat(integrationKey)) {
        setError("פורמט מפתח האינטגרציה אינו תקין. נדרשים 48 תווים הקסדצימליים.")
        setIsLoading(false)
        return
      }

      // עדכון המפתח וכתובת ה-API בזמן ריצה
      setIntegrationKey(integrationKey)
      setApiUrl(apiUrl)

      // דימוי השהיה של שמירה
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // הוספת הודעה שהשינויים נשמרו
      setIsSaved(true)
      setNeedsRefresh(true)
    } catch (err) {
      setError("אירעה שגיאה בשמירת ההגדרות")
      console.error("Error saving settings:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // פונקציה לריענון הדף
  const refreshPage = () => {
    window.location.reload()
  }

  // עדכון פונקציית testConnection לשימוש בנקודת קצה שעובדת

  const testConnection = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      // בדיקה אם המפתח והכתובת לא ריקים
      if (!integrationKey || !apiUrl) {
        setTestResult({
          success: false,
          message: "מפתח האינטגרציה או כתובת ה-API חסרים",
        })
        setIsLoading(false)
        return
      }

      // שימוש בנקודת הקצה get-published-properties שכבר עובדת במערכת
      const response = await fetch(`${apiUrl}/get-published-properties`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-integration-key": integrationKey,
        },
      })

      // נסה לקבל את תוכן התגובה
      let responseText = ""
      let responseJson = null
      try {
        responseText = await response.text()
        try {
          responseJson = JSON.parse(responseText)
        } catch (e) {
          // אם לא ניתן לפרסר את התגובה כ-JSON, נשאיר את responseText כמו שהוא
        }
      } catch (e) {
        responseText = "לא ניתן לקרוא את תוכן התגובה"
      }

      if (response.ok) {
        setTestResult({
          success: true,
          message:
            "החיבור לשרת נבדק בהצלחה! הצלחנו לקבל נתוני נכסים מהשרת." +
            (responseJson ? `\n\nתגובת השרת: ${JSON.stringify(responseJson, null, 2)}` : ""),
        })
      } else {
        let errorMessage = `שגיאה בבדיקת החיבור: ${response.status}`

        if (response.status === 400) {
          errorMessage += "\nשגיאת Bad Request - פורמט הבקשה אינו תקין."
        } else if (response.status === 401) {
          errorMessage += "\nשגיאת Unauthorized - מפתח האינטגרציה אינו תקין או לא פעיל."
        } else if (response.status === 403) {
          errorMessage += "\nשגיאת Forbidden - אין לך הרשאות מתאימות."
        } else if (response.status === 404) {
          errorMessage += "\nשגיאת Not Found - כתובת ה-API אינה נכונה."
        } else if (response.status === 500) {
          errorMessage += "\nשגיאת שרת פנימית - נסה שוב מאוחר יותר."
        }

        if (responseJson) {
          errorMessage += `\n\nתגובת השרת: ${JSON.stringify(responseJson, null, 2)}`
        } else if (responseText) {
          errorMessage += `\n\nתגובת השרת: ${responseText.substring(0, 200)}${responseText.length > 200 ? "..." : ""}`
        }

        setTestResult({
          success: false,
          message: errorMessage,
        })
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: `אירעה שגיאה בבדיקת החיבור: ${err instanceof Error ? err.message : String(err)}`,
      })
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

  // בדיקת תקינות פורמט המפתח
  const isKeyValid = !integrationKey || isValidIntegrationKeyFormat(integrationKey)

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">עדכון מפתח אינטגרציה</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          הזן את מפתח האינטגרציה החדש לחיבור למערכת ניהול הנכסים
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>הגדרות אינטגרציה</CardTitle>
            <CardDescription>הגדרות החיבור למערכת ניהול הנכסים</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="integration-key">מפתח אינטגרציה</Label>
              <div className="flex">
                <Input
                  id="integration-key"
                  type={showKey ? "text" : "password"}
                  value={integrationKey}
                  onChange={(e) => setIntegrationKeyState(e.target.value)}
                  className={`rounded-r-none ${!isKeyValid ? "border-red-500" : ""}`}
                  placeholder="הזן את מפתח האינטגרציה החדש"
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
                  onClick={copyIntegrationKey}
                  disabled={!integrationKey || isCopied}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {!isKeyValid && (
                <p className="text-xs text-red-500 mt-1">פורמט המפתח אינו תקין. נדרשים 48 תווים הקסדצימליים.</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                מפתח האינטגרציה צריך להיות בפורמט דומה ל: 502e59e2ba0f2f06235543ed2fad438e7ee29f6f3f28c163
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-url">כתובת API</Label>
              <Input
                id="api-url"
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrlState(e.target.value)}
                placeholder="הזן את כתובת ה-API"
              />
              <p className="text-xs text-muted-foreground mt-1">
                ברירת המחדל: https://waatnnddbujgohmegmeu.supabase.co/functions/v1/external-integration
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
                <AlertDescription>
                  ההגדרות נשמרו בהצלחה.
                  {needsRefresh && (
                    <div className="mt-2">
                      <Button
                        onClick={refreshPage}
                        variant="outline"
                        size="sm"
                        className="bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        רענן את הדף כדי להחיל את השינויים
                      </Button>
                    </div>
                  )}
                </AlertDescription>
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
                <AlertDescription className="whitespace-pre-line">{testResult.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button onClick={saveSettings} disabled={isLoading || !isKeyValid} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  שומר...
                </>
              ) : (
                "שמור הגדרות"
              )}
            </Button>

            <Button
              onClick={testConnection}
              disabled={isLoading || !isKeyValid}
              variant="outline"
              className="w-full sm:w-auto"
            >
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

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>לאחר שמירת המפתח החדש, יש לרענן את הדף כדי שהשינויים ייכנסו לתוקף בכל חלקי האתר.</p>
          <p className="mt-2">אם אינך יודע מהו מפתח האינטגרציה, אנא פנה למנהל המערכת.</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-right">
            <p className="font-medium text-blue-800">טיפים לפתרון בעיות:</p>
            <ul className="list-disc list-inside text-blue-700 mt-2">
              <li>ודא שמפתח האינטגרציה הוזן במלואו וללא רווחים מיותרים</li>
              <li>מפתח האינטגרציה צריך להיות בפורמט דומה ל: 502e59e2ba0f2f06235543ed2fad438e7ee29f6f3f28c163</li>
              <li>בדוק שכתובת ה-API נכונה ומתחילה ב-https://</li>
              <li>אם אתה מקבל שגיאת 401, מפתח האינטגרציה אינו תקין או לא פעיל</li>
              <li>נסה לבקש מפתח אינטגרציה חדש ממנהל המערכת</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

