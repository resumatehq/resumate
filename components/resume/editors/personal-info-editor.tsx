"use client";

import { useResume } from "@/context/resume-context";
import { IResumeSection, IPersonalInfoContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { generateProfessionalSummary } from "@/utils/form-ai-assistant";
import { useToast } from "@/components/ui/use-toast";

interface PersonalInfoEditorProps {
  section: IResumeSection;
}

export function PersonalInfoEditor({ section }: PersonalInfoEditorProps) {
  const { updateSectionContent } = useResume();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  // Add debugging to identify the issue
  console.log("PersonalInfoEditor - section:", section);
  console.log("PersonalInfoEditor - section.content:", section.content);

  // Safely extract content from either array or direct object format
  const getContent = () => {
    if (
      !section.content ||
      (Array.isArray(section.content) && section.content.length === 0)
    ) {
      return {
        fullName: "",
        jobTilte: "", // Note: There's a typo in the schema, should be jobTitle
        email: "",
        phone: "",
        location: "",
        website: "",
        socialLinks: {},
        professionalSummary: "",
      };
    }

    // If content is an array, use the first item
    if (Array.isArray(section.content)) {
      return section.content[0] as IPersonalInfoContent;
    }

    // If content is a direct object
    return section.content as IPersonalInfoContent;
  };

  const content = getContent();
  console.log("PersonalInfoEditor - extracted content:", content);

  // Initialize content if it doesn't exist
  useEffect(() => {
    if (
      !section.content ||
      (Array.isArray(section.content) && section.content.length === 0)
    ) {
      console.log("PersonalInfoEditor - initializing empty content");
      updateSectionContent(section._id!, [
        {
          fullName: "",
          jobTilte: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          socialLinks: {},
          professionalSummary: "",
        },
      ]);
    } else if (!Array.isArray(section.content)) {
      // If content is not an array, convert it to an array
      console.log("PersonalInfoEditor - converting object to array");
      updateSectionContent(section._id!, [section.content]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (field: keyof IPersonalInfoContent, value: string) => {
    console.log(`PersonalInfoEditor - updating field ${field} to: ${value}`);
    const updatedContent = {
      ...content,
      [field]: value,
    };
    updateSectionContent(section._id!, [updatedContent]);
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    console.log(
      `PersonalInfoEditor - updating social link ${platform} to: ${value}`
    );
    const updatedContent = {
      ...content,
      socialLinks: {
        ...content.socialLinks,
        [platform]: value,
      },
    };
    updateSectionContent(section._id!, [updatedContent]);
  };

  const handleGenerateSummary = async () => {
    if (!content.fullName || !content.jobTilte) {
      toast({
        title: "Missing information",
        description: "Please enter your name and job title first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const summary = await generateProfessionalSummary(content);
      handleChange("professionalSummary", summary);
      toast({
        title: "Summary generated",
        description: "Professional summary has been generated successfully",
      });
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error",
        description: "Failed to generate professional summary",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={content.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={content.jobTilte || ""}
            onChange={(e) => handleChange("jobTilte", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={content.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={content.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={content.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={content.website || ""}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Social Links</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="LinkedIn"
            value={content.socialLinks?.linkedin || ""}
            onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
          />
          <Input
            placeholder="GitHub"
            value={content.socialLinks?.github || ""}
            onChange={(e) => handleSocialLinkChange("github", e.target.value)}
          />
          <Input
            placeholder="Twitter"
            value={content.socialLinks?.twitter || ""}
            onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="summary">Professional Summary</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateSummary}
            disabled={isGenerating}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating..." : "Generate Summary"}
          </Button>
        </div>
        <Textarea
          id="summary"
          value={content.professionalSummary || ""}
          onChange={(e) => handleChange("professionalSummary", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}
