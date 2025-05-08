import resumeApiRequest from "@/apiRequest/resume.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ResumeType } from "@/schemas/resume.schema";

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

export const useGetResumesQuery = () => {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: resumeApiRequest.getResumes,
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
