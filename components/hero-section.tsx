"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import PropertySearch from "@/components/property-search"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-primary/90 via-primary to-primary-light/90 pt-20 pb-16 md:pt-24 md:pb-24 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10"></div>

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-highlight/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-2">
              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                ניהול ושיווק נכסים בצפון
              </motion.h1>
              <motion.p
                className="max-w-[600px] opacity-90 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                ברוכים הבאים ל&quot;נדל&quot;ן בכפר&quot;, הבית שלכם לכל פתרונות הנדל&quot;ן בגליל המערבי. מטרתנו היא
                להעניק שירות אישי, מקצועי ואמין לכל לקוחותינו.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/property-catalog">
                <Button
                  size="lg"
                  className="w-full min-[400px]:w-auto bg-highlight text-text hover:bg-highlight/90 shadow-lg hover:shadow-xl transition-all"
                >
                  חיפוש נכסים
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto border-white text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  צור קשר
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="mx-auto flex w-full items-center justify-center lg:order-last"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl">
              <PropertySearch />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

