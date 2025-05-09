"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetResumeByIdQuery } from "@/queries/useResume";
import { ResumeProvider } from "@/context/resume-context";
import { ResumeBuilder } from "@/components/resume/resume-builder";

export default function EditResumePage() {
  const params = useParams();
  const {
    data: resumeData,
    isLoading,
    error,
  } = useGetResumeByIdQuery(params.id as string);

  if (isLoading) {
    return <div>Loading resume data...</div>;
  }

  if (error) {
    return <div>Error loading resume: {(error as Error).message}</div>;
  }

  // Add debug log
  console.log("Resume data in EditResumePage:", resumeData);

  return (
    <ResumeProvider>
      <ResumeBuilder initialResume={resumeData} />
    </ResumeProvider>
  );
}
