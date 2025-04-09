"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Copy, Download, ImageIcon, FileCode, Loader2 } from "lucide-react"
import ImageSearch from "@/components/image-search"
import SVGGenerator from "@/components/svg-generator"
import type { UnsplashImage } from "@/lib/image-service"
import Image from "next/image"

export default function MediaManager() {
  const [activeTab, setActiveTab] = useState<string>("images")
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null)
  const [selectedSVG, setSelectedSVG] = useState<string | null>(null)
  const [imageAlt, setImageAlt] = useState<string>("")
  const [svgTitle, setSvgTitle] = useState<string>("")
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)

  // טיפול בבחירת תמונה
  const handleSelectImage = (image: UnsplashImage) => {
    setSelectedImage(image)
    setImageAlt(image.alt_description || image.description || "")
  }

  // טיפול בבחירת SVG
  const handleSelectSVG = (svgContent: string) => {
    setSelectedSVG(svgContent)
    setSvgTitle("גרפיקת SVG מותאמת אישית")
  }

  // העתקת קוד HTML לשימוש בתמונה
  const copyImageHtml = () => {
    if (!selectedImage) return

    const imageUrl = selectedImage.urls.regular
    const alt = imageAlt || selectedImage.alt_description || 'תמונת נדל"ן'
    const attribution = `Photo by ${selectedImage.user.name} on Unsplash`

    const htmlCode = `<img src="${imageUrl}" alt="${alt}" title="${attribution}" />`

    navigator.clipboard.writeText(htmlCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // העתקת קוד SVG
  const copySVGCode = () => {
    if (!selectedSVG) return

    navigator.clipboard.writeText(selectedSVG)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // הורדת תמונה
  const downloadImage = async () => {
    if (!selectedImage) return

    setIsDownloading(true)

    try {
      const imageUrl = selectedImage.urls.regular
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `unsplash-${selectedImage.id}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading image:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  // הורדת SVG
  const downloadSVG = () => {
    if (!selectedSVG) return

    setIsDownloading(true)

    try {
      const blob = new Blob([selectedSVG], { type: "image/svg+xml" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `custom-svg-${Date.now()}.svg`
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

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">מנהל המדיה</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          חיפוש תמונות ויצירת גרפיקה לשימוש באתר
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="images">תמונות</TabsTrigger>
          <TabsTrigger value="svg">גרפיקת SVG</TabsTrigger>
        </TabsList>

        <TabsContent value="images" className="mt-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>חיפוש תמונות</CardTitle>
                  <CardDescription>חפש תמונות מ-Unsplash לשימוש באתר</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageSearch onSelect={handleSelectImage} />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>תמונה נבחרת</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedImage ? (
                    <div className="space-y-4">
                      <div className="relative aspect-video overflow-hidden rounded-md border">
                        <Image
                          src={selectedImage.urls.regular || "/placeholder.svg"}
                          alt={selectedImage.alt_description || "Unsplash image"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image-alt">טקסט חלופי (alt)</Label>
                        <Input
                          id="image-alt"
                          value={imageAlt}
                          onChange={(e) => setImageAlt(e.target.value)}
                          placeholder="תיאור התמונה לנגישות"
                        />
                      </div>

                      <div className="text-xs text-muted-foreground">צילום: {selectedImage.user.name} (Unsplash)</div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                      <ImageIcon className="h-10 w-10 mb-2" />
                      <p>בחר תמונה מהגלריה</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button onClick={copyImageHtml} disabled={!selectedImage || isCopied} className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    {isCopied ? "הועתק!" : "העתק קוד HTML"}
                  </Button>

                  <Button
                    onClick={downloadImage}
                    disabled={!selectedImage || isDownloading}
                    variant="outline"
                    className="w-full"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        מוריד...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        הורד תמונה
                      </>
                    )}
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" disabled={!selectedImage} className="w-full">
                        <FileCode className="h-4 w-4 mr-2" />
                        הצג קוד מלא
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>קוד HTML לשימוש בתמונה</DialogTitle>
                        <DialogDescription>העתק את הקוד הבא לשימוש בתמונה באתר</DialogDescription>
                      </DialogHeader>

                      {selectedImage && (
                        <div className="space-y-4">
                          <div className="relative aspect-video overflow-hidden rounded-md border">
                            <Image
                              src={selectedImage.urls.regular || "/placeholder.svg"}
                              alt={selectedImage.alt_description || "Unsplash image"}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <Textarea
                            readOnly
                            value={`<img 
  src="${selectedImage.urls.regular}" 
  alt="${imageAlt || selectedImage.alt_description || 'תמונת נדל"ן'}" 
  title="Photo by ${selectedImage.user.name} on Unsplash" 
/>`}
                            className="h-32"
                          />

                          <div className="text-xs text-muted-foreground">
                            שים לב: יש לתת קרדיט לצלם בהתאם לתנאי השימוש של Unsplash
                          </div>
                        </div>
                      )}

                      <DialogFooter>
                        <Button onClick={copyImageHtml} disabled={!selectedImage || isCopied}>
                          {isCopied ? "הועתק!" : "העתק קוד"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="svg" className="mt-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <SVGGenerator onSelect={handleSelectSVG} />
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>גרפיקת SVG נבחרת</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedSVG ? (
                    <div className="space-y-4">
                      <div
                        className="w-full aspect-square border rounded-md p-4 flex items-center justify-center bg-white"
                        dangerouslySetInnerHTML={{ __html: selectedSVG }}
                      />

                      <div className="space-y-2">
                        <Label htmlFor="svg-title">כותרת</Label>
                        <Input
                          id="svg-title"
                          value={svgTitle}
                          onChange={(e) => setSvgTitle(e.target.value)}
                          placeholder="כותרת לגרפיקה"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                      <FileCode className="h-10 w-10 mb-2" />
                      <p>צור גרפיקת SVG</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button onClick={copySVGCode} disabled={!selectedSVG || isCopied} className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    {isCopied ? "הועתק!" : "העתק קוד SVG"}
                  </Button>

                  <Button
                    onClick={downloadSVG}
                    disabled={!selectedSVG || isDownloading}
                    variant="outline"
                    className="w-full"
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
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

