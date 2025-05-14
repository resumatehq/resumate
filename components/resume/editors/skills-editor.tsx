"use client";

import { useResume } from "@/context/resume-context";
import { IResumeSection, ISkillContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { generateSkillsSuggestions } from "@/utils/form-ai-assistant";
import { useToast } from "@/hooks/use-toast";

interface SkillsEditorProps {
  section: IResumeSection;
}

export function SkillsEditor({ section }: SkillsEditorProps) {
  const { updateSectionContent } = useResume();
  const { toast } = useToast();
  const [jobTitle, setJobTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Default empty skills content
  const defaultSkills: ISkillContent = {
    technical: [],
    soft: [],
    languages: [],
  };

  // Get content safely or use default empty object
  const content =
    Array.isArray(section.content) && section.content.length > 0
      ? (section.content[0] as ISkillContent)
      : defaultSkills;

  // Initialize content if it doesn't exist
  useEffect(() => {
    if (!Array.isArray(section.content) || section.content.length === 0) {
      updateSectionContent(section._id!, [defaultSkills]);
    }
  }, [section._id, section.content, updateSectionContent, defaultSkills]);

  const handleSkillChange = (
    category: keyof ISkillContent,
    index: number,
    value: string
  ) => {
    const updatedContent = {
      ...content,
      [category]:
        content[category]?.map((skill: string, i: number) =>
          i === index ? value : skill
        ) || [],
    };
    updateSectionContent(section._id!, [updatedContent]);
  };

  const handleAddSkill = (category: keyof ISkillContent) => {
    const updatedContent = {
      ...content,
      [category]: [...(content[category] || []), ""],
    };
    updateSectionContent(section._id!, [updatedContent]);
  };

  const handleRemoveSkill = (category: keyof ISkillContent, index: number) => {
    const updatedContent = {
      ...content,
      [category]: (content[category] || []).filter(
        (_: string, i: number) => i !== index
      ),
    };
    updateSectionContent(section._id!, [updatedContent]);
  };

  const handleGenerateSkills = async () => {
    if (!jobTitle) {
      toast({
        title: "Missing information",
        description: "Please enter a job title to generate skills",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const skills = await generateSkillsSuggestions(jobTitle);

      // Add the first 5 skills to technical, next 5 to soft if available
      const updatedContent = { ...content };

      if (skills.length > 0) {
        const technicalSkills = skills.slice(0, Math.min(skills.length, 5));
        const softSkills = skills.slice(5, Math.min(skills.length, 10));

        updatedContent.technical = [...technicalSkills];
        if (softSkills.length > 0) {
          updatedContent.soft = [...softSkills];
        }
      }

      updateSectionContent(section._id!, [updatedContent]);

      toast({
        title: "Skills generated",
        description: "Skills have been generated successfully",
      });
    } catch (error) {
      console.error("Error generating skills:", error);
      toast({
        title: "Error",
        description: "Failed to generate skills",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Skills Generation */}
      <div className="space-y-4 p-4 border rounded-md bg-gray-50">
        <h3 className="font-medium">Generate Skills with AI</h3>
        <div className="space-y-2">
          <Label htmlFor="job-title">Job Title</Label>
          <div className="flex gap-2">
            <Input
              id="job-title"
              placeholder="e.g. Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <Button onClick={handleGenerateSkills} disabled={isGenerating}>
              <Sparkles className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Skills"}
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Enter your target job title to get AI-suggested skills for your
            resume
          </p>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Technical Skills</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddSkill("technical")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
        {(content.technical || []).map((skill, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={skill || ""}
              onChange={(e) =>
                handleSkillChange("technical", index, e.target.value)
              }
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveSkill("technical", index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {(!content.technical || content.technical.length === 0) && (
          <div className="text-sm text-gray-500 italic">
            No technical skills added yet. Click "Add Skill" to add one.
          </div>
        )}
      </div>

      {/* Soft Skills */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Soft Skills</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddSkill("soft")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
        {(content.soft || []).map((skill, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={skill || ""}
              onChange={(e) => handleSkillChange("soft", index, e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveSkill("soft", index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {(!content.soft || content.soft.length === 0) && (
          <div className="text-sm text-gray-500 italic">
            No soft skills added yet. Click "Add Skill" to add one.
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Languages</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddSkill("languages")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Language
          </Button>
        </div>
        {(content.languages || []).map((language, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={language || ""}
              onChange={(e) =>
                handleSkillChange("languages", index, e.target.value)
              }
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveSkill("languages", index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {(!content.languages || content.languages.length === 0) && (
          <div className="text-sm text-gray-500 italic">
            No languages added yet. Click "Add Language" to add one.
          </div>
        )}
      </div>
    </div>
  );
}
