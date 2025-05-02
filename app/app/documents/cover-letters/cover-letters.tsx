'use client';

import { Plus } from 'lucide-react';

export default function CoverLetters() {
  return (
    <div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <img
          src="https://resume.io/assets/media/no-letters3b3449f1e4c0ebcdc6fe.png"
          alt=""
          className="w-48 h-48 mb-4"
        />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          A cover letter to win hearts and minds
        </h3>
        <p className="text-sm text-gray-600 mb-4 max-w-sm">
          The perfect companion to your resume. Do what other candidates are
          missing – speak directly to the employer!
        </p>
        <button className="flex bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-3 py-2 rounded-lg shadow-md transition">
          <Plus className="h-6 w-6 mr-2" /> New Cover Letter
        </button>
      </div>{' '}
    </div>
  );
}
