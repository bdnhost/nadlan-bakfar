export enum ContentType {
  BLOG_POST = "BLOG_POST",
  AREA_GUIDE = "AREA_GUIDE",
  TIPS_ARTICLE = "TIPS_ARTICLE",
  MARKET_ANALYSIS = "MARKET_ANALYSIS",
  PROPERTY_DESCRIPTION = "PROPERTY_DESCRIPTION",
  FAQ = "FAQ",
  NEWS_UPDATE = "NEWS_UPDATE",
  TESTIMONIAL = "TESTIMONIAL",
  NEIGHBORHOOD_SPOTLIGHT = "NEIGHBORHOOD_SPOTLIGHT",
  INVESTMENT_GUIDE = "INVESTMENT_GUIDE",
}

export enum ContentStatus {
  DRAFT = "DRAFT",
  REVIEW = "REVIEW",
  SCHEDULED = "SCHEDULED",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  REJECTED = "REJECTED",
}

export enum ContentCategory {
  BUYING = "BUYING",
  SELLING = "SELLING",
  RENTING = "RENTING",
  INVESTING = "INVESTING",
  PROPERTY_MANAGEMENT = "PROPERTY_MANAGEMENT",
  MARKET_TRENDS = "MARKET_TRENDS",
  LIFESTYLE = "LIFESTYLE",
  LEGAL = "LEGAL",
  FINANCING = "FINANCING",
  MAINTENANCE = "MAINTENANCE",
}

export interface GeneratedContent {
  id: string
  type: ContentType
  title: string
  content: string
  summary?: string
  slug: string
  tags?: string[]
  status: ContentStatus
  category?: ContentCategory
  author?: string
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  featuredImage?: string
  imagePrompt?: string
  scheduledFor?: Date
  publishToSocialMedia?: boolean
  socialMediaPlatforms?: string[]
  socialMediaText?: string
  seoTitle?: string
  seoDescription?: string
  metadata?: Record<string, any>
  viewCount?: number
  likeCount?: number
  commentCount?: number
}

export interface ContentGenerationParams {
  type: ContentType
  topic?: string
  keywords?: string[]
  category?: ContentCategory
  author?: string
  scheduledFor?: Date
  publishToSocialMedia?: boolean
  socialMediaPlatforms?: string[]
  language?: string
  targetAudience?: string
  tone?: string
  length?: "short" | "medium" | "long"
  additionalInstructions?: string
  referenceData?: {
    templateId?: string
  }
}

export interface GeneratedContentData {
  title: string
  content: string
  summary?: string
  socialMediaText?: string
  seoTitle?: string
  seoDescription?: string
  metadata?: Record<string, any>
}

export interface ContentGenerationResult {
  success: boolean
  content?: GeneratedContentData
  error?: string
}

export interface ContentTemplate {
  id: string
  name: string
  description: string
  type: ContentType
  systemPrompt: string
  userPrompt: string
  category?: ContentCategory
  tags?: string[]
}

