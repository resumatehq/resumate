"use client";

import { useResume } from "@/context/resume-context";
import type { IResumeSection } from "@/schemas/resume.schema";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

interface SummaryEditorProps {
  section: IResumeSection;
}

export function SummaryEditor({ section }: SummaryEditorProps) {
  const { updateSectionContent } = useResume();

  // Add debugging to identify the issue
  console.log("SummaryEditor - section:", section);
  console.log("SummaryEditor - section.content:", section.content);

  // Safely extract content from either array or direct object format
  const getContent = () => {
    if (
      !section.content ||
      (Array.isArray(section.content) && section.content.length === 0)
    ) {
      return { content: "" };
    }

    // If content is an array, use the first item
    if (Array.isArray(section.content)) {
      return section.content[0];
    }

    // If content is a direct object
    return section.content;
  };

  const content = getContent();
  console.log("SummaryEditor - extracted content:", content);

  // Initialize content if it doesn't exist
  useEffect(() => {
    if (
      !section.content ||
      (Array.isArray(section.content) && section.content.length === 0)
    ) {
      console.log("SummaryEditor - initializing empty content");
      updateSectionContent(section._id!, [{ content: "" }]);
    } else if (!Array.isArray(section.content)) {
      // If content is not an array, convert it to an array
      console.log("SummaryEditor - converting object to array");
      updateSectionContent(section._id!, [section.content]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (value: string) => {
    console.log(`SummaryEditor - updating content to: ${value}`);
    updateSectionContent(section._id!, [{ content: value }]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={content.content || ""}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write a compelling summary of your professional background, skills, and career goals..."
          rows={6}
        />
      </div>
    </div>
  );
}
