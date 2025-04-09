// שירות לניהול תמונות מ-Unsplash ויצירת SVG

// מפתח API של Unsplash (יש להוסיף לקובץ .env.local)
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || ""
const UNSPLASH_API_URL = "https://api.unsplash.com"

// טיפוסים
export interface UnsplashImage {
  id: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: string
  description: string
  user: {
    name: string
    username: string
  }
}

export interface SVGTemplate {
  id: string
  name: string
  category: string
  svgContent: string
  previewUrl: string
  colors: string[]
}

// פונקציה לחיפוש תמונות ב-Unsplash
export async function searchUnsplashImages(query: string, page = 1, perPage = 20): Promise<UnsplashImage[]> {
  try {
    if (!UNSPLASH_ACCESS_KEY) {
      console.warn("Unsplash API key is not set. Using mock data.")
      return getMockUnsplashImages(query)
    }

    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error searching Unsplash images:", error)
    return getMockUnsplashImages(query)
  }
}

// פונקציה לקבלת תמונה אקראית מ-Unsplash לפי נושא
export async function getRandomUnsplashImage(query: string): Promise<UnsplashImage> {
  try {
    if (!UNSPLASH_ACCESS_KEY) {
      console.warn("Unsplash API key is not set. Using mock data.")
      const mockImages = getMockUnsplashImages(query)
      return mockImages[Math.floor(Math.random() * mockImages.length)]
    }

    const response = await fetch(`${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(query)}&count=1`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data[0] : data
  } catch (error) {
    console.error("Error getting random Unsplash image:", error)
    const mockImages = getMockUnsplashImages(query)
    return mockImages[Math.floor(Math.random() * mockImages.length)]
  }
}

// פונקציה לקבלת תמונות מדומות כאשר אין מפתח API
function getMockUnsplashImages(query: string): UnsplashImage[] {
  // מילות מפתח נדל"ן נפוצות
  const realEstateKeywords = ["house", "apartment", "real-estate", "property", "home", "building", "architecture"]

  // בחירת מילת מפתח רלוונטית
  let keyword = query
  if (!realEstateKeywords.includes(query.toLowerCase())) {
    keyword = realEstateKeywords[Math.floor(Math.random() * realEstateKeywords.length)]
  }

  // יצירת 10 תמונות מדומות
  return Array.from({ length: 10 }, (_, i) => ({
    id: `mock-${keyword}-${i}`,
    urls: {
      raw: `https://source.unsplash.com/random/1200x800?${keyword}`,
      full: `https://source.unsplash.com/random/1200x800?${keyword}`,
      regular: `https://source.unsplash.com/random/600x400?${keyword}`,
      small: `https://source.unsplash.com/random/400x300?${keyword}`,
      thumb: `https://source.unsplash.com/random/200x200?${keyword}`,
    },
    alt_description: `${keyword} image ${i + 1}`,
    description: `A beautiful ${keyword} image`,
    user: {
      name: "Unsplash User",
      username: "unsplash",
    },
  }))
}

// מאגר תבניות SVG
const svgTemplates: SVGTemplate[] = [
  {
    id: "house-simple",
    name: "בית פשוט",
    category: "נכסים",
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10L10 50h10v40h60V50h10L50 10z" fill="{color1}" stroke="{color2}" stroke-width="2"/>
      <rect x="40" y="60" width="20" height="30" fill="{color2}"/>
      <rect x="30" y="40" width="15" height="15" fill="{color3}"/>
      <rect x="55" y="40" width="15" height="15" fill="{color3}"/>
    </svg>`,
    previewUrl: "/assets/svg-templates/house-simple.svg",
    colors: ["#4CAF50", "#2E7D32", "#81C784"],
  },
  {
    id: "apartment-building",
    name: "בניין דירות",
    category: "נכסים",
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="60" height="80" fill="{color1}" stroke="{color2}" stroke-width="2"/>
      <rect x="30" y="20" width="10" height="10" fill="{color3}"/>
      <rect x="50" y="20" width="10" height="10" fill="{color3}"/>
      <rect x="30" y="40" width="10" height="10" fill="{color3}"/>
      <rect x="50" y="40" width="10" height="10" fill="{color3}"/>
      <rect x="30" y="60" width="10" height="10" fill="{color3}"/>
      <rect x="50" y="60" width="10" height="10" fill="{color3}"/>
      <rect x="40" y="70" width="20" height="20" fill="{color2}"/>
    </svg>`,
    previewUrl: "/assets/svg-templates/apartment-building.svg",
    colors: ["#2196F3", "#0D47A1", "#64B5F6"],
  },
  {
    id: "key",
    name: "מפתח",
    category: "סמלים",
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="15" fill="{color1}" stroke="{color2}" stroke-width="2"/>
      <rect x="30" y="25" width="50" height="10" fill="{color1}" stroke="{color2}" stroke-width="2"/>
      <rect x="65" y="20" width="5" height="20" fill="{color3}"/>
      <rect x="75" y="20" width="5" height="20" fill="{color3}"/>
    </svg>`,
    previewUrl: "/assets/svg-templates/key.svg",
    colors: ["#FFC107", "#FFA000", "#FFECB3"],
  },
  {
    id: "location-pin",
    name: "סמן מיקום",
    category: "סמלים",
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 C25 10, 10 25, 10 40 C10 60, 40 85, 50 90 C60 85, 90 60, 90 40 C90 25, 75 10, 50 10 Z" fill="{color1}" stroke="{color2}" stroke-width="2"/>
      <circle cx="50" cy="40" r="15" fill="{color3}"/>
    </svg>`,
    previewUrl: "/assets/svg-templates/location-pin.svg",
    colors: ["#F44336", "#B71C1C", "#FFCDD2"],
  },
  {
    id: "chart-bars",
    name: "תרשים עמודות",
    category: "גרפים",
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="80" width="80" height="2" fill="{color2}"/>
      <rect x="10" y="10" width="2" height="70" fill="{color2}"/>
      <rect x="20" y="40" width="10" height="40" fill="{color1}"/>
      <rect x="40" y="30" width="10" height="50" fill="{color1}"/>
      <rect x="60" y="50" width="10" height="30" fill="{color1}"/>
      <rect x="80" y="20" width="10" height="60" fill="{color1}"/>
    </svg>`,
    previewUrl: "/assets/svg-templates/chart-bars.svg",
    colors: ["#9C27B0", "#4A148C", "#E1BEE7"],
  },
  {
    id: "chart-line",
    name: "תרשים קו",
    category: "גרפים",
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="80" width="80" height="2" fill="{color2}"/>
      <rect x="10" y="10" width="2" height="70" fill="{color2}"/>
      <polyline points="10,60 30,40 50,50 70,30 90,20" fill="none" stroke="{color1}" stroke-width="3"/>
      <circle cx="10" cy="60" r="3" fill="{color3}"/>
      <circle cx="30" cy="40" r="3" fill="{color3}"/>
      <circle cx="50" cy="50" r="3" fill="{color3}"/>
      <circle cx="70" cy="30" r="3" fill="{color3}"/>
      <circle cx="90" cy="20" r="3" fill="{color3}"/>
    </svg>`,
    previewUrl: "/assets/svg-templates/chart-line.svg",
    colors: ["#FF9800", "#E65100", "#FFE0B2"],
  },
]

// פונקציה לקבלת כל תבניות ה-SVG
export function getAllSVGTemplates(): SVGTemplate[] {
  return [...svgTemplates]
}

// פונקציה לקבלת תבנית SVG לפי מזהה
export function getSVGTemplateById(id: string): SVGTemplate | undefined {
  return svgTemplates.find((template) => template.id === id)
}

// פונקציה לקבלת תבניות SVG לפי קטגוריה
export function getSVGTemplatesByCategory(category: string): SVGTemplate[] {
  return svgTemplates.filter((template) => template.category === category)
}

// פונקציה ליצירת SVG מותאם אישית
export function generateCustomSVG(templateId: string, colors: string[] = []): string {
  const template = getSVGTemplateById(templateId)

  if (!template) {
    throw new Error(`SVG template with ID ${templateId} not found`)
  }

  let svgContent = template.svgContent

  // החלפת צבעים
  const templateColors = template.colors
  const customColors = colors.length > 0 ? colors : templateColors

  for (let i = 0; i < Math.min(templateColors.length, customColors.length); i++) {
    svgContent = svgContent.replace(new RegExp(`\\{color${i + 1}\\}`, "g"), customColors[i])
  }

  return svgContent
}

// פונקציה להמרת SVG לתמונה (Base64)
export async function convertSVGToImage(svgContent: string, width = 800, height = 600): Promise<string> {
  // במערכת אמיתית, נשתמש בספריה כמו sharp או canvas לביצוע ההמרה בצד השרת
  // כאן נחזיר את ה-SVG עצמו כ-Data URL
  const svgBlob = new Blob([svgContent], { type: "image/svg+xml" })
  return URL.createObjectURL(svgBlob)
}

// פונקציה לקבלת תמונה מותאמת לנושא נדל"ן
export async function getRealEstateImage(topic: string): Promise<UnsplashImage> {
  // מיפוי נושאים לשאילתות חיפוש באנגלית
  const topicMapping: Record<string, string> = {
    דירה: "apartment",
    בית: "house",
    נכס: "property",
    נדלן: "real estate",
    השקעה: "investment property",
    שלומי: "northern israel landscape",
    גליל: "galilee landscape",
    צפון: "northern israel",
    מכירה: "house for sale",
    קנייה: "buying house",
    משכנתא: "mortgage",
    שיפוץ: "home renovation",
    גינה: "garden house",
    מרפסת: "balcony apartment",
    נוף: "landscape view",
    פנטהאוז: "penthouse",
    "דירת גן": "garden apartment",
    וילה: "villa",
    "קוטג'": "cottage",
    דופלקס: "duplex",
  }

  // בחירת שאילתת חיפוש מתאימה
  let searchQuery = "real estate"

  // חיפוש מילות מפתח בנושא
  for (const [key, value] of Object.entries(topicMapping)) {
    if (topic.includes(key)) {
      searchQuery = value
      break
    }
  }

  // הוספת "real estate" לשאילתה אם לא מדובר בנוף
  if (!searchQuery.includes("landscape") && !searchQuery.includes("real estate")) {
    searchQuery += " real estate"
  }

  return getRandomUnsplashImage(searchQuery)
}

