"use client";

import { useResume } from "@/context/resume-context";
import { IResumeSection } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface LanguageContent {
  language: string;
  proficiency: string;
}

interface LanguagesEditorProps {
  section: IResumeSection;
}

export function LanguagesEditor({ section }: LanguagesEditorProps) {
  const { updateSectionContent } = useResume();

  // Ensure content is always an array
  const content = Array.isArray(section.content)
    ? (section.content as LanguageContent[])
    : [];

  // Initialize content if it's empty
  useEffect(() => {
    if (
      !section.content ||
      !Array.isArray(section.content) ||
      section.content.length === 0
    ) {
      const initialLanguage: LanguageContent = {
        language: "",
        proficiency: "",
      };
      updateSectionContent(section._id!, [initialLanguage]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (
    index: number,
    field: keyof LanguageContent,
    value: string
  ) => {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddLanguage = () => {
    const newLanguage: LanguageContent = {
      language: "",
      proficiency: "",
    };
    updateSectionContent(section._id!, [...content, newLanguage]);
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    updateSectionContent(section._id!, updatedContent);
  };

  // If content is still empty after initialization attempt, show a loading state
  if (content.length === 0) {
    return (
      <div className="space-y-4">
        <Button onClick={handleAddLanguage} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add First Language
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {content.map((language, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Language {index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveLanguage(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`language-${index}`}>Language</Label>
            <Input
              id={`language-${index}`}
              value={language.language || ""}
              onChange={(e) => handleChange(index, "language", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`proficiency-${index}`}>Proficiency Level</Label>
            <select
              id={`proficiency-${index}`}
              className="w-full px-3 py-2 border rounded-md"
              value={language.proficiency || ""}
              onChange={(e) =>
                handleChange(index, "proficiency", e.target.value)
              }
            >
              <option value="">Select proficiency</option>
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Advanced">Advanced</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>
          </div>
        </div>
      ))}

      <Button onClick={handleAddLanguage} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Language
      </Button>
    </div>
  );
}
