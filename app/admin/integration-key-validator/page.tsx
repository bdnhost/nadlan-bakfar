"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertTriangle, Copy, Eye, EyeOff } from "lucide-react"
import { validateIntegrationKey } from "@/lib/api-service"
import { isValidIntegrationKeyFormat } from "@/lib/config"

export default function IntegrationKeyValidatorPage() {
  const [key, setKey] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // פונקציה לבדיקת תקינות המפתח
  const validateKey = async () => {
    setIsValidating(true)
    setError(null)
    setValidationResult(null)

    try {
      // בדיקת פורמט המפתח
      if (!isValidIntegrationKeyFormat(key)) {
        setValidationResult({
          success: false,
          error: "פורמט מפתח האינטגרציה אינו תקין. נדרשים 48 תווים הקסדצימליים.",
        })
        setIsValidating(false)
        return
      }

      // שימוש בפונקציה validateIntegrationKey
      const result = await validateIntegrationKey(key)
      setValidationResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה לא ידועה בבדיקת המפתח")
    } finally {
      setIsValidating(false)
    }
  }

  // פונקציה להעתקת המפתח
  const copyKey = () => {
    navigator.clipboard.writeText(key)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // פונקציה לשמירת המפתח
  const saveKey = () => {
    if (validationResult?.success) {
      localStorage.setItem("INTEGRATION_KEY", key)
      alert("המפתח נשמר בהצלחה!")
      // רענון הדף כדי שהשינויים ייכנסו לתוקף
      window.location.reload()
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">בדיקת תקינות מפתח אינטגרציה</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          בדוק את תקינות מפתח האינטגרציה מול השרת
        </p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>בדיקת מפתח אינטגרציה</CardTitle>
          <CardDescription>הזן את מפתח האינטגרציה שברצונך לבדוק</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="integration-key">מפתח אינטגרציה</Label>
            <div className="flex">
              <Input
                id="integration-key"
                type={showKey ? "text" : "password"}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="rounded-r-none font-mono"
                dir="ltr"
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
                onClick={copyKey}
                disabled={!key || isCopied}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              מפתח האינטגרציה צריך להיות בפורמט של 48 תווים הקסדצימליים
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>שגיאה</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {validationResult && (
            <Alert
              variant={validationResult.success ? "default" : "destructive"}
              className={validationResult.success ? "bg-green-50 border-green-200" : ""}
            >
              {validationResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertTitle className={validationResult.success ? "text-green-600" : ""}>
                {validationResult.success ? "המפתח תקין" : "המפתח אינו תקין"}
              </AlertTitle>
              <AlertDescription>
                {validationResult.success ? validationResult.message : validationResult.error}

                {validationResult.permissions && (
                  <div className="mt-2">
                    <p className="font-semibold">הרשאות זמינות:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>יצירת לידים: {validationResult.permissions.can_create_leads ? "✓" : "✗"}</li>
                      <li>ניהול נכסים: {validationResult.permissions.can_manage_properties ? "✓" : "✗"}</li>
                      <li>קבלת נכסים: {validationResult.permissions.can_fetch_published_properties ? "✓" : "✗"}</li>
                    </ul>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button onClick={validateKey} disabled={isValidating || !key} className="w-full sm:w-auto">
            {isValidating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                בודק...
              </>
            ) : (
              "בדוק תקינות"
            )}
          </Button>

          {validationResult?.success && (
            <Button onClick={saveKey} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
              שמור מפתח זה
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="mt-8 max-w-md mx-auto text-center text-sm text-muted-foreground">
        <p>
          לאחר בדיקת תקינות המפתח, תוכל לשמור אותו לשימוש באתר. המפתח יישמר בדפדפן שלך ויהיה בשימוש בכל הבקשות לשרת.
        </p>
      </div>
    </div>
  )
}

