"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp, Pencil } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"

interface Award {
  id: string
  title: string
  issuer: string
  date: string
  description: string
}

export function AwardsForm() {
  const { resumeData, updateAwards } = useResumeContext()
  const [expandedId, setExpandedId] = useState<string | null>(
    resumeData.awards.length > 0 ? resumeData.awards[0].id : null,
  )

  const handleChange = (id: string, field: keyof Award, value: string) => {
    const updatedAwards = resumeData.awards.map((award) => (award.id === id ? { ...award, [field]: value } : award))
    updateAwards(updatedAwards)
  }

  const addAward = () => {
    const newId = Date.now().toString()
    const newAwards = [
      ...resumeData.awards,
      {
        id: newId,
        title: "",
        issuer: "",
        date: "",
        description: "",
      },
    ]
    updateAwards(newAwards)
    setExpandedId(newId) // Expand the new item
  }

  const removeAward = (id: string) => {
    const updatedAwards = resumeData.awards.filter((award) => award.id !== id)
    updateAwards(updatedAwards)

    // If the removed item was expanded, expand the first remaining item
    if (expandedId === id && updatedAwards.length > 0) {
      setExpandedId(updatedAwards[0].id)
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
      {resumeData.awards.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">You haven&apos;t added any honors or awards yet.</p>
          <Button onClick={addAward} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Honor/Award
          </Button>
        </div>
      ) : (
        resumeData.awards.map((award) => (
          <Card key={award.id} className="relative">
            <CardContent className="p-0">
              {/* Header - always visible */}
              <div
                className="p-4 flex justify-between items-center cursor-pointer border-b"
                onClick={() => toggleExpand(award.id)}
              >
                <div className="flex items-center gap-2">
                  {expandedId === award.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {award.title || "Award Title"}
                      {award.issuer && ` from ${award.issuer}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">{formatDate(award.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpand(award.id)
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
                      removeAward(award.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* Form fields - only visible when expanded */}
              {expandedId === award.id && (
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${award.id}`}>Award Title</Label>
                    <Input
                      id={`title-${award.id}`}
                      value={award.title}
                      onChange={(e) => handleChange(award.id, "title", e.target.value)}
                      placeholder="Employee of the Year, Dean's List, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`issuer-${award.id}`}>Issuing Organization</Label>
                    <Input
                      id={`issuer-${award.id}`}
                      value={award.issuer}
                      onChange={(e) => handleChange(award.id, "issuer", e.target.value)}
                      placeholder="Company Name, University, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`date-${award.id}`}>Date Received</Label>
                    <Input
                      id={`date-${award.id}`}
                      type="month"
                      value={award.date}
                      onChange={(e) => handleChange(award.id, "date", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${award.id}`}>Description (Optional)</Label>
                    <Textarea
                      id={`description-${award.id}`}
                      value={award.description}
                      onChange={(e) => handleChange(award.id, "description", e.target.value)}
                      placeholder="Brief description of the award and why you received it..."
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      {resumeData.awards.length > 0 && (
        <Button type="button" variant="outline" onClick={addAward} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Another Honor/Award
        </Button>
      )}

      <div className="flex justify-end">
        <Button type="button">Save & Continue</Button>
      </div>
    </div>
  )
}

