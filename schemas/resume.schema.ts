export type SectionType = 'personal' | 'summary' | 'education' | 'experience' | 'skills' | 'projects' |
  'references' | 'certifications' | 'awards' | 'publications' | 'languages' | 'interests' | 'volunteer' | 'custom';

export interface ISectionContent {
  [key: string]: any;
}

export interface IPersonalInfoContent extends ISectionContent {
  fullName: string;
  jobTilte: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  profilePicture?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    [key: string]: string | undefined;
  };
  professionalSummary?: string;
}

export interface IEducationContent extends ISectionContent {
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string | null;
  location?: string;
  description?: string;
  achievements?: string[];
  gpa?: string;
}

export interface IWorkExperienceContent extends ISectionContent {
  company: string;
  position: string;
  startDate?: string;
  endDate?: string | null;
  location?: string;
  description?: string;
  achievements?: string[];
  technologies?: string[];
}

export interface ISkillContent extends ISectionContent {
  technical: string[];
  soft: string[];
  languages: string[];
}

export interface IProjectContent extends ISectionContent {
  title: string;
  description?: string;
  role?: string;
  startDate?: string;
  endDate?: string | null;
  technologies?: string[];
  url?: string;
  achievements?: string[];
}

export interface ICertificationContent extends ISectionContent {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  credentialUrl?: string;
  description?: string;
}

export interface IAwardContent extends ISectionContent {
  title: string;
  issuingOrganization: string;
  dateReceived: string;
  description?: string;
}

export interface ICustomSectionContent extends ISectionContent {
  title: string;
  content: string | Record<string, any>;
}

export interface IResumeSection {
  _id?: string;
  type: SectionType;
  title: string;
  enabled: boolean;
  order: number;
  content: ISectionContent[];
  settings: {
    visibility: 'public' | 'private';
    layout: 'standard' | 'compact' | 'detailed' | 'custom';
    styling: Record<string, any>;
  };
}

export interface IResume {
  _id?: string;
  userId: string;
  title: string;
  targetPosition?: string;
  industry?: string;
  templateId: string;
  language: string;
  sections: IResumeSection[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    lastPublishedAt?: string;
    currentVersion: number;
    isPublished: boolean;
    lastAutosaved?: string;
    shareableLink?: string;
    sharingOptions: {
      password?: string;
      expiresAt?: string;
      allowDownload: boolean;
      allowFeedback: boolean;
      allowEmbed?: boolean;
    };
    viewCount: number;
    downloadCount: number;
  };
  atsScore?: number;
  keywords: string[];
  aiSuggestions: Array<{
    sectionId: string;
    suggestions: string[];
    accepted?: boolean;
    createdAt: string;
  }>;
  analytics: {
    lastModified?: string;
    modificationCount: number;
    exportHistory: Array<{
      format: string;
      timestamp: string;
    }>;
    shareViews: Array<{
      timestamp: string;
      ipHash?: string;
      userAgent?: string;
      referrer?: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ResumeResponse {
  message: string;
  status: number;
  data: {
    resume: IResume;
  };
}

export type CreateResumeType = Omit<IResume, '_id' | 'userId' | 'createdAt' | 'updatedAt' | 'metadata' | 'atsScore' | 'keywords' | 'aiSuggestions' | 'analytics'>;
export type UpdateResumeType = Partial<CreateResumeType>;
export type ShareResumeType = {
  password?: string;
  expiresAt?: string;
  allowDownload: boolean;
  allowFeedback: boolean;
  allowEmbed?: boolean;
};
export type UpdateShareResumeType = Partial<ShareResumeType>;

export interface ExperienceContent {
  experiences: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    isCurrentPosition?: boolean;
    location?: string;
    description?: string;
    achievements?: string[];
  }[];
}

export interface EducationContent {
  educations: {
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    achievements?: string[];
  }[];
}

export interface SkillContent {
  skills: {
    category: string;
    items: string[];
  }[];
}

export interface ResumeVersionType {
  versionNumber: number;
  versionName: string;
  description: string;
  createdAt: string;
}

export interface CreateVersionType {
  versionName: string;
  description: string;
} 