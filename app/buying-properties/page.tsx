import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Search, FileText, Home, Key, Shield, Phone } from "lucide-react"

export default function BuyingProperties() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">קניית נכסים</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          מצאו את הנכס המושלם עבורכם עם הליווי המקצועי שלנו
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid gap-8 md:grid-cols-2 items-center mb-16">
        <div className="space-y-4">
          <Badge className="mb-2">שירות מקצועי</Badge>
          <h2 className="text-3xl font-bold">למה לבחור בנו לרכישת נכס?</h2>
          <p className="text-muted-foreground">
            ב"נדל"ן בכפר" אנו מציעים ליווי מלא ומקצועי בכל שלבי תהליך רכישת הנכס. הצוות המנוסה שלנו מכיר לעומק
            את שוק הנדל"ן בגליל המערבי ויעזור לכם למצוא את הנכס שמתאים בדיוק לצרכים ולתקציב שלכם.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>ידע מקומי נרחב ומעמיק</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>ליווי צמוד לאורך כל התהליך</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>מגוון רחב של נכסים איכותיים</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>ייעוץ משפטי ופיננסי מקצועי</span>
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
            alt="קניית נכסים"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Process Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">תהליך רכישת הנכס</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            אנו מלווים אתכם בכל שלב לאורך הדרך לרכישת הנכס המושלם
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. חיפוש וסינון</h3>
              <p className="text-muted-foreground">
                נעזור לכם לזהות את הצרכים שלכם ולמצוא נכסים מתאימים בהתאם לתקציב ולדרישות שלכם.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. סיורים בנכסים</h3>
              <p className="text-muted-foreground">
                נארגן עבורכם סיורים בנכסים המתאימים ביותר, תוך מתן מידע מלא על כל נכס ואזור.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. בדיקות ומשא ומתן</h3>
              <p className="text-muted-foreground">
                נבצע עבורכם בדיקות מקדימות ונסייע במשא ומתן עם המוכר להשגת התנאים הטובים ביותר.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">4. בדיקות משפטיות</h3>
              <p className="text-muted-foreground">
                נוודא שהנכס נקי מחובות ושכל המסמכים המשפטיים תקינים לפני ההתקשרות.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">5. חתימה על חוזה</h3>
              <p className="text-muted-foreground">
                נלווה אתכם בתהליך חתימת החוזה ונוודא שכל התנאים ברורים ומוסכמים.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">6. מסירת הנכס</h3>
              <p className="text-muted-foreground">
                נסייע לכם בתהליך העברת הבעלות ומסירת המפתחות, כולל כל ההיבטים הטכניים והמשפטיים.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Types of Properties Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">סוגי הנכסים שאנו מציעים</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            מגוון רחב של נכסים איכותיים בכל רחבי הגליל המערבי
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-detail hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Home className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">דירות מגורים</h3>
              <p className="text-sm text-muted-foreground">דירות למגורים בכל הגדלים ובמגוון מיקומים</p>
            </CardContent>
          </Card>

          <Card className="border-detail hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Home className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">בתים פרטיים</h3>
              <p className="text-sm text-muted-foreground">בתים פרטיים עם חצרות וגינות</p>
            </CardContent>
          </Card>

          <Card className="border-detail hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Home className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">דירות גן ופנטהאוזים</h3>
              <p className="text-sm text-muted-foreground">נכסים יוקרתיים עם נוף ומרחב</p>
            </CardContent>
          </Card>

          <Card className="border-detail hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Home className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">נכסים מסחריים</h3>
              <p className="text-sm text-muted-foreground">משרדים, חנויות ומבני תעשייה</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">שאלות נפוצות</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">תשובות לשאלות הנפוצות ביותר בנושא קניית נכסים</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">כמה זמן לוקח תהליך רכישת נכס?</h3>
              <p className="text-muted-foreground">
                תהליך רכישת נכס יכול להימשך בין חודש לשלושה חודשים, תלוי במורכבות העסקה ובמהירות הצדדים. אנו
                פועלים להאיץ את התהליך ככל האפשר תוך שמירה על כל ההיבטים המשפטיים.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">האם אתם מסייעים במימון ומשכנתא?</h3>
              <p className="text-muted-foreground">
                כן, אנו עובדים עם יועצי משכנתאות מקצועיים שיעזרו לכם למצוא את המסלול המתאים ביותר לצרכים שלכם
                ולקבל את התנאים הטובים ביותר.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">מהן העלויות הנלוות לרכישת נכס?</h3>
              <p className="text-muted-foreground">
                מלבד מחיר הנכס, יש לקחת בחשבון מס רכישה, שכר טרחת עורך דין, עמלת תיווך, וביטוח נכס. נסייע לכם
                להבין את כל העלויות מראש.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">איזה בדיקות צריך לבצע לפני הרכישה?</h3>
              <p className="text-muted-foreground">
                מומלץ לבצע בדיקת מהנדס, בדיקת טאבו לוודא שאין עיקולים או חובות, ובדיקת הסכמים ותקנונים של הבית
                המשותף. אנו נסייע בתיאום כל הבדיקות הנדרשות.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">האם אפשר לבטל עסקה לאחר חתימה?</h3>
              <p className="text-muted-foreground">
                בחוק יש תקופת חשיבה של 7 ימים לביטול העסקה, אך יש תנאים מסוימים. חשוב להבין את כל ההשלכות לפני
                החתימה, ואנו נוודא שאתם מבינים את כל ההיבטים.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">מה יותר משתלם - לקנות או לשכור?</h3>
              <p className="text-muted-foreground">
                התשובה תלויה במצבכם האישי, בתכניות העתידיות, ובמצב השוק. אנו נעזור לכם לנתח את היתרונות והחסרונות
                של כל אפשרות ולקבל החלטה מושכלת.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white p-8 rounded-lg">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">מוכנים למצוא את הנכס המושלם?</h2>
            <p className="mb-6">
              צרו איתנו קשר עוד היום ונתחיל יחד את התהליך לרכישת הנכס שלכם. הצוות המקצועי שלנו ישמח לענות על כל
              שאלה ולהתאים עבורכם את הפתרון המושלם.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">צור קשר עכשיו</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/property-catalog">עיון בנכסים</Link>
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
