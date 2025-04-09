"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { isAdmin } from "@/lib/auth-service"
import { useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // בדיקה אם המשתמש הוא אדמין
    if (!isAdmin()) {
      // אם לא בדף הלוגין, הפנייה לדף הלוגין
      if (window.location.pathname !== "/admin/login") {
        router.push("/admin/login")
      } else {
        setAuthorized(true)
      }
    } else {
      setAuthorized(true)
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">טוען...</p>
        </div>
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return <>{children}</>
}

