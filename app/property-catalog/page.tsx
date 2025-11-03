import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, MapPin, Maximize2 } from "lucide-react"
import { getProperties, type Property } from "@/lib/api-service"
import { USE_MOCK_DATA } from "@/lib/config"

// אלץ rendering דינמי - לא static generation
// זה חשוב כי הדף תלוי במסד נתונים שמשתנה
export const dynamic = "force-dynamic"
export const revalidate = 0

// עדכון הלוגיקה בדף קטלוג הנכסים כדי להציג הודעה רק אם באמת משתמשים בנתוני דוגמה
export default async function PropertyCatalog() {
  // Try to get properties, but handle errors gracefully
  let properties: Property[] = []
  let error: Error | null = null
  let usingMockData = USE_MOCK_DATA

  try {
    properties = await getProperties()

    // Check if we're using mock data by checking if the first property ID starts with "mock-"
    if (properties.length > 0 && properties[0]?.id?.toString().startsWith("mock-")) {
      usingMockData = true
    } else {
      usingMockData = false
    }
  } catch (err) {
    console.error("Error in PropertyCatalog:", err)
    error = err instanceof Error ? err : new Error("Unknown error occurred")
    usingMockData = true
  }

  // If there's an error, show an error message
  if (error) {
    return (
      <div className="container px-4 md:px-6 py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">קטלוג נכסים</h1>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-red-700 mb-4">שגיאה בטעינת הנכסים</h2>
          <p className="mb-4">לא ניתן לטעון את רשימת הנכסים כרגע. מציג נתונים לדוגמה.</p>
          <p className="text-sm text-red-600">פרטי השגיאה: {error.message}</p>
        </div>
      </div>
    )
  }

  // Show a notification if we're using mock data
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">קטלוג נכסים</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          מצאו את הנכס המושלם עבורכם מתוך מגוון הנכסים שלנו
        </p>
      </div>

      {usingMockData && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-8">
          <p className="text-yellow-800">
            <strong>הערה:</strong> מוצגים נכסים לדוגמה בלבד. לא ניתן להתחבר למערכת ניהול הנכסים כרגע.
          </p>
        </div>
      )}

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all">הכל</TabsTrigger>
          <TabsTrigger value="sale">למכירה</TabsTrigger>
          <TabsTrigger value="rent">להשכרה</TabsTrigger>
          <TabsTrigger value="commercial">מסחרי</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="sale">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties
              .filter((p) => p.type === "sale")
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="rent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties
              .filter((p) => p.type === "rent")
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="commercial">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties
              .filter((p) => p.type === "commercial")
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PropertyCard({ property }: { property: Property }) {
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
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="w-full h-[200px] object-cover"
        />
        {featured && <Badge className="absolute top-2 right-2 bg-primary">נכס מומלץ</Badge>}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-1 text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{location}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between mb-4">
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
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/property/${id}`}>פרטים נוספים</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

