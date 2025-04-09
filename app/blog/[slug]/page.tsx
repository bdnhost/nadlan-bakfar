import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, Tag, User, ArrowRight, Facebook, Twitter, Linkedin, Mail } from "lucide-react"
import { getAllContent } from "@/lib/content-generator/content-service"
import { ContentStatus } from "@/lib/content-generator/types"
import { notFound } from "next/navigation"
import BlogPostCard from "@/components/blog-post-card"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // קבלת כל התכנים המפורסמים
  const allContent = getAllContent().filter((content) => content.status === ContentStatus.PUBLISHED)

  // חיפוש הפוסט לפי ה-slug
  const post = allContent.find((content) => content.slug === params.slug)

  // אם הפוסט לא נמצא, הצג דף 404
  if (!post) {
    notFound()
  }

  // חישוב זמן קריאה משוער (מילה בשנייה)
  const readingTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))

  // תאריך פרסום או יצירה
  const publishDate = post.publishedAt || post.createdAt

  // קבלת פוסטים קשורים (לפי תגיות או קטגוריה)
  const relatedPosts = allContent
    .filter(
      (content) =>
        content.id !== post.id &&
        (content.category === post.category ||
          (post.tags && content.tags && content.tags.some((tag) => post.tags.includes(tag)))),
    )
    .slice(0, 3)

  // תמונה ברירת מחדל אם אין תמונה ראשית
  const defaultImage = "/placeholder.svg?height=600&width=1200"

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="mb-8">
        <Link href="/blog" className="text-primary hover:underline inline-flex items-center">
          <ArrowRight className="h-4 w-4 ml-2 rotate-180" />
          חזרה לבלוג
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          {post.category && <Badge className="mb-4">{post.category}</Badge>}

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{post.title}</h1>

          {post.summary && <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">{post.summary}</p>}

          <div className="flex flex-wrap justify-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author || 'צוות נדל"ן בכפר'}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{new Date(publishDate).toLocaleDateString("he-IL")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} דק׳ קריאה</span>
            </div>
          </div>
        </header>

        {post.featuredImage && (
          <div className="mb-8">
            <Image
              src={post.featuredImage || defaultImage}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full rounded-lg object-cover max-h-[500px]"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-medium">שתף את המאמר:</p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                >
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">מאמרים קשורים</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <BlogPostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

