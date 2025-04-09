import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  testimonial: string
  rating: number
}

export default function TestimonialCard({ name, testimonial, rating }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
            />
          ))}
        </div>
        <p className="mb-4 text-muted-foreground">{testimonial}</p>
        <p className="font-bold">{name}</p>
      </CardContent>
    </Card>
  )
}

