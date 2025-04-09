"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ContentStatus, ContentType, type GeneratedContent } from "@/lib/content-generator/types"
import { getAllContent, updateContent, deleteContent } from "@/lib/content-generator/content-service"
import { generateScheduledContent } from "@/lib/content-generator/scheduler"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, FileCode, Loader2, Plus, Trash2, Edit, Check, X } from "lucide-react"
import ImageSearch from "@/components/image-search"
import SVGGenerator from "@/components/svg-generator"
import type { UnsplashImage } from "@/lib/image-service"
import Image from "next/image"

export default function ContentManager() {
  const [contents, setContents] = useState<GeneratedContent[]>([])
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editedContent, setEditedContent] = useState<Partial<GeneratedContent>>({})
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [svgDialogOpen, setSvgDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // טעינת התכנים בעת טעינת הדף
  useEffect(() => {
    loadContents()
  }, [])

  // פונקציה לטעינת התכנים
  const loadContents = () => {
    const allContents = getAllContent()
    setContents(allContents)
  }

  // פונקציה ליצירת תוכן חדש
  const handleGenerateContent = async () => {
    setIsGenerating(true)
    try {
      await generateScheduledContent()
      loadContents()
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  // פונקציה לבחירת תוכן לעריכה
  const handleSelectContent = (content: GeneratedContent) => {
    setSelectedContent(content)
    setEditedContent({})
    setEditMode(false)
  }

  // פונקציה להפעלת מצב עריכה
  const handleEnableEdit = () => {
    if (selectedContent) {
      setEditedContent({
        title: selectedContent.title,
        content: selectedContent.content,
        summary: selectedContent.summary,
        tags: selectedContent.tags,
        featuredImage: selectedContent.featuredImage,
        seoTitle: selectedContent.seoTitle,
        seoDescription: selectedContent.seoDescription,
      })
      setEditMode(true)
    }
  }

  // פונקציה לעדכון שדה בתוכן הנערך
  const handleEditChange = (field: string, value: any) => {
    setEditedContent((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // פונקציה לשמירת השינויים
  const handleSaveChanges = () => {
    if (selectedContent && editMode) {
      const updated = updateContent(selectedContent.id, editedContent)
      if (updated) {
        setSelectedContent(updated)
        loadContents()
        setEditMode(false)
      }
    }
  }

  // פונקציה לביטול העריכה
  const handleCancelEdit = () => {
    setEditMode(false)
    setEditedContent({})
  }

  // פונקציה לשינוי סטטוס התוכן
  const handleStatusChange = (status: ContentStatus) => {
    if (selectedContent) {
      const updated = updateContent(selectedContent.id, { status })
      if (updated) {
        setSelectedContent(updated)
        loadContents()
      }
    }
  }

  // פונקציה למחיקת תוכן
  const handleDeleteContent = () => {
    if (selectedContent && window.confirm("האם אתה בטוח שברצונך למחוק תוכן זה?")) {
      const deleted = deleteContent(selectedContent.id)
      if (deleted) {
        setSelectedContent(null)
        loadContents()
      }
    }
  }

  // פונקציה לבחירת תמונה
  const handleSelectImage = (image: UnsplashImage) => {
    setEditedContent((prev) => ({
      ...prev,
      featuredImage: image.urls.regular,
    }))
    setImageDialogOpen(false)
  }

  // פונקציה לבחירת SVG
  const handleSelectSVG = (svgContent: string) => {
    // המרת SVG לתמונה (במערכת אמיתית נשתמש בשירות המרה)
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml" })
    const svgUrl = URL.createObjectURL(svgBlob)

    setEditedContent((prev) => ({
      ...prev,
      featuredImage: svgUrl,
    }))
    setSvgDialogOpen(false)
  }

  // פונקציה להסרת תמונה
  const handleRemoveImage = () => {
    setEditedContent((prev) => ({
      ...prev,
      featuredImage: undefined,
    }))
  }

  // פונקציה להצגת סטטוס התוכן
  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case ContentStatus.DRAFT:
        return <Badge variant="outline">טיוטה</Badge>
      case ContentStatus.REVIEW:
        return <Badge variant="secondary">בבדיקה</Badge>
      case ContentStatus.PUBLISHED:
        return (
          <Badge variant="default" className="bg-green-600">
            פורסם
          </Badge>
        )
      case ContentStatus.REJECTED:
        return <Badge variant="destructive">נדחה</Badge>
      case ContentStatus.SCHEDULED:
        return (
          <Badge variant="default" className="bg-blue-600">
            מתוזמן
          </Badge>
        )
      case ContentStatus.ARCHIVED:
        return (
          <Badge variant="outline" className="bg-gray-200">
            בארכיון
          </Badge>
        )
      default:
        return null
    }
  }

  // פונקציה להצגת סוג התוכן
  const getContentTypeLabel = (type: ContentType) => {
    switch (type) {
      case ContentType.BLOG_POST:
        return "פוסט בלוג"
      case ContentType.PROPERTY_DESCRIPTION:
        return "תיאור נכס"
      case ContentType.MARKET_ANALYSIS:
        return "ניתוח שוק"
      case ContentType.TIPS_ARTICLE:
        return "מאמר טיפים"
      case ContentType.AREA_GUIDE:
        return "מדריך אזור"
      case ContentType.FAQ:
        return "שאלות ותשובות"
      case ContentType.NEWS_UPDATE:
        return "עדכון חדשות"
      case ContentType.TESTIMONIAL:
        return "המלצת לקוח"
      case ContentType.NEIGHBORHOOD_SPOTLIGHT:
        return "זרקור על שכונה"
      case ContentType.INVESTMENT_GUIDE:
        return "מדריך השקעות"
      default:
        return "תוכן"
    }
  }

  // סינון תכנים לפי הלשונית הפעילה
  const filteredContents = contents.filter((content) => {
    if (activeTab === "all") return true
    if (activeTab === "published") return content.status === ContentStatus.PUBLISHED
    if (activeTab === "drafts") return content.status === ContentStatus.DRAFT
    if (activeTab === "scheduled") return content.status === ContentStatus.SCHEDULED
    return true
  })

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">מנהל התוכן האוטומטי</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          ניהול תכנים שנוצרו באופן אוטומטי באמצעות DeepSeek LLM
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>תכנים</CardTitle>
              <CardDescription>רשימת התכנים שנוצרו</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleGenerateContent} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    מייצר תוכן...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    צור תוכן חדש
                  </>
                )}
              </Button>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">הכל</TabsTrigger>
                  <TabsTrigger value="published">פורסם</TabsTrigger>
                  <TabsTrigger value="drafts">טיוטות</TabsTrigger>
                  <TabsTrigger value="scheduled">מתוזמן</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="max-h-[600px] overflow-y-auto space-y-2">
                {filteredContents.length === 0 ? (
                  <p className="text-center text-muted-foreground">אין תכנים זמינים</p>
                ) : (
                  filteredContents.map((content) => (
                    <Card
                      key={content.id}
                      className={`cursor-pointer ${selectedContent?.id === content.id ? "border-primary" : ""}`}
                      onClick={() => handleSelectContent(content)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium truncate">{content.title}</div>
                          {getStatusBadge(content.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">{getContentTypeLabel(content.type)}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(content.createdAt).toLocaleDateString("he-IL")}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedContent ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{editMode ? "עריכת תוכן" : "פרטי תוכן"}</CardTitle>
                    <CardDescription>
                      {getContentTypeLabel(selectedContent.type)} | נוצר ב-
                      {new Date(selectedContent.createdAt).toLocaleDateString("he-IL")}
                    </CardDescription>
                  </div>
                  <div>{getStatusBadge(selectedContent.status)}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editMode ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">כותרת</Label>
                      <Input
                        id="title"
                        value={editedContent.title || ""}
                        onChange={(e) => handleEditChange("title", e.target.value)}
                      />
                    </div>

                    {/* תמונה ראשית */}
                    <div className="space-y-2">
                      <Label>תמונה ראשית</Label>
                      <div className="flex items-center gap-2">
                        {editedContent.featuredImage ? (
                          <div className="relative">
                            <div className="relative w-full h-40 rounded-md overflow-hidden border">
                              <Image
                                src={editedContent.featuredImage || "/placeholder.svg"}
                                alt="תמונה ראשית"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8"
                              onClick={handleRemoveImage}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-40 border rounded-md bg-muted">
                            <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">אין תמונה ראשית</p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <ImageIcon className="h-4 w-4 mr-2" />
                              בחר תמונה
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>בחירת תמונה</DialogTitle>
                              <DialogDescription>חפש וסנן תמונות מ-Unsplash לשימוש בתוכן</DialogDescription>
                            </DialogHeader>
                            <div className="max-h-[60vh] overflow-y-auto">
                              <ImageSearch onSelect={handleSelectImage} defaultQuery={selectedContent.title} />
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={svgDialogOpen} onOpenChange={setSvgDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <FileCode className="h-4 w-4 mr-2" />
                              צור גרפיקת SVG
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>יצירת גרפיקת SVGיצירת גרפיקת SVG</DialogTitle>
                              <DialogDescription>צור גרפיקה וקטורית מותאמת אישית לשימוש בתוכן</DialogDescription>
                            </DialogHeader>
                            <div className="max-h-[60vh] overflow-y-auto">
                              <SVGGenerator onSelect={handleSelectSVG} />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    {selectedContent.summary !== undefined && (
                      <div className="space-y-2">
                        <Label htmlFor="summary">תקציר</Label>
                        <Textarea
                          id="summary"
                          value={editedContent.summary || ""}
                          onChange={(e) => handleEditChange("summary", e.target.value)}
                          rows={3}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="content">תוכן</Label>
                      <Textarea
                        id="content"
                        value={editedContent.content || ""}
                        onChange={(e) => handleEditChange("content", e.target.value)}
                        rows={15}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">תגיות</Label>
                      <Input
                        id="tags"
                        value={(editedContent.tags || []).join(", ")}
                        onChange={(e) =>
                          handleEditChange(
                            "tags",
                            e.target.value.split(",").map((tag) => tag.trim()),
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seoTitle">כותרת SEO</Label>
                      <Input
                        id="seoTitle"
                        value={editedContent.seoTitle || ""}
                        onChange={(e) => handleEditChange("seoTitle", e.target.value)}
                        maxLength={60}
                      />
                      <p className="text-xs text-muted-foreground">{editedContent.seoTitle?.length || 0}/60 תווים</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seoDescription">תיאור SEO</Label>
                      <Textarea
                        id="seoDescription"
                        value={editedContent.seoDescription || ""}
                        onChange={(e) => handleEditChange("seoDescription", e.target.value)}
                        rows={2}
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">
                        {editedContent.seoDescription?.length || 0}/160 תווים
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row gap-4">
                      {selectedContent.featuredImage && (
                        <div className="md:w-1/3">
                          <div className="relative w-full h-40 rounded-md overflow-hidden border">
                            <Image
                              src={selectedContent.featuredImage || "/placeholder.svg"}
                              alt="תמונה ראשית"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      )}
                      <div className={selectedContent.featuredImage ? "md:w-2/3" : "w-full"}>
                        <h2 className="text-2xl font-bold">{selectedContent.title}</h2>
                        {selectedContent.summary && (
                          <div className="mt-2 text-muted-foreground italic">{selectedContent.summary}</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 whitespace-pre-line">{selectedContent.content}</div>

                    {selectedContent.tags && selectedContent.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedContent.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {(selectedContent.seoTitle || selectedContent.seoDescription) && (
                      <div className="mt-4 p-4 border rounded-md bg-muted/50">
                        <h3 className="text-sm font-medium mb-2">מידע SEO</h3>
                        {selectedContent.seoTitle && (
                          <div className="mb-2">
                            <span className="text-xs font-medium">כותרת: </span>
                            <span className="text-sm">{selectedContent.seoTitle}</span>
                          </div>
                        )}
                        {selectedContent.seoDescription && (
                          <div>
                            <span className="text-xs font-medium">תיאור: </span>
                            <span className="text-sm">{selectedContent.seoDescription}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  {editMode ? (
                    <>
                      <Button onClick={handleSaveChanges} className="mr-2">
                        <Check className="h-4 w-4 mr-2" />
                        שמור
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        בטל
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleEnableEdit} className="mr-2">
                        <Edit className="h-4 w-4 mr-2" />
                        ערוך
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteContent}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        מחק
                      </Button>
                    </>
                  )}
                </div>

                {!editMode && (
                  <div>
                    <Select
                      value={selectedContent.status}
                      onValueChange={(value) => handleStatusChange(value as ContentStatus)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="שנה סטטוס" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ContentStatus.DRAFT}>טיוטה</SelectItem>
                        <SelectItem value={ContentStatus.REVIEW}>בבדיקה</SelectItem>
                        <SelectItem value={ContentStatus.PUBLISHED}>פרסם</SelectItem>
                        <SelectItem value={ContentStatus.SCHEDULED}>תזמן</SelectItem>
                        <SelectItem value={ContentStatus.REJECTED}>דחה</SelectItem>
                        <SelectItem value={ContentStatus.ARCHIVED}>העבר לארכיון</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">בחר תוכן מהרשימה כדי לצפות בפרטים</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// קומפוננטת Label
function Label({ htmlFor, children, className }: { htmlFor?: string; children: React.ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium ${className || ""}`}>
      {children}
    </label>
  )
}

