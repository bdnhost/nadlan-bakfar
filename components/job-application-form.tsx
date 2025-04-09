"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Loader2 } from "lucide-react"

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    employmentType: "",
    experience: "",
    hasLicense: false,
    resume: null as File | null,
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors([])

    // בדיקת תקינות בסיסית
    const newErrors: string[] = []

    if (!formData.firstName) newErrors.push("שם פרטי הוא שדה חובה")
    if (!formData.lastName) newErrors.push("שם משפחה הוא שדה חובה")
    if (!formData.email) newErrors.push("אימייל הוא שדה חובה")
    if (!formData.phone) newErrors.push("טלפון הוא שדה חובה")
    if (!formData.position) newErrors.push("תפקיד מבוקש הוא שדה חובה")
    if (!formData.employmentType) newErrors.push("סוג העסקה הוא שדה חובה")
    if (!formData.resume) newErrors.push("קורות חיים הם שדה חובה")

    if (newErrors.length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // סימולציה של שליחת הטופס
    try {
      // כאן יש להוסיף קוד לשליחת הטופס לשרת
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        employmentType: "",
        experience: "",
        hasLicense: false,
        resume: null,
        message: "",
      })

      // איפוס הודעת ההצלחה אחרי 5 שניות
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error("Error submitting form:", err)
      setErrors(["אירעה שגיאה בשליחת הטופס. אנא נסו שוב מאוחר יותר."])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {isSubmitted && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            תודה על הגשת המועמדות! פרטיך התקבלו ונחזור אליך בהקדם.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">שם פרטי *</Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">שם משפחה *</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">אימייל *</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">טלפון *</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">תפקיד מבוקש *</Label>
        <Select value={formData.position} onValueChange={(value) => handleSelectChange("position", value)} required>
          <SelectTrigger id="position">
            <SelectValue placeholder="בחר תפקיד" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agent">סוכן/ת נדל״ן - הגליל המערבי</SelectItem>
            <SelectItem value="luxury-agent">סוכן/ת נדל״ן מתמחה - נכסי יוקרה</SelectItem>
            <SelectItem value="content-manager">מנהל/ת תוכן ושיווק דיגיטלי</SelectItem>
            <SelectItem value="admin">מתאם/ת פגישות ותמיכה אדמיניסטרטיבית</SelectItem>
            <SelectItem value="other">אחר</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>סוג העסקה מועדף *</Label>
        <RadioGroup
          value={formData.employmentType}
          onValueChange={(value) => handleSelectChange("employmentType", value)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="full-time" id="full-time" />
            <Label htmlFor="full-time" className="font-normal">
              משרה מלאה
            </Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="part-time" id="part-time" />
            <Label htmlFor="part-time" className="font-normal">
              משרה חלקית
            </Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="freelance" id="freelance" />
            <Label htmlFor="freelance" className="font-normal">
              פרילאנס
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">ניסיון בתחום הנדל״ן</Label>
        <Select value={formData.experience} onValueChange={(value) => handleSelectChange("experience", value)}>
          <SelectTrigger id="experience">
            <SelectValue placeholder="בחר ניסיון" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">ללא ניסיון</SelectItem>
            <SelectItem value="less-than-year">פחות משנה</SelectItem>
            <SelectItem value="1-3">1-3 שנים</SelectItem>
            <SelectItem value="3-5">3-5 שנים</SelectItem>
            <SelectItem value="5-plus">5+ שנים</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 space-x-reverse">
        <Checkbox
          id="hasLicense"
          checked={formData.hasLicense}
          onCheckedChange={(checked) => handleCheckboxChange("hasLicense", checked as boolean)}
        />
        <Label htmlFor="hasLicense" className="font-normal">
          יש לי רישיון נהיגה ורכב
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">קורות חיים (PDF, DOC, DOCX) *</Label>
        <div className="flex items-center gap-2">
          <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("resume")?.click()}
            className="w-full flex items-center justify-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {formData.resume ? formData.resume.name : "העלה קובץ"}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">הודעה נוספת</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="ספר/י לנו קצת על עצמך ומדוע את/ה מעוניין/ת להצטרף אלינו"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            שולח...
          </>
        ) : (
          "שלח מועמדות"
        )}
      </Button>
    </form>
  )
}

