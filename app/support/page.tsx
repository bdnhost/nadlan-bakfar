import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  FileQuestion,
  Headphones,
  Calendar,
  MapPin,
  PhoneIcon as WhatsApp,
} from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function Support() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">תמיכה ושירות לקוחות</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          אנחנו כאן בשבילכם - צוות התמיכה שלנו זמין לעזור בכל שאלה
        </p>
      </div>

      {/* Contact Methods Section */}
      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <Card className="border-primary hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">טלפון</h3>
            <p className="text-muted-foreground mb-4">דברו איתנו ישירות</p>
            <p className="text-2xl font-bold text-primary mb-4">053-2062346</p>
            <Button asChild className="w-full">
              <Link href="tel:0532062346">התקשרו עכשיו</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <WhatsApp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
            <p className="text-muted-foreground mb-4">שלחו הודעה בוואטסאפ</p>
            <p className="text-lg font-bold text-primary mb-4">053-2062346</p>
            <Button asChild className="w-full">
              <Link href="https://wa.me/972532062346" target="_blank">
                פתח שיחה
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">אימייל</h3>
            <p className="text-muted-foreground mb-4">שלחו לנו הודעה</p>
            <p className="text-sm font-bold text-primary mb-4 break-all">info@nadlan.shlomi.online</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="mailto:info@nadlan.shlomi.online">שלח אימייל</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Hours Section */}
      <div className="mb-16">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-2xl font-bold mb-4">שעות פעילות</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="font-medium mb-2">תמיכה רגילה</p>
                    <div className="space-y-1 text-muted-foreground">
                      <p>ראשון - חמישי: 9:00 - 18:00</p>
                      <p>שישי: 9:00 - 13:00</p>
                      <p>שבת: סגור</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">תמיכה דחופה</p>
                    <div className="space-y-1 text-muted-foreground">
                      <p>זמין 24 שעות ביממה</p>
                      <p>7 ימים בשבוע</p>
                      <p>למקרי חירום בלבד</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Categories Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">איך נוכל לעזור?</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">בחרו את סוג התמיכה שאתם זקוקים לה</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <Headphones className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">שאלות כלליות</h3>
              <p className="text-muted-foreground mb-4">
                יש לכם שאלה כללית על השירותים שלנו? אנחנו כאן לענות על כל שאלה.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/contact">שאל שאלה</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <FileQuestion className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">תמיכה טכנית</h3>
              <p className="text-muted-foreground mb-4">
                בעיות טכניות בנכס או במערכות? הצוות הטכני שלנו יסייע לכם.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/contact?type=technical">קבל תמיכה טכנית</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">קביעת פגישה</h3>
              <p className="text-muted-foreground mb-4">
                רוצים להיפגש איתנו במשרד או בנכס? קבעו פגישה בזמן שנוח לכם.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/contact?type=meeting">קביעת פגישה</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <MessageCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">משוב והצעות</h3>
              <p className="text-muted-foreground mb-4">
                המשוב שלכם חשוב לנו. שתפו אותנו בחוויות ובהצעות לשיפור.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/contact?type=feedback">שלח משוב</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Phone className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">מקרי חירום</h3>
              <p className="text-muted-foreground mb-4">
                תקלה דחופה בנכס? אנחנו זמינים 24/7 לטיפול במקרי חירום.
              </p>
              <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                <Link href="tel:0532062346">חירום - התקשר עכשיו</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">בקרו במשרד</h3>
              <p className="text-muted-foreground mb-4">
                מוזמנים לבקר אותנו במשרד. נשמח לקבל אתכם ולעזור בכל נושא.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/about#location">כתובת המשרד</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Quick Links */}
      <div className="mb-16">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">שאלות נפוצות</h2>
            <p className="text-muted-foreground mb-6">
              לפני שפונים אלינו, אולי תמצאו את התשובה בשאלות הנפוצות שלנו:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/about#faq" className="text-primary hover:underline flex items-center gap-2">
                <FileQuestion className="h-5 w-5" />
                שאלות נפוצות כלליות
              </Link>
              <Link
                href="/property-management#faq"
                className="text-primary hover:underline flex items-center gap-2"
              >
                <FileQuestion className="h-5 w-5" />
                שאלות על ניהול נכסים
              </Link>
              <Link href="/contact#faq" className="text-primary hover:underline flex items-center gap-2">
                <FileQuestion className="h-5 w-5" />
                שאלות על רכישת נכס
              </Link>
              <Link
                href="/property-maintenance#faq"
                className="text-primary hover:underline flex items-center gap-2"
              >
                <FileQuestion className="h-5 w-5" />
                שאלות על תחזוקה
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">שלחו לנו הודעה</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            מלאו את הטופס ונחזור אליכם בהקדם האפשרי
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <ContactForm />
          </CardContent>
        </Card>
      </div>

      {/* Response Time Section */}
      <div className="mb-16">
        <Card className="bg-primary/5">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">זמני מענה</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="font-medium">פניות רגילות</p>
                </div>
                <p className="text-sm text-muted-foreground">תוך 24 שעות בימי עסקים</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="font-medium">פניות דחופות</p>
                </div>
                <p className="text-sm text-muted-foreground">תוך 4 שעות</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="font-medium">מקרי חירום</p>
                </div>
                <p className="text-sm text-muted-foreground">מענה מיידי 24/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Section */}
      <div>
        <Card>
          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold mb-4">המשרד שלנו</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">כתובת</p>
                      <p className="text-muted-foreground">רחוב ז'בוטינסקי 6, שלומי</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">טלפון</p>
                      <p className="text-muted-foreground">053-2062346</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">אימייל</p>
                      <p className="text-muted-foreground">info@nadlan.shlomi.online</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/contact">קבעו פגישה</Link>
                  </Button>
                </div>
              </div>
              <div className="h-[300px] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">מפה</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
