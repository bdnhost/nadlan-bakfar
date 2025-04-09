"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, MapPin, Maximize2, ArrowLeft, Heart } from "lucide-react"
import { getProperties, type Property } from "@/lib/api-service"
import { USE_MOCK_DATA } from "@/lib/config"
import { motion } from "framer-motion"

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const allProperties = await getProperties()

        // Filter for featured properties or just take the first 3
        const featuredProps =
          allProperties.filter((p) => p.featured).length > 0
            ? allProperties.filter((p) => p.featured)
            : allProperties.slice(0, 3)

        setProperties(featuredProps)

        // Check if we're using mock data
        if (USE_MOCK_DATA) {
          setError("מציג נתונים לדוגמה - לא ניתן להתחבר למערכת ניהול הנכסים")
        }
      } catch (err) {
        console.error("Error fetching featured properties:", err)
        setError("לא ניתן לטעון את הנכסים המובחרים כרגע - מציג נתונים לדוגמה")
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("propertyFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]

      // Save to localStorage
      localStorage.setItem("propertyFavorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  if (loading) {
    return (
      <div className="container px-4 md:px-6 py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4">טוען נכסים מובחרים...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-gradient-to-b from-background-darker/30 to-background py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            נכסים מובחרים
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            הנכסים המובחרים שלנו, נבחרו בקפידה כדי להתאים לצרכים שלכם
          </p>
        </motion.div>

        {error && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-8 text-center">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onFavoriteToggle={toggleFavorite}
              index={index}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            asChild
            variant="outline"
            className="group hover:bg-primary hover:text-white transition-all duration-300 border-primary text-primary"
          >
            <Link href="/property-catalog" className="flex items-center">
              לכל הנכסים
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function PropertyCard({
  property,
  isFavorite,
  onFavoriteToggle,
  index,
}: {
  property: Property
  isFavorite: boolean
  onFavoriteToggle: (id: string) => void
  index: number
}) {
  // המרת שדות חסרים לערכים ברירת מחדל
  const {
    id,
    title = property.address,
    description = "",
    price = 0,
    type = "sale",
    location = property.address.split(",")[1]?.trim() || "",
    area = property.size || 0,
    rooms = 0,
    bathrooms = 0,
    images = [],
    featured = false,
  } = property

  // בחירת תמונה ראשונה או תמונת ברירת מחדל
  const imageUrl = images && images.length > 0 ? images[0] : `/placeholder.svg?height=300&width=400`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm group">
        <div className="relative">
          <div className="overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              width={400}
              height={300}
              className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {featured && <Badge className="absolute top-2 right-2 bg-highlight text-text">נכס מומלץ</Badge>}
          <button
            onClick={(e) => {
              e.preventDefault()
              onFavoriteToggle(id)
            }}
            className="absolute top-2 left-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
            />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm line-clamp-2">{description}</p>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-1 text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm">{location}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <div className="flex justify-between mb-4 bg-muted/30 p-2 rounded-lg">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-primary" />
              <span className="text-sm">{rooms} חדרים</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-primary" />
              <span className="text-sm">{bathrooms} חדרי רחצה</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize2 className="h-4 w-4 text-primary" />
              <span className="text-sm">{area} מ"ר</span>
            </div>
          </div>
          <div className="text-xl font-bold text-primary">
            {type === "rent" ? `₪${price.toLocaleString()} / חודש` : `₪${price.toLocaleString()}`}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button asChild className="w-full bg-primary hover:bg-primary-hover shadow-md">
            <Link href={`/property/${id}`}>פרטים נוספים</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

