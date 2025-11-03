import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, Car, CableCarIcon as Elevator, Home, MapPin, Maximize2 } from "lucide-react"
import { getPropertyById } from "@/lib/api-service"
import ContactForm from "@/components/contact-form"
import { notFound } from "next/navigation"
import { USE_MOCK_DATA } from "@/lib/config"

// אלץ rendering דינמי - דפי נכסים בודדים תלויים במסד הנתונים
export const dynamic = "force-dynamic"
export const revalidate = 0

interface PropertyPageProps {
  params: {
    id: string
  }
}

// Define the Property type
interface Property {
  id: string
  address: string
  size?: number
  title?: string
  description?: string
  price?: number
  type?: string
  location?: string
  rooms?: number
  bathrooms?: number
  floor?: number
  totalFloors?: number
  parking?: boolean
  elevator?: boolean
  features?: string[]
  images?: string[]
  status?: string
}

// עדכון דומה בדף פרטי נכס
export default async function PropertyPage({ params }: PropertyPageProps) {
  let property: Property | null = null
  let error: Error | null = null
  let usingMockData = USE_MOCK_DATA

  try {
    property = await getPropertyById(params.id)

    // Check if we're using mock data
    if (property && property.id.toString().startsWith("mock-")) {
      usingMockData = true
    } else {
      usingMockData = false
    }
  } catch (err) {
    console.error("Error in PropertyPage:", err)
    error = err instanceof Error ? err : new Error("Unknown error occurred")
    usingMockData = true
  }

  // If there's an error, show an error message
  if (error) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <Link href="/property-catalog" className="text-primary hover:underline mb-4 inline-block">
          &larr; חזרה לקטלוג הנכסים
        </Link>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-red-700 mb-4">שגיאה בטעינת פרטי הנכס</h2>
          <p className="mb-4">לא ניתן לטעון את פרטי הנכס כרגע.</p>
          <p className="text-sm text-red-600">פרטי השגיאה: {error.message}</p>
        </div>
      </div>
    )
  }

  // If property not found, use Next.js notFound
  if (!property) {
    notFound()
  }

  // Rest of the component remains the same
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
    floor = 0,
    totalFloors = 0,
    parking = false,
    elevator = false,
    features = [],
    images = [],
    status = "active",
  } = property

  // בדיקה אם הנכס פעיל
  const isActive = status === "active"

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="mb-8">
        <Link href="/property-catalog" className="text-primary hover:underline mb-4 inline-block">
          &larr; חזרה לקטלוג הנכסים
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="text-lg">{property.address}</span>
        </div>
      </div>

      {usingMockData && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-8">
          <p className="text-yellow-800">
            <strong>הערה:</strong> מוצגים נתונים לדוגמה בלבד. לא ניתן להתחבר למערכת ניהול הנכסים כרגע.
          </p>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative mb-6">
            <Image
              src={images && images.length > 0 ? images[0] : `/placeholder.svg?height=600&width=800`}
              alt={title}
              width={800}
              height={600}
              className="w-full rounded-lg object-cover"
              style={{ height: "500px" }}
            />
            {!isActive && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <Badge className="text-xl py-2 px-4 bg-destructive">{type === "rent" ? "הושכר" : "נמכר"}</Badge>
              </div>
            )}
          </div>

          {images && images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mb-6">
              {images.slice(1, 5).map((image, index) => (
                <Image
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${title} - תמונה ${index + 2}`}
                  width={200}
                  height={150}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">תיאור הנכס</h2>
            <p className="text-muted-foreground whitespace-pre-line">{description}</p>
          </div>

          {features && features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">מאפיינים</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-4">
                {type === "rent" ? `₪${price.toLocaleString()} / חודש` : `₪${price.toLocaleString()}`}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <Bed className="h-6 w-6 text-primary mb-1" />
                  <span className="text-sm font-medium">{rooms} חדרים</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <Bath className="h-6 w-6 text-primary mb-1" />
                  <span className="text-sm font-medium">{bathrooms} חדרי רחצה</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <Maximize2 className="h-6 w-6 text-primary mb-1" />
                  <span className="text-sm font-medium">{area} מ"ר</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <Home className="h-6 w-6 text-primary mb-1" />
                  <span className="text-sm font-medium">
                    קומה {floor}
                    {totalFloors ? `/${totalFloors}` : ""}
                  </span>
                </div>
                {parking && (
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <Car className="h-6 w-6 text-primary mb-1" />
                    <span className="text-sm font-medium">חניה</span>
                  </div>
                )}
                {elevator && (
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <Elevator className="h-6 w-6 text-primary mb-1" />
                    <span className="text-sm font-medium">מעלית</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">מעוניינים בנכס זה?</h3>
                <p className="text-sm text-muted-foreground mb-4">השאירו פרטים ונחזור אליכם בהקדם</p>
                <ContactForm propertyId={id} source="property_page" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

