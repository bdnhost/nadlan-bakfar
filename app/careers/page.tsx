import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Award,
  Briefcase,
  Building,
  CheckCircle,
  Clock,
  MapPin,
  Percent,
  Shield,
  Star,
  Users,
  Phone,
  Mail,
} from "lucide-react"
import JobApplicationForm from "@/components/job-application-form"

export const metadata: Metadata = {
  title: "דרושים | נדל״ן בכפר - הצטרפו לצוות המוביל בגליל המערבי",
  description:
    "הצטרפו לצוות המוביל של נדל״ן בכפר. אנו מחפשים סוכני נדל״ן מנוסים ומתחילים עם תעודה. אחוזים נאים, מעטפת דיגיטלית מתקדמת מבוססת AI וליווי מקצועי.",
}

export default function CareersPage() {
  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      {/* כותרת ראשית */}
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">דרושים לנדל״ן בכפר</h1>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          הצטרפו לצוות המוביל בגליל המערבי והיו חלק מהמהפכה בשוק הנדל״ן הכפרי
        </p>
      </div>

      {/* תמונת באנר */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="צוות נדל״ן בכפר"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">בואו להצליח איתנו</h2>
          <p className="text-lg md:text-xl max-w-[700px] text-center">
            אנו מחפשים את האנשים הטובים ביותר להצטרף למשפחת נדל״ן בכפר
          </p>
          <Button asChild size="lg" className="mt-6">
            <a href="#apply">הגש מועמדות עכשיו</a>
          </Button>
        </div>
      </div>

      {/* למה לעבוד איתנו */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">למה לעבוד עם נדל״ן בכפר?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Percent className="h-10 w-10 text-primary mb-2" />
              <CardTitle>אחוזים נאים במיוחד</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                אנו מציעים מודל תגמול אטרקטיבי במיוחד, עם אחוזים גבוהים מהמקובל בענף למתאימים, ומסלולי בונוסים נדיבים על
                ביצועים.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>מעטפת דיגיטלית מתקדמת</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                מערכת ניהול דיגיטלית מבוססת AI המספקת את כל הכלים הדרושים להצלחה: ניהול לידים, מעקב אחר נכסים, ניתוח
                שוק, ויצירת תוכן אוטומטית.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MapPin className="h-10 w-10 text-primary mb-2" />
              <CardTitle>התמחות בגליל המערבי</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                אנו המומחים המובילים בשוק הנדל״ן בגליל המערבי, עם הבנה מעמיקה של המגמות, ההזדמנויות והאתגרים הייחודיים
                לאזור.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>ליווי והכשרה מקצועית</CardTitle>
            </CardHeader>
            <CardContent>
              <p>תכנית חניכה אישית, הכשרות מקצועיות שוטפות, וליווי צמוד של מנהלים מנוסים לאורך כל הדרך להצלחה.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Building className="h-10 w-10 text-primary mb-2" />
              <CardTitle>גישה למאגר נכסים ייחודי</CardTitle>
            </CardHeader>
            <CardContent>
              <p>גישה בלעדית למאגר נכסים איכותי ומגוון בגליל המערבי, כולל נכסים שאינם זמינים בשוק הפתוח.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-primary mb-2" />
              <CardTitle>מותג מוביל ומוכר</CardTitle>
            </CardHeader>
            <CardContent>
              <p>עבודה תחת מותג מוביל ומוכר באזור, המספק אמינות, יוקרה ויתרון תחרותי משמעותי בשוק.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* משרות פתוחות */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">משרות פתוחות</h2>

        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="agents">סוכני נדל״ן</TabsTrigger>
            <TabsTrigger value="staff">אנשי צוות</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">סוכן/ת נדל״ן - הגליל המערבי</CardTitle>
                    <CardDescription className="mt-1">משרה מלאה / פרילאנס</CardDescription>
                  </div>
                  <Badge>חם</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> גליל מערבי
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> נדרש ניסיון
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> גמיש
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">תיאור התפקיד:</h4>
                  <p className="mb-4">
                    אנו מחפשים סוכני נדל״ן מנוסים או מתחילים עם תעודה, בעלי מוטיבציה גבוהה ויכולת מכירה מוכחת, להצטרף
                    לצוות המוביל שלנו בגליל המערבי. התפקיד כולל איתור וגיוס נכסים, ליווי לקוחות בתהליכי רכישה ומכירה,
                    וביצוע עסקאות מוצלחות.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">דרישות:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>תעודת סוכן נדל״ן - חובה</li>
                    <li>ניסיון בתחום הנדל״ן - יתרון משמעותי</li>
                    <li>היכרות עם אזור הגליל המערבי - יתרון</li>
                    <li>יכולת מכירה ושירות לקוחות ברמה גבוהה</li>
                    <li>יחסי אנוש מעולים ויכולת עבודה בצוות</li>
                    <li>רישיון נהיגה ורכב - חובה</li>
                    <li>נכונות לעבודה בשעות גמישות</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">אנו מציעים:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>אחוזים גבוהים מהמקובל בענף למתאימים</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>מערכת ניהול דיגיטלית מתקדמת מבוססת AI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>הכשרה מקצועית וליווי צמוד להצלחה</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>גישה למאגר לקוחות ונכסים איכותי</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>אפשרות לעבודה כשכיר/ה או כפרילאנס</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href="#apply">הגש/י מועמדות</a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">סוכן/ת נדל״ן מתמחה - נכסי יוקרה</CardTitle>
                    <CardDescription className="mt-1">משרה מלאה / פרילאנס</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> גליל מערבי
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> נדרש ניסיון מוכח
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">תיאור התפקיד:</h4>
                  <p className="mb-4">
                    אנו מחפשים סוכן/ת נדל״ן בעל/ת ניסיון מוכח בתחום נכסי היוקרה, להתמחות בשיווק וילות, בתים פרטיים ונכסי
                    בוטיק באזור הגליל המערבי. התפקיד כולל עבודה מול לקוחות פרימיום, שיווק נכסים ייחודיים, וליווי עסקאות
                    מורכבות.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">דרישות:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>תעודת סוכן נדל״ן - חובה</li>
                    <li>ניסיון של 3 שנים לפחות בתחום הנדל״ן</li>
                    <li>ניסיון מוכח בעסקאות נכסי יוקרה</li>
                    <li>יכולת ייצוגית גבוהה ומיומנויות תקשורת מעולות</li>
                    <li>רשת קשרים רלוונטית - יתרון</li>
                    <li>רישיון נהיגה ורכב - חובה</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">אנו מציעים:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>מודל תגמול אטרקטיבי במיוחד לעסקאות יוקרה</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>גישה למאגר לקוחות פרימיום</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>כלים שיווקיים מתקדמים לנכסי יוקרה</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>אפשרות לעבודה כשכיר/ה או כפרילאנס</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href="#apply">הגש/י מועמדות</a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">מנהל/ת תוכן ושיווק דיגיטלי</CardTitle>
                    <CardDescription className="mt-1">משרה מלאה / חלקית</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> גליל מערבי / עבודה מרחוק
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">תיאור התפקיד:</h4>
                  <p className="mb-4">
                    אנו מחפשים מנהל/ת תוכן ושיווק דיגיטלי להובלת מערך התוכן והשיווק של החברה. התפקיד כולל ניהול מערכת
                    התוכן האוטומטית מבוססת AI, יצירת תוכן שיווקי, ניהול נוכחות דיגיטלית, וקידום המותג.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">דרישות:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>ניסיון בשיווק דיגיטלי ויצירת תוכן</li>
                    <li>היכרות עם עולם הנדל״ן - יתרון</li>
                    <li>יכולת כתיבה מעולה בעברית</li>
                    <li>ידע בעבודה עם מערכות AI ליצירת תוכן - יתרון</li>
                    <li>ניסיון בניהול רשתות חברתיות</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href="#apply">הגש/י מועמדות</a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">מתאם/ת פגישות ותמיכה אדמיניסטרטיבית</CardTitle>
                    <CardDescription className="mt-1">משרה מלאה</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> גליל מערבי
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">תיאור התפקיד:</h4>
                  <p className="mb-4">
                    אנו מחפשים מתאם/ת פגישות ותמיכה אדמיניסטרטיבית לצוות הסוכנים שלנו. התפקיד כולל תיאום פגישות, מענה
                    טלפוני, טיפול בלידים, והזנת נתונים למערכת הדיגיטלית.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">דרישות:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>יכולת ארגון וסדר גבוהה</li>
                    <li>שליטה ביישומי מחשב ואינטרנט</li>
                    <li>יחסי אנוש מעולים</li>
                    <li>יכולת עבודה בסביבה דינמית</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href="#apply">הגש/י מועמדות</a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* מידע על שוק הנדל״ן בגליל */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          שוק הנדל״ן בגליל המערבי - הזדמנות של פעם בדור
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-lg">
              שוק הנדל״ן בגליל המערבי עובר מהפכה של ממש בשנים האחרונות, עם עלייה משמעותית בביקוש לנכסים באזור והתחזקות
              מגמת המעבר מהמרכז לפריפריה.
            </p>
            <p className="text-lg">
              הנהירה הצפויה של משפחות ויחידים המחפשים איכות חיים, קהילתיות, וקרבה לטבע, יחד עם מחירים אטרקטיביים יחסית
              למרכז, יוצרת הזדמנויות עסקיות יוצאות דופן לסוכני נדל״ן.
            </p>
            <p className="text-lg">
              בנוסף, ההשקעות הממשלתיות בתשתיות, פיתוח אזורי תעסוקה, ושיפור מערך התחבורה באזור, צפויות להמשיך ולהעלות את
              ערך הנכסים בגליל המערבי בשנים הקרובות.
            </p>
            <p className="text-lg font-semibold">
              זו ההזדמנות שלך להצטרף אלינו ולהיות חלק מהצמיחה המשמעותית בשוק הנדל״ן באזור!
            </p>
          </div>

          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="נוף הגליל המערבי" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* מערכת הניהול הדיגיטלית */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">המעטפת הדיגיטלית המתקדמת שלנו</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden order-2 md:order-1">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="מערכת ניהול דיגיטלית"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <h3 className="text-xl font-bold mb-2">מערכת ניהול דיגיטלית מבוססת AI</h3>
            <p>אנו מספקים לסוכנים שלנו מעטפת דיגיטלית מלאה המבוססת על טכנולוגיית AI מתקדמת, המאפשרת:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span>ניהול לידים חכם עם מערכת דירוג אוטומטית לזיהוי לקוחות פוטנציאליים</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span>יצירת תוכן אוטומטית לתיאורי נכסים, פוסטים לרשתות חברתיות, ומיילים ללקוחות</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span>ניתוח שוק בזמן אמת עם תובנות מבוססות נתונים על מגמות מחירים ואזורים חמים</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span>כלי שיווק דיגיטליים מתקדמים, כולל יצירת סיורים וירטואליים ותמונות מקצועיות</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span>מערכת CRM ייעודית לניהול קשרי לקוחות ומעקב אחר עסקאות</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span>דשבורד אישי עם נתוני ביצועים בזמן אמת וניתוח מגמות</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* טופס הגשת מועמדות */}
      <div id="apply" className="scroll-mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">הגשת מועמדות</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">פרטי קשר</h3>
              <div className="space-y-3">
                <p className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>משרד ראשי: רחוב הגליל 15, כרמיאל</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>טלפון: 053-2062346</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>דוא"ל: careers@nadlanbakfar.co.il</span>
                </p>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">תהליך הקבלה</h3>
              <ol className="space-y-3 list-decimal list-inside">
                <li>הגשת מועמדות דרך הטופס</li>
                <li>שיחת טלפון ראשונית</li>
                <li>ראיון אישי עם מנהל הגיוס</li>
                <li>ראיון מקצועי עם מנהל צוות</li>
                <li>הצעת עבודה והצטרפות לצוות</li>
              </ol>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <h3 className="text-xl font-bold mb-4">מדוע כדאי להצטרף אלינו?</h3>
              <p className="mb-4">
                הצטרפו לצוות המוביל בגליל המערבי ותיהנו מהזדמנויות צמיחה יוצאות דופן, סביבת עבודה תומכת, וכלים
                טכנולוגיים מתקדמים שיסייעו לכם להצליח.
              </p>
              <Button asChild variant="default" className="w-full">
                <Link href="/about">
                  <span>למידע נוסף על החברה</span>
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>טופס הגשת מועמדות</CardTitle>
                <CardDescription>מלאו את הפרטים הבאים ונחזור אליכם בהקדם</CardDescription>
              </CardHeader>
              <CardContent>
                <JobApplicationForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

