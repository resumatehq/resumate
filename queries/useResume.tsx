import resumeApiRequest from "@/apiRequest/resume.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IResume, ResumeResponse } from "@/schemas/resume.schema";

interface ResumesResponse {
  message: string;
  status: number;
  data: {
    resumes: Array<{
      _id: string;
      title: string;
      templateId: string;
      targetPosition?: string;
      industry?: string;
      metadata: {
        createdAt: string;
        updatedAt: string;
        isPublished: boolean;
      };
    }>;
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Define a type for the direct API response
interface DirectResumeResponse {
  message: string;
  status: number;
  data: {
    resume: IResume;
  };
}

export const useGetResumesQuery = () => {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: resumeApiRequest.getResumes,
  });
};

export const useGetResumeByIdQuery = (resumeId: string) => {
  return useQuery({
    queryKey: ["resume", resumeId],
    queryFn: async () => {
      const response = await resumeApiRequest.getResumeById(resumeId);
      console.log("API Response:", response); // Debug log

      // Handle the new API response structure
      // Check for the new structure format first
      if (response?.payload?.data?.resume) {
        return response.payload.data.resume;
      }

      // If the response is directly from the backend without the payload wrapper
      if ((response as unknown as DirectResumeResponse)?.data?.resume) {
        return (response as unknown as DirectResumeResponse).data.resume;
      }

      // Return empty resume if no data found
      return {
        userId: "",
        title: "",
        templateId: "",
        language: "en",
        sections: [],
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          currentVersion: 1,
          isPublished: false,
          viewCount: 0,
          downloadCount: 0,
          sharingOptions: {
            allowDownload: false,
            allowFeedback: false,
          },
        },
        keywords: [],
        aiSuggestions: [],
        analytics: {
          modificationCount: 0,
          exportHistory: [],
          shareViews: [],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },
    enabled: !!resumeId,
  });
};

export const useDeleteResumeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (resumeId: string) => resumeApiRequest.deleteResume(resumeId),
    onSuccess: () => {
      // Refetch resumes list after delete
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
};
