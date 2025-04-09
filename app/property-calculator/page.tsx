"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"

export default function PropertyCalculator() {
  const [formData, setFormData] = useState({
    city: "",
    neighborhood: "",
    propertyType: "",
    area: "",
    rooms: "",
  })
  const [result, setResult] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate API call for property valuation
    setTimeout(() => {
      // Simple mock calculation based on inputs
      const basePrice =
        formData.city === "nahariya"
          ? 1500000
          : formData.city === "shlomi"
            ? 1200000
            : formData.city === "maalot"
              ? 1100000
              : 1000000

      const areaFactor = Number.parseFloat(formData.area) * 10000
      const roomsFactor = Number.parseFloat(formData.rooms) * 100000

      const propertyTypeFactor =
        formData.propertyType === "apartment"
          ? 1
          : formData.propertyType === "house"
            ? 1.5
            : formData.propertyType === "penthouse"
              ? 1.8
              : 1.2

      const calculatedValue = Math.round((basePrice + areaFactor + roomsFactor) * propertyTypeFactor)

      setResult(calculatedValue)
      setIsCalculating(false)
    }, 1500)
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">מחשבון שווי הערכת הנכס</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          גלה כמה שווה הנכס שלך
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>הזן את פרטי הנכס</CardTitle>
            <CardDescription>מלא את הפרטים הבאים כדי לקבל הערכת שווי</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="property-calculator-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="city">עיר</Label>
                <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר עיר" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nahariya">נהריה</SelectItem>
                    <SelectItem value="shlomi">שלומי</SelectItem>
                    <SelectItem value="maalot">מעלות</SelectItem>
                    <SelectItem value="other">אחר</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">שכונה</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyType">סוג הנכס</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleSelectChange("propertyType", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="בחר סוג נכס" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">דירה</SelectItem>
                    <SelectItem value="house">בית פרטי</SelectItem>
                    <SelectItem value="penthouse">פנטהאוז</SelectItem>
                    <SelectItem value="garden-apt">דירת גן</SelectItem>
                    <SelectItem value="land">מגרש</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">שטח הנכס (במ״ר)</Label>
                <Input id="area" name="area" type="number" value={formData.area} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rooms">מספר חדרים</Label>
                <Input id="rooms" name="rooms" type="number" value={formData.rooms} onChange={handleChange} required />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" form="property-calculator-form" className="w-full" disabled={isCalculating}>
              {isCalculating ? "מחשב..." : "חשב שווי נכס"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>תוצאת הערכת השווי</CardTitle>
            <CardDescription>הערכת שווי משוערת בהתבסס על הנתונים שהזנת</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
            {isCalculating ? (
              <div className="flex flex-col items-center gap-4">
                <Calculator className="h-16 w-16 animate-pulse text-primary" />
                <p className="text-lg">מחשב את שווי הנכס...</p>
              </div>
            ) : result ? (
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-4">₪{result.toLocaleString()}</div>
                <p className="text-muted-foreground">
                  זוהי הערכה ראשונית בלבד. לקבלת הערכה מדויקת יותר, אנא צרו קשר עם המשרד שלנו.
                </p>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Calculator className="h-16 w-16 mx-auto mb-4" />
                <p>הזן את פרטי הנכס ולחץ על "חשב שווי נכס" כדי לקבל הערכת שווי</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <a href="/contact">לייעוץ מקצועי</a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">איך מחשבים את שווי הנכס?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">מיקום</h3>
              <p>המיקום הוא אחד הגורמים המשפיעים ביותר על שווי הנכס. נכסים באזורים מבוקשים יהיו בעלי ערך גבוה יותר.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">גודל ומאפיינים</h3>
              <p>שטח הנכס, מספר החדרים, מצב הנכס, גיל הבניין ומאפיינים נוספים משפיעים על שווי הנכס.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">מגמות שוק</h3>
              <p>מגמות בשוק הנדל"ן, ביקוש והיצע באזור, ומצב הכלכלה משפיעים גם הם על שווי הנכס.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

