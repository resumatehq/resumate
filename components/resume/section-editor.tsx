'use client';

import { useState } from 'react';
import { useResume } from '@/context/resume-context';
import { IResumeSection } from '@/schemas/resume.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PersonalInfoEditor } from './editors/personal-info-editor';
import { EducationEditor } from './editors/education-editor';
import { ExperienceEditor } from './editors/experience-editor';
import { SkillsEditor } from './editors/skills-editor';
import { ProjectsEditor } from './editors/projects-editor';
import { SummaryEditor } from './editors/summary-editor';

// Temporary placeholder components until the real ones are implemented
const CertificationsEditor = ({ section }: { section: IResumeSection }) => (
  <div className="p-4 border rounded-md bg-gray-50">
    <p className="text-sm text-gray-500">
      Certifications editor will be implemented soon
    </p>
  </div>
);

const AwardsEditor = ({ section }: { section: IResumeSection }) => (
  <div className="p-4 border rounded-md bg-gray-50">
    <p className="text-sm text-gray-500">
      Awards editor will be implemented soon
    </p>
  </div>
);

const CustomSectionEditor = ({ section }: { section: IResumeSection }) => (
  <div className="p-4 border rounded-md bg-gray-50">
    <p className="text-sm text-gray-500">
      Custom section editor will be implemented soon
    </p>
  </div>
);

interface SectionEditorProps {
  section: IResumeSection;
}

export function SectionEditor({ section }: SectionEditorProps) {
  const {
    updateSection,
    removeSection,
    updateSectionOrder,
    updateSectionVisibility,
  } = useResume();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleTitleChange = (title: string) => {
    updateSection(section._id!, { title });
  };

  const handleVisibilityChange = (enabled: boolean) => {
    updateSectionVisibility(section._id!, enabled);
  };

  const handleMoveUp = () => {
    if (section.order > 0) {
      updateSectionOrder(section._id!, section.order - 1);
    }
  };

  const handleMoveDown = () => {
    updateSectionOrder(section._id!, section.order + 1);
  };

  const handleDelete = () => {
    removeSection(section._id!);
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <Input
            value={section.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-48"
          />
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor={`visibility-${section._id}`}>Visible</Label>
            <Switch
              id={`visibility-${section._id}`}
              checked={section.enabled}
              onCheckedChange={handleVisibilityChange}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMoveUp}
            disabled={section.order === 0}
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleMoveDown}>
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className={cn('space-y-4', !isExpanded && 'hidden')}>
        {/* Section-specific editor will be rendered here based on section.type */}
        {section.type === 'personal' && (
          <PersonalInfoEditor section={section} />
        )}
        {section.type === 'summary' && <SummaryEditor section={section} />}
        {section.type === 'education' && <EducationEditor section={section} />}
        {section.type === 'experience' && (
          <ExperienceEditor section={section} />
        )}
        {section.type === 'skills' && <SkillsEditor section={section} />}
        {section.type === 'projects' && <ProjectsEditor section={section} />}
        {section.type === 'certifications' && (
          <CertificationsEditor section={section} />
        )}
        {section.type === 'awards' && <AwardsEditor section={section} />}
        {section.type === 'custom' && <CustomSectionEditor section={section} />}
      </div>
    </div>
  );
}
