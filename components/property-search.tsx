"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Search, MapPin, Building, CurrencyIcon } from "lucide-react"

export default function PropertySearch() {
  const [searchType, setSearchType] = useState("buy")
  const [formData, setFormData] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    rooms: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search data:", { type: searchType, ...formData })
    // Here you would typically redirect to search results page
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/90 to-primary-light/90 text-white">
        <CardTitle className="text-center text-xl font-bold">חיפוש נכסים</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="buy" onValueChange={setSearchType} className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-none bg-muted/50">
            <TabsTrigger value="buy" className="data-[state=active]:bg-white rounded-none py-3">
              לקנייה
            </TabsTrigger>
            <TabsTrigger value="rent" className="data-[state=active]:bg-white rounded-none py-3">
              להשכרה
            </TabsTrigger>
            <TabsTrigger value="commercial" className="data-[state=active]:bg-white rounded-none py-3">
              מסחרי
            </TabsTrigger>
          </TabsList>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="p-6">
            <TabsContent value="buy" className="mt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    אזור
                  </Label>
                  <Select value={formData.location} onValueChange={(value) => handleSelectChange("location", value)}>
                    <SelectTrigger className="bg-white border-muted">
                      <SelectValue placeholder="בחר אזור" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nahariya">נהריה</SelectItem>
                      <SelectItem value="shlomi">שלומי</SelectItem>
                      <SelectItem value="maalot">מעלות</SelectItem>
                      <SelectItem value="mate-asher">מטה אשר</SelectItem>
                      <SelectItem value="maale-yosef">מעלה יוסף</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="propertyType" className="flex items-center gap-1">
                    <Building className="h-4 w-4 text-primary" />
                    סוג נכס
                  </Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => handleSelectChange("propertyType", value)}
                  >
                    <SelectTrigger className="bg-white border-muted">
                      <SelectValue placeholder="בחר סוג נכס" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">דירה</SelectItem>
                      <SelectItem value="house">בית פרטי</SelectItem>
                      <SelectItem value="penthouse">פנטהאוז</SelectItem>
                      <SelectItem value="garden-apt">דירת גן</SelectItem>
                      <SelectItem value="land">מגרש</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minPrice" className="flex items-center gap-1">
                      <CurrencyIcon className="h-4 w-4 text-primary" />
                      מחיר מינימלי
                    </Label>
                    <Input
                      id="minPrice"
                      name="minPrice"
                      type="number"
                      placeholder="₪"
                      value={formData.minPrice}
                      onChange={handleChange}
                      className="bg-white border-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPrice">מחיר מקסימלי</Label>
                    <Input
                      id="maxPrice"
                      name="maxPrice"
                      type="number"
                      placeholder="₪"
                      value={formData.maxPrice}
                      onChange={handleChange}
                      className="bg-white border-muted"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="rooms">חדרים</Label>
                  <Select value={formData.rooms} onValueChange={(value) => handleSelectChange("rooms", value)}>
                    <SelectTrigger className="bg-white border-muted">
                      <SelectValue placeholder="בחר מספר חדרים" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-hover shadow-md group">
                    <Search className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    חפש
                  </Button>
                </motion.div>
              </form>
            </TabsContent>

            {/* Similar structure for rent and commercial tabs */}
            <TabsContent value="rent" className="mt-0">
              {/* Similar form structure as buy tab */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Similar form fields */}
                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-hover shadow-md group">
                    <Search className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    חפש
                  </Button>
                </motion.div>
              </form>
            </TabsContent>

            <TabsContent value="commercial" className="mt-0">
              {/* Similar form structure as buy tab */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Similar form fields */}
                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-hover shadow-md group">
                    <Search className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    חפש
                  </Button>
                </motion.div>
              </form>
            </TabsContent>
          </motion.div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

