'use client';
import { Plus } from 'lucide-react';

export default function NewResume() {
  return (
    <div className="flex items-start">
      <div className="border border-gray-200 rounded-md flex items-center justify-center bg-white">
        <div className="w-44 h-70 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mt-2 pr-16 pl-6">
        <h3 className="text-lg font-medium text-gray-700">New Resume</h3>
        <p className="text-gray-500 text-sm max-w-xs mt-1">
          Create a tailored resume for each job application. Double your chances
          of getting hired!
        </p>
      </div>
    </div>
  );
}
