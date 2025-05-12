"use client";

import { useResume } from "@/context/resume-context";
import { IResumeSection } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface InterestContent {
  interest: string;
  description?: string;
}

interface InterestsEditorProps {
  section: IResumeSection;
}

export function InterestsEditor({ section }: InterestsEditorProps) {
  const { updateSectionContent } = useResume();

  // Ensure content is always an array
  const content = Array.isArray(section.content)
    ? (section.content as InterestContent[])
    : [];

  // Initialize content if it's empty
  useEffect(() => {
    if (
      !section.content ||
      !Array.isArray(section.content) ||
      section.content.length === 0
    ) {
      const initialInterest: InterestContent = {
        interest: "",
        description: "",
      };
      updateSectionContent(section._id!, [initialInterest]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (
    index: number,
    field: keyof InterestContent,
    value: string
  ) => {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddInterest = () => {
    const newInterest: InterestContent = {
      interest: "",
      description: "",
    };
    updateSectionContent(section._id!, [...content, newInterest]);
  };

  const handleRemoveInterest = (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    updateSectionContent(section._id!, updatedContent);
  };

  // If content is still empty after initialization attempt, show a loading state
  if (content.length === 0) {
    return (
      <div className="space-y-4">
        <Button onClick={handleAddInterest} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add First Interest
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {content.map((interest, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Interest {index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveInterest(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`interest-${index}`}>Interest</Label>
            <Input
              id={`interest-${index}`}
              value={interest.interest || ""}
              onChange={(e) => handleChange(index, "interest", e.target.value)}
              placeholder="e.g., Photography, Hiking, Reading"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>
              Description (Optional)
            </Label>
            <Input
              id={`description-${index}`}
              value={interest.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder="Brief description of your interest"
            />
          </div>
        </div>
      ))}

      <Button onClick={handleAddInterest} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Interest
      </Button>
    </div>
  );
}
