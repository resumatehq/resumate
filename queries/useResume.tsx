import resumeApiRequest from "@/apiRequest/resume.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
