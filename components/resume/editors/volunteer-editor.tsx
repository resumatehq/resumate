"use client";

import { useResume } from "@/context/resume-context";
import { IResumeSection } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface VolunteerContent {
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

interface VolunteerEditorProps {
  section: IResumeSection;
}

export function VolunteerEditor({ section }: VolunteerEditorProps) {
  const { updateSectionContent } = useResume();

  // Ensure content is always an array
  const content = Array.isArray(section.content)
    ? (section.content as VolunteerContent[])
    : [];

  // Initialize content if it's empty
  useEffect(() => {
    if (
      !section.content ||
      !Array.isArray(section.content) ||
      section.content.length === 0
    ) {
      const initialVolunteer: VolunteerContent = {
        organization: "",
        role: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        highlights: [""],
      };
      updateSectionContent(section._id!, [initialVolunteer]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (
    index: number,
    field: keyof VolunteerContent,
    value: string | boolean | string[]
  ) => {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddVolunteer = () => {
    const newVolunteer: VolunteerContent = {
      organization: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [],
    };
    updateSectionContent(section._id!, [...content, newVolunteer]);
  };

  const handleRemoveVolunteer = (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddHighlight = (volunteerIndex: number) => {
    const updatedContent = [...content];
    if (!updatedContent[volunteerIndex].highlights) {
      updatedContent[volunteerIndex].highlights = [""];
    } else {
      updatedContent[volunteerIndex].highlights.push("");
    }
    updateSectionContent(section._id!, updatedContent);
  };

  const handleRemoveHighlight = (
    volunteerIndex: number,
    highlightIndex: number
  ) => {
    const updatedContent = [...content];
    if (updatedContent[volunteerIndex].highlights) {
      updatedContent[volunteerIndex].highlights = updatedContent[
        volunteerIndex
      ].highlights.filter((_, i) => i !== highlightIndex);
      updateSectionContent(section._id!, updatedContent);
    }
  };

  const handleHighlightChange = (
    volunteerIndex: number,
    highlightIndex: number,
    value: string
  ) => {
    const updatedContent = [...content];
    if (updatedContent[volunteerIndex].highlights) {
      updatedContent[volunteerIndex].highlights[highlightIndex] = value;
      updateSectionContent(section._id!, updatedContent);
    }
  };

  // If content is still empty after initialization attempt, show a loading state
  if (content.length === 0) {
    return (
      <div className="space-y-4">
        <Button onClick={handleAddVolunteer} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add First Volunteer Experience
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {content.map((volunteer, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Volunteer Experience {index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveVolunteer(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`organization-${index}`}>
              Organization (Optional)
            </Label>
            <Input
              id={`organization-${index}`}
              value={volunteer.organization || ""}
              onChange={(e) =>
                handleChange(index, "organization", e.target.value)
              }
              placeholder="Enter organization name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`role-${index}`}>Role (Optional)</Label>
            <Input
              id={`role-${index}`}
              value={volunteer.role || ""}
              onChange={(e) => handleChange(index, "role", e.target.value)}
              placeholder="Enter your role"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`}>
                Start Date (Optional)
              </Label>
              <Input
                id={`startDate-${index}`}
                type="date"
                value={volunteer.startDate || ""}
                onChange={(e) =>
                  handleChange(index, "startDate", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`}>End Date (Optional)</Label>
              <Input
                id={`endDate-${index}`}
                type="date"
                value={volunteer.endDate || ""}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                disabled={volunteer.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`current-${index}`}
              checked={volunteer.current || false}
              onChange={(e) => handleChange(index, "current", e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor={`current-${index}`}>
              I currently volunteer here
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>
              Description (Optional)
            </Label>
            <Textarea
              id={`description-${index}`}
              value={volunteer.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              rows={3}
              placeholder="Describe your volunteer experience"
            />
          </div>

          <div className="space-y-2">
            <Label>Key Highlights (Optional)</Label>
            {volunteer.highlights && volunteer.highlights.length > 0 ? (
              volunteer.highlights.map((highlight, highlightIndex) => (
                <div key={highlightIndex} className="flex gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) =>
                      handleHighlightChange(
                        index,
                        highlightIndex,
                        e.target.value
                      )
                    }
                    placeholder="Enter a highlight"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveHighlight(index, highlightIndex)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">
                No highlights added yet
              </div>
            )}
            <Button
              variant="outline"
              onClick={() => handleAddHighlight(index)}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Highlight
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={handleAddVolunteer} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Volunteer Experience
      </Button>
    </div>
  );
}
