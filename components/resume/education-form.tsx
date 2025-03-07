"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
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

  const handleChange = (id: string, field: keyof Education, value: string) => {
    const updatedEducations = resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    updateEducation(updatedEducations)
  }

  const addEducation = () => {
    const newEducations = [
      ...resumeData.education,
      {
        id: Date.now().toString(),
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
  }

  const removeEducation = (id: string) => {
    if (resumeData.education.length > 1) {
      const updatedEducations = resumeData.education.filter((edu) => edu.id !== id)
      updateEducation(updatedEducations)
    }
  }

  return (
    <div className="space-y-4">
      {resumeData.education.map((education, index) => (
        <Card key={education.id} className="relative">
          <CardContent className="p-4">
            <div className="absolute top-4 right-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(education.id)}
                disabled={resumeData.education.length === 1}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            <h3 className="font-semibold mb-4">Education {index + 1}</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
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

            <div className="grid md:grid-cols-2 gap-4 mb-4">
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

            <div className="grid md:grid-cols-2 gap-4 mb-4">
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
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addEducation} className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add Another Education
      </Button>

      <div className="flex justify-end">
        <Button type="button">Save & Continue</Button>
      </div>
    </div>
  )
}

