"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Mail, MapPin, Phone, PhoneIcon as WhatsApp, Settings } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { isAdmin } from "@/lib/auth-service"

export default function Footer() {
  const [isAdminUser, setIsAdminUser] = useState(false)

  useEffect(() => {
    // בדיקה אם המשתמש הוא אדמין
    const checkAdmin = async () => {
      const adminStatus = await isAdmin()
      setIsAdminUser(adminStatus)
    }

    checkAdmin()
  }, [])

  return (
    <footer className="bg-text text-white">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="relative h-12 w-40 mb-4">
              <Image
                src="https://nadlan.shlomi.online/wp-content/uploads/2024/05/logona-1.png"
                alt="נדל״ן בכפר לוגו"
                fill
                className="object-contain"
              />
            </div>
            <p className="max-w-xs text-gray-300">
              הבית שלכם לכל פתרונות הנדל"ן בגליל המערבי. מטרתנו היא להעניק שירות אישי, מקצועי ואמין לכל לקוחותינו.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-highlight hover:bg-white/10" asChild>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="פייסבוק">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-highlight hover:bg-white/10" asChild>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="אינסטגרם">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-highlight hover:bg-white/10" asChild>
                <Link href="https://wa.me/972532062346" target="_blank" rel="noopener noreferrer" aria-label="וואטסאפ">
                  <WhatsApp className="h-5 w-5" />
                </Link>
              </Button>
              {isAdminUser && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-highlight hover:bg-white/10"
                  asChild
                >
                  <Link href="/admin" aria-label="פאנל ניהול">
                    <Settings className="h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-gray-700 pb-2">השירותים שלנו</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/buying-properties" className="hover:text-highlight transition-colors">
                  רכישת נכסים
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-highlight transition-colors">
                  מכירת נכסים
                </Link>
              </li>
              <li>
                <Link href="/property-management" className="hover:text-highlight transition-colors">
                  ניהול נכסים מקצועי
                </Link>
              </li>
              <li>
                <Link href="/property-maintenance" className="hover:text-highlight transition-colors">
                  אחזקת נכסים
                </Link>
              </li>
              <li>
                <Link href="/airbnb-preparation" className="hover:text-highlight transition-colors">
                  הכנת הנכס ל-Airbnb
                </Link>
              </li>
              <li>
                <Link href="/property-calculator" className="hover:text-highlight transition-colors">
                  מחשבון שווי נכס
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-gray-700 pb-2">קישורים מהירים</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/property-catalog" className="hover:text-highlight transition-colors">
                  קטלוג נכסים
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-highlight transition-colors">
                  אודות 'נדל"ן בכפר'
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-highlight transition-colors">
                  בלוג
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-highlight transition-colors">
                  גלריית תמונות
                </Link>
              </li>
              <li>
                <Link href="/service-charter" className="hover:text-highlight transition-colors">
                  אמנת השירות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-highlight transition-colors">
                  צור קשר
                </Link>
              </li>
              {isAdminUser && (
                <li>
                  <Link href="/admin" className="hover:text-highlight transition-colors">
                    פאנל ניהול
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-gray-700 pb-2">צור קשר</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-highlight flex-shrink-0" />
                <span>053-2062346</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-highlight flex-shrink-0" />
                <span>info@nadlan.shlomi.online</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-highlight mt-1 flex-shrink-0" />
                <span>רחוב ז'בוטינסקי 6, שלומי</span>
              </li>
            </ul>

            <div className="pt-4">
              <Button className="w-full bg-highlight text-text hover:bg-highlight/90" asChild>
                <Link href="/contact">צור קשר</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} נדל"ן בכפר. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  )
}

