"use client";

import { useResume } from "@/context/resume-context";
import { IResumeSection, IAwardContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface AwardsEditorProps {
  section: IResumeSection;
}

export function AwardsEditor({ section }: AwardsEditorProps) {
  const { updateSectionContent } = useResume();

  // Ensure content is always an array
  const content = Array.isArray(section.content)
    ? (section.content as IAwardContent[])
    : [];

  // Initialize content if it's empty
  useEffect(() => {
    if (
      !section.content ||
      !Array.isArray(section.content) ||
      section.content.length === 0
    ) {
      const initialAward: IAwardContent = {
        title: "",
        issuingOrganization: "",
        dateReceived: "",
        description: "",
      };
      updateSectionContent(section._id!, [initialAward]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (
    index: number,
    field: keyof IAwardContent,
    value: string
  ) => {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddAward = () => {
    const newAward: IAwardContent = {
      title: "",
      issuingOrganization: "",
      dateReceived: "",
      description: "",
    };
    updateSectionContent(section._id!, [...content, newAward]);
  };

  const handleRemoveAward = (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    updateSectionContent(section._id!, updatedContent);
  };

  // If content is still empty after initialization attempt, show a loading state
  if (content.length === 0) {
    return (
      <div className="space-y-4">
        <Button onClick={handleAddAward} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add First Award
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {content.map((award, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Award {index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveAward(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`title-${index}`}>Award Title</Label>
            <Input
              id={`title-${index}`}
              value={award.title || ""}
              onChange={(e) => handleChange(index, "title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`organization-${index}`}>
              Issuing Organization
            </Label>
            <Input
              id={`organization-${index}`}
              value={award.issuingOrganization || ""}
              onChange={(e) =>
                handleChange(index, "issuingOrganization", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`dateReceived-${index}`}>Date Received</Label>
            <Input
              id={`dateReceived-${index}`}
              type="month"
              value={award.dateReceived || ""}
              onChange={(e) =>
                handleChange(index, "dateReceived", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>Description</Label>
            <Textarea
              id={`description-${index}`}
              value={award.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              rows={3}
            />
          </div>
        </div>
      ))}

      <Button onClick={handleAddAward} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Award
      </Button>
    </div>
  );
}
