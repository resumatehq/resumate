"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Wand2 } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"

export function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updatePersonalInfo({ [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form is already saved as user types, so this is just for UX feedback
    alert("Personal information saved!")
  }

  const generateSummary = () => {
    // This would connect to the AI API to generate a summary
    alert("AI would generate a professional summary based on your information")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={resumeData.personal.fullName}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={resumeData.personal.jobTitle}
            onChange={handleChange}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={resumeData.personal.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={resumeData.personal.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={resumeData.personal.location}
            onChange={handleChange}
            placeholder="New York, NY"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            value={resumeData.personal.website}
            onChange={handleChange}
            placeholder="https://johndoe.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
        <Input
          id="linkedin"
          name="linkedin"
          value={resumeData.personal.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/johndoe"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="summary">Professional Summary</Label>
          <Button type="button" variant="outline" size="sm" onClick={generateSummary} className="gap-2">
            <Wand2 className="h-4 w-4" />
            Generate with AI
          </Button>
        </div>
        <Textarea
          id="summary"
          name="summary"
          value={resumeData.personal.summary}
          onChange={handleChange}
          placeholder="Write a brief summary of your professional background and key strengths..."
          rows={5}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save & Continue</Button>
      </div>
    </form>
  )
}

