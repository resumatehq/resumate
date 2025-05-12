"use client";

import { useResume } from "@/context/resume-context";
import {
  IResumeSection,
  IWorkExperienceContent,
} from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { generateJobDescriptions } from "@/utils/form-ai-assistant";
import { useToast } from "@/components/ui/use-toast";

interface ExperienceEditorProps {
  section: IResumeSection;
}

export function ExperienceEditor({ section }: ExperienceEditorProps) {
  const { updateSectionContent } = useResume();
  const { toast } = useToast();
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);
  const { resume } = useResume();

  // Ensure content is always an array
  const content = Array.isArray(section.content)
    ? (section.content as IWorkExperienceContent[])
    : [];

  // Initialize content if it's empty
  useEffect(() => {
    if (
      !section.content ||
      !Array.isArray(section.content) ||
      section.content.length === 0
    ) {
      const initialExperience: IWorkExperienceContent = {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
        achievements: [],
        technologies: [],
      };
      updateSectionContent(section._id!, [initialExperience]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (
    index: number,
    field: keyof IWorkExperienceContent,
    value: string | boolean
  ) => {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddExperience = () => {
    const newExperience: IWorkExperienceContent = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      achievements: [],
      technologies: [],
    };
    updateSectionContent(section._id!, [...content, newExperience]);
  };

  const handleRemoveExperience = (index: number) => {
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

  const handleTechnologyChange = (
    index: number,
    technologyIndex: number,
    value: string
  ) => {
    const updatedContent = [...content];
    const technologies = [...(updatedContent[index].technologies || [])];
    technologies[technologyIndex] = value;
    updatedContent[index] = {
      ...updatedContent[index],
      technologies,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddTechnology = (index: number) => {
    const updatedContent = [...content];
    const technologies = [...(updatedContent[index].technologies || []), ""];
    updatedContent[index] = {
      ...updatedContent[index],
      technologies,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleRemoveTechnology = (index: number, technologyIndex: number) => {
    const updatedContent = [...content];
    const technologies = updatedContent[index].technologies?.filter(
      (_, i) => i !== technologyIndex
    );
    updatedContent[index] = {
      ...updatedContent[index],
      technologies,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleGenerateAchievements = async (index: number) => {
    const experience = content[index];

    if (!experience.position) {
      toast({
        title: "Missing information",
        description: "Please enter the job position first",
        variant: "destructive",
      });
      return;
    }

    setGeneratingIndex(index);
    try {
      const descriptions = await generateJobDescriptions(
        resume!,
        experience.position
      );

      // Add the generated achievements to the existing ones
      const updatedContent = [...content];
      updatedContent[index] = {
        ...updatedContent[index],
        achievements: [...descriptions],
      };

      updateSectionContent(section._id!, updatedContent);

      toast({
        title: "Job descriptions generated",
        description:
          "Professional job descriptions have been generated successfully",
      });
    } catch (error) {
      console.error("Error generating job descriptions:", error);
      toast({
        title: "Error",
        description: "Failed to generate job descriptions",
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
        <Button onClick={handleAddExperience} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add First Experience
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {content.map((experience, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Experience {index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveExperience(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input
                id={`company-${index}`}
                value={experience.company || ""}
                onChange={(e) => handleChange(index, "company", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`position-${index}`}>Position</Label>
              <Input
                id={`position-${index}`}
                value={experience.position || ""}
                onChange={(e) =>
                  handleChange(index, "position", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`}>Start Date</Label>
              <Input
                id={`startDate-${index}`}
                type="month"
                value={experience.startDate || ""}
                onChange={(e) =>
                  handleChange(index, "startDate", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`}>End Date</Label>
              <div className="flex items-center gap-2">
                <Input
                  id={`endDate-${index}`}
                  type="month"
                  value={experience.endDate || ""}
                  onChange={(e) =>
                    handleChange(index, "endDate", e.target.value)
                  }
                  disabled={experience.currentPosition === true}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`currentPosition-${index}`}
                    checked={experience.currentPosition === true}
                    onCheckedChange={(checked) =>
                      handleChange(index, "currentPosition", checked === true)
                    }
                  />
                  <Label
                    htmlFor={`currentPosition-${index}`}
                    className="text-sm font-normal"
                  >
                    Current
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`location-${index}`}>Location</Label>
            <Input
              id={`location-${index}`}
              value={experience.location || ""}
              onChange={(e) => handleChange(index, "location", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>Description</Label>
            <Textarea
              id={`description-${index}`}
              value={experience.description || ""}
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
                    : "Generate Descriptions"}
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
            {experience.achievements?.map((achievement, achievementIndex) => (
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

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Technologies Used</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddTechnology(index)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Technology
              </Button>
            </div>
            {experience.technologies?.map((technology, techIndex) => (
              <div key={techIndex} className="flex gap-2">
                <Input
                  value={technology || ""}
                  onChange={(e) =>
                    handleTechnologyChange(index, techIndex, e.target.value)
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTechnology(index, techIndex)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={handleAddExperience} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Another Experience
      </Button>
    </div>
  );
}
