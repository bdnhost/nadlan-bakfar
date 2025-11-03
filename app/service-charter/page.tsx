import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Heart, Shield, Clock, Users, TrendingUp, Award, Phone } from "lucide-react"

export default function ServiceCharter() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">אמנת השירות שלנו</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          התחייבותנו לשירות איכותי, מקצועי ואמין
        </p>
      </div>

      {/* Introduction Section */}
      <div className="mb-16">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">המחויבות שלנו אליכם</h2>
            <p className="text-lg text-muted-foreground mb-4">
              ב"נדל"ן בכפר" אנו מאמינים שמצוינות בשירות היא המפתח להצלחה משותפת. אמנת השירות שלנו מגדירה את
              הסטנדרטים הגבוהים שאנו מחויבים להם בכל אינטראקציה עם לקוחותינו, שותפינו ובעלי העניין שלנו.
            </p>
            <p className="text-lg text-muted-foreground">
              אנו מתחייבים לספק שירות יוצא דופן, להיות שקופים בכל פעולותינו, ולעמוד בהבטחות שלנו. הערכים והעקרונות
              הבאים מנחים אותנו בכל יום.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Core Values Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">הערכים המרכזיים שלנו</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            הערכים שמנחים אותנו בכל פעולה ובכל החלטה
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">אכפתיות</h3>
              <p className="text-muted-foreground">
                אנו מתייחסים לכל לקוח ולקוחה באכפתיות אמיתית. הצרכים שלכם הם בראש סדר העדיפויות שלנו, ואנו עושים
                הכל כדי להבטיח את שביעות רצונכם.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">אמינות</h3>
              <p className="text-muted-foreground">
                אנו פועלים בשקיפות מלאה ועומדים מאחורי הבטחותינו. אמון הוא הבסיס לכל מערכת יחסים מוצלחת, ואנו
                מתחייבים לשמור עליו.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">מקצועיות</h3>
              <p className="text-muted-foreground">
                צוות המומחים שלנו מחויב להעניק שירות מקצועי ברמה הגבוהה ביותר, תוך שמירה על סטנדרטים מחמירים
                ולמידה מתמשכת.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">זמינות</h3>
              <p className="text-muted-foreground">
                אנו זמינים עבורכם מתי שתצטרכו. המענה שלנו מהיר ויעיל, ואנו מחויבים לטפל בכל פנייה בזמן הקצר ביותר.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">מצוינות</h3>
              <p className="text-muted-foreground">
                אנו שואפים למצוינות בכל מה שאנו עושים. אנו תמיד מחפשים דרכים לשפר את השירות שלנו ולהעניק ללקוחותינו
                את החוויה הטובה ביותר.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">שיתוף פעולה</h3>
              <p className="text-muted-foreground">
                אנו רואים בלקוחותינו שותפים. אנו מאמינים בעבודת צוות ובשיתוף פעולה הדוק לקידום המטרות המשותפות שלנו.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Commitments Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">ההתחייבויות שלנו</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            אלו הם התחייבויות קונקרטיות שאנו מקיימים כלפי כל לקוח
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">תקשורת ושקיפות</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>מענה לפניות תוך 24 שעות בימי עסקים</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>עדכונים שוטפים על התקדמות התהליכים</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>שקיפות מלאה בכל הנושאים הפיננסיים</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>הסברים ברורים ומפורטים בכל שלב</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">שירות לקוחות</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>יחס אישי ומותאם לכל לקוח</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>זמינות 24/7 למקרי חירום</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>טיפול מהיר ויעיל בכל בעיה</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>מעקב צמוד עד לפתרון מלא</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">מקצועיות ואיכות</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>עבודה לפי הסטנדרטים הגבוהים ביותר</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>שימוש בטכנולוגיות ושיטות מתקדמות</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>הכשרה מתמשכת של הצוות</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>בקרת איכות קפדנית בכל פרויקט</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">אתיקה ואחריות</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>פעולה לפי כללי האתיקה המקצועית</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>שמירה קפדנית על סודיות מידע</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>מחויבות לכללי המשחק ההוגנים</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>אחריות מלאה על כל פעולותינו</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Service Standards Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">סטנדרטי השירות שלנו</h2>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">זמני מענה</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">פניות רגילות</p>
                      <p className="text-sm text-muted-foreground">מענה תוך 24 שעות בימי עסקים</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">פניות דחופות</p>
                      <p className="text-sm text-muted-foreground">מענה תוך 4 שעות</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">מקרי חירום</p>
                      <p className="text-sm text-muted-foreground">מענה מיידי 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">זמן הגעה לנכס</p>
                      <p className="text-sm text-muted-foreground">תוך 2 שעות במקרי חירום</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">איכות השירות</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>שביעות רצון לקוחות של מעל 95%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>פתרון רוב הבעיות בפעם הראשונה</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>דוחות חודשיים מפורטים לכל לקוח</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>ביקורות שביעות רצון רבעוניות</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Section */}
      <div className="mb-16">
        <Card className="bg-primary/5">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">משוב ושיפור מתמיד</h2>
            <p className="text-lg text-muted-foreground mb-6">
              אנו מאמינים בשיפור מתמיד ובלמידה מהמשוב שלכם. אנו מעודדים אתכם לשתף אותנו בחוויות שלכם, בטוב ובפחות
              טוב. כל משוב עוזר לנו להשתפר ולהעניק לכם שירות טוב יותר.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/contact">שלחו משוב</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">דווחו על תקלה</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white p-8 rounded-lg">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">יש לכם שאלות?</h2>
            <p className="mb-6">
              אנחנו כאן כדי לענות על כל שאלה ולספק לכם את השירות הטוב ביותר. צרו איתנו קשר בכל דרך שנוחה לכם.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">צור קשר</Link>
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
