import { Key } from "react";

export interface ResumeType {
  _id: Key | null | undefined;
  id: string;
  title: string;
  templateId: string;
  targetPosition?: string;
  industry?: string;
  sections: SectionType[];
  createdAt: string;
  updatedAt: string;
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

export interface SectionType {
  id: string;
  type: string;
  title: string;
  isVisible: boolean;
  content: any;
  order?: number;
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

export interface UpdateShareResumeType extends ShareResumeType {}

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