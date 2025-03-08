"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X, ChevronDown, ChevronUp, Pencil } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"

interface Project {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  current: boolean
  url: string
  technologies: string[]
}

export function ProjectsForm() {
  const { resumeData, updateProjects } = useResumeContext()
  const [techInput, setTechInput] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(
    resumeData.projects.length > 0 ? resumeData.projects[0].id : null,
  )

  const handleChange = (id: string, field: keyof Project, value: string | boolean) => {
    const updatedProjects = resumeData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj))
    updateProjects(updatedProjects)
  }

  const addProject = () => {
    const newId = Date.now().toString()
    const newProjects = [
      ...resumeData.projects,
      {
        id: newId,
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        current: false,
        url: "",
        technologies: [],
      },
    ]
    updateProjects(newProjects)
    setExpandedId(newId) // Expand the new item
  }

  const removeProject = (id: string) => {
    const updatedProjects = resumeData.projects.filter((proj) => proj.id !== id)
    updateProjects(updatedProjects)

    // If the removed item was expanded, expand the first remaining item
    if (expandedId === id && updatedProjects.length > 0) {
      setExpandedId(updatedProjects[0].id)
    }
  }

  const addTechnology = (id: string) => {
    if (!techInput.trim()) return

    const updatedProjects = resumeData.projects.map((proj) => {
      if (proj.id === id) {
        return {
          ...proj,
          technologies: [...proj.technologies, techInput.trim()],
        }
      }
      return proj
    })

    updateProjects(updatedProjects)
    setTechInput("")
  }

  const removeTechnology = (projectId: string, tech: string) => {
    const updatedProjects = resumeData.projects.map((proj) => {
      if (proj.id === projectId) {
        return {
          ...proj,
          technologies: proj.technologies.filter((t) => t !== tech),
        }
      }
      return proj
    })

    updateProjects(updatedProjects)
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
      {resumeData.projects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">You haven&apos;t added any projects yet.</p>
          <Button onClick={addProject} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Project
          </Button>
        </div>
      ) : (
        resumeData.projects.map((project) => (
          <Card key={project.id} className="relative">
            <CardContent className="p-0">
              {/* Header - always visible */}
              <div
                className="p-4 flex justify-between items-center cursor-pointer border-b"
                onClick={() => toggleExpand(project.id)}
              >
                <div className="flex items-center gap-2">
                  {expandedId === project.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <h3 className="font-semibold">{project.title || "Project Title"}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(project.startDate)} - {project.current ? "Present" : formatDate(project.endDate)}
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
                      toggleExpand(project.id)
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
                      removeProject(project.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* Form fields - only visible when expanded */}
              {expandedId === project.id && (
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                    <Input
                      id={`title-${project.id}`}
                      value={project.title}
                      onChange={(e) => handleChange(project.id, "title", e.target.value)}
                      placeholder="E-commerce Website, Mobile App, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${project.id}`}>Description</Label>
                    <Textarea
                      id={`description-${project.id}`}
                      value={project.description}
                      onChange={(e) => handleChange(project.id, "description", e.target.value)}
                      placeholder="Describe the project, your role, and key achievements..."
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${project.id}`}
                        type="month"
                        value={project.startDate}
                        onChange={(e) => handleChange(project.id, "startDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`endDate-${project.id}`}
                        className={project.current ? "text-muted-foreground" : ""}
                      >
                        End Date
                      </Label>
                      <Input
                        id={`endDate-${project.id}`}
                        type="month"
                        value={project.endDate}
                        onChange={(e) => handleChange(project.id, "endDate", e.target.value)}
                        disabled={project.current}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${project.id}`}
                      checked={project.current}
                      onCheckedChange={(checked) => {
                        const isCurrent = checked === true
                        handleChange(project.id, "current", isCurrent)
                        if (isCurrent) {
                          handleChange(project.id, "endDate", "")
                        }
                      }}
                    />
                    <Label htmlFor={`current-${project.id}`}>This is an ongoing project</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`url-${project.id}`}>Project URL (Optional)</Label>
                    <Input
                      id={`url-${project.id}`}
                      value={project.url}
                      onChange={(e) => handleChange(project.id, "url", e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Technologies Used</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="gap-1 py-2">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(project.id, tech)}
                            className="ml-1 rounded-full hover:bg-muted p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {project.technologies.length === 0 && (
                        <p className="text-sm text-muted-foreground">No technologies added yet.</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a technology..."
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTechnology(project.id)
                          }
                        }}
                      />
                      <Button type="button" onClick={() => addTechnology(project.id)} disabled={!techInput.trim()}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      {resumeData.projects.length > 0 && (
        <Button type="button" variant="outline" onClick={addProject} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Another Project
        </Button>
      )}

      <div className="flex justify-end">
        <Button type="button">Save & Continue</Button>
      </div>
    </div>
  )
}

