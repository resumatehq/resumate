'use client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResumeList from './resumeList';
import NewResume from './newResume';

export default function ResumeDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Resumes & Cover Letters</h1>
        <Button className="bg-blue-500 hover:bg-blue-600 text-md font-medium">
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResumeList />
        <NewResume />
      </div>
    </div>
  );
}
