"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Save,
  Download,
  Share2,
  ArrowLeft,
  Sparkles,
  Wand2,
} from "lucide-react"
import { PersonalInfoForm } from "@/components/resume/personal-info-form"
import { ExperienceForm } from "@/components/resume/experience-form"
import { EducationForm } from "@/components/resume/education-form"
import { SkillsForm } from "@/components/resume/skills-form"
import { ResumePreview } from "@/components/resume/resume-preview"
import { AiAssistant } from "@/components/resume/ai-assistant"
import { TemplateSelector } from "@/components/resume/template-selector"
import { AtsScanner } from "@/components/resume/ats-scanner"

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("personal")
  const [showAiAssistant, setShowAiAssistant] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("professional")

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto py-3 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <FileText className="h-5 w-5 text-primary" />
            <span>ResumeAI Builder</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Save className="h-4 w-4" /> Save
            </Button>
            <Button size="sm" className="gap-1">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-4 px-2">
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <div className="bg-background rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Build Your Resume</h1>
                <Button
                  variant={showAiAssistant ? "default" : "outline"}
                  onClick={() => setShowAiAssistant(!showAiAssistant)}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  AI Assistant
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="personal" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Personal</span>
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Experience</span>
                  </TabsTrigger>
                  <TabsTrigger value="education" className="gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden sm:inline">Education</span>
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="gap-2">
                    <Code className="h-4 w-4" />
                    <span className="hidden sm:inline">Skills</span>
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Templates</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <PersonalInfoForm />
                </TabsContent>

                <TabsContent value="experience">
                  <ExperienceForm />
                </TabsContent>

                <TabsContent value="education">
                  <EducationForm />
                </TabsContent>

                <TabsContent value="skills">
                  <SkillsForm />
                </TabsContent>

                <TabsContent value="templates">
                  <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
                </TabsContent>
              </Tabs>
            </div>

            {showAiAssistant && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <AiAssistant />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">ATS Optimization</h2>
                </div>
                <AtsScanner />
              </CardContent>
            </Card>
          </div>

          <div className="sticky top-[73px] self-start">
            <div className="bg-background rounded-lg shadow-sm p-3">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold">Preview</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-muted rounded border">
                <ResumePreview template={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

