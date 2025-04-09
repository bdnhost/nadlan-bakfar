import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building, Bed, Home, Wrench, HeartHandshake, Store, type LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  link: string
}

export default function ServiceCard({ title, description, icon, link }: ServiceCardProps) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, LucideIcon> = {
      Building,
      Bed,
      Home,
      Wrench,
      HeartHandshake,
      Store,
    }

    const IconComponent = icons[iconName] || Building
    return <IconComponent className="h-10 w-10 text-primary" />
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-4">{getIcon(icon)}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={link}>למדו עוד</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

