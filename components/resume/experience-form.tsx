"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Wand2, ChevronDown, ChevronUp, Pencil } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"

interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export function ExperienceForm() {
  const { resumeData, updateExperience } = useResumeContext()
  const [expandedId, setExpandedId] = useState<string | null>(
    resumeData.experience.length > 0 ? resumeData.experience[0].id : null,
  )

  const handleChange = (id: string, field: keyof Experience, value: string | boolean) => {
    const updatedExperiences = resumeData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    updateExperience(updatedExperiences)
  }

  const addExperience = () => {
    const newId = Date.now().toString()
    const newExperiences = [
      ...resumeData.experience,
      {
        id: newId,
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]
    updateExperience(newExperiences)
    setExpandedId(newId) // Expand the new item
  }

  const removeExperience = (id: string) => {
    if (resumeData.experience.length > 1) {
      const updatedExperiences = resumeData.experience.filter((exp) => exp.id !== id)
      updateExperience(updatedExperiences)

      // If the removed item was expanded, expand the first remaining item
      if (expandedId === id && updatedExperiences.length > 0) {
        setExpandedId(updatedExperiences[0].id)
      }
    }
  }

  const generateDescription = (id: string) => {
    // This would connect to the AI API to generate a description
    alert("AI would generate a professional job description based on your position and company")
    console.log("Generating description for experience with ID:", id)
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="space-y-4">
      {resumeData.experience.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">You haven&apos;t added any work experience yet.</p>
          <Button onClick={addExperience} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Experience
          </Button>
        </div>
      ) : (
        resumeData.experience.map((experience) => (
          <Card key={experience.id} className="relative">
            <CardContent className="p-0">
              {/* Header - always visible */}
              <div
                className="p-4 flex justify-between items-center cursor-pointer border-b"
                onClick={() => toggleExpand(experience.id)}
              >
                <div className="flex items-center gap-2">
                  {expandedId === experience.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {experience.position || "Position"}
                      {experience.company && ` at ${experience.company}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(experience.startDate)} -{" "}
                      {experience.current ? "Present" : formatDate(experience.endDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpand(experience.id)
                    }}
                  >
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeExperience(experience.id)
                    }}
                    disabled={resumeData.experience.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* Form fields - only visible when expanded */}
              {expandedId === experience.id && (
                <div className="p-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${experience.id}`}>Company</Label>
                      <Input
                        id={`company-${experience.id}`}
                        value={experience.company}
                        onChange={(e) => handleChange(experience.id, "company", e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`position-${experience.id}`}>Position</Label>
                      <Input
                        id={`position-${experience.id}`}
                        value={experience.position}
                        onChange={(e) => handleChange(experience.id, "position", e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`location-${experience.id}`}>Location</Label>
                    <Input
                      id={`location-${experience.id}`}
                      value={experience.location}
                      onChange={(e) => handleChange(experience.id, "location", e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${experience.id}`}
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => handleChange(experience.id, "startDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`endDate-${experience.id}`}
                        className={experience.current ? "text-muted-foreground" : ""}
                      >
                        End Date
                      </Label>
                      <Input
                        id={`endDate-${experience.id}`}
                        type="month"
                        value={experience.endDate}
                        onChange={(e) => handleChange(experience.id, "endDate", e.target.value)}
                        disabled={experience.current}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${experience.id}`}
                      checked={experience.current}
                      onCheckedChange={(checked) => {
                        const isCurrent = checked === true
                        handleChange(experience.id, "current", isCurrent)
                        if (isCurrent) {
                          handleChange(experience.id, "endDate", "")
                        }
                      }}
                    />
                    <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor={`description-${experience.id}`}>Description</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => generateDescription(experience.id)}
                        className="gap-2"
                      >
                        <Wand2 className="h-4 w-4" />
                        Generate with AI
                      </Button>
                    </div>
                    <Textarea
                      id={`description-${experience.id}`}
                      value={experience.description}
                      onChange={(e) => handleChange(experience.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={4}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      {resumeData.experience.length > 0 && (
        <Button type="button" variant="outline" onClick={addExperience} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Another Experience
        </Button>
      )}

      <div className="flex justify-end">
        <Button type="button">Save & Continue</Button>
      </div>
    </div>
  )
}

