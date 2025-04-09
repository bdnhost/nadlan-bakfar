import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import FeaturedProperties from "@/components/featured-properties"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <FeaturedProperties />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}

