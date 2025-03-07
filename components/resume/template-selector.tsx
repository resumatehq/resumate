"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const templates = [
    {
      id: "professional",
      name: "Professional",
      description: "A clean, traditional layout suitable for most industries",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "modern",
      name: "Modern",
      description: "A contemporary design with sidebar for creative fields",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "A simple, straightforward layout that focuses on content",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "executive",
      name: "Executive",
      description: "An elegant design for senior positions and leadership roles",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "creative",
      name: "Creative",
      description: "A bold design for creative industries and design roles",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "technical",
      name: "Technical",
      description: "Optimized for technical roles with skills emphasis",
      image: "/placeholder.svg?height=200&width=150",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      <p className="text-muted-foreground mb-6">
        Select a template that best represents your professional style and industry standards.
      </p>

      <RadioGroup value={selectedTemplate} onValueChange={onSelectTemplate} className="grid md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
            <Label htmlFor={template.id} className="cursor-pointer">
              <Card
                className={`overflow-hidden transition-all ${selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:border-primary/50"}`}
              >
                <div className="relative aspect-[3/4] bg-muted">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="object-cover w-full h-full"
                  />
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-8">
        <h3 className="font-medium mb-2">Color Scheme</h3>
        <div className="flex gap-2 mb-6">
          {["slate", "blue", "emerald", "amber", "rose", "violet"].map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full ${
                color === "slate"
                  ? "bg-slate-500"
                  : color === "blue"
                    ? "bg-blue-500"
                    : color === "emerald"
                      ? "bg-emerald-500"
                      : color === "amber"
                        ? "bg-amber-500"
                        : color === "rose"
                          ? "bg-rose-500"
                          : "bg-violet-500"
              } ${color === "slate" ? "ring-2 ring-offset-2 ring-slate-500" : ""}`}
              aria-label={`${color} color scheme`}
            />
          ))}
        </div>

        <h3 className="font-medium mb-2">Font Style</h3>
        <div className="flex gap-2">
          {["Modern", "Classic", "Elegant"].map((font) => (
            <Button key={font} variant={font === "Modern" ? "default" : "outline"} size="sm">
              {font}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

