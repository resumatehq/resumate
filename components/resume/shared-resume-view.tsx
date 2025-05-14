"use client";

import { useEffect, useState } from "react";
import { ResumePreview } from "./resume-preview";
import resumeApiRequest from "@/apiRequest/resume.api";
import type { IResume } from "@/schemas/resume.schema";

interface SharedResumeViewProps {
  shareableLink: string;
}

export function SharedResumeView({ shareableLink }: SharedResumeViewProps) {
  const [resume, setResume] = useState<IResume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setIsLoading(true);
        const response = await resumeApiRequest.getSharedResume(shareableLink);
        if (response.payload?.data?.resume) {
          console.log("12121", response.payload?.data?.resume);
          setResume(response.payload.data.resume);
        } else {
          throw new Error("Failed to load resume");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load resume");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [shareableLink]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Resume not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <ResumePreview resume={resume} />
    </div>
  );
}
