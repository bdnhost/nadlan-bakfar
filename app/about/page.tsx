import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

export default function About() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">אודות "נדל"ן בכפר"</h1>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20 items-center">
        <div>
          <Image
            alt="צוות נדל״ן בכפר"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            height={400}
            src="/placeholder.svg?height=400&width=400"
            width={400}
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            ברוכים הבאים ל"נדל"ן בכפר", הבית שלכם לכל פתרונות הנדל"ן בגליל המערבי. מהיום בו נפתחנו בשנת 2024, מטרתנו היא
            להעניק שירות אישי, מקצועי ואמין לכל לקוחותינו. אם אתם מחפשים לקנות, למכור, לשכור או לנהל נכסים, אנו כאן
            לשירותכם עם ידע רחב וניסיון מעמיק בתחום הנדל"ן.
          </p>
          <h2 className="text-2xl font-bold mt-6">מי אנחנו?</h2>
          <p className="text-lg">
            "נדל"ן בכפר" הוקמה על ידי צוות של מומחי נדל"ן בעלי ניסיון של שנים בתחום. החברה ממוקמת בשלומי ופועלת בכל רחבי
            הגליל המערבי, מתמחה במגוון רחב של פעילויות נדל"ן כולל מכירות, השכרות, ניהול נכסים וייעוץ נדל"ן.
          </p>

          <h2 className="text-2xl font-bold mt-6">מה אנו מציעים?</h2>
          <ul className="space-y-2 text-lg">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>מכירה ורכישה: מסייעים לכם למצוא את הנכס המושלם או למכור את נכסכם במחיר הטוב ביותר.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>השכרות וניהול נכסים: אנו מציעים שירותי ניהול נכסים מקיפים כולל תחזוקה, גבייה וייעוץ פיננסי.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>ייעוץ משפטי: שירותי ייעוץ והכוונה משפטית בכל הקשור לעסקאות נדל"ן.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>שירותי תיווך: חווית תיווך אמינה ושקופה באמצעות סוכנים מנוסים.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-6">על המנהל שלנו</h2>
          <p className="text-lg">
            יעקב בידני, מתווך נדל"ן מקצועי עם למעלה מ-20 שנות ניסיון ובעל רישיון לעסוק בנדל"ן. יעקב חי ונושם את עולם
            הנדל"ן ומביא עמו ידע עשיר ומקצועיות ללא פשרות. מתגורר ביישוב שלומי, יעקב מעורב חברתית בקהילה ומקדם פרויקטים
            שונים לשיפור איכות החיים באזור.
          </p>

          <h2 className="text-2xl font-bold mt-6">המיקום שלנו</h2>
          <p className="text-lg">
            משרדנו נמצא 100 מטר מהכניסה ליישוב שלומי, מרחק הליכה מהנופים הקסומים של ראש הנקרה ומפלי כזיב.
          </p>

          <div className="flex flex-col gap-2 mt-6">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-lg">053-2062346</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-lg">info@nadlan.shlomi.online</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <span className="text-lg">רחוב ז'בוטינסקי 6, שלומי</span>
            </div>
          </div>

          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">צור קשר</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">הצוות שלנו</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Image
              alt="יעקב בידני"
              className="aspect-square overflow-hidden rounded-full object-cover mb-4"
              height={200}
              src="/placeholder.svg?height=200&width=200"
              width={200}
            />
            <h3 className="text-xl font-bold">יעקב בידני</h3>
            <p className="text-muted-foreground">מנהל ומייסד</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              alt="מיכל כהן"
              className="aspect-square overflow-hidden rounded-full object-cover mb-4"
              height={200}
              src="/placeholder.svg?height=200&width=200"
              width={200}
            />
            <h3 className="text-xl font-bold">מיכל כהן</h3>
            <p className="text-muted-foreground">מנהלת שיווק</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              alt="דוד לוי"
              className="aspect-square overflow-hidden rounded-full object-cover mb-4"
              height={200}
              src="/placeholder.svg?height=200&width=200"
              width={200}
            />
            <h3 className="text-xl font-bold">דוד לוי</h3>
            <p className="text-muted-foreground">יועץ נדל"ן</p>
          </div>
        </div>
      </div>
    </div>
  )
}

