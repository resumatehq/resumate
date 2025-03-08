import type React from "react"
import type { ResumeData } from "@/context/resume-context"

export interface TemplateProps {
  resumeData: ResumeData
  resumeContentRef: React.RefObject<HTMLDivElement>
  totalPages: number
  currentPage: number
}

export interface HasContentHelpers {
  summary: () => boolean
  experience: () => boolean
  education: () => boolean
  skills: () => boolean
  projects: () => boolean
  certifications: () => boolean
  awards: () => boolean
}

export const createHasContent = (resumeData: ResumeData): HasContentHelpers => ({
  summary: () => !!resumeData.personal.summary?.trim(),
  experience: () =>
    resumeData.experience.some((exp) => exp.company?.trim() || exp.position?.trim() || exp.description?.trim()),
  education: () => resumeData.education.some((edu) => edu.institution?.trim() || edu.degree?.trim()),
  skills: () =>
    resumeData.skills.technical.length > 0 ||
    resumeData.skills.soft.length > 0 ||
    resumeData.skills.languages.length > 0,
  projects: () => resumeData.projects.some((proj) => proj.title?.trim() || proj.description?.trim()),
  certifications: () => resumeData.certifications.some((cert) => cert.name?.trim() || cert.issuer?.trim()),
  awards: () => resumeData.awards.some((award) => award.title?.trim() || award.issuer?.trim()),
})

export const formatDate = (dateString: string) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

