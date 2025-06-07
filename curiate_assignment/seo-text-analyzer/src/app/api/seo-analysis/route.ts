import { type NextRequest, NextResponse } from "next/server"

interface SEOAnalysis {
  readabilityScore: number
  keywordDensity: { [key: string]: number }
  recommendedKeywords: string[]
  suggestions: string[]
  wordCount: number
  sentenceCount: number
  avgWordsPerSentence: number
  entities: Entity[]
  topics: Topic[]
}

interface Entity {
  id: string
  type: string
  matchedText: string
  relevanceScore: number
  confidenceScore: number
  wikiLink?: string
}

interface Topic {
  label: string
  score: number
}

// TextRazor API response interfaces
interface TextRazorResponse {
  response: {
    language?: string
    languageIsReliable?: boolean
    entities?: TextRazorEntity[]
    topics?: TextRazorTopic[]
    sentences?: TextRazorSentence[]
    coarseTopics?: TextRazorTopic[]
  }
}

interface TextRazorEntity {
  id: string
  type: string[]
  matchingTokens: number[]
  matchedText: string
  relevanceScore: number
  confidenceScore: number
  wikiLink?: string
}

interface TextRazorTopic {
  label: string
  score: number
}

interface TextRazorSentence {
  words: TextRazorWord[]
}

interface TextRazorWord {
  token: string
  position: number
  startingPos: number
  endingPos: number
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Get TextRazor API key from environment variable
    const apiKey = process.env.TEXTRAZOR_API_KEY || "YOUR_TEXTRAZOR_API_KEY"

    // Call TextRazor API
    const textRazorResponse = await analyzeWithTextRazor(text, apiKey)

    // Process the TextRazor response
    const analysis = processTextRazorResponse(text, textRazorResponse)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("SEO Analysis error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function analyzeWithTextRazor(text: string, apiKey: string): Promise<TextRazorResponse> {
  const url = "https://api.textrazor.com/"

  const formData = new URLSearchParams()
  formData.append("text", text)
  formData.append("extractors", "entities,topics,words,sentences")

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "x-textrazor-key": apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`TextRazor API error: ${response.status} ${errorText}`)
  }

  return await response.json()
}

function processTextRazorResponse(originalText: string, textRazorResponse: TextRazorResponse): SEOAnalysis {
  const { response } = textRazorResponse

  // Extract entities and topics
  const entities = (response.entities || []).map((entity) => ({
    id: entity.id,
    type: entity.type[0] || "Unknown",
    matchedText: entity.matchedText,
    relevanceScore: entity.relevanceScore,
    confidenceScore: entity.confidenceScore,
    wikiLink: entity.wikiLink,
  }))

  const topics = (response.topics || []).slice(0, 10)

  // Calculate basic text metrics
  const words = originalText.toLowerCase().match(/\b\w+\b/g) || []
  const sentences = originalText.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const wordCount = words.length
  const sentenceCount = sentences.length
  const avgWordsPerSentence = Math.round(wordCount / Math.max(sentenceCount, 1))

  // Calculate readability score (simplified Flesch Reading Ease)
  const avgSentenceLength = wordCount / Math.max(sentenceCount, 1)
  const avgSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0) / Math.max(wordCount, 1)
  const readabilityScore = Math.max(
    0,
    Math.min(100, Math.round(206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllables)),
  )

  // Generate keyword density from entities and words
  const wordFreq: { [key: string]: number } = {}
  words.forEach((word) => {
    if (word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1
    }
  })

  // Get top keywords by frequency
  const topKeywords = Object.entries(wordFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .reduce(
      (acc, [word, count]) => {
        acc[word] = Math.round((count / wordCount) * 100 * 10) / 10
        return acc
      },
      {} as { [key: string]: number },
    )

  // Generate recommended keywords from entities and topics
  const recommendedKeywords = generateRecommendedKeywords(entities, topics)

  // Generate SEO suggestions based on analysis
  const suggestions = generateSuggestions(originalText, wordCount, sentenceCount, readabilityScore, entities, topics)

  return {
    readabilityScore,
    keywordDensity: topKeywords,
    recommendedKeywords,
    suggestions,
    wordCount,
    sentenceCount,
    avgWordsPerSentence,
    entities,
    topics,
  }
}

function countSyllables(word: string): number {
  word = word.toLowerCase()
  if (word.length <= 3) return 1
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
  word = word.replace(/^y/, "")
  const matches = word.match(/[aeiouy]{1,2}/g)
  return matches ? matches.length : 1
}

