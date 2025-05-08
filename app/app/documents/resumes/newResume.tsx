"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewResume() {
  const router = useRouter();

  return (
    <div
      className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer bg-white"
      onClick={() => router.push("/app/documents/resumes/new")}
    >
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
          <Plus className="h-8 w-8 text-blue-500 group-hover:text-blue-600" />
        </div>
      </div>

      <div className="ml-6">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          New Resume
        </h3>
        <p className="text-gray-600 mt-2 max-w-md">
          Create a tailored resume for each job application. Double your chances
          of getting hired with a professionally crafted resume!
        </p>
        <div className="mt-4 flex items-center text-sm text-blue-500 font-medium">
          <span>Get Started</span>
          <Plus className="h-4 w-4 ml-1" />
        </div>
      </div>
    </div>
  );
}
