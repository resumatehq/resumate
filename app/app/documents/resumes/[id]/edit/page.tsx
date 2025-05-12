"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetResumeByIdQuery } from "@/queries/useResume";
import { ResumeProvider } from "@/context/resume-context";
import { ResumeBuilder } from "@/components/resume/resume-builder";
import { IResume, IResumeSection } from "@/schemas/resume.schema";

export default function EditResumePage() {
  const params = useParams();
  const resumeId = params.id as string;
  const [processedData, setProcessedData] = useState<IResume | null>(null);

  const {
    data: resumeData,
    isLoading,
    error,
  } = useGetResumeByIdQuery(resumeId);

  // Process the resume data to ensure it's properly structured
  useEffect(() => {
    if (resumeData) {
      console.log("Raw API data:", JSON.stringify(resumeData, null, 2));

      // Create a deep copy to avoid reference issues
      const processedResume = JSON.parse(JSON.stringify(resumeData));

      // Filter out summary sections since they're redundant with professional summary in personal info
      processedResume.sections = processedResume.sections.filter(
        (section: IResumeSection) => section.type !== "summary"
      );

      // Process all sections to ensure consistent structure
      processedResume.sections = processedResume.sections.map(
        (section: IResumeSection) => {
          // Check for personal info section
          if (section.type === "personal") {
            console.log(
              "Personal section from API:",
              JSON.stringify(section, null, 2)
            );

            // Ensure it has the right structure - always an array
            if (!Array.isArray(section.content)) {
              console.log("Restructuring personal section content");
              section.content = [section.content || {}];
            }
          }

          // For other sections that require array content
          if (
            [
              "experience",
              "education",
              "skills",
              "projects",
              "languages",
              "certifications",
              "awards",
              "interests",
            ].includes(section.type) &&
            !Array.isArray(section.content)
          ) {
            section.content = section.content ? [section.content] : [];
          }

          return section;
        }
      );

      setProcessedData(processedResume);
    }
  }, [resumeData]);

  if (isLoading) {
    return <div>Loading resume data...</div>;
  }

  if (error) {
    return <div>Error loading resume: {(error as Error).message}</div>;
  }

  if (!processedData) {
    return <div>Processing resume data...</div>;
  }

  return (
    <ResumeProvider>
      <ResumeBuilder initialResume={processedData} />
    </ResumeProvider>
  );
}
