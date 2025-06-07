import { type NextRequest, NextResponse } from "next/server"
import { insertKeyword } from "../seo-analysis/route"

export async function POST(request: NextRequest) {
  try {
    const { text, keyword } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    if (!keyword || typeof keyword !== "string") {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 })
    }

    // Use the backend keyword insertion logic
    const modifiedText = insertKeyword(text, keyword)

    return NextResponse.json({ modifiedText })
  } catch (error) {
    console.error("Keyword insertion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
