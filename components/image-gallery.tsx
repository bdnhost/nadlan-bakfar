"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    width?: number
    height?: number
  }[]
  columns?: number
}

export default function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false)

  // פתיחת תמונה בתצוגת לייטבוקס
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
    setIsLightboxOpen(true)
  }

  // סגירת תצוגת לייטבוקס
  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  // מעבר לתמונה הבאה
  const nextImage = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex + 1) % images.length)
  }

  // מעבר לתמונה הקודמת
  const prevImage = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length)
  }

  // הורדת התמונה הנוכחית
  const downloadImage = () => {
    if (selectedImageIndex === null) return

    const image = images[selectedImageIndex]
    const link = document.createElement("a")
    link.href = image.src
    link.download = `image-${selectedImageIndex + 1}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full">
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-4`}>
        {images.map((image, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => openLightbox(index)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 text-white bg-black/50 hover:bg-black/70"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
            </Button>

            {selectedImageIndex !== null && (
              <div className="relative aspect-auto max-h-[80vh] flex items-center justify-center">
                <Image
                  src={images[selectedImageIndex].src || "/placeholder.svg"}
                  alt={images[selectedImageIndex].alt}
                  width={images[selectedImageIndex].width || 1200}
                  height={images[selectedImageIndex].height || 800}
                  className="max-h-[80vh] w-auto object-contain"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 z-10 text-white bg-black/50 hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 z-10 text-white bg-black/50 hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                <div className="absolute bottom-2 right-2 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white bg-black/50 hover:bg-black/70"
                    onClick={downloadImage}
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                </div>

                <div className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 rounded text-sm">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

