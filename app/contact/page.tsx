import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function Contact() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">יצירת קשר</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          אנחנו כאן לענות על כל שאלה ולסייע בכל נושא
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">פרטי התקשרות</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-lg">053-2062346</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-lg">info@nadlan.shlomi.online</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <span className="text-lg">רחוב ז'בוטינסקי 6, שלומי</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">שעות פעילות</h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>ראשון - חמישי</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>שישי</span>
                    <span>9:00 - 13:00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>שבת</span>
                    <span>סגור</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="מפת המשרד"
                  width={500}
                  height={300}
                  className="w-full h-[200px] object-cover rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">השאירו פרטים ונחזור אליכם</h2>
            <ContactForm />
          </CardContent>
        </Card>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">שאלות נפוצות</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">מה תהליך רכישת נכס?</h3>
              <p>
                תהליך רכישת נכס כולל מספר שלבים: חיפוש ובחירת נכס, בדיקות מקדימות, חתימה על חוזה רכישה, העברת בעלות
                ותשלום. התהליך עשוי להשתנות בהתאם לסוג הנכס והמדינה בה מתבצעת הרכישה.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">כמה עולה ניהול דירה בגליל המערבי?</h3>
              <p>
                המחיר לניהול נכס בגליל המערבי נע בדרך כלל בין 7% ל-10% מדמי השכירות. המחיר משתנה בהתאם לסוג הנכס והיקף
                השירותים שאתם צריכים.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">מהם השירותים הניתנים בניהול דירה?</h3>
              <p>
                השירותים העיקריים הם ניהול שוטף, תיקונים ותחזוקה, שיווק והשכרה, ליווי חוזי שכירות, גבייה, מענה זמין 24/7
                לדיירים שלכם שככה תמיד יש לכם שקט מהדיירים.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">איך מתחילים בתהליך הכנת הנכס ל-Airbnb?</h3>
              <p>
                התחילו בהערכת מצב הנכס והכנתו לקראת האורחים. זה כולל תיקונים ושיפוצים קלים, ניקיון יסודי, וריהוט הנכס
                בצורה נוחה ומזמינה.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

