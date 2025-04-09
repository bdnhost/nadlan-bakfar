"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { isAdmin, setAdmin } from "@/lib/auth-service"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // בדיקה אם המשתמש כבר מחובר כאדמין
  useEffect(() => {
    if (isAdmin()) {
      router.push("/admin")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // סיסמה פשוטה לדוגמה - במערכת אמיתית יש להשתמש במערכת אימות מאובטחת
    if (password === "admin123") {
      setAdmin(true)
      router.push("/admin")
    } else {
      setError("סיסמה שגויה")
      setLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">כניסה לפאנל ניהול</CardTitle>
          <CardDescription className="text-center">הזן את הסיסמה כדי להיכנס לפאנל הניהול</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">סיסמה</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "מתחבר..." : "כניסה"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

