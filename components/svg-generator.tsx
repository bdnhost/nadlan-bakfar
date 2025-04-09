"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAllSVGTemplates, generateCustomSVG, type SVGTemplate } from "@/lib/image-service"

interface SVGGeneratorProps {
  onSelect?: (svgContent: string) => void
  defaultCategory?: string
}

export default function SVGGenerator({ onSelect, defaultCategory }: SVGGeneratorProps) {
  const [templates, setTemplates] = useState<SVGTemplate[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<SVGTemplate | null>(null)
  const [customColors, setCustomColors] = useState<string[]>(["#4CAF50", "#2E7D32", "#81C784"])
  const [generatedSVG, setGeneratedSVG] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<string>("")

  // טעינת התבניות בעת טעינת הקומפוננטה
  useEffect(() => {
    const allTemplates = getAllSVGTemplates()
    setTemplates(allTemplates)

    // חילוץ קטגוריות ייחודיות
    const uniqueCategories = Array.from(new Set(allTemplates.map((t) => t.category)))
    setCategories(uniqueCategories)

    // הגדרת קטגוריה פעילה
    setActiveCategory(defaultCategory || (uniqueCategories.length > 0 ? uniqueCategories[0] : ""))
  }, [defaultCategory])

  // בחירת תבנית
  const handleSelectTemplate = (template: SVGTemplate) => {
    setSelectedTemplate(template)
    setCustomColors(template.colors)

    // יצירת SVG ראשוני
    const svg = generateCustomSVG(template.id, template.colors)
    setGeneratedSVG(svg)
  }

  // עדכון צבע
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...customColors]
    newColors[index] = color
    setCustomColors(newColors)

    if (selectedTemplate) {
      const svg = generateCustomSVG(selectedTemplate.id, newColors)
      setGeneratedSVG(svg)
    }
  }

  // בחירת ה-SVG הסופי
  const handleSelectSVG = () => {
    if (onSelect && generatedSVG) {
      onSelect(generatedSVG)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>יצירת גרפיקת SVG</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templates
                  .filter((t) => t.category === category)
                  .map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer ${selectedTemplate?.id === template.id ? "border-primary" : ""}`}
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <CardContent className="p-4 flex flex-col items-center">
                        <div
                          className="w-full h-32 mb-2"
                          dangerouslySetInnerHTML={{
                            __html: generateCustomSVG(template.id, template.colors),
                          }}
                        />
                        <p className="text-center">{template.name}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedTemplate && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium">התאמה אישית</h3>

            <div className="grid grid-cols-3 gap-4">
              {customColors.map((color, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`color-${index}`}>צבע {index + 1}</Label>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: color }} />
                    <Input
                      id={`color-${index}`}
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">תצוגה מקדימה</h3>
              <div
                className="w-full h-64 border rounded-md p-4 flex items-center justify-center bg-white"
                dangerouslySetInnerHTML={{ __html: generatedSVG }}
              />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button onClick={handleSelectSVG} disabled={!selectedTemplate} className="w-full">
          בחר גרפיקה
        </Button>
      </CardFooter>
    </Card>
  )
}

