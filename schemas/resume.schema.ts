export interface SectionType {
  _id: string;
  type: string;
  title: string;
  enabled: boolean;
  order: number;
  content: any;
  settings: {
    visibility: string;
    layout: string;
    styling: Record<string, any>;
  };
}

export interface ResumeType {
  _id: string;
  userId: string;
  title: string;
  templateId: string;
  targetPosition?: string;
  industry?: string;
  language: string;
  sections: SectionType[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
    currentVersion: number;
    viewCount: number;
    shareableLink: string | null;
    sharingOptions: {
      password: string | null;
      expiresAt: string | null;
      allowDownload: boolean;
      allowFeedback: boolean;
    };
  };
}

export interface ResumeResponse {
  message: string;
  status: number;
  data: {
    resume: ResumeType;
  };
}

export interface CreateResumeType {
  title: string;
  templateId: string;
  targetPosition?: string;
  industry?: string;
  sections?: SectionType[];
}

export interface UpdateResumeType {
  title?: string;
  targetPosition?: string;
  templateId?: string;
  industry?: string;
}

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

export interface ShareResumeType {
  password?: string;
  expiryDays?: number;
  allowDownload?: boolean;
  allowFeedback?: boolean;
  allowEmbed?: boolean;
}

export interface UpdateShareResumeType {
  password?: string;
  expiresAt?: string;
  allowDownload?: boolean;
  allowFeedback?: boolean;
  allowEmbed?: boolean;
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