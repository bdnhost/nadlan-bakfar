"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building, Bed, Home, Wrench, HeartHandshake, Store } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function ServicesSection() {
  const services = [
    {
      title: "קניית נכסים",
      description: "מצאו את הנכס המושלם שמתאים בדיוק לצרכים שלכם ולתקציבכם בעזרת הצוות המנוסה שלנו.",
      icon: "Home",
      link: "/buying-properties",
    },
    {
      title: "ניהול נכסים",
      description: "שירותי ניהול נכסים מקיפים עם דגש על תחזוקה, גבייה וייעוץ פיננסי לשקט נפשי מלא.",
      icon: "Building",
      link: "/property-management",
    },
    {
      title: "תחזוקת נכסים",
      description: "שירותי תחזוקה איכותיים על מנת להבטיח שהנכס שלכם יישמר במצב מצוין בכל עת.",
      icon: "Wrench",
      link: "/property-maintenance",
    },
    {
      title: "הכנה לאירוח ב-Airbnb",
      description: "שירותי הכנה מלאים לנכסים המיועדים להשכרה ב-Airbnb להבטיח חוויה בלתי נשכחת לאורחים שלכם.",
      icon: "Bed",
      link: "/airbnb-preparation",
    },
    {
      title: "שירות לקוחות",
      description: "תמיכה מלאה וזמינה לכל לקוח בכל שלבי התהליך, עם דגש על שירות אישי ומקצועי.",
      icon: "HeartHandshake",
      link: "/support",
    },
    {
      title: "מכירת נכסים",
      description: "שירותי מכירה מקצועיים המבוססים על ידע מקומי עשיר והבנה עמוקה של שוק הנדל&quot;ן.",
      icon: "Store",
      link: "/contact",
    },
  ]

  const getIcon = (iconName: string) => {
    const icons = {
      Building,
      Bed,
      Home,
      Wrench,
      HeartHandshake,
      Store,
    }

    const IconComponent = icons[iconName as keyof typeof icons] || Building
    return <IconComponent className="h-12 w-12 text-primary" />
  }

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background-darker/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            השירותים שלנו
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            אנו מציעים מגוון רחב של שירותי נדל&quot;ן מקצועיים המותאמים לצרכים שלכם
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white/90 backdrop-blur-sm h-full flex flex-col group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground flex-grow mb-6">{service.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-auto border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <Link href={service.link}>למדו עוד</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

