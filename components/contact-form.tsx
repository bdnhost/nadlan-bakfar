"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitLead } from "@/lib/api-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Lead } from "@/lib/api-service"

interface ContactFormProps {
  propertyId?: string
  source?: string
}

export default function ContactForm({ propertyId, source = "website_contact_form" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors([])

    // בדיקת תקינות בסיסית
    if (!formData.name || formData.name.trim() === "") {
      setErrors(["שם הוא שדה חובה"])
      setIsSubmitting(false)
      return
    }

    // יצירת אובייקט ליד לפי הסכמה החדשה
    const lead: Lead = {
      name: formData.name,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      source: source,
      notes: `שירות: ${formData.service}, הודעה: ${formData.message}`,
      property_id: propertyId,
    }

    try {
      // שליחת הליד למערכת
      await submitLead(lead)

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })

      // איפוס הודעת ההצלחה אחרי 5 שניות
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error("Error submitting form:", err)

      // טיפול בשגיאות ספציפיות
      if (err instanceof Error) {
        if (err.message.includes("401")) {
          setErrors(["שגיאת אימות: מפתח האינטגרציה אינו תקין. אנא פנה למנהל המערכת."])
        } else if (err.message.includes("500")) {
          setErrors(["שגיאת שרת. אנא נסה שוב מאוחר יותר או צור קשר בטלפון: 053-2062346"])
        } else {
          setErrors(["אירעה שגיאה בשליחת הטופס. אנא נסו שוב מאוחר יותר או צרו קשר בטלפון."])
        }
      } else {
        setErrors(["אירעה שגיאה בשליחת הטופס. אנא נסו שוב מאוחר יותר."])
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 form-spacing">
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <ul className="list-disc pl-5">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="service" className="block">
          השירות הנדרש
        </Label>
        <Select value={formData.service} onValueChange={handleServiceChange} required>
          <SelectTrigger aria-label="בחר שירות">
            <SelectValue placeholder="בחר שירות" />
          </SelectTrigger>
          <SelectContent position="popper" align="end">
            <SelectItem value="buying">קניית נדל&quot;ן</SelectItem>
            <SelectItem value="selling">מכירת נדל&quot;ן</SelectItem>
            <SelectItem value="rent">מעוניין לשכור</SelectItem>
            <SelectItem value="lease">מעוניין להשכיר</SelectItem>
            <SelectItem value="management">ניהול בתים</SelectItem>
            <SelectItem value="maintenance">אחזקת בתים</SelectItem>
            <SelectItem value="investment">נכס להשקעה</SelectItem>
            <SelectItem value="other">אחר</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">שם מלא</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">טלפון</Label>
        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">אימייל (אופציונלי)</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">הודעה</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "שולח..." : "שלח"}
      </Button>
      {isSubmitted && <p className="text-green-600 text-center">תודה! פנייתך התקבלה ונחזור אליך בהקדם.</p>}
    </form>
  )
}

