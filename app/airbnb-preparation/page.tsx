import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle,
  Camera,
  Bed,
  Wifi,
  Coffee,
  Tv,
  Star,
  Home,
  Shield,
  Phone,
  Calendar,
  Users,
} from "lucide-react"

export default function AirbnbPreparation() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">הכנת נכס ל-Airbnb</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          הפכו את הנכס שלכם למקור הכנסה משתלם דרך אירוח קצר
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid gap-8 md:grid-cols-2 items-center mb-16">
        <div className="space-y-4">
          <Badge className="mb-2">שירות מקצועי</Badge>
          <h2 className="text-3xl font-bold">למה לבחור בנו להכנת הנכס ל-Airbnb?</h2>
          <p className="text-muted-foreground">
            הכנת נכס להשכרה ב-Airbnb דורשת מומחיות ותשומת לב לפרטים. ב"נדל"ן בכפר" אנו מציעים שירות מלא להכנת
            הנכס שלכם, החל מעיצוב ועד לצילום מקצועי ופרסום. אנו נדאג שהנכס שלכם יבלוט בין המתחרים ויזכה לביקורות
            מצוינות.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>הכנה מקצועית ומלאה</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>צילום מקצועי ופרסום</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>ליווי מלא וייעוץ</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>ניהול מלא לאחר ההכנה</span>
            </div>
          </div>
          <div className="pt-4">
            <Button asChild size="lg">
              <Link href="/contact">התחילו את התהליך</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="הכנת נכס ל-Airbnb"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Process Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">תהליך ההכנה ל-Airbnb</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            אנו מלווים אתכם בכל שלב בתהליך ההכנה והשקת הנכס
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. סקר וייעוץ</h3>
              <p className="text-muted-foreground">
                ביקור בנכס לסקירה מקיפה והערכת פוטנציאל. נספק המלצות לשיפורים ושדרוגים הדרושים.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Bed className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. עיצוב וריהוט</h3>
              <p className="text-muted-foreground">
                עיצוב הנכס ורכישת ריהוט וציוד מתאימים. נדאג למראה מזמין ונוח לאורחים.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Wifi className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. שדרוגים טכנולוגיים</h3>
              <p className="text-muted-foreground">
                התקנת Wi-Fi מהיר, טלוויזיה חכמה, מנעול חכם ומערכות אחרות הנדרשות לאירוח מודרני.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">4. צילום מקצועי</h3>
              <p className="text-muted-foreground">
                צילום מקצועי של הנכס להצגה מושלמת בפלטפורמת Airbnb ולהגדלת המרות הזמנות.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">5. פרסום בפלטפורמה</h3>
              <p className="text-muted-foreground">
                יצירת דף נכס מושלם ב-Airbnb עם תיאור מפורט, תמונות מקצועיות ומחיר תחרותי.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">6. ניהול שוטף</h3>
              <p className="text-muted-foreground">
                ניהול מלא של ההזמנות, תקשורת עם אורחים, ניקיון ותחזוקה שוטפת.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* What's Included Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">מה כלול בשירות?</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">השירות המקיף שלנו כולל את כל מה שצריך</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">אבזור והכנה</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>מצעים איכותיים ומגבות</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>כלי מטבח וכלי אוכל</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>מוצרי ניקיון ותחזוקה</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>מוצרי אמבטיה איכותיים</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>ריהוט מעוצב ונוח</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">טכנולוגיה ותקשורת</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Wi-Fi מהיר ויציב</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>טלוויזיה חכמה עם נטפליקס</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>מנעול חכם לכניסה עצמאית</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>מערכת קפה איכותית</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>מכשירי חשמל מודרניים</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">פרסום ושיווק</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>צילום מקצועי</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>כתיבת תיאור מושך</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>ניהול עמוד Airbnb</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>אסטרטגיית תמחור</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>פרסום בפלטפורמות נוספות</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">ניהול שוטף</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>ניהול הזמנות ולוח שנה</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>תקשורת עם אורחים 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>ניקיון בין אורחים</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>תחזוקה שוטפת</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>דוחות הכנסות חודשיים</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">למה כדאי להשכיר ב-Airbnb?</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">הכנסה גבוהה</h3>
                <p className="text-sm text-muted-foreground">
                  הכנסה גבוהה פי 2-3 לעומת השכרה רגילה
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">גמישות</h3>
                <p className="text-sm text-muted-foreground">
                  שליטה מלאה על לוח השנה והזמינות
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">ביטחון</h3>
                <p className="text-sm text-muted-foreground">
                  פלטפורמה מוגנת עם ביטוח למארח
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">חשיפה גלובלית</h3>
                <p className="text-sm text-muted-foreground">
                  מיליוני משתמשים פוטנציאליים ברחבי העולם
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">חבילות הכנה ל-Airbnb</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-detail">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">חבילת התחלה</h3>
                <div className="text-3xl font-bold text-primary">₪5,000</div>
                <p className="text-sm text-muted-foreground">תשלום חד פעמי</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>סקר וייעוץ</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>המלצות לשיפורים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>צילום בסיסי</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>יצירת דף Airbnb</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact?service=airbnb_basic">פרטים נוספים</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary relative">
            <div className="absolute top-0 right-0 left-0 bg-primary text-white py-1 px-4 text-center text-sm font-medium">
              הכי פופולרי
            </div>
            <CardContent className="p-6 pt-10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">חבילה מקיפה</h3>
                <div className="text-3xl font-bold text-primary">₪15,000</div>
                <p className="text-sm text-muted-foreground">תשלום חד פעמי</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>כל שירותי חבילת ההתחלה</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>עיצוב וריהוט</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>צילום מקצועי</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>אבזור מלא</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>התקנת מנעול חכם</span>
                </li>
              </ul>

              <Button className="w-full" asChild>
                <Link href="/contact?service=airbnb_full">פרטים נוספים</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-detail">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">חבילת פרימיום + ניהול</h3>
                <div className="text-3xl font-bold text-primary">₪25,000</div>
                <p className="text-sm text-muted-foreground">+ 20% מההכנסות</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>כל שירותי החבילה המקיפה</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ריהוט פרימיום</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>טכנולוגיה חכמה</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ניהול מלא 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ניקיון ותחזוקה</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact?service=airbnb_premium">פרטים נוספים</Link>
              </Button>
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
              צרו איתנו קשר עוד היום ונתחיל את התהליך להפוך את הנכס שלכם למקור הכנסה משתלם. הצוות המקצועי שלנו
              ישמח לענות על כל שאלה ולהתאים עבורכם את החבילה המושלמת.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">צור קשר עכשיו</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6" />
              <div>
                <p className="text-sm opacity-90">התקשרו אלינו</p>
                <p className="text-xl font-bold">053-2062346</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