function generateRecommendedKeywords(entities: Entity[], topics: Topic[]): string[] {
  // Extract keywords from entities and topics
  const entityKeywords = entities
    .filter((entity) => entity.relevanceScore > 0.7)
    .map((entity) => entity.matchedText)
    .slice(0, 5)

  const topicKeywords = topics
    .filter((topic) => topic.score > 0.5)
    .map((topic) => topic.label)
    .slice(0, 5)

  // Combine and deduplicate keywords
  const allKeywords = [...new Set([...entityKeywords, ...topicKeywords])]

  // If we don't have enough keywords, add some common SEO terms
  if (allKeywords.length < 8) {
    const commonKeywords = [
      "SEO optimization",
      "content marketing",
      "digital strategy",
      "user engagement",
      "search rankings",
      "keyword research",
      "content quality",
      "organic traffic",
    ]

    // Add common keywords until we have 8 or run out
    let i = 0
    while (allKeywords.length < 8 && i < commonKeywords.length) {
      if (!allKeywords.includes(commonKeywords[i])) {
        allKeywords.push(commonKeywords[i])
      }
      i++
    }
  }

  return allKeywords.slice(0, 8)
}

function generateSuggestions(
  text: string,
  wordCount: number,
  sentenceCount: number,
  readabilityScore: number,
  entities: Entity[],
  topics: Topic[],
): string[] {
  const suggestions: string[] = []

  // Content length suggestions
  if (wordCount < 300) {
    suggestions.push("Consider expanding your content. Aim for at least 300 words for better SEO performance.")
  } else if (wordCount < 600) {
    suggestions.push("Your content is a good start, but consider expanding to 600+ words for comprehensive coverage.")
  }

  // Readability suggestions
  if (readabilityScore < 60) {
    suggestions.push("Improve readability by using shorter sentences and simpler words.")
  }

  if (sentenceCount > 0 && wordCount / sentenceCount > 20) {
    suggestions.push("Break up long sentences to improve readability and user engagement.")
  }

  // Keyword usage suggestions
  if (entities.length > 0) {
    const topEntity = entities[0]
    if (topEntity.relevanceScore > 0.8) {
      suggestions.push(`Consider using "${topEntity.matchedText}" more prominently in your content.`)
    }
  }

  // Topic coverage suggestions
  if (topics.length > 0) {
    const topTopic = topics[0]
    suggestions.push(
      `Your content is well-aligned with the topic "${topTopic.label}". Consider expanding on this theme.`,
    )
  }

  // Structure suggestions
  if (!text.includes("?")) {
    suggestions.push("Consider adding questions to increase user engagement and time on page.")
  }

  if (text.split("\n").length < 3) {
    suggestions.push("Add paragraph breaks to improve content structure and readability.")
  }

  // General SEO suggestions
  suggestions.push("Include relevant internal and external links to boost SEO authority.")
  suggestions.push("Add a compelling meta description to improve click-through rates.")
  suggestions.push("Use header tags (H1, H2, H3) to structure your content effectively.")

  return suggestions
}

// Backend keyword insertion logic
export function insertKeyword(text: string, keyword: string): string {
  if (!text || !keyword) return text

  // Split text into sentences
  const sentences = text.split(/([.!?]+)/)
  if (sentences.length <= 1) return `${keyword} is an important topic in ${text}`

  // Check if keyword already exists in text
  if (text.toLowerCase().includes(keyword.toLowerCase())) {
    // If keyword exists, try to emphasize it
    return text.replace(new RegExp(`\\b${keyword}\\b`, "i"), `${keyword} (an important topic)`)
  }

  // Find the best position to insert the keyword
  // Look for sentences that are about topics or introductions
  let bestSentenceIndex = -1
  let bestScore = -1

  sentences.forEach((sentence, index) => {
    if (index % 2 === 0) {
      // Skip punctuation entries
      let score = 0

      // Prefer earlier sentences
      score += Math.max(0, 10 - index)

      // Prefer sentences with introductory phrases
      if (/^(in|when|if|as|the|this|these|those|it|they)/i.test(sentence.trim())) {
        score += 5
      }

      // Prefer shorter sentences
      if (sentence.split(/\s+/).length < 15) {
        score += 3
      }

      if (score > bestScore) {
        bestScore = score
        bestSentenceIndex = index
      }
    }
  })

  // If no good position found, add to the beginning
  if (bestSentenceIndex === -1) {
    bestSentenceIndex = 0
  }

  // Insert the keyword naturally
  const sentenceParts = sentences[bestSentenceIndex].trim().split(/\s+/)

  if (bestSentenceIndex === 0) {
    // For first sentence, add at beginning
    sentences[bestSentenceIndex] = `${keyword} is important in the context of ${sentences[bestSentenceIndex].trim()}`
  } else if (sentenceParts.length > 5) {
    // For longer sentences, insert in the middle
    const midPoint = Math.floor(sentenceParts.length / 2)
    sentenceParts.splice(midPoint, 0, `especially regarding ${keyword},`)
    sentences[bestSentenceIndex] = sentenceParts.join(" ")
  } else {
    // For shorter sentences, append
    sentences[bestSentenceIndex] = `${sentences[bestSentenceIndex].trim()}, particularly in relation to ${keyword}`
  }

  return sentences.join("")
}
