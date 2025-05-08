"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Update the ResumeData interface to include projects, certifications, and awards
export interface ResumeData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    current: boolean;
    url: string;
    technologies: string[];
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    url: string;
    description: string;
  }>;
  awards: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
  }>;
}

// Update the ResumeContextType to include methods for the new sections
interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (data: Partial<ResumeData["personal"]>) => void;
  updateExperience: (experiences: ResumeData["experience"]) => void;
  updateEducation: (education: ResumeData["education"]) => void;
  updateSkills: (
    category: keyof ResumeData["skills"],
    skills: string[]
  ) => void;
  updateProjects: (projects: ResumeData["projects"]) => void;
  updateCertifications: (certifications: ResumeData["certifications"]) => void;
  updateAwards: (awards: ResumeData["awards"]) => void;
}

// Update the initialResumeData to include the new sections
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
  projects: [],
  certifications: [],
  awards: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Update the ResumeProvider to include methods for the new sections
export function ResumeProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: Partial<ResumeData> | null;
}) {
  const [resumeData, setResumeData] = useState<ResumeData>({
    ...initialResumeData,
    ...(initialData || {}),
  });

  const updatePersonalInfo = (data: Partial<ResumeData["personal"]>) => {
    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...data,
      },
    }));
  };

  const updateExperience = (experiences: ResumeData["experience"]) => {
    setResumeData((prev) => ({
      ...prev,
      experience: experiences,
    }));
  };

  const updateEducation = (education: ResumeData["education"]) => {
    setResumeData((prev) => ({
      ...prev,
      education: education,
    }));
  };

  const updateSkills = (
    category: keyof ResumeData["skills"],
    skills: string[]
  ) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: skills,
      },
    }));
  };

  const updateProjects = (projects: ResumeData["projects"]) => {
    setResumeData((prev) => ({
      ...prev,
      projects: projects,
    }));
  };

  const updateCertifications = (
    certifications: ResumeData["certifications"]
  ) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: certifications,
    }));
  };

  const updateAwards = (awards: ResumeData["awards"]) => {
    setResumeData((prev) => ({
      ...prev,
      awards: awards,
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        updateExperience,
        updateEducation,
        updateSkills,
        updateProjects,
        updateCertifications,
        updateAwards,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
}
