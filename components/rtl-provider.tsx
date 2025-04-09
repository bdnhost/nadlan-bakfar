"use client"

import React from "react"

interface RTLProviderProps {
  children: React.ReactNode
}

export function RTLProvider({ children }: RTLProviderProps) {
  React.useEffect(() => {
    // וידוא שהכיוון RTL מוגדר כראוי בכל האלמנטים הרלוונטיים
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "he"

    // תיקון בעיות CSS ספציפיות ל-RTL
    const style = document.createElement("style")
    style.textContent = `
     /* תיקון כיוון טקסט עבור אלמנטים ספציפיים */
     input, textarea, select, .prose, p, h1, h2, h3, h4, h5, h6, span, div, button, a {
       text-align: right;
     }
     
     /* תיקון מיקום אייקונים בכפתורים */
     [dir="rtl"] button svg:first-child:not(:last-child),
     [dir="rtl"] a svg:first-child:not(:last-child) {
       margin-left: 0.5rem;
       margin-right: 0;
     }
     
     /* תיקון מיקום תפריטים נפתחים */
     [dir="rtl"] [data-radix-popper-content-wrapper] {
       transform-origin: right top !important;
     }

     /* תיקון מיקום אלמנטים בטפסים */
     [dir="rtl"] .form-control {
       text-align: right;
     }

     /* תיקון מיקום רשימות */
     [dir="rtl"] ul, [dir="rtl"] ol {
       padding-right: 1.5rem;
       padding-left: 0;
     }

     /* תיקון מיקום אייקונים בתפריטים */
     [dir="rtl"] .menu-item svg {
       margin-left: 0.5rem;
       margin-right: 0;
     }

     /* תיקון מיקום אלמנטים בכרטיסים */
     [dir="rtl"] .card-content {
       text-align: right;
     }

     /* תיקון מיקום אלמנטים בטבלאות */
     [dir="rtl"] th, [dir="rtl"] td {
       text-align: right;
     }

     /* תיקון מיקום אלמנטים בתיבות דו-שיח */
     [dir="rtl"] .dialog-content {
       text-align: right;
     }

     /* תיקון מיקום אלמנטים בתפריטים נפתחים */
     [dir="rtl"] .dropdown-content {
       text-align: right;
     }
   `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return <>{children}</>
}

