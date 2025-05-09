'use client';

import { useResume } from '@/context/resume-context';
import type { IResumeSection } from '@/schemas/resume.schema';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';

interface SummaryEditorProps {
  section: IResumeSection;
}

export function SummaryEditor({ section }: SummaryEditorProps) {
  const { updateSectionContent } = useResume();

  // Get content safely
  const content =
    section.content &&
    Array.isArray(section.content) &&
    section.content.length > 0
      ? section.content[0]
      : { content: '' };

  // Initialize content if it doesn't exist
  useEffect(() => {
    if (
      !section.content ||
      !Array.isArray(section.content) ||
      section.content.length === 0
    ) {
      updateSectionContent(section._id!, [{ content: '' }]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (value: string) => {
    updateSectionContent(section._id!, [{ content: value }]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={content.content || ''}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write a compelling summary of your professional background, skills, and career goals..."
          rows={6}
        />
      </div>
    </div>
  );
}
