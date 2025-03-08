"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp, Pencil } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"

interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url: string
  description: string
}

export function CertificationsForm() {
  const { resumeData, updateCertifications } = useResumeContext()
  const [expandedId, setExpandedId] = useState<string | null>(
    resumeData.certifications.length > 0 ? resumeData.certifications[0].id : null,
  )

  const handleChange = (id: string, field: keyof Certification, value: string) => {
    const updatedCertifications = resumeData.certifications.map((cert) =>
      cert.id === id ? { ...cert, [field]: value } : cert,
    )
    updateCertifications(updatedCertifications)
  }

  const addCertification = () => {
    const newId = Date.now().toString()
    const newCertifications = [
      ...resumeData.certifications,
      {
        id: newId,
        name: "",
        issuer: "",
        date: "",
        url: "",
        description: "",
      },
    ]
    updateCertifications(newCertifications)
    setExpandedId(newId) // Expand the new item
  }

  const removeCertification = (id: string) => {
    const updatedCertifications = resumeData.certifications.filter((cert) => cert.id !== id)
    updateCertifications(updatedCertifications)

    // If the removed item was expanded, expand the first remaining item
    if (expandedId === id && updatedCertifications.length > 0) {
      setExpandedId(updatedCertifications[0].id)
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
      {resumeData.certifications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">You haven&apos;t added any certifications yet.</p>
          <Button onClick={addCertification} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Certification
          </Button>
        </div>
      ) : (
        resumeData.certifications.map((certification) => (
          <Card key={certification.id} className="relative">
            <CardContent className="p-0">
              {/* Header - always visible */}
              <div
                className="p-4 flex justify-between items-center cursor-pointer border-b"
                onClick={() => toggleExpand(certification.id)}
              >
                <div className="flex items-center gap-2">
                  {expandedId === certification.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {certification.name || "Certification Name"}
                      {certification.issuer && ` from ${certification.issuer}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">{formatDate(certification.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpand(certification.id)
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
                      removeCertification(certification.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* Form fields - only visible when expanded */}
              {expandedId === certification.id && (
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${certification.id}`}>Certification Name</Label>
                    <Input
                      id={`name-${certification.id}`}
                      value={certification.name}
                      onChange={(e) => handleChange(certification.id, "name", e.target.value)}
                      placeholder="AWS Certified Solutions Architect, Google Analytics, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`issuer-${certification.id}`}>Issuing Organization</Label>
                    <Input
                      id={`issuer-${certification.id}`}
                      value={certification.issuer}
                      onChange={(e) => handleChange(certification.id, "issuer", e.target.value)}
                      placeholder="Amazon Web Services, Google, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`date-${certification.id}`}>Date Issued</Label>
                    <Input
                      id={`date-${certification.id}`}
                      type="month"
                      value={certification.date}
                      onChange={(e) => handleChange(certification.id, "date", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`url-${certification.id}`}>Credential URL (Optional)</Label>
                    <Input
                      id={`url-${certification.id}`}
                      value={certification.url}
                      onChange={(e) => handleChange(certification.id, "url", e.target.value)}
                      placeholder="https://example.com/verify/credential"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${certification.id}`}>Description (Optional)</Label>
                    <Textarea
                      id={`description-${certification.id}`}
                      value={certification.description}
                      onChange={(e) => handleChange(certification.id, "description", e.target.value)}
                      placeholder="Brief description of the certification and skills demonstrated..."
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      {resumeData.certifications.length > 0 && (
        <Button type="button" variant="outline" onClick={addCertification} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Another Certification
        </Button>
      )}

      <div className="flex justify-end">
        <Button type="button">Save & Continue</Button>
      </div>
    </div>
  )
}

