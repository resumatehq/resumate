'use client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResumeList from './resumeList';
import NewResume from './newResume';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResumeDashboard() {
  const [activeTab, setActiveTab] = useState('resumes');
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resumes & Cover Letters</h1>
        <Button className="bg-blue-500 hover:bg-blue-600 text-md font-medium">
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>

      <div className="container mx-auto py-2 max-w-full">
        <div className="border-b border-gray-200">
          <nav className="relative flex border-b border-gray-200">
            {['resumes', 'cover-letters'].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-xl font-medium mr-4 cursor-pointer relative ${
                  activeTab === tab
                    ? 'text-gray-700'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab === 'resumes' ? 'Resumes' : 'Cover Letters'}

                {activeTab === tab && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 h-1 w-full bg-gray-700 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-center">
        <div className="bg-amber-100 rounded-full p-3 mr-4">
          <span className="text-amber-500 text-xl">📨</span>
        </div>
        <div>
          <p className="font-medium">
            Ready to give your job search a boost and get more exposure?
          </p>
          <p className="text-gray-600 text-sm">
            Choose your resume and we'll send it to hundreds of recruiters in
            your field in just a few clicks
          </p>
        </div>
        <Button variant="outline" className="ml-auto whitespace-nowrap">
          Start Now
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResumeList />
        <NewResume />
      </div>
    </div>
  );
}
