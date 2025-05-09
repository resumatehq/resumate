"use client";

import { useResume } from "@/context/resume-context";
import { IResumeSection, IProjectContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface ProjectsEditorProps {
  section: IResumeSection;
}

export function ProjectsEditor({ section }: ProjectsEditorProps) {
  const { updateSectionContent } = useResume();

  // Ensure content is always an array
  const content = Array.isArray(section.content)
    ? (section.content as IProjectContent[])
    : [];

  // Initialize content if it's empty
  useEffect(() => {
    if (
      !section.content ||
      !Array.isArray(section.content) ||
      section.content.length === 0
    ) {
      const initialProject: IProjectContent = {
        title: "",
        description: "",
        role: "",
        startDate: "",
        endDate: "",
        technologies: [],
        url: "",
        achievements: [],
      };
      updateSectionContent(section._id!, [initialProject]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (
    index: number,
    field: keyof IProjectContent,
    value: string
  ) => {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddProject = () => {
    const newProject: IProjectContent = {
      title: "",
      description: "",
      role: "",
      startDate: "",
      endDate: "",
      technologies: [],
      url: "",
      achievements: [],
    };
    updateSectionContent(section._id!, [...content, newProject]);
  };

  const handleRemoveProject = (index: number) => {
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

  // If content is still empty after initialization attempt, show a loading state
  if (content.length === 0) {
    return (
      <div className="space-y-4">
        <Button onClick={handleAddProject} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add First Project
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {content.map((project, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Project {index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveProject(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`title-${index}`}>Title</Label>
              <Input
                id={`title-${index}`}
                value={project.title || ""}
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`role-${index}`}>Role</Label>
              <Input
                id={`role-${index}`}
                value={project.role || ""}
                onChange={(e) => handleChange(index, "role", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`}>Start Date</Label>
              <Input
                id={`startDate-${index}`}
                type="month"
                value={project.startDate || ""}
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
                value={project.endDate || ""}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`url-${index}`}>Project URL</Label>
            <Input
              id={`url-${index}`}
              value={project.url || ""}
              onChange={(e) => handleChange(index, "url", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>Description</Label>
            <Textarea
              id={`description-${index}`}
              value={project.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Achievements</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddAchievement(index)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Achievement
              </Button>
            </div>
            {project.achievements?.map((achievement, achievementIndex) => (
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
              <Label>Technologies</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddTechnology(index)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Technology
              </Button>
            </div>
            {project.technologies?.map((technology, technologyIndex) => (
              <div key={technologyIndex} className="flex gap-2">
                <Input
                  value={technology || ""}
                  onChange={(e) =>
                    handleTechnologyChange(
                      index,
                      technologyIndex,
                      e.target.value
                    )
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTechnology(index, technologyIndex)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={handleAddProject} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
