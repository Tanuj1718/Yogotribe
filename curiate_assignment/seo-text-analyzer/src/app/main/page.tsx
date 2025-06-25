"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, Search, Target, TrendingUp, Eye, Plus, BookOpen, Tag } from "lucide-react"
import { SparklesCore } from "@/components/ui/sparkles"

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

export default function SEOAnalyzer() {
  const [inputText, setInputText] = useState("")
  const [modifiedText, setModifiedText] = useState("")
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [insertLoading, setInsertLoading] = useState<string | null>(null)
  const [error, setError] = useState("")

  const analyzeText = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to analyze")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/seo-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze text")
      }

      const result = await response.json()
      setAnalysis(result)
      setModifiedText(inputText) // Initialize modified text with original
    } catch (err) {
      setError("Failed to analyze text. Please try again.")
      console.error("Analysis error:", err)
    } finally {
      setLoading(false)
    }
  }

  const insertKeyword = async (keyword: string) => {
    if (!modifiedText) return

    setInsertLoading(keyword)

    try {
      const response = await fetch("/api/insert-keyword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: modifiedText,
          keyword: keyword,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to insert keyword")
      }

      const result = await response.json()
      setModifiedText(result.modifiedText)
    } catch (err) {
      setError("Failed to insert keyword. Please try again.")
      console.error("Keyword insertion error:", err)
    } finally {
      setInsertLoading(null)
    }
  }

  const getReadabilityColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getReadabilityLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 bg-black">
      <div className="m-4">
        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">SEO Text Analyzer</h1>
          <p className="text-lg text-gray-200">
            Optimize your content with AI-powered SEO insights and keyword suggestions
          </p>
        </div>

        <div>
          {/* Input Section */}
          <Card className="h-fit ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Text Input
              </CardTitle>
              <CardDescription>Enter your blog post, newsletter, tweet, or caption for SEO analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your content here... (e.g., blog post, newsletter content, social media caption)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{inputText.length} characters</span>
                <Button
                  onClick={analyzeText}
                  disabled={loading || !inputText.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Analyze SEO
                    </>
                  )}
                </Button>
              </div>
              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>}
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="mt-8">
            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    SEO Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Readability Score */}
                  <div>
                    <h3 className="font-semibold mb-2">Readability Score</h3>
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl font-bold ${getReadabilityColor(analysis.readabilityScore)}`}>
                        {analysis.readabilityScore}/100
                      </div>
                      <Badge variant={analysis.readabilityScore >= 60 ? "default" : "destructive"}>
                        {getReadabilityLabel(analysis.readabilityScore)}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Text Metrics */}
                  <div>
                    <h3 className="font-semibold mb-3">Text Metrics</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{analysis.wordCount}</div>
                        <div className="text-sm text-gray-600">Words</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{analysis.sentenceCount}</div>
                        <div className="text-sm text-gray-600">Sentences</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{analysis.avgWordsPerSentence}</div>
                        <div className="text-sm text-gray-600">Avg Words/Sentence</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Topics */}
                  {analysis.topics && analysis.topics.length > 0 && (
                    <>
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Detected Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {analysis.topics.slice(0, 5).map((topic, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50">
                              {topic.label} ({Math.round(topic.score * 100)}%)
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Separator />
                    </>
                  )}

                  {/* SEO Suggestions */}
                  <div>
                    <h3 className="font-semibold mb-3">SEO Suggestions</h3>
                    <ul className="space-y-2">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

        </div>

        {/* Keywords and Preview Section */}
          {analysis && (
            <div className="grid lg:grid-cols-2 gap-6 mt-6 ">
              {/* Recommended Keywords */}
              <Card >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Recommended Keywords
                  </CardTitle>
                  <CardDescription>Click to insert keywords naturally into your text</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.recommendedKeywords.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{keyword}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => insertKeyword(keyword)}
                          disabled={insertLoading === keyword}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          {insertLoading === keyword ? (
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <Plus className="w-4 h-4 mr-1" />
                          )}
                          Insert
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Text Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Optimized Text Preview
                  </CardTitle>
                  <CardDescription>Your text with inserted keywords</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg min-h-[200px] max-h-[400px] overflow-y-auto">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {modifiedText || "Your optimized text will appear here after inserting keywords..."}
                    </p>
                  </div>
                  {modifiedText && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(modifiedText)}
                        className="text-sm"
                      >
                        Copy Optimized Text
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          </div>
      
        <div className="h-40 relative w-full">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
 
        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
 
        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
      </div>

    </div>
  )
}
