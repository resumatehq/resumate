"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Send, Copy, CheckCheck } from "lucide-react"

export function AiAssistant() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI resume assistant. I can help you optimize your resume content, suggest improvements, and answer questions about resume best practices. How can I help you today?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = {
        help: "I can help you optimize your resume by suggesting better wording, providing industry-specific keywords, and ensuring your content is ATS-friendly. Just tell me what section you need help with!",
        summary:
          "For your professional summary, try to keep it concise (3-5 sentences) and highlight your most impressive achievements and skills. Focus on quantifiable results and what makes you unique in your field.",
        experience:
          'When describing your work experience, use action verbs and focus on achievements rather than responsibilities. Include metrics when possible (e.g., "Increased sales by 20%" rather than "Responsible for sales").',
        skills:
          "For technical roles, prioritize specific technical skills like programming languages and tools. For non-technical roles, emphasize relevant soft skills and industry knowledge.",
        default:
          "I can help optimize your resume content to make it more impactful and ATS-friendly. What specific section are you working on?",
      }

      let responseContent = aiResponses.default

      // Simple keyword matching for demo purposes
      const lowercaseInput = userMessage.content.toLowerCase()
      if (lowercaseInput.includes("help")) {
        responseContent = aiResponses.help
      } else if (lowercaseInput.includes("summary")) {
        responseContent = aiResponses.summary
      } else if (lowercaseInput.includes("experience")) {
        responseContent = aiResponses.experience
      } else if (lowercaseInput.includes("skills")) {
        responseContent = aiResponses.skills
      }

      setMessages((prev) => [...prev, { role: "assistant", content: responseContent }])
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedPrompts = [
    "Help me write a better professional summary",
    "Optimize my job description for ATS",
    "Suggest skills for a software engineer resume",
    "How can I make my resume stand out?",
  ]

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">AI Resume Assistant</h2>
      </div>

      <Tabs defaultValue="chat">
        <TabsList className="mb-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <div className="bg-muted/50 rounded-lg p-3 h-[280px] overflow-y-auto mb-3">
            {messages.map((message, index) => (
              <div key={index} className={`mb-3 ${message.role === "assistant" ? "pr-8" : "pl-8"}`}>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex justify-between">
                      <p className={message.role === "assistant" ? "text-primary font-medium" : "font-medium"}>
                        {message.role === "assistant" ? "AI Assistant" : "You"}
                      </p>
                      {message.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(message.content)}
                        >
                          {copied ? <CheckCheck className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      )}
                    </div>
                    <p className="text-sm mt-1">{message.content}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center items-center py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Textarea
              placeholder="Ask for resume advice or help with content..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[60px]"
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="suggestions">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Here are some ways our AI assistant can help optimize your resume:
            </p>

            <div className="grid gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4"
                  onClick={() => {
                    setInput(prompt)
                    setTimeout(() => handleSendMessage(), 100)
                  }}
                >
                  <div className="flex gap-2 items-start">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-left">{prompt}</span>
                  </div>
                </Button>
              ))}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg mt-6">
              <h3 className="font-medium mb-2">Resume Writing Tips</h3>
              <ul className="text-sm space-y-2">
                <li>• Use action verbs to start bullet points</li>
                <li>• Quantify achievements when possible</li>
                <li>• Tailor your resume for each job application</li>
                <li>• Keep your resume to 1-2 pages</li>
                <li>• Use industry-specific keywords to pass ATS</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

