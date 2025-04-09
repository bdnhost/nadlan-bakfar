"use client"

import type React from "react"

import { useEffect } from "react"
import { checkAndSetFirstVisit } from "@/lib/auth-service"

export default function AdminProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // בדיקה אם זה הביקור הראשון והגדרת המשתמש כאדמין אם כן
    checkAndSetFirstVisit()
  }, [])

  return <>{children}</>
}

