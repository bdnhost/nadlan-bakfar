import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Building, Wrench, Calendar, Shield, CreditCard, Phone } from "lucide-react"

export default function PropertyManagement() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">ניהול נכסים מקצועי</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          שירותי ניהול נכסים מקיפים המותאמים לצרכים שלכם
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid gap-8 md:grid-cols-2 items-center mb-16">
        <div className="space-y-4">
          <Badge className="mb-2">שירות מקצועי</Badge>
          <h2 className="text-3xl font-bold">למה לבחור בשירותי ניהול הנכסים שלנו?</h2>
          <p className="text-muted-foreground">
            ב"נדל"ן בכפר" אנו מציעים שירותי ניהול נכסים מקיפים המותאמים לצרכים הייחודיים שלכם. הצוות המקצועי שלנו מטפל
            בכל ההיבטים של ניהול הנכס, כך שאתם יכולים ליהנות מהשקט הנפשי ומהתשואה המקסימלית על ההשקעה שלכם.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>ניהול מקצועי ואמין</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>שירות אישי ומותאם לצרכים שלכם</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>צוות מנוסה עם ידע מקומי נרחב</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>שקיפות מלאה ודיווחים תקופתיים</span>
            </div>
          </div>
          <div className="pt-4">
            <Button asChild size="lg">
              <Link href="/contact">צור קשר לקבלת הצעת מחיר</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=800&width=1200" alt="ניהול נכסים מקצועי" fill className="object-cover" />
        </div>
      </div>

      {/* Services Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">השירותים שלנו</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            אנו מציעים מגוון רחב של שירותי ניהול נכסים המותאמים לצרכים הייחודיים של כל לקוח
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <Building className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">ניהול שוטף</h3>
              <p className="text-muted-foreground mb-4">
                טיפול בכל ההיבטים השוטפים של ניהול הנכס, כולל גביית שכר דירה, טיפול בפניות דיירים, ותיאום תיקונים
                ותחזוקה.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Wrench className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">תחזוקה ותיקונים</h3>
              <p className="text-muted-foreground mb-4">
                טיפול בכל צרכי התחזוקה והתיקונים של הנכס, כולל תיאום עם בעלי מקצוע מהימנים ופיקוח על ביצוע העבודה.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">השכרה וחידוש חוזים</h3>
              <p className="text-muted-foreground mb-4">
                טיפול בכל תהליך ההשכרה, כולל פרסום הנכס, סינון שוכרים, חתימה על חוזים וחידוש חוזים קיימים.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">ביטוח וכיסוי משפטי</h3>
              <p className="text-muted-foreground mb-4">
                ייעוץ וטיפול בכל הקשור לביטוח הנכס וכיסוי משפטי, כולל טיפול בתביעות ומחלוקות עם שוכרים.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <CreditCard className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">ניהול פיננסי</h3>
              <p className="text-muted-foreground mb-4">
                ניהול כל ההיבטים הפיננסיים של הנכס, כולל גביית שכר דירה, תשלום חשבונות, הכנת דוחות פיננסיים ותכנון
                תקציבי.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Phone className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">זמינות 24/7</h3>
              <p className="text-muted-foreground mb-4">
                צוות הניהול שלנו זמין 24 שעות ביממה, 7 ימים בשבוע, לטיפול בכל בעיה או פנייה דחופה.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">תוכניות ניהול</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            אנו מציעים מספר תוכניות ניהול המותאמות לצרכים ולתקציב שלכם
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-detail">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">ניהול בסיסי</h3>
                <div className="text-3xl font-bold text-primary">7%</div>
                <p className="text-sm text-muted-foreground">מדמי השכירות החודשיים</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>גביית שכר דירה</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>טיפול בפניות דיירים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>דוחות חודשיים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>תיאום תיקונים בסיסיים</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact?service=basic_management">פרטים נוספים</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary relative">
            <div className="absolute top-0 right-0 left-0 bg-primary text-white py-1 px-4 text-center text-sm font-medium">
              הכי פופולרי
            </div>
            <CardContent className="p-6 pt-10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">ניהול מקיף</h3>
                <div className="text-3xl font-bold text-primary">10%</div>
                <p className="text-sm text-muted-foreground">מדמי השכירות החודשיים</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>כל שירותי הניהול הבסיסי</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>שיווק הנכס ומציאת שוכרים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>חתימה וחידוש חוזים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ביקורות תקופתיות בנכס</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>תחזוקה מונעת</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>זמינות 24/7 למקרי חירום</span>
                </li>
              </ul>

              <Button className="w-full" asChild>
                <Link href="/contact?service=full_management">פרטים נוספים</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-detail">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">ניהול פרימיום</h3>
                <div className="text-3xl font-bold text-primary">12%</div>
                <p className="text-sm text-muted-foreground">מדמי השכירות החודשיים</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>כל שירותי הניהול המקיף</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ייעוץ משפטי</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ביטוח נכס מורחב</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>שיפוצים ושדרוגים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ניהול השקעות ותכנון מס</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>מנהל נכס אישי</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact?service=premium_management">פרטים נוספים</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">שאלות נפוצות</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">תשובות לשאלות הנפוצות ביותר בנושא ניהול נכסים</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">מה כולל שירות ניהול הנכסים?</h3>
              <p className="text-muted-foreground">
                שירות ניהול הנכסים שלנו כולל גביית שכר דירה, טיפול בפניות דיירים, תיאום תיקונים ותחזוקה, ביקורות
                תקופתיות בנכס, חידוש חוזים, וטיפול בכל ההיבטים השוטפים של ניהול הנכס.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">כמה עולה שירות ניהול נכסים?</h3>
              <p className="text-muted-foreground">
                עלות שירות ניהול הנכסים נעה בין 7% ל-12% מדמי השכירות החודשיים, בהתאם לרמת השירות שתבחרו. אנו מציעים
                מספר תוכניות המותאמות לצרכים ולתקציב שלכם.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">האם אתם מטפלים גם בנכסים מסחריים?</h3>
              <p className="text-muted-foreground">
                כן, אנו מציעים שירותי ניהול הן לנכסים למגורים והן לנכסים מסחריים. לנכסים מסחריים יש לנו תוכניות ניהול
                ייעודיות המותאמות לצרכים הייחודיים של נכסים אלו.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">איך מתבצעת גביית שכר הדירה?</h3>
              <p className="text-muted-foreground">
                אנו מטפלים בכל תהליך גביית שכר הדירה, כולל מעקב אחר תשלומים, טיפול בתשלומים מאוחרים, והעברת הכספים
                לחשבון הבנק שלכם. אנו מספקים דוחות חודשיים מפורטים על כל ההכנסות וההוצאות.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">מה קורה במקרה של תקלה דחופה בנכס?</h3>
              <p className="text-muted-foreground">
                צוות הניהול שלנו זמין 24 שעות ביממה, 7 ימים בשבוע, לטיפול בכל בעיה או פנייה דחופה. אנו מתאמים את הטיפול
                בתקלות עם בעלי מקצוע מהימנים ומפקחים על ביצוע העבודה.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">האם אתם מטפלים גם בהשכרה לטווח קצר (Airbnb)?</h3>
              <p className="text-muted-foreground">
                כן, אנו מציעים שירותי ניהול מיוחדים לנכסים המושכרים לטווח קצר, כולל פרסום הנכס בפלטפורמות השונות, ניהול
                ההזמנות, קבלת אורחים, ניקיון הנכס בין אירוחים, ומתן מענה לאורחים במהלך שהותם.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white p-8 rounded-lg">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">מוכנים להתחיל?</h2>
            <p className="mb-6">
              צרו איתנו קשר עוד היום כדי לקבל הצעת מחיר מותאמת אישית לשירותי ניהול הנכסים שלנו. הצוות המקצועי שלנו ישמח
              לענות על כל שאלה ולהתאים עבורכם את חבילת השירותים המושלמת.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/contact?service=property_management">צור קשר עכשיו</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative h-[300px] w-full max-w-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="צור קשר לניהול נכסים"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

