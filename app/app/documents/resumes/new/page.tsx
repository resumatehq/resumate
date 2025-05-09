'use client';
import { ResumeProvider } from '@/context/resume-context';
import { ResumeBuilder } from '@/components/resume/resume-builder';
import type { IResume } from '@/schemas/resume.schema';

export default function CreateResumePage() {
  const initialResume: IResume = {
    title: 'My Professional Resume',
    templateId: '6813293e1f84466e61e8e909', // Sử dụng templateId thực tế
    language: 'en',
    sections: [
      {
        _id: 'personal-' + Date.now(),
        type: 'personal',
        title: 'Personal Information',
        enabled: true,
        order: 0,
        content: [
          {
            fullName: '',
            jobTilte: '',
            email: '',
            phone: '',
            location: '',
            website: '',
            socialLinks: {},
          },
        ],
        settings: {
          visibility: 'public',
          layout: 'standard',
          styling: {},
        },
      },
      {
        _id: 'summary-' + Date.now(),
        type: 'summary',
        title: 'Professional Summary',
        enabled: true,
        order: 1,
        content: [
          {
            professionalSummary: '',
          },
        ],
        settings: {
          visibility: 'public',
          layout: 'standard',
          styling: {},
        },
      },
      {
        _id: 'experience-' + Date.now(),
        type: 'experience',
        title: 'Work Experience',
        enabled: true,
        order: 2,
        content: [],
        settings: {
          visibility: 'public',
          layout: 'standard',
          styling: {},
        },
      },
      {
        _id: 'education-' + Date.now(),
        type: 'education',
        title: 'Education',
        enabled: true,
        order: 3,
        content: [],
        settings: {
          visibility: 'public',
          layout: 'standard',
          styling: {},
        },
      },
      {
        _id: 'skills-' + Date.now(),
        type: 'skills',
        title: 'Skills',
        enabled: true,
        order: 4,
        content: [
          {
            technical: [],
            soft: [],
            languages: [],
          },
        ],
        settings: {
          visibility: 'public',
          layout: 'standard',
          styling: {},
        },
      },
      {
        _id: 'projects-' + Date.now(),
        type: 'projects',
        title: 'Projects',
        enabled: true,
        order: 5,
        content: [],
        settings: {
          visibility: 'public',
          layout: 'standard',
          styling: {},
        },
      },
    ],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentVersion: 1,
      isPublished: false,
      sharingOptions: {
        allowDownload: true,
        allowFeedback: false,
      },
      viewCount: 0,
      downloadCount: 0,
    },
    keywords: [],
    aiSuggestions: [],
    analytics: {
      modificationCount: 0,
      exportHistory: [],
      shareViews: [],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-50">
        <ResumeBuilder initialResume={initialResume} />
      </div>
    </ResumeProvider>
  );
}
