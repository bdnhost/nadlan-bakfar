"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DataVisualizationProps {
  title: string
  description?: string
  data: {
    labels: string[]
    values: number[]
  }
  type?: "bar" | "line" | "pie"
  colors?: string[]
}

export default function DataVisualization({
  title,
  description,
  data,
  type = "bar",
  colors = ["#4CAF50", "#2E7D32", "#81C784", "#C8E6C9"],
}: DataVisualizationProps) {
  const [activeType, setActiveType] = useState<string>(type)
  const [svgContent, setSvgContent] = useState<string>("")

  // יצירת הגרף בעת טעינת הקומפוננטה או שינוי נתונים
  useEffect(() => {
    generateChart()
  }, [activeType, data, colors])

  // פונקציה ליצירת הגרף
  const generateChart = () => {
    if (activeType === "bar") {
      setSvgContent(generateBarChart())
    } else if (activeType === "line") {
      setSvgContent(generateLineChart())
    } else if (activeType === "pie") {
      setSvgContent(generatePieChart())
    }
  }

  // יצירת גרף עמודות
  const generateBarChart = () => {
    const { labels, values } = data
    const maxValue = Math.max(...values)
    const width = 600
    const height = 400
    const padding = 60
    const barWidth = (width - padding * 2) / labels.length - 10

    let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`

    // ציר X
    svg += `<line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="${colors[1]}" strokeWidth="2" />`

    // ציר Y
    svg += `<line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="${colors[1]}" strokeWidth="2" />`

    // קווי רשת אופקיים
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - padding * 2) * (1 - i / 5)
      svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="${colors[3]}" strokeWidth="1" strokeDasharray="5,5" />`
      svg += `<text x="${padding - 10}" y="${y + 5}" textAnchor="end" fontSize="12" fill="${colors[1]}">${Math.round((maxValue * i) / 5)}</text>`
    }

    // עמודות
    labels.forEach((label, index) => {
      const x = padding + index * ((width - padding * 2) / labels.length) + 5
      const barHeight = (height - padding * 2) * (values[index] / maxValue)
      const y = height - padding - barHeight

      svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${colors[0]}" />`
      svg += `<text x="${x + barWidth / 2}" y="${height - padding + 20}" textAnchor="middle" fontSize="12" fill="${colors[1]}">${label}</text>`
      svg += `<text x="${x + barWidth / 2}" y="${y - 5}" textAnchor="middle" fontSize="12" fill="${colors[1]}">${values[index]}</text>`
    })

    svg += `</svg>`
    return svg
  }

  // יצירת גרף קו
  const generateLineChart = () => {
    const { labels, values } = data
    const maxValue = Math.max(...values)
    const width = 600
    const height = 400
    const padding = 60

    let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`

    // ציר X
    svg += `<line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="${colors[1]}" strokeWidth="2" />`

    // ציר Y
    svg += `<line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="${colors[1]}" strokeWidth="2" />`

    // קווי רשת אופקיים
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - padding * 2) * (1 - i / 5)
      svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="${colors[3]}" strokeWidth="1" strokeDasharray="5,5" />`
      svg += `<text x="${padding - 10}" y="${y + 5}" textAnchor="end" fontSize="12" fill="${colors[1]}">${Math.round((maxValue * i) / 5)}</text>`
    }

    // נקודות וקו
    let points = ""
    labels.forEach((label, index) => {
      const x = padding + index * ((width - padding * 2) / (labels.length - 1))
      const y = height - padding - (height - padding * 2) * (values[index] / maxValue)

      points += `${x},${y} `

      // נקודות
      svg += `<circle cx="${x}" cy="${y}" r="5" fill="${colors[0]}" />`

      // תוויות
      svg += `<text x="${x}" y="${height - padding + 20}" textAnchor="middle" fontSize="12" fill="${colors[1]}">${label}</text>`
      svg += `<text x="${x}" y="${y - 10}" textAnchor="middle" fontSize="12" fill="${colors[1]}">${values[index]}</text>`
    })

    // קו
    svg += `<polyline points="${points}" fill="none" stroke="${colors[0]}" strokeWidth="3" />`

    svg += `</svg>`
    return svg
  }

  // יצירת גרף עוגה
  const generatePieChart = () => {
    const { labels, values } = data
    const width = 600
    const height = 400
    const radius = 150
    const centerX = width / 2
    const centerY = height / 2

    let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`

    // חישוב סכום הערכים
    const total = values.reduce((sum, value) => sum + value, 0)

    // יצירת פלחי העוגה
    let startAngle = 0

    values.forEach((value, index) => {
      const angle = (value / total) * 360
      const endAngle = startAngle + angle

      // המרה לרדיאנים
      const startRad = ((startAngle - 90) * Math.PI) / 180
      const endRad = ((endAngle - 90) * Math.PI) / 180

      // חישוב נקודות
      const x1 = centerX + radius * Math.cos(startRad)
      const y1 = centerY + radius * Math.sin(startRad)
      const x2 = centerX + radius * Math.cos(endRad)
      const y2 = centerY + radius * Math.sin(endRad)

      // קביעת צבע
      const colorIndex = index % colors.length

      // יצירת פלח
      const largeArcFlag = angle > 180 ? 1 : 0
      svg += `<path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z" fill="${colors[colorIndex]}" />`

      // חישוב מיקום התווית
      const labelRad = ((startAngle + angle / 2 - 90) * Math.PI) / 180
      const labelDistance = radius * 0.7
      const labelX = centerX + labelDistance * Math.cos(labelRad)
      const labelY = centerY + labelDistance * Math.sin(labelRad)

      // הוספת תווית
      svg += `<text x="${labelX}" y="${labelY}" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">${Math.round((value / total) * 100)}%</text>`

      startAngle = endAngle
    })

    // מקרא
    const legendX = width - 150
    const legendY = 50

    labels.forEach((label, index) => {
      const colorIndex = index % colors.length
      const y = legendY + index * 25

      svg += `<rect x="${legendX}" y="${y}" width="15" height="15" fill="${colors[colorIndex]}" />`
      svg += `<text x="${legendX + 25}" y="${y + 12}" fontSize="12" fill="${colors[1]}">${label} (${values[index]})</text>`
    })

    svg += `</svg>`
    return svg
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <Tabs value={activeType} onValueChange={setActiveType} className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bar">עמודות</TabsTrigger>
            <TabsTrigger value="line">קו</TabsTrigger>
            <TabsTrigger value="pie">עוגה</TabsTrigger>
          </TabsList>
        </Tabs>

        <div
          className="w-full aspect-video flex items-center justify-center bg-white rounded-md p-4"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </CardContent>
    </Card>
  )
}

