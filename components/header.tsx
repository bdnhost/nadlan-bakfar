"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect for transparent header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-primary shadow-md" : "bg-primary/95", // Changed to primary color
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-40">
              {!logoError ? (
                <Image
                  src="https://nadlan.shlomi.online/wp-content/uploads/2024/05/logona-1.png"
                  alt="נדל״ן בכפר לוגו"
                  fill
                  className="object-contain"
                  onError={() => setLogoError(true)}
                  priority
                />
              ) : (
                <div className="flex items-center text-white font-bold text-xl">
                  <span>נדל״ן בכפר</span>
                </div>
              )}
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/property-catalog"
              className="text-white font-medium hover:text-white/80 transition-colors text-right"
            >
              קטלוג נכסים
            </Link>
            <Link
              href="/property-management"
              className="text-white font-medium hover:text-white/80 transition-colors text-right"
            >
              ניהול נכסים
            </Link>
            <Link href="/blog" className="text-white font-medium hover:text-white/80 transition-colors text-right">
              בלוג
            </Link>
            <Link href="/about" className="text-white font-medium hover:text-white/80 transition-colors text-right">
              אודות
            </Link>
            <Link
              href="/careers"
              className={cn(
                "text-white font-medium hover:text-white/80 transition-colors text-right",
                pathname === "/careers" ? "underline" : "",
              )}
            >
              דרושים
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white hover:bg-white hover:text-primary rtl:space-x-reverse"
            asChild
          >
            <Link href="tel:0532062346">
              <Phone className="h-4 w-4 ml-2" />
              053-2062346
            </Link>
          </Button>
          <Button className="bg-highlight text-text hover:bg-highlight/90" asChild>
            <Link href="/contact">צור קשר</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">פתח תפריט</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 bg-primary text-white">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <div className="relative h-10 w-32">
                    {!logoError ? (
                      <Image
                        src="https://nadlan.shlomi.online/wp-content/uploads/2024/05/logona-1.png"
                        alt="נדל״ן בכפר לוגו"
                        fill
                        className="object-contain"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <div className="text-white font-bold text-lg">נדל״ן בכפר</div>
                    )}
                  </div>
                </Link>
                <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/property-catalog"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white/80 transition-colors text-right"
                >
                  קטלוג נכסים
                </Link>
                <Link
                  href="/property-management"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white/80 transition-colors text-right"
                >
                  ניהול נכסים
                </Link>
                <Link
                  href="/property-calculator"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white/80 transition-colors text-right"
                >
                  מחשבון שווי נכס
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white/80 transition-colors text-right"
                >
                  בלוג
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white/80 transition-colors text-right"
                >
                  אודות
                </Link>
                <Link
                  href="/gallery"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white/80 transition-colors text-right"
                >
                  גלריה
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white/80 transition-colors text-right"
                >
                  צור קשר
                </Link>
                <Link
                  href="/careers"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white/80 transition-colors text-right"
                >
                  דרושים
                </Link>

                <div className="pt-4 mt-4 border-t border-white/20">
                  <Button className="w-full bg-highlight text-text hover:bg-highlight/90" asChild>
                    <Link href="tel:0532062346">
                      <Phone className="h-4 w-4 ml-2" />
                      053-2062346
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

