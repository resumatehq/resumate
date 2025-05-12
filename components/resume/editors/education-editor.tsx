"use client";

import { useResume } from "@/context/resume-context";
import { IResumeSection, IEducationContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { generateEducationAchievements } from "@/utils/form-ai-assistant";
import { useToast } from "@/components/ui/use-toast";

interface EducationEditorProps {
  section: IResumeSection;
}

export function EducationEditor({ section }: EducationEditorProps) {
  const { updateSectionContent } = useResume();
  const { toast } = useToast();
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

  // Ensure content is always an array
  const content = Array.isArray(section.content)
    ? (section.content as IEducationContent[])
    : [];

  // Initialize content if it's empty
  useEffect(() => {
    if (
      !section.content ||
      !Array.isArray(section.content) ||
      section.content.length === 0
    ) {
      const initialEducation: IEducationContent = {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
        achievements: [],
        gpa: "",
      };
      updateSectionContent(section._id!, [initialEducation]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (
    index: number,
    field: keyof IEducationContent,
    value: string
  ) => {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddEducation = () => {
    const newEducation: IEducationContent = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      achievements: [],
      gpa: "",
    };
    updateSectionContent(section._id!, [...content, newEducation]);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAchievementChange = (
    index: number,
    achievementIndex: number,
    value: string
  ) => {
    const updatedContent = [...content];
    const achievements = [...(updatedContent[index].achievements || [])];
    achievements[achievementIndex] = value;
    updatedContent[index] = {
      ...updatedContent[index],
      achievements,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddAchievement = (index: number) => {
    const updatedContent = [...content];
    const achievements = [...(updatedContent[index].achievements || []), ""];
    updatedContent[index] = {
      ...updatedContent[index],
      achievements,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleRemoveAchievement = (index: number, achievementIndex: number) => {
    const updatedContent = [...content];
    const achievements = updatedContent[index].achievements?.filter(
      (_, i) => i !== achievementIndex
    );
    updatedContent[index] = {
      ...updatedContent[index],
      achievements,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleGenerateAchievements = async (index: number) => {
    const education = content[index];

    if (!education.institution || !education.degree) {
      toast({
        title: "Missing information",
        description: "Please enter the institution and degree first",
        variant: "destructive",
      });
      return;
    }

    setGeneratingIndex(index);
    try {
      const achievements = await generateEducationAchievements(
        education.institution,
        education.degree
      );

      // Add the generated achievements to the existing ones
      const updatedContent = [...content];
      updatedContent[index] = {
        ...updatedContent[index],
        achievements: [...achievements],
      };

      updateSectionContent(section._id!, updatedContent);

      toast({
        title: "Achievements generated",
        description: "Education achievements have been generated successfully",
      });
    } catch (error) {
      console.error("Error generating achievements:", error);
      toast({
        title: "Error",
        description: "Failed to generate education achievements",
        variant: "destructive",
      });
    } finally {
      setGeneratingIndex(null);
    }
  };

  // If content is still empty after initialization attempt, show a loading state
  if (content.length === 0) {
    return (
      <div className="space-y-4">
        <Button onClick={handleAddEducation} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add First Education
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {content.map((education, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Education {index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveEducation(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`institution-${index}`}>Institution</Label>
              <Input
                id={`institution-${index}`}
                value={education.institution || ""}
                onChange={(e) =>
                  handleChange(index, "institution", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`degree-${index}`}>Degree</Label>
              <Input
                id={`degree-${index}`}
                value={education.degree || ""}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`field-${index}`}>Field of Study</Label>
              <Input
                id={`field-${index}`}
                value={education.fieldOfStudy || ""}
                onChange={(e) =>
                  handleChange(index, "fieldOfStudy", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`gpa-${index}`}>GPA</Label>
              <Input
                id={`gpa-${index}`}
                value={education.gpa || ""}
                onChange={(e) => handleChange(index, "gpa", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`}>Start Date</Label>
              <Input
                id={`startDate-${index}`}
                type="month"
                value={education.startDate || ""}
                onChange={(e) =>
                  handleChange(index, "startDate", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`}>End Date</Label>
              <Input
                id={`endDate-${index}`}
                type="month"
                value={education.endDate || ""}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`location-${index}`}>Location</Label>
            <Input
              id={`location-${index}`}
              value={education.location || ""}
              onChange={(e) => handleChange(index, "location", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>Description</Label>
            <Textarea
              id={`description-${index}`}
              value={education.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Achievements</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleGenerateAchievements(index)}
                  disabled={generatingIndex === index}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {generatingIndex === index
                    ? "Generating..."
                    : "Generate Achievements"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddAchievement(index)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
            {education.achievements?.map((achievement, achievementIndex) => (
              <div key={achievementIndex} className="flex gap-2">
                <Input
                  value={achievement || ""}
                  onChange={(e) =>
                    handleAchievementChange(
                      index,
                      achievementIndex,
                      e.target.value
                    )
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleRemoveAchievement(index, achievementIndex)
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={handleAddEducation} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Another Education
      </Button>
    </div>
  );
}
