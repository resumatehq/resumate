"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp, Pencil } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"

interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export function EducationForm() {
  const { resumeData, updateEducation } = useResumeContext()
  const [expandedId, setExpandedId] = useState<string | null>(
    resumeData.education.length > 0 ? resumeData.education[0].id : null,
  )

  const handleChange = (id: string, field: keyof Education, value: string) => {
    const updatedEducations = resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    updateEducation(updatedEducations)
  }

  const addEducation = () => {
    const newId = Date.now().toString()
    const newEducations = [
      ...resumeData.education,
      {
        id: newId,
        institution: "",
        degree: "",
        fieldOfStudy: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]
    updateEducation(newEducations)
    setExpandedId(newId) // Expand the new item
  }

  const removeEducation = (id: string) => {
    if (resumeData.education.length > 1) {
      const updatedEducations = resumeData.education.filter((edu) => edu.id !== id)
      updateEducation(updatedEducations)

      // If the removed item was expanded, expand the first remaining item
      if (expandedId === id && updatedEducations.length > 0) {
        setExpandedId(updatedEducations[0].id)
      }
    }
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
      {resumeData.education.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">You haven&apos;t added any education yet.</p>
          <Button onClick={addEducation} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Education
          </Button>
        </div>
      ) : (
        resumeData.education.map((education) => (
          <Card key={education.id} className="relative">
            <CardContent className="p-0">
              {/* Header - always visible */}
              <div
                className="p-4 flex justify-between items-center cursor-pointer border-b"
                onClick={() => toggleExpand(education.id)}
              >
                <div className="flex items-center gap-2">
                  {expandedId === education.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {education.degree || "Degree"}
                      {education.fieldOfStudy && ` in ${education.fieldOfStudy}`}
                      {education.institution && ` at ${education.institution}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(education.startDate)} - {formatDate(education.endDate)}
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
                      toggleExpand(education.id)
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
                      removeEducation(education.id)
                    }}
                    disabled={resumeData.education.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* Form fields - only visible when expanded */}
              {expandedId === education.id && (
                <div className="p-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                      <Input
                        id={`institution-${education.id}`}
                        value={education.institution}
                        onChange={(e) => handleChange(education.id, "institution", e.target.value)}
                        placeholder="University or School Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${education.id}`}>Location</Label>
                      <Input
                        id={`location-${education.id}`}
                        value={education.location}
                        onChange={(e) => handleChange(education.id, "location", e.target.value)}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                      <Input
                        id={`degree-${education.id}`}
                        value={education.degree}
                        onChange={(e) => handleChange(education.id, "degree", e.target.value)}
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`fieldOfStudy-${education.id}`}>Field of Study</Label>
                      <Input
                        id={`fieldOfStudy-${education.id}`}
                        value={education.fieldOfStudy}
                        onChange={(e) => handleChange(education.id, "fieldOfStudy", e.target.value)}
                        placeholder="Computer Science, Business, etc."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${education.id}`}
                        type="month"
                        value={education.startDate}
                        onChange={(e) => handleChange(education.id, "startDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                      <Input
                        id={`endDate-${education.id}`}
                        type="month"
                        value={education.endDate}
                        onChange={(e) => handleChange(education.id, "endDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${education.id}`}>Description (Optional)</Label>
                    <Textarea
                      id={`description-${education.id}`}
                      value={education.description}
                      onChange={(e) => handleChange(education.id, "description", e.target.value)}
                      placeholder="Relevant coursework, achievements, activities..."
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      {resumeData.education.length > 0 && (
        <Button type="button" variant="outline" onClick={addEducation} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Another Education
        </Button>
      )}

      <div className="flex justify-end">
        <Button type="button">Save & Continue</Button>
      </div>
    </div>
  )
}

