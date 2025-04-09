"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { INTEGRATION_KEY, API_URL } from "@/lib/config"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IntegrationTestPage() {
  const [integrationKey, setIntegrationKey] = useState<string>(INTEGRATION_KEY || "")
  const [apiUrl, setApiUrl] = useState<string>(API_URL || "")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; details?: string } | null>(null)
  const [activeTab, setActiveTab] = useState<string>("properties")

  // נתוני בדיקה לנכס
  const [propertyData, setPropertyData] = useState<string>(`{
  "address": "רחוב הזית 5, תל אביב",
  "type": "apartment",
  "price": 1500000,
  "rooms": 4,
  "size": 120,
  "floor": 3,
  "totalFloors": 5,
  "parking": true,
  "elevator": true,
  "description": "דירה מרווחת במיקום מרכזי",
  "features": ["מרפסת", "מיזוג אוויר", "מטבח משודרג"],
  "published": true
}`)

  // נתוני בדיקה לליד
  const [leadData, setLeadData] = useState<string>(`{
  "name": "ישראל ישראלי",
  "email": "israel@example.com",
  "phone": "050-1234567",
  "source": "טופס צור קשר באתר",
  "notes": "מעוניין לרכוש דירת 4 חדרים באזור המרכז"
}`)

  // פונקציה לבדיקת החיבור - קבלת נכסים
  const testGetProperties = async () => {
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

      // שימוש בנקודת הקצה get-published-properties
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
          message: "החיבור לשרת נבדק בהצלחה! הצלחנו לקבל נתוני נכסים מהשרת.",
          details: responseJson ? JSON.stringify(responseJson, null, 2) : responseText,
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

  // פונקציה לבדיקת שליחת נכס
  const testSendProperty = async () => {
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

      // פרסור נתוני הנכס
      let propertyDataObj
      try {
        propertyDataObj = JSON.parse(propertyData)
      } catch (e) {
        setTestResult({
          success: false,
          message: "שגיאה בפרסור נתוני הנכס. ודא שהפורמט תקין.",
        })
        setIsLoading(false)
        return
      }

      // הכנת הבקשה בפורמט הנכון
      const requestBody = {
        type: "property",
        data: propertyDataObj,
      }

      // שליחת הבקשה
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-integration-key": integrationKey,
        },
        body: JSON.stringify(requestBody),
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
          message: "הנכס נשלח בהצלחה!",
          details: responseJson ? JSON.stringify(responseJson, null, 2) : responseText,
        })
      } else {
        let errorMessage = `שגיאה בשליחת הנכס: ${response.status}`

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
        message: `אירעה שגיאה בשליחת הנכס: ${err instanceof Error ? err.message : String(err)}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // פונקציה לבדיקת שליחת ליד
  const testSendLead = async () => {
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

      // פרסור נתוני הליד
      let leadDataObj
      try {
        leadDataObj = JSON.parse(leadData)
      } catch (e) {
        setTestResult({
          success: false,
          message: "שגיאה בפרסור נתוני הליד. ודא שהפורמט תקין.",
        })
        setIsLoading(false)
        return
      }

      // הכנת הבקשה בפורמט הנכון
      const requestBody = {
        type: "lead",
        data: leadDataObj,
      }

      // שליחת הבקשה
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-integration-key": integrationKey,
        },
        body: JSON.stringify(requestBody),
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
          message: "הליד נשלח בהצלחה!",
          details: responseJson ? JSON.stringify(responseJson, null, 2) : responseText,
        })
      } else {
        let errorMessage = `שגיאה בשליחת הליד: ${response.status}`

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
        message: `אירעה שגיאה בשליחת הליד: ${err instanceof Error ? err.message : String(err)}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">בדיקת אינטגרציה</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          בדיקת החיבור לשרת נחיל AI
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>פרטי חיבור</CardTitle>
          <CardDescription>הגדר את פרטי החיבור לשרת</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="integration-key">מפתח אינטגרציה</Label>
            <Input
              id="integration-key"
              type="text"
              value={integrationKey}
              onChange={(e) => setIntegrationKey(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-url">כתובת API</Label>
            <Input id="api-url" type="text" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="properties">קבלת נכסים</TabsTrigger>
          <TabsTrigger value="property">שליחת נכס</TabsTrigger>
          <TabsTrigger value="lead">שליחת ליד</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>בדיקת קבלת נכסים</CardTitle>
              <CardDescription>בדיקת החיבור לשרת באמצעות קבלת רשימת נכסים</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>לחץ על הכפתור למטה כדי לבדוק את החיבור לשרת באמצעות קבלת רשימת נכסים.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={testGetProperties} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    בודק...
                  </>
                ) : (
                  "בדוק קבלת נכסים"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="property">
          <Card>
            <CardHeader>
              <CardTitle>בדיקת שליחת נכס</CardTitle>
              <CardDescription>בדיקת החיבור לשרת באמצעות שליחת נכס חדש</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="property-data">נתוני הנכס (JSON)</Label>
                <Textarea
                  id="property-data"
                  value={propertyData}
                  onChange={(e) => setPropertyData(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={testSendProperty} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    שולח...
                  </>
                ) : (
                  "שלח נכס"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="lead">
          <Card>
            <CardHeader>
              <CardTitle>בדיקת שליחת ליד</CardTitle>
              <CardDescription>בדיקת החיבור לשרת באמצעות שליחת ליד חדש</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lead-data">נתוני הליד (JSON)</Label>
                <Textarea
                  id="lead-data"
                  value={leadData}
                  onChange={(e) => setLeadData(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={testSendLead} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    שולח...
                  </>
                ) : (
                  "שלח ליד"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {testResult && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className={testResult.success ? "text-green-600" : "text-red-600"}>
              {testResult.success ? "הבדיקה הצליחה" : "הבדיקה נכשלה"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

            {testResult.details && (
              <div className="space-y-2">
                <Label>פרטי תשובה</Label>
                <div className="p-4 bg-gray-50 rounded-md overflow-auto max-h-[400px]">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{testResult.details}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

