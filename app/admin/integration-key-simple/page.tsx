"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertTriangle, Eye, EyeOff, Copy } from "lucide-react"

export default function IntegrationKeySimplePage() {
  const [integrationKey, setIntegrationKey] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [showKey, setShowKey] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  // טעינת הערכים הנוכחיים בעת טעינת הדף
  useEffect(() => {
    // נסה לקבל מפתח מ-localStorage
    if (typeof window !== "undefined") {
      try {
        const storedKey = localStorage.getItem("INTEGRATION_KEY")
        if (storedKey) {
          setIntegrationKey(storedKey)
        }
      } catch (error) {
        console.warn("Error reading from localStorage:", error)
      }
    }
  }, [])

  // פונקציה לשמירת הגדרות
  const saveSettings = async () => {
    setIsLoading(true)
    setError(null)
    setIsSaved(false)

    try {
      // שמירה ב-localStorage
      localStorage.setItem("INTEGRATION_KEY", integrationKey)

      // עדכון משתנה גלובלי אם קיים
      if (typeof window !== "undefined" && (window as any).runtimeIntegrationKey !== undefined) {
        ;(window as any).runtimeIntegrationKey = integrationKey
      }

      // דימוי השהיה של שמירה
      await new Promise((resolve) => setTimeout(resolve, 500))

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    } catch (err) {
      setError("אירעה שגיאה בשמירת ההגדרות")
      console.error("Error saving settings:", err)
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
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">הגדרת מפתח אינטגרציה</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          הזן את מפתח האינטגרציה לחיבור למערכת ניהול הנכסים
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>מפתח אינטגרציה</CardTitle>
            <CardDescription>הזן את מפתח האינטגרציה שקיבלת ממנהל המערכת</CardDescription>
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
                  placeholder="הזן את מפתח האינטגרציה"
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
              <p className="text-xs text-muted-foreground mt-1">
                מפתח האינטגרציה הוא מחרוזת ארוכה של תווים שמשמשת לאימות מול ה-API
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
                  מפתח האינטגרציה נשמר בהצלחה. יש לרענן את הדף כדי שהשינויים ייכנסו לתוקף.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  שומר...
                </>
              ) : (
                "שמור מפתח אינטגרציה"
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">איך להשיג מפתח אינטגרציה?</h3>
          <p className="text-blue-700 text-sm">
            מפתח האינטגרציה הוא מחרוזת ייחודית שמאפשרת לאתר שלך להתחבר למערכת ניהול הנכסים. אם אין לך מפתח, אנא פנה
            למנהל המערכת או השתמש במפתח הבא לבדיקות:
          </p>
          <div className="mt-2 p-2 bg-white border border-blue-300 rounded text-sm font-mono">
            d22d8b05933905caee1f49348e556e7d43c0f38277b91258
          </div>
          <p className="text-blue-700 text-sm mt-2">שים לב: מפתח זה הוא לבדיקות בלבד ולא יעבוד בסביבת הייצור.</p>
        </div>
      </div>
    </div>
  )
}

