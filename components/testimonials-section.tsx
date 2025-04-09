"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "יוסי כהן",
      testimonial: "השירות של נדל״ן בכפר היה יוצא דופן, תודה רבה על כל העזרה והליווי.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "שרה לוי",
      testimonial: "הנכס החדש שלנו בניהול נדל״ן בכפר הוא אחד הדברים הטובים שעשינו לעסק שלנו.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "מיכאל ברקוביץ'",
      testimonial: "הצוות המקצועי של נדל״ן בכפר עזר לנו בכל שלב של תהליך השיפוצים והשדרוגים.",
      rating: 4,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "אילנה שמש",
      testimonial: "אני ממליצה בחום על נדל״ן בכפר, הם דאגו לכל פרט קטן במכירת הבית שלנו.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Auto-rotate testimonials
  useState(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
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
    <section className="bg-gradient-to-b from-background-darker/30 to-background py-16 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            המלצות לקוחות
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">מה הלקוחות שלנו אומרים עלינו</p>
        </motion.div>

        {/* Desktop View - Grid */}
        <motion.div
          ref={ref}
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden border-0 bg-white/90 backdrop-blur-sm h-full shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "fill-highlight text-highlight" : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground flex-grow">{testimonial.testimonial}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              animate={{ x: `-${activeIndex * 100}%` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-md">
                    <CardContent className="p-6">
                      <div className="flex mb-4 justify-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating
                                ? "fill-highlight text-highlight"
                                : "fill-muted text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mb-6 text-muted-foreground text-center">{testimonial.testimonial}</p>
                      <div className="flex items-center gap-3 justify-center">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-gray-300"}`}
                onClick={() => {
                  setActiveIndex(index)
                  setAutoplay(false)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

