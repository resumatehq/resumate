"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { X, Wand2 } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"

export function SkillsForm() {
  const { resumeData, updateSkills } = useResumeContext()
  const [skillInput, setSkillInput] = useState("")
  const [activeCategory, setActiveCategory] = useState<"technical" | "soft" | "languages">("technical")

  const handleAddSkill = (categoryId: "technical" | "soft" | "languages") => {
    if (!skillInput.trim()) return

    const updatedSkills = [...resumeData.skills[categoryId], skillInput.trim()]
    updateSkills(categoryId, updatedSkills)
    setSkillInput("")
  }

  const handleRemoveSkill = (categoryId: "technical" | "soft" | "languages", skill: string) => {
    const updatedSkills = resumeData.skills[categoryId].filter((s) => s !== skill)
    updateSkills(categoryId, updatedSkills)
  }

  const suggestSkills = (categoryId: "technical" | "soft" | "languages") => {
    // This would connect to the AI API to suggest skills
    const suggestions = {
      technical: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS"],
      soft: ["Communication", "Teamwork", "Problem Solving", "Time Management"],
      languages: ["English", "Spanish", "French"],
    }

    alert(`AI suggests these skills for ${categoryId}: ${suggestions[categoryId].join(", ")}`)
  }

  const categories = [
    { id: "technical" as const, name: "Technical Skills" },
    { id: "soft" as const, name: "Soft Skills" },
    { id: "languages" as const, name: "Languages" },
  ]

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{category.name}</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => suggestSkills(category.id)}
                className="gap-2"
              >
                <Wand2 className="h-4 w-4" />
                Suggest with AI
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {resumeData.skills[category.id].map((skill, index) => (
                <Badge key={index} variant="secondary" className="gap-1 py-2">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(category.id, skill)}
                    className="ml-1 rounded-full hover:bg-muted p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {resumeData.skills[category.id].length === 0 && (
                <p className="text-sm text-muted-foreground">No skills added yet.</p>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder={`Add a ${category.name.toLowerCase().slice(0, -1)}...`}
                value={activeCategory === category.id ? skillInput : ""}
                onChange={(e) => {
                  setActiveCategory(category.id)
                  setSkillInput(e.target.value)
                }}
                onFocus={() => setActiveCategory(category.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && category.id === activeCategory) {
                    e.preventDefault()
                    handleAddSkill(category.id)
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => handleAddSkill(category.id)}
                disabled={activeCategory !== category.id || !skillInput.trim()}
              >
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button type="button">Save & Continue</Button>
      </div>
    </div>
  )
}

