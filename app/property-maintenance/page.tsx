import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Wrench, PaintBucket, Zap, Droplets, Wind, Hammer, Phone } from "lucide-react"

export default function PropertyMaintenance() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">תחזוקת נכסים</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          שירותי תחזוקה מקצועיים לשמירה על ערך הנכס שלכם
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid gap-8 md:grid-cols-2 items-center mb-16">
        <div className="space-y-4">
          <Badge className="mb-2">שירות איכותי</Badge>
          <h2 className="text-3xl font-bold">למה תחזוקת נכס חשובה?</h2>
          <p className="text-muted-foreground">
            תחזוקה שוטפת ואיכותית של הנכס היא המפתח לשמירה על ערכו לאורך זמן. ב"נדל"ן בכפר" אנו מציעים שירותי
            תחזוקה מקיפים המבטיחים שהנכס שלכם יישאר במצב מצוין, תוך מניעת בעיות עתידיות והוצאות מיותרות.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>שמירה על ערך הנכס</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>מניעת תקלות ונזקים</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>חיסכון בטווח הארוך</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>שקט נפשי למשכירים ולדיירים</span>
            </div>
          </div>
          <div className="pt-4">
            <Button asChild size="lg">
              <Link href="/contact">קבלו הצעת מחיר</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="תחזוקת נכסים"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">שירותי התחזוקה שלנו</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            אנו מציעים מגוון רחב של שירותי תחזוקה מקצועיים לכל סוגי הנכסים
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <Wrench className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">תיקונים כלליים</h3>
              <p className="text-muted-foreground mb-4">
                תיקונים שוטפים בנכס, כולל תיקון דלתות, חלונות, ארונות ועוד. אנו מטפלים בכל בעיה קטנה לפני שהיא
                הופכת לגדולה.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• תיקון דלתות וחלונות</li>
                <li>• תיקון ארונות ומגירות</li>
                <li>• החלפת מנעולים</li>
                <li>• תיקוני נגרות</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <PaintBucket className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">צביעה ושיפוצים</h3>
              <p className="text-muted-foreground mb-4">
                שירותי צביעה מקצועיים ושיפוצים קלים לשמירה על מראה הנכס ורענון מעת לעת.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• צביעת קירות פנים וחוץ</li>
                <li>• תיקון סדקים</li>
                <li>• שיפוץ מטבחים וחדרי רחצה</li>
                <li>• החלפת ריצוף</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">חשמל</h3>
              <p className="text-muted-foreground mb-4">
                שירותי חשמלאות מקצועיים עם דגש על בטיחות ואמינות.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• תיקון תקלות חשמל</li>
                <li>• החלפת גופי תאורה</li>
                <li>• התקנת שקעים ומפסקים</li>
                <li>• בדיקת מערכות חשמל</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Droplets className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">אינסטלציה</h3>
              <p className="text-muted-foreground mb-4">
                טיפול בכל בעיות האינסטלציה - ברזים, צנרת, דוודים ועוד.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• תיקון נזילות</li>
                <li>• פתיחת סתימות</li>
                <li>• תיקון דוודים</li>
                <li>• החלפת ברזים</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Wind className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">מיזוג אוויר וחימום</h3>
              <p className="text-muted-foreground mb-4">
                תחזוקה ותיקון מערכות מיזוג אוויר וחימום לנוחות מקסימלית.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• ניקוי ותחזוקת מזגנים</li>
                <li>• תיקון מערכות חימום</li>
                <li>• בדיקות תקופתיות</li>
                <li>• החלפת פילטרים</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Hammer className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">תחזוקת גינות וחצרות</h3>
              <p className="text-muted-foreground mb-4">
                שמירה על המרחבים החיצוניים במצב מצוין לאורך כל השנה.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• גיזום ועיצוב גינות</li>
                <li>• השקיה וטיפול בצמחים</li>
                <li>• ניקיון שבילים</li>
                <li>• תיקון גדרות</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Maintenance Plans Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">תוכניות תחזוקה</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            בחרו את תוכנית התחזוקה המתאימה לצרכים שלכם
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-detail">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">תחזוקה בסיסית</h3>
                <div className="text-3xl font-bold text-primary">₪500</div>
                <p className="text-sm text-muted-foreground">לחודש</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ביקור חודשי</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>בדיקות בטיחות</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>תיקונים קלים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>דוח חודשי</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact?service=basic_maintenance">פרטים נוספים</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary relative">
            <div className="absolute top-0 right-0 left-0 bg-primary text-white py-1 px-4 text-center text-sm font-medium">
              הכי פופולרי
            </div>
            <CardContent className="p-6 pt-10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">תחזוקה מקיפה</h3>
                <div className="text-3xl font-bold text-primary">₪1,200</div>
                <p className="text-sm text-muted-foreground">לחודש</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>כל שירותי התחזוקה הבסיסית</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ביקורים דו-שבועיים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>תיקונים מקיפים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>תחזוקת גינה</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>מענה 24/7 לחירום</span>
                </li>
              </ul>

              <Button className="w-full" asChild>
                <Link href="/contact?service=full_maintenance">פרטים נוספים</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-detail">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">תחזוקה פרימיום</h3>
                <div className="text-3xl font-bold text-primary">₪2,000</div>
                <p className="text-sm text-muted-foreground">לחודש</p>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>כל שירותי התחזוקה המקיפה</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ביקור שבועי</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>שיפוצים ושדרוגים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>ניהול קבלנים</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>תחזוקת בריכה/ג'קוזי</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>מנהל נכס ייעודי</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact?service=premium_maintenance">פרטים נוספים</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">היתרונות של תחזוקה שוטפת</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">חיסכון כספי</h3>
                <p className="text-sm text-muted-foreground">
                  תיקון בעיות קטנות מונע הוצאות גבוהות בעתיד
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">שמירה על ערך</h3>
                <p className="text-sm text-muted-foreground">
                  נכס מתוחזק היטב שומר על ערכו ואף מגדיל אותו
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">שקט נפשי</h3>
                <p className="text-sm text-muted-foreground">
                  ידיעה שהנכס מטופל על ידי מקצועים
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">דיירים מרוצים</h3>
                <p className="text-sm text-muted-foreground">
                  תחזוקה טובה מגדילה שביעות רצון דיירים
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">שאלות נפוצות</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">כמה עולה תיקון ממוצע?</h3>
              <p className="text-muted-foreground">
                עלות התיקון משתנה בהתאם לסוג התקלה והיקף העבודה. אנו מספקים הצעת מחיר ברורה לפני כל עבודה.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">מה המענה לשיחות חירום?</h3>
              <p className="text-muted-foreground">
                אנו זמינים 24/7 למקרי חירום ומגיעים למקום תוך שעתיים בתיאום מראש.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">האם אפשר לבטל את ההסכם?</h3>
              <p className="text-muted-foreground">
                ניתן לבטל את ההסכם בהודעה של 30 יום מראש. אנו גמישים ומתאימים את עצמנו לצרכים שלכם.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">מי אחראי על חומרים?</h3>
              <p className="text-muted-foreground">
                אנו דואגים לכל החומרים הנדרשים. העלות כלולה במחיר או נדרשת אישור מראש.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white p-8 rounded-lg">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">צריכים תחזוקה מקצועית?</h2>
            <p className="mb-6">
              צרו איתנו קשר עוד היום ונדאג לנכס שלכם. הצוות המקצועי שלנו ישמח לתת לכם הצעת מחיר מותאמת אישית.
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
