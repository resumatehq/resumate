import { Suspense } from "react";
import { SharedResumeView } from "@/components/resume/shared-resume-view";

export default function SharedResumePage({
  params,
}: {
  params: { shareableLink: string };
}) {
  const { shareableLink } = params;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[80vh]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-medium text-gray-700">
                  Loading resume...
                </p>
              </div>
            </div>
          }
        >
          <SharedResumeView shareableLink={shareableLink} />
        </Suspense>
      </div>
    </main>
  );
}
