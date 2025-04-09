"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/90 via-primary to-primary-light/90 py-16 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10"></div>

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-highlight/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4 text-white"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">צרו קשר עכשיו לשירות מהיר!</h2>
              <p className="max-w-[600px] opacity-90 md:text-xl">
                השאירו פרטים ונחזור אליכם בהקדם, או התקשרו ישירות למספר הטלפון שלנו
              </p>
            </div>
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Phone className="h-6 w-6 text-white" />
              <p className="font-medium text-xl">053-2062346</p>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/contact">צור קשר</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Link href="/property-catalog">חיפוש נכסים</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

