"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  FileText,
  Share2,
  Copy,
  CheckCheck,
  FileImage,
  FileSpreadsheet,
  Linkedin,
  Mail,
} from "lucide-react"
import { ResumePreview } from "@/components/resume/resume-preview"

export default function ExportPage() {
  const [activeTab, setActiveTab] = useState("preview")
  const [copied, setCopied] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("professional")

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://resumeai.example.com/share/john-doe-resume")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto py-3 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/builder" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Editor</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <FileText className="h-5 w-5 text-primary" />
            <span>ResumeAI Export</span>
          </div>
          <div></div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Export Your Resume</h1>

          <div className="grid md:grid-cols-[1fr_300px] gap-6">
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="download">Download</TabsTrigger>
                  <TabsTrigger value="share">Share</TabsTrigger>
                </TabsList>

                <TabsContent value="preview">
                  <Card>
                    <CardContent className="p-6">
                      <div className="bg-white border rounded-lg overflow-hidden">
                        <ResumePreview template={selectedTemplate} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="download">
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <h2 className="text-xl font-semibold mb-4">Download Options</h2>

                      <div className="grid gap-4">
                        <Button variant="outline" className="justify-start h-auto py-4 px-4 gap-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">PDF Format</div>
                            <div className="text-sm text-muted-foreground">Best for job applications</div>
                          </div>
                        </Button>

                        <Button variant="outline" className="justify-start h-auto py-4 px-4 gap-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <FileSpreadsheet className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">DOCX Format</div>
                            <div className="text-sm text-muted-foreground">Editable in Microsoft Word</div>
                          </div>
                        </Button>

                        <Button variant="outline" className="justify-start h-auto py-4 px-4 gap-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <FileImage className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">PNG Format</div>
                            <div className="text-sm text-muted-foreground">High-resolution image</div>
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="share">
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <h2 className="text-xl font-semibold mb-4">Share Your Resume</h2>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value="https://resumeai.example.com/share/john-doe-resume"
                            readOnly
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                          <Button variant="outline" size="icon" onClick={handleCopyLink}>
                            {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>

                        <div className="flex flex-col gap-3">
                          <Button variant="outline" className="justify-start gap-2">
                            <Mail className="h-4 w-4" />
                            Share via Email
                          </Button>
                          <Button variant="outline" className="justify-start gap-2">
                            <Linkedin className="h-4 w-4" />
                            Share to LinkedIn
                          </Button>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg mt-4">
                          <h3 className="font-medium mb-2">Privacy Settings</h3>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="password-protect"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="password-protect" className="text-sm">
                              Password protect this resume
                            </label>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <input
                              type="checkbox"
                              id="expiration"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="expiration" className="text-sm">
                              Set link expiration (30 days)
                            </label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Resume Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Template</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["professional", "modern", "minimal"].map((template) => (
                      <div
                        key={template}
                        className={`border rounded p-1 cursor-pointer ${selectedTemplate === template ? "border-primary" : "border-muted"}`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="aspect-[3/4] bg-muted flex items-center justify-center text-xs capitalize">
                          {template}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Tips</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Send PDF format for job applications</li>
                    <li>• Use DOCX if you need to make edits</li>
                    <li>• Share your resume link for online applications</li>
                    <li>• Update your resume regularly</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

