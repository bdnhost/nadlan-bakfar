"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { searchUnsplashImages, type UnsplashImage } from "@/lib/image-service"
import Image from "next/image"
import { Search, Loader2 } from "lucide-react"

interface ImageSearchProps {
  onSelect?: (image: UnsplashImage) => void
  defaultQuery?: string
}

export default function ImageSearch({ onSelect, defaultQuery = "real estate" }: ImageSearchProps) {
  const [query, setQuery] = useState<string>(defaultQuery)
  const [images, setImages] = useState<UnsplashImage[]>([])
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  // חיפוש תמונות בעת טעינת הקומפוננטה
  useEffect(() => {
    searchImages(defaultQuery)
  }, [defaultQuery])

  // פונקציה לחיפוש תמונות
  const searchImages = async (searchQuery: string, pageNum = 1) => {
    setLoading(true)
    try {
      const results = await searchUnsplashImages(searchQuery, pageNum)

      if (pageNum === 1) {
        setImages(results)
      } else {
        setImages((prev) => [...prev, ...results])
      }

      setHasMore(results.length > 0)
      setPage(pageNum)
    } catch (error) {
      console.error("Error searching images:", error)
    } finally {
      setLoading(false)
    }
  }

  // טיפול בשליחת טופס החיפוש
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    searchImages(query)
  }

  // טעינת עוד תמונות
  const loadMore = () => {
    searchImages(query, page + 1)
  }

  // בחירת תמונה
  const handleSelectImage = (image: UnsplashImage) => {
    setSelectedImage(image)
    if (onSelect) {
      onSelect(image)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="search-query" className="sr-only">
            חיפוש תמונות
          </Label>
          <Input
            id="search-query"
            type="text"
            placeholder="חפש תמונות..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card
            key={image.id}
            className={`cursor-pointer overflow-hidden ${selectedImage?.id === image.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleSelectImage(image)}
          >
            <CardContent className="p-0">
              <div className="relative h-40">
                <Image
                  src={image.urls.small || "/placeholder.svg"}
                  alt={image.alt_description || "Unsplash image"}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMore} disabled={loading} variant="outline">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                טוען...
              </>
            ) : (
              "טען עוד"
            )}
          </Button>
        </div>
      )}

      {images.length === 0 && !loading && (
        <div className="text-center py-8 text-muted-foreground">לא נמצאו תמונות. נסה לחפש מונחים אחרים.</div>
      )}
    </div>
  )
}

