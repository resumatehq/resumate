"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { IResume, IResumeSection, SectionType } from "@/schemas/resume.schema";
import { v4 as uuidv4 } from "uuid";

interface ResumeContextType {
  resume: IResume | null;
  setResume: (resume: IResume) => void;
  updateSection: (sectionId: string, section: Partial<IResumeSection>) => void;
  addSection: (type: SectionType) => void;
  removeSection: (sectionId: string) => void;
  updateSectionContent: (sectionId: string, content: any[]) => void;
  updateSectionOrder: (sectionId: string, newOrder: number) => void;
  updateSectionVisibility: (sectionId: string, enabled: boolean) => void;
  updateSectionSettings: (
    sectionId: string,
    settings: Partial<IResumeSection["settings"]>
  ) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<IResume | null>(null);

  const updateSection = useCallback(
    (sectionId: string, section: Partial<IResumeSection>) => {
      setResume((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s._id === sectionId ? { ...s, ...section } : s
          ),
        };
      });
    },
    []
  );

  const addSection = useCallback((type: SectionType) => {
    setResume((prev) => {
      if (!prev) return null;
      const newSection: IResumeSection = {
        _id: uuidv4(),
        type,
        title: type.charAt(0).toUpperCase() + type.slice(1),
        enabled: true,
        order: prev.sections.length,
        content: [],
        settings: {
          visibility: "public",
          layout: "standard",
          styling: {},
        },
      };
      return {
        ...prev,
        sections: [...prev.sections, newSection],
      };
    });
  }, []);

  const removeSection = useCallback((sectionId: string) => {
    setResume((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        sections: prev.sections.filter((s) => s._id !== sectionId),
      };
    });
  }, []);

  const updateSectionContent = useCallback(
    (sectionId: string, content: any[]) => {
      setResume((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s._id === sectionId ? { ...s, content } : s
          ),
        };
      });
    },
    []
  );

  const updateSectionOrder = useCallback(
    (sectionId: string, newOrder: number) => {
      setResume((prev) => {
        if (!prev) return null;
        const sections = [...prev.sections];
        const sectionIndex = sections.findIndex((s) => s._id === sectionId);
        if (sectionIndex === -1) return prev;

        const [section] = sections.splice(sectionIndex, 1);
        sections.splice(newOrder, 0, section);

        return {
          ...prev,
          sections: sections.map((s, index) => ({ ...s, order: index })),
        };
      });
    },
    []
  );

  const updateSectionVisibility = useCallback(
    (sectionId: string, enabled: boolean) => {
      setResume((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s._id === sectionId ? { ...s, enabled } : s
          ),
        };
      });
    },
    []
  );

  const updateSectionSettings = useCallback(
    (sectionId: string, settings: Partial<IResumeSection["settings"]>) => {
      setResume((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s._id === sectionId
              ? { ...s, settings: { ...s.settings, ...settings } }
              : s
          ),
        };
      });
    },
    []
  );

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        updateSection,
        addSection,
        removeSection,
        updateSectionContent,
        updateSectionOrder,
        updateSectionVisibility,
        updateSectionSettings,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
