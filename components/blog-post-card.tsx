import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, Tag } from "lucide-react"
import type { GeneratedContent } from "@/lib/content-generator/types"

interface BlogPostCardProps {
  post: GeneratedContent
  variant?: "default" | "featured"
}

export default function BlogPostCard({ post, variant = "default" }: BlogPostCardProps) {
  // חישוב זמן קריאה משוער (מילה בשנייה)
  const readingTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))

  // תאריך פרסום או יצירה
  const publishDate = post.publishedAt || post.createdAt

  // האם זה פוסט מובלט
  const isFeatured = variant === "featured"

  // תמונה ברירת מחדל אם אין תמונה ראשית
  const defaultImage = "/placeholder.svg?height=600&width=800"

  return (
    <Card className={`overflow-hidden ${isFeatured ? "md:col-span-2" : ""}`}>
      <div className={`${isFeatured ? "md:flex" : ""}`}>
        <div className={`relative ${isFeatured ? "md:w-1/2" : ""}`}>
          <div className="relative">
            <Image
              src={post.featuredImage || defaultImage}
              alt={post.title}
              width={800}
              height={isFeatured ? 500 : 300}
              className={`w-full object-cover ${isFeatured ? "h-[300px] md:h-full" : "h-[200px]"}`}
            />
            {post.category && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-primary text-primary-foreground">{post.category}</Badge>
              </div>
            )}
          </div>
        </div>

        <div className={`${isFeatured ? "md:w-1/2" : ""}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 text-muted-foreground text-sm mb-2">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(publishDate).toLocaleDateString("he-IL")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} דק׳ קריאה</span>
              </div>
            </div>

            <h3 className={`font-bold mb-2 ${isFeatured ? "text-2xl" : "text-xl"}`}>{post.title}</h3>

            <p className={`text-muted-foreground line-clamp-${isFeatured ? "4" : "3"}`}>
              {post.summary || post.content.substring(0, 150) + "..."}
            </p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.slice(0, isFeatured ? 5 : 3).map((tag, index) => (
                  <div key={index} className="flex items-center text-xs text-muted-foreground">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="p-6 pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/blog/${post.slug}`}>קרא עוד</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}

