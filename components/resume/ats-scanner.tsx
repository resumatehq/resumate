"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Plus, Sparkles } from "lucide-react"

export function AtsScanner() {
  const [jobDescription, setJobDescription] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [missingKeywords, setMissingKeywords] = useState<string[]>([])
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleScan = () => {
    if (!jobDescription.trim()) return

    setIsScanning(true)
    setScanComplete(false)

    // Simulate scanning process
    setTimeout(() => {
      // This would be replaced with actual ATS scanning logic
      const mockScore = Math.floor(Math.random() * 30) + 65 // Random score between 65-95
      setScore(mockScore)

      // Sample keywords for demonstration
      const allKeywords = [
        "JavaScript",
        "React",
        "Node.js",
        "TypeScript",
        "AWS",
        "CI/CD",
        "Agile",
        "REST API",
        "GraphQL",
        "MongoDB",
        "Team leadership",
        "Problem solving",
        "Communication",
      ]

      // Randomly select matched and missing keywords
      const matched = allKeywords.sort(() => 0.5 - Math.random()).slice(0, 7)

      const missing = allKeywords
        .filter((kw) => !matched.includes(kw))
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)

      setMatchedKeywords(matched)
      setMissingKeywords(missing)

      // Sample suggestions
      setSuggestions([
        "Add more specific technical skills mentioned in the job description",
        "Quantify your achievements with metrics and numbers",
        "Include more industry-specific terminology",
        "Highlight leadership experience more prominently",
      ])

      setIsScanning(false)
      setScanComplete(true)
    }, 2000)
  }

  const addKeywordToResume = (keyword: string) => {
    // This would integrate with the resume state to add the keyword
    alert(`Adding "${keyword}" to your resume`)

    // For demo purposes, move from missing to matched
    setMissingKeywords((prev) => prev.filter((kw) => kw !== keyword))
    setMatchedKeywords((prev) => [...prev, keyword])
  }

  return (
    <div>
      <Tabs defaultValue="scan">
        <TabsList className="mb-4">
          <TabsTrigger value="scan">ATS Scanner</TabsTrigger>
          <TabsTrigger value="keywords">Keyword Optimizer</TabsTrigger>
        </TabsList>

        <TabsContent value="scan">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Paste the job description below to analyze how well your resume matches the requirements.
              </p>
              <Textarea
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={5}
              />
            </div>

            <Button onClick={handleScan} disabled={!jobDescription.trim() || isScanning} className="w-full">
              {isScanning ? "Scanning..." : "Scan Resume"}
            </Button>

            {isScanning && (
              <div className="space-y-2 py-4">
                <div className="flex justify-between text-sm">
                  <span>Analyzing resume...</span>
                  <span>Please wait</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            )}

            {scanComplete && (
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">ATS Compatibility Score</h3>
                  <Badge variant={score >= 80 ? "default" : "outline"} className="text-sm">
                    {score}%
                  </Badge>
                </div>

                <Progress
                  value={score}
                  className="h-3"
                  style={{
                    background:
                      score < 70
                        ? "rgba(239, 68, 68, 0.2)"
                        : score < 80
                          ? "rgba(245, 158, 11, 0.2)"
                          : "rgba(34, 197, 94, 0.2)",
                  }}
                />

                <div
                  className={`flex items-center gap-2 text-sm ${
                    score < 70 ? "text-red-500" : score < 80 ? "text-amber-500" : "text-green-500"
                  }`}
                >
                  {score < 70 ? (
                    <>
                      <AlertCircle className="h-4 w-4" />
                      <span>Your resume needs significant improvements to pass ATS</span>
                    </>
                  ) : score < 80 ? (
                    <>
                      <AlertCircle className="h-4 w-4" />
                      <span>Your resume may pass some ATS systems but needs improvement</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Your resume is well-optimized for ATS systems</span>
                    </>
                  )}
                </div>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Matched Keywords</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {matchedKeywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100">
                          {keyword}
                        </Badge>
                      ))}
                    </div>

                    <h4 className="font-medium mb-2">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {missingKeywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-muted flex items-center gap-1"
                          onClick={() => addKeywordToResume(keyword)}
                        >
                          {keyword}
                          <Plus className="h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h4 className="font-medium mb-2">Suggestions for Improvement</h4>
                  <ul className="space-y-2 text-sm">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="keywords">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Industry-specific keywords to help your resume pass through Applicant Tracking Systems.
            </p>

            <div className="grid gap-4">
              {[
                {
                  industry: "Software Development",
                  keywords: [
                    "JavaScript",
                    "React",
                    "Node.js",
                    "AWS",
                    "CI/CD",
                    "Agile",
                    "REST API",
                    "GraphQL",
                    "Docker",
                    "Kubernetes",
                  ],
                },
                {
                  industry: "Marketing",
                  keywords: [
                    "SEO",
                    "Content Strategy",
                    "Social Media",
                    "Google Analytics",
                    "A/B Testing",
                    "Email Marketing",
                    "CRM",
                    "Brand Management",
                  ],
                },
                {
                  industry: "Finance",
                  keywords: [
                    "Financial Analysis",
                    "Forecasting",
                    "Budgeting",
                    "Risk Assessment",
                    "Excel",
                    "Financial Modeling",
                    "Accounting",
                    "Compliance",
                  ],
                },
              ].map((category, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{category.industry}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.keywords.map((keyword, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="cursor-pointer hover:bg-muted flex items-center gap-1"
                          onClick={() => addKeywordToResume(keyword)}
                        >
                          {keyword}
                          <Plus className="h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => alert("This would analyze your resume and suggest industry-specific keywords")}
            >
              <Sparkles className="h-4 w-4" />
              Analyze My Resume for Keyword Suggestions
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

