// "use client";

// import React, { createContext, useContext, useState, useCallback } from "react";
// import { IResume, IResumeSection, SectionType } from "@/schemas/resume.schema";
// import { v4 as uuidv4 } from "uuid";

// interface ResumeContextType {
//   resume: IResume | null;
//   setResume: (resume: IResume) => void;
//   updateSection: (sectionId: string, section: Partial<IResumeSection>) => void;
//   addSection: (type: SectionType) => void;
//   removeSection: (sectionId: string) => void;
//   updateSectionContent: (sectionId: string, content: any[]) => void;
//   updateSectionOrder: (sectionId: string, newOrder: number) => void;
//   updateSectionVisibility: (sectionId: string, enabled: boolean) => void;
//   updateSectionSettings: (
//     sectionId: string,
//     settings: Partial<IResumeSection["settings"]>
//   ) => void;
// }

// const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// export function ResumeProvider({ children }: { children: React.ReactNode }) {
//   const [resume, setResume] = useState<IResume | null>(null);

//   const updateSection = useCallback(
//     (sectionId: string, section: Partial<IResumeSection>) => {
//       setResume((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           sections: prev.sections.map((s) =>
//             s._id === sectionId ? { ...s, ...section } : s
//           ),
//         };
//       });
//     },
//     []
//   );

//   const addSection = useCallback((type: SectionType) => {
//     setResume((prev) => {
//       if (!prev) return null;
//       const newSection: IResumeSection = {
//         _id: uuidv4(),
//         type,
//         title: type.charAt(0).toUpperCase() + type.slice(1),
//         enabled: true,
//         order: prev.sections.length,
//         content: [],
//         settings: {
//           visibility: "public",
//           layout: "standard",
//           styling: {},
//         },
//       };
//       return {
//         ...prev,
//         sections: [...prev.sections, newSection],
//       };
//     });
//   }, []);

//   const removeSection = useCallback((sectionId: string) => {
//     setResume((prev) => {
//       if (!prev) return null;
//       return {
//         ...prev,
//         sections: prev.sections.filter((s) => s._id !== sectionId),
//       };
//     });
//   }, []);

//   const updateSectionContent = useCallback(
//     (sectionId: string, content: any[]) => {
//       setResume((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           sections: prev.sections.map((s) =>
//             s._id === sectionId ? { ...s, content } : s
//           ),
//         };
//       });
//     },
//     []
//   );

//   const updateSectionOrder = useCallback(
//     (sectionId: string, newOrder: number) => {
//       setResume((prev) => {
//         if (!prev) return null;
//         const sections = [...prev.sections];
//         const sectionIndex = sections.findIndex((s) => s._id === sectionId);
//         if (sectionIndex === -1) return prev;

//         const [section] = sections.splice(sectionIndex, 1);
//         sections.splice(newOrder, 0, section);

//         return {
//           ...prev,
//           sections: sections.map((s, index) => ({ ...s, order: index })),
//         };
//       });
//     },
//     []
//   );

//   const updateSectionVisibility = useCallback(
//     (sectionId: string, enabled: boolean) => {
//       setResume((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           sections: prev.sections.map((s) =>
//             s._id === sectionId ? { ...s, enabled } : s
//           ),
//         };
//       });
//     },
//     []
//   );

//   const updateSectionSettings = useCallback(
//     (sectionId: string, settings: Partial<IResumeSection["settings"]>) => {
//       setResume((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           sections: prev.sections.map((s) =>
//             s._id === sectionId
//               ? { ...s, settings: { ...s.settings, ...settings } }
//               : s
//           ),
//         };
//       });
//     },
//     []
//   );

//   return (
//     <ResumeContext.Provider
//       value={{
//         resume,
//         setResume,
//         updateSection,
//         addSection,
//         removeSection,
//         updateSectionContent,
//         updateSectionOrder,
//         updateSectionVisibility,
//         updateSectionSettings,
//       }}
//     >
//       {children}
//     </ResumeContext.Provider>
//   );
// }

// export function useResume() {
//   const context = useContext(ResumeContext);
//   if (context === undefined) {
//     throw new Error("useResume must be used within a ResumeProvider");
//   }
//   return context;
// }
'use client';

