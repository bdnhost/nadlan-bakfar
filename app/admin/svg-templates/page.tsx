"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllSVGTemplates, generateCustomSVG, type SVGTemplate } from "@/lib/image-service"
import { Copy, Download, FileCode, Loader2, Plus, Trash2, Edit, Save, X } from "lucide-react"

export default function SVGTemplatesPage() {
  const [templates, setTemplates] = useState<SVGTemplate[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [selectedTemplate, setSelectedTemplate] = useState<SVGTemplate | null>(null)
  const [customColors, setCustomColors] = useState<string[]>(["#4CAF50", "#2E7D32", "#81C784"])
  const [generatedSVG, setGeneratedSVG] = useState<string>("")
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedTemplate, setEditedTemplate] = useState<Partial<SVGTemplate>>({})
  const [newTemplateDialogOpen, setNewTemplateDialogOpen] = useState<boolean>(false)
  const [newTemplate, setNewTemplate] = useState<Partial<SVGTemplate>>({
    name: "",
    category: "",
    svgContent: "",
    colors: ["#4CAF50", "#2E7D32", "#81C784"],
  })

  // טעינת התבניות בעת טעינת הקומפוננטה
  useEffect(() => {
    const allTemplates = getAllSVGTemplates()
    setTemplates(allTemplates)

    // חילוץ קטגוריות ייחודיות
    const uniqueCategories = Array.from(new Set(allTemplates.map((t) => t.category)))
    setCategories(uniqueCategories)

    // הגדרת קטגוריה פעילה
    setActiveCategory(uniqueCategories.length > 0 ? uniqueCategories[0] : "")
  }, [])

  // בחירת תבנית
  const handleSelectTemplate = (template: SVGTemplate) => {
    setSelectedTemplate(template)
    setCustomColors(template.colors)
    setIsEditing(false)
    setEditedTemplate({})

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

  // העתקת קוד SVG
  const copySVGCode = () => {
    if (!generatedSVG) return

    navigator.clipboard.writeText(generatedSVG)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // הורדת SVG
  const downloadSVG = () => {
    if (!generatedSVG || !selectedTemplate) return

    setIsDownloading(true)

    try {
      const blob = new Blob([generatedSVG], { type: "image/svg+xml" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${selectedTemplate.name.replace(/\s+/g, "-").toLowerCase()}.svg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading SVG:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  // הפעלת מצב עריכה
  const handleEnableEdit = () => {
    if (selectedTemplate) {
      setEditedTemplate({
        name: selectedTemplate.name,
        category: selectedTemplate.category,
        svgContent: selectedTemplate.svgContent,
        colors: [...selectedTemplate.colors],
      })
      setIsEditing(true)
    }
  }

  // עדכון שדה בתבנית הנערכת
  const handleEditChange = (field: string, value: any) => {
    setEditedTemplate((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // עדכון צבע בתבנית הנערכת
  const handleEditColorChange = (index: number, color: string) => {
    const newColors = [...(editedTemplate.colors || [])]
    newColors[index] = color
    setEditedTemplate((prev) => ({
      ...prev,
      colors: newColors,
    }))
  }

  // שמירת השינויים
  const handleSaveChanges = () => {
    // במערכת אמיתית, כאן היינו שולחים בקשה לשרת לעדכון התבנית
    console.log("Saving changes:", editedTemplate)

    // עדכון התבנית במאגר המקומי
    if (selectedTemplate) {
      const updatedTemplate: SVGTemplate = {
        ...selectedTemplate,
        ...editedTemplate,
      }

      // עדכון הרשימה המקומית
      setTemplates(templates.map((t) => (t.id === selectedTemplate.id ? updatedTemplate : t)))

      // עדכון התבנית הנבחרת
      setSelectedTemplate(updatedTemplate)
      setCustomColors(updatedTemplate.colors)

      // יצירת SVG מעודכן
      const svg = generateCustomSVG(updatedTemplate.id, updatedTemplate.colors)
      setGeneratedSVG(svg)

      // סגירת מצב עריכה
      setIsEditing(false)
      setEditedTemplate({})
    }
  }

  // ביטול העריכה
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedTemplate({})
  }

  // יצירת תבנית חדשה
  const handleCreateTemplate = () => {
    // במערכת אמיתית, כאן היינו שולחים בקשה לשרת ליצירת תבנית חדשה
    console.log("Creating new template:", newTemplate)

    // יצירת מזהה חדש
    const newId = `custom-${Date.now()}`

    // יצירת תבנית חדשה
    const createdTemplate: SVGTemplate = {
      id: newId,
      name: newTemplate.name || "תבנית חדשה",
      category: newTemplate.category || "מותאם אישית",
      svgContent:
        newTemplate.svgContent ||
        "<svg viewBox='0 0 100 100'><rect x='10' y='10' width='80' height='80' fill='{color1}' stroke='{color2}' /></svg>",
      colors: newTemplate.colors || ["#4CAF50", "#2E7D32", "#81C784"],
      previewUrl: "",
    }

    // עדכון הרשימה המקומית
    setTemplates([...templates, createdTemplate])

    // עדכון הקטגוריות אם נוספה קטגוריה חדשה
    if (!categories.includes(createdTemplate.category)) {
      setCategories([...categories, createdTemplate.category])
    }

    // איפוס טופס התבנית החדשה
    setNewTemplate({
      name: "",
      category: "",
      svgContent: "",
      colors: ["#4CAF50", "#2E7D32", "#81C784"],
    })

    // סגירת הדיאלוג
    setNewTemplateDialogOpen(false)

    // בחירת התבנית החדשה
    setSelectedTemplate(createdTemplate)
    setCustomColors(createdTemplate.colors)
    setActiveCategory(createdTemplate.category)

    // יצירת SVG ראשוני
    const svg = generateCustomSVG(createdTemplate.id, createdTemplate.colors)
    setGeneratedSVG(svg)
  }

  // מחיקת תבנית
  const handleDeleteTemplate = () => {
    if (!selectedTemplate) return

    if (window.confirm(`האם אתה בטוח שברצונך למחוק את התבנית "${selectedTemplate.name}"?`)) {
      // במערכת אמיתית, כאן היינו שולחים בקשה לשרת למחיקת התבנית
      console.log("Deleting template:", selectedTemplate.id)

      // עדכון הרשימה המקומית
      setTemplates(templates.filter((t) => t.id !== selectedTemplate.id))

      // איפוס התבנית הנבחרת
      setSelectedTemplate(null)
      setGeneratedSVG("")
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">ניהול תבניות SVG</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          יצירה, עריכה וניהול של תבניות גרפיקה וקטורית
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <Dialog open={newTemplateDialogOpen} onOpenChange={setNewTemplateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              צור תבנית חדשה
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>יצירת תבנית SVG חדשה</DialogTitle>
              <DialogDescription>הזן את פרטי התבנית החדשה</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">שם התבנית</Label>
                <Input
                  id="template-name"
                  value={newTemplate.name || ""}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="הזן שם לתבנית"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-category">קטגוריה</Label>
                <Input
                  id="template-category"
                  value={newTemplate.category || ""}
                  onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                  placeholder="הזן קטגוריה"
                  list="categories"
                />
                <datalist id="categories">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-svg">קוד SVG</Label>
                <Textarea
                  id="template-svg"
                  value={newTemplate.svgContent || ""}
                  onChange={(e) => setNewTemplate({ ...newTemplate, svgContent: e.target.value })}
                  placeholder="הזן קוד SVG (השתמש ב-{color1}, {color2}, וכו' כמשתני צבע)"
                  rows={10}
                />
                <p className="text-xs text-muted-foreground">
                  השתמש ב-{"{color1}"}, {"{color2}"}, וכו' כמשתני צבע שיוחלפו בצבעים שהמשתמש יבחר
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-colors">צבעים</Label>
                <div className="grid grid-cols-3 gap-4">
                  {(newTemplate.colors || []).map((color, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`color-${index}`}>צבע {index + 1}</Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: color }} />
                        <Input
                          id={`color-${index}`}
                          type="text"
                          value={color}
                          onChange={(e) => {
                            const newColors = [...(newTemplate.colors || [])]
                            newColors[index] = e.target.value
                            setNewTemplate({ ...newTemplate, colors: newColors })
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleCreateTemplate}>צור תבנית</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>תבניות SVG</CardTitle>
              <CardDescription>בחר תבנית לתצוגה ועריכה</CardDescription>
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
                    <div className="grid grid-cols-1 gap-4">
                      {templates
                        .filter((t) => t.category === category)
                        .map((template) => (
                          <Card
                            key={template.id}
                            className={`cursor-pointer ${selectedTemplate?.id === template.id ? "border-primary" : ""}`}
                            onClick={() => handleSelectTemplate(template)}
                          >
                            <CardContent className="p-4 flex items-center gap-4">
                              <div
                                className="w-16 h-16"
                                dangerouslySetInnerHTML={{
                                  __html: generateCustomSVG(template.id, template.colors),
                                }}
                              />
                              <div>
                                <p className="font-medium">{template.name}</p>
                                <p className="text-sm text-muted-foreground">{template.category}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {isEditing ? "עריכת תבנית" : selectedTemplate ? selectedTemplate.name : "בחר תבנית"}
                </CardTitle>
                {selectedTemplate && !isEditing && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleEnableEdit}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={handleDeleteTemplate}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {isEditing && (
                  <div className="flex gap-2">
                    <Button variant="default" size="icon" onClick={handleSaveChanges}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleCancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedTemplate ? (
                isEditing ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">שם התבנית</Label>
                      <Input
                        id="edit-name"
                        value={editedTemplate.name || ""}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-category">קטגוריה</Label>
                      <Input
                        id="edit-category"
                        value={editedTemplate.category || ""}
                        onChange={(e) => handleEditChange("category", e.target.value)}
                        list="edit-categories"
                      />
                      <datalist id="edit-categories">
                        {categories.map((category) => (
                          <option key={category} value={category} />
                        ))}
                      </datalist>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-svg">קוד SVG</Label>
                      <Textarea
                        id="edit-svg"
                        value={editedTemplate.svgContent || ""}
                        onChange={(e) => handleEditChange("svgContent", e.target.value)}
                        rows={10}
                      />
                      <p className="text-xs text-muted-foreground">
                        השתמש ב-{"{color1}"}, {"{color2}"}, וכו' כמשתני צבע שיוחלפו בצבעים שהמשתמש יבחר
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-colors">צבעים</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {(editedTemplate.colors || []).map((color, index) => (
                          <div key={index} className="space-y-2">
                            <Label htmlFor={`edit-color-${index}`}>צבע {index + 1}</Label>
                            <div className="flex gap-2">
                              <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: color }} />
                              <Input
                                id={`edit-color-${index}`}
                                type="text"
                                value={color}
                                onChange={(e) => handleEditColorChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>תצוגה מקדימה</Label>
                      <div
                        className="w-full aspect-square border rounded-md p-4 flex items-center justify-center bg-white"
                        dangerouslySetInnerHTML={{ __html: generatedSVG }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>התאמה אישית</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {customColors.map((color, index) => (
                          <div key={index} className="space-y-2">
                            <Label htmlFor={`custom-color-${index}`}>צבע {index + 1}</Label>
                            <div className="flex gap-2">
                              <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: color }} />
                              <Input
                                id={`custom-color-${index}`}
                                type="text"
                                value={color}
                                onChange={(e) => handleColorChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={copySVGCode} disabled={!generatedSVG || isCopied} className="flex-1">
                        <Copy className="h-4 w-4 mr-2" />
                        {isCopied ? "הועתק!" : "העתק קוד SVG"}
                      </Button>

                      <Button
                        onClick={downloadSVG}
                        disabled={!generatedSVG || isDownloading}
                        variant="outline"
                        className="flex-1"
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            מוריד...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            הורד SVG
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                  <FileCode className="h-16 w-16 mb-4" />
                  <p className="text-lg">בחר תבנית מהרשימה או צור תבנית חדשה</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

