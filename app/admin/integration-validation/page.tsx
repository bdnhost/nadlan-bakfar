"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { INTEGRATION_KEY, isValidIntegrationKeyFormat } from "@/lib/config"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useIntegrationKey } from "@/components/providers/integration-key-provider"
// עדכון הפונקציה validateCurrentKey כדי שתשתמש בפונקציה validateIntegrationKey

import { validateIntegrationKey } from "@/lib/api-service"

export default function IntegrationValidationPage() {
  const [key, setKey] = useState(INTEGRATION_KEY)
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const { setIntegrationKey } = useIntegrationKey()

  // בדיקה ראשונית של המפתח הנוכחי בטעינת הדף
  useEffect(() => {
    validateCurrentKey()
  }, [])

  // עדכון פונקציית validateCurrentKey לשימוש בפונקציה validateIntegrationKey
  const validateCurrentKey = async () => {
    setIsValidating(true)
    setError(null)

    try {
      // בדיקה אם המפתח ריק
      if (!key) {
        setValidationResult({
          success: false,
          error: "מפתח האינטגרציה חסר",
        })
        setIsValidating(false)
        return
      }

      // שימוש בפונקציה validateIntegrationKey
      const result = await validateIntegrationKey(key)

      if (result.success) {
        // אם המפתח תקין, שמור אותו ב-localStorage
        localStorage.setItem("INTEGRATION_KEY", key)
        // עדכון המפתח בזמן ריצה
        setIntegrationKey(key)

        setValidationResult({
          success: true,
          message: "המפתח תקין ופעיל. המפתח נשמר בהצלחה ויהיה בשימוש בכל הבקשות הבאות.",
          permissions: result.permissions,
        })
      } else {
        setValidationResult({
          success: false,
          error: result.error || "תשובת השרת אינה תקינה",
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה לא ידועה בבדיקת המפתח")
      setValidationResult(null)
    } finally {
      setIsValidating(false)
    }
  }

  const isKeyFormatValid = isValidIntegrationKeyFormat(key)

  return (
    <div className="container mx-auto py-8 rtl">
      <h1 className="text-3xl font-bold mb-6">בדיקת תקינות מפתח אינטגרציה</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>מפתח אינטגרציה נוכחי</CardTitle>
          <CardDescription>בדוק את תקינות מפתח האינטגרציה מול השרת</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="integration-key">מפתח אינטגרציה</Label>
              <Input
                id="integration-key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className={`font-mono ${!isKeyFormatValid && key ? "border-red-500" : ""}`}
                dir="ltr"
              />
              {!isKeyFormatValid && key && (
                <p className="text-red-500 text-sm">פורמט המפתח אינו תקין. נדרשים 48 תווים הקסדצימליים.</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={validateCurrentKey} disabled={isValidating || !isKeyFormatValid}>
            {isValidating ? "בודק..." : "בדוק תקינות מפתח"}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Card className="mb-8 border-red-500">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-700 flex items-center gap-2">
              <AlertCircle size={20} />
              שגיאה בבדיקת המפתח
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {validationResult && (
        <Card className={`mb-8 ${validationResult.success ? "border-green-500" : "border-red-500"}`}>
          <CardHeader className={validationResult.success ? "bg-green-50" : "bg-red-50"}>
            <CardTitle
              className={`flex items-center gap-2 ${validationResult.success ? "text-green-700" : "text-red-700"}`}
            >
              {validationResult.success ? <CheckCircle size={20} /> : <XCircle size={20} />}
              {validationResult.success ? "המפתח תקין ופעיל" : "המפתח אינו תקין"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {validationResult.message && <p className="mb-4">{validationResult.message}</p>}

            {validationResult.permissions && (
              <div className="space-y-2">
                <h3 className="font-semibold">הרשאות זמינות:</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={validationResult.permissions.can_create_leads ? "success" : "destructive"}>
                    {validationResult.permissions.can_create_leads ? "יצירת לידים ✓" : "יצירת לידים ✗"}
                  </Badge>
                  <Badge variant={validationResult.permissions.can_manage_properties ? "success" : "destructive"}>
                    {validationResult.permissions.can_manage_properties ? "ניהול נכסים ✓" : "ניהול נכסים ✗"}
                  </Badge>
                  <Badge
                    variant={validationResult.permissions.can_fetch_published_properties ? "success" : "destructive"}
                  >
                    {validationResult.permissions.can_fetch_published_properties ? "קבלת נכסים ✓" : "קבלת נכסים ✗"}
                  </Badge>
                </div>
              </div>
            )}

            {validationResult.error && (
              <div className="mt-4 text-red-600">
                <h3 className="font-semibold">פרטי השגיאה:</h3>
                <p>{validationResult.error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

