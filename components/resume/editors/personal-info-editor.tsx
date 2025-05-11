'use client';

import { useResume } from '@/context/resume-context';
import { IResumeSection, IPersonalInfoContent } from '@/schemas/resume.schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

interface PersonalInfoEditorProps {
  section: IResumeSection;
}

export function PersonalInfoEditor({ section }: PersonalInfoEditorProps) {
  const { updateSectionContent } = useResume();

  // Initialize with empty content if it doesn't exist
  const content = (section.content[0] as IPersonalInfoContent) || {
    fullName: '',
    jobTilte: '', // Note: There's a typo in the schema, should be jobTitle
    email: '',
    phone: '',
    location: '',
    website: '',
    socialLinks: {},
    professionalSummary: '',
  };

  // Initialize content if it doesn't exist
  useEffect(() => {
    if (!section.content || section.content.length === 0) {
      updateSectionContent(section._id!, [
        {
          fullName: '',
          jobTilte: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          socialLinks: {},
          professionalSummary: '',
        },
      ]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (field: keyof IPersonalInfoContent, value: string) => {
    const updatedContent = {
      ...content,
      [field]: value,
    };
    updateSectionContent(section._id!, [updatedContent]);
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    const updatedContent = {
      ...content,
      socialLinks: {
        ...content.socialLinks,
        [platform]: value,
      },
    };
    updateSectionContent(section._id!, [updatedContent]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={content.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={content.jobTilte || ''}
            onChange={(e) => handleChange('jobTilte', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={content.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={content.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={content.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={content.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Social Links</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="LinkedIn"
            value={content.socialLinks?.linkedin || ''}
            onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
          />
          <Input
            placeholder="GitHub"
            value={content.socialLinks?.github || ''}
            onChange={(e) => handleSocialLinkChange('github', e.target.value)}
          />
          <Input
            placeholder="Twitter"
            value={content.socialLinks?.twitter || ''}
            onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
          />
        </div>
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={content.professionalSummary || ""}
          onChange={(e) => handleChange("professionalSummary", e.target.value)}
          rows={4}
        />
      </div> */}
    </div>
  );
}
