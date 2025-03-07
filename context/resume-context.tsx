"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface ResumeData {
  personal: {
    fullName: string
    jobTitle: string
    email: string
    phone: string
    location: string
    website: string
    linkedin: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    fieldOfStudy: string
    location: string
    startDate: string
    endDate: string
    description: string
  }>
  skills: {
    technical: string[]
    soft: string[]
    languages: string[]
  }
}

interface ResumeContextType {
  resumeData: ResumeData
  updatePersonalInfo: (data: Partial<ResumeData["personal"]>) => void
  updateExperience: (experiences: ResumeData["experience"]) => void
  updateEducation: (education: ResumeData["education"]) => void
  updateSkills: (category: keyof ResumeData["skills"], skills: string[]) => void
}

const initialResumeData: ResumeData = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
  },
  experience: [
    {
      id: "1",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ],
  education: [
    {
      id: "1",
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)

  const updatePersonalInfo = (data: Partial<ResumeData["personal"]>) => {
    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...data,
      },
    }))
  }

  const updateExperience = (experiences: ResumeData["experience"]) => {
    setResumeData((prev) => ({
      ...prev,
      experience: experiences,
    }))
  }

  const updateEducation = (education: ResumeData["education"]) => {
    setResumeData((prev) => ({
      ...prev,
      education: education,
    }))
  }

  const updateSkills = (category: keyof ResumeData["skills"], skills: string[]) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: skills,
      },
    }))
  }

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        updateExperience,
        updateEducation,
        updateSkills,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResumeContext() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResumeContext must be used within a ResumeProvider")
  }
  return context
}