import type React from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import type {
  IResume,
  IResumeSection,
  SectionType,
} from '@/schemas/resume.schema';
import { v4 as uuidv4 } from 'uuid';

// Define a type for our history stack
interface HistoryState {
  past: IResume[];
  future: IResume[];
}

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
    settings: Partial<IResumeSection['settings']>
  ) => void;
  // Add undo and redo functions
  undo: () => void;
  redo: () => void;
  // Add history state for UI indicators
  canUndo: boolean;
  canRedo: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResumeState] = useState<IResume | null>(null);
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    future: [],
  });

  // Computed properties for UI indicators
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  // Function to save current state to history and update resume
  const setResume = useCallback((newResume: IResume) => {
    setResumeState((prevResume) => {
      // Only add to history if there was a previous state
      if (prevResume) {
        setHistory((prevHistory) => ({
          past: [...prevHistory.past, prevResume],
          future: [], // Clear future when a new action is performed
        }));
      }
      return newResume;
    });
  }, []);

  // Helper function to update resume with history tracking
  const updateResumeWithHistory = useCallback(
    (updateFn: (prev: IResume | null) => IResume | null) => {
      setResumeState((prevResume) => {
        if (!prevResume) return null;

        // Save current state to history
        setHistory((prevHistory) => ({
          past: [...prevHistory.past, prevResume],
          future: [], // Clear future when a new action is performed
        }));

        // Apply the update
        return updateFn(prevResume);
      });
    },
    []
  );

  const updateSection = useCallback(
    (sectionId: string, section: Partial<IResumeSection>) => {
      updateResumeWithHistory((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s._id === sectionId ? { ...s, ...section } : s
          ),
        };
      });
    },
    [updateResumeWithHistory]
  );

  const addSection = useCallback(
    (type: SectionType) => {
      updateResumeWithHistory((prev) => {
        if (!prev) return null;
        const newSection: IResumeSection = {
          _id: uuidv4(),
          type,
          title: type.charAt(0).toUpperCase() + type.slice(1),
          enabled: true,
          order: prev.sections.length,
          content: [],
          settings: {
            visibility: 'public',
            layout: 'standard',
            styling: {},
          },
        };
        return {
          ...prev,
          sections: [...prev.sections, newSection],
        };
      });
    },
    [updateResumeWithHistory]
  );

  const removeSection = useCallback(
    (sectionId: string) => {
      updateResumeWithHistory((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          sections: prev.sections.filter((s) => s._id !== sectionId),
        };
      });
    },
    [updateResumeWithHistory]
  );

  const updateSectionContent = useCallback(
    (sectionId: string, content: any[]) => {
      updateResumeWithHistory((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s._id === sectionId ? { ...s, content } : s
          ),
        };
      });
    },
    [updateResumeWithHistory]
  );

  const updateSectionOrder = useCallback(
    (sectionId: string, newOrder: number) => {
      updateResumeWithHistory((prev) => {
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
    [updateResumeWithHistory]
  );

  const updateSectionVisibility = useCallback(
    (sectionId: string, enabled: boolean) => {
      updateResumeWithHistory((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s._id === sectionId ? { ...s, enabled } : s
          ),
        };
      });
    },
    [updateResumeWithHistory]
  );

  const updateSectionSettings = useCallback(
    (sectionId: string, settings: Partial<IResumeSection['settings']>) => {
      updateResumeWithHistory((prev) => {
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
    [updateResumeWithHistory]
  );

  // Implement undo function
  const undo = useCallback(() => {
    if (history.past.length === 0 || !resume) return;

    // Get the last state from past
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);

    // Update history
    setHistory({
      past: newPast,
      future: [resume, ...history.future],
    });

    // Set the resume to the previous state
    setResumeState(previous);
  }, [history, resume]);

  // Implement redo function
  const redo = useCallback(() => {
    if (history.future.length === 0) return;

    // Get the first state from future
    const next = history.future[0];
    const newFuture = history.future.slice(1);

    // Update history
    setHistory({
      past: [...history.past, resume as IResume],
      future: newFuture,
    });

    // Set the resume to the next state
    setResumeState(next);
  }, [history, resume]);

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
        undo,
        redo,
        canUndo,
        canRedo,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
