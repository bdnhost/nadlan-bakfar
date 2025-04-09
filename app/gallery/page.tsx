import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageGallery from "@/components/image-gallery"
import Link from "next/link"

export default function GalleryPage() {
  // נתוני תמונות לדוגמה
  const propertyImages = [
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "בית פרטי בגליל המערבי",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "דירת גן בשלומי",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "פנטהאוז בנהריה",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "וילה עם נוף לים",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "דירת 4 חדרים במעלות",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "קוטג' במטה אשר",
      width: 600,
      height: 600,
    },
  ]

  const areaImages = [
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "נוף הרים בגליל המערבי",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "חוף הים בנהריה",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "פארק בשלומי",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "מרכז העיר מעלות",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "נוף כפרי במטה אשר",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "שמורת טבע בגליל המערבי",
      width: 600,
      height: 600,
    },
  ]

  const officeImages = [
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: 'משרד נדל"ן בכפר',
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: 'צוות נדל"ן בכפר',
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "פגישה עם לקוחות",
      width: 600,
      height: 600,
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "חתימת חוזה",
      width: 600,
      height: 600,
    },
  ]

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">גלריית תמונות</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          צפו בתמונות של נכסים, אזורים ופעילות המשרד שלנו
        </p>
      </div>

      <Tabs defaultValue="properties" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="properties">נכסים</TabsTrigger>
          <TabsTrigger value="areas">אזורים</TabsTrigger>
          <TabsTrigger value="office">המשרד שלנו</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <div className="mb-6">
            <p className="text-lg text-center mb-6">תמונות של נכסים נבחרים מהמאגר שלנו. לחצו על תמונה להגדלה.</p>
            <ImageGallery images={propertyImages} columns={3} />
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/property-catalog">צפו בכל הנכסים</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="areas">
          <div className="mb-6">
            <p className="text-lg text-center mb-6">תמונות של אזורים בגליל המערבי. לחצו על תמונה להגדלה.</p>
            <ImageGallery images={areaImages} columns={3} />
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link href="/blog">קראו עוד על האזור</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="office">
          <div className="mb-6">
            <p className="text-lg text-center mb-6">תמונות מהמשרד שלנו ופעילות הצוות. לחצו על תמונה להגדלה.</p>
            <ImageGallery images={officeImages} columns={2} />
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/about">אודות המשרד</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

