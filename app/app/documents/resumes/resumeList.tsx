'use client';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Edit,
  Target,
  Download,
  FileText,
  Plus,
  MoreHorizontal,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { useEffect, useState } from 'react';
import NewResume from './newResume';
import { useGetResumesQuery } from '@/queries/useResume';

// Interface phù hợp với cấu trúc API trả về
interface ResumeItem {
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
}

export default function ResumeList() {
  const { data: apiResponse, isLoading } = useGetResumesQuery();
  const [resumes, setResumes] = useState<ResumeItem[]>([]);

  // Debug log toàn bộ apiResponse
  useEffect(() => {
    console.log('Full API Response Object:', apiResponse);
  }, [apiResponse]);

  useEffect(() => {
    // Sử dụng type any để tránh lỗi TypeScript
    const response = apiResponse as any;
    if (response) {
      // Debug log chi tiết cấu trúc response
      console.log('Keys in API Response:', Object.keys(response));

      if (response.data?.resumes) {
        console.log('Found resumes at response.data.resumes');
        setResumes(response.data.resumes);
      } else if (Array.isArray(response.payload)) {
        console.log('Found resumes at response.payload (array)');
        setResumes(response.payload);
      } else if (response.payload?.data?.resumes) {
        console.log('Found resumes at response.payload.data.resumes');
        setResumes(response.payload.data.resumes);
      } else {
        // Thử những cấu trúc khác có thể
        if (Array.isArray(response)) {
          console.log('Response is directly an array');
          setResumes(response);
        } else if (typeof response === 'object' && response !== null) {
          console.log('Response structure check for resumes property:');
          if ('resumes' in response) {
            console.log('- Found direct resumes property');
            setResumes(response.resumes);
          } else if (response.data?.resumes) {
            console.log('- Found in data.resumes');
            setResumes(response.data.resumes);
          } else {
            console.error('Unexpected data structure:', response);
            setResumes([]);
          }
        } else {
          console.error('Unexpected response type:', typeof response);
          setResumes([]);
        }
      }
    }
  }, [apiResponse]);

  if (isLoading) {
    return <Skeleton className="w-full h-60" />;
  }

  if (resumes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">You don't have any resumes yet</p>
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            onClick={() => {
              /* TODO: Handle create new resume */
            }}
          >
            <Plus className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Create New Resume</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {resumes.map((resume) => (
        <div key={resume._id} className="bg-white border-none overflow-hidden">
          <div className="grid grid-cols-[1fr_2fr]">
            <div className="max-w-60 max-h-80 bg-white border border-gray-200 p-6 ml-1 flex items-center justify-center rounded-md">
              <div className="w-full max-w-[120px]">
                <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
                <div className="h-2 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-2 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded mb-4 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
                <div className="h-2 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-2 bg-gray-200 rounded mb-2 w-4/5"></div>
              </div>
            </div>
            <div className="pl-6">
              <div className="flex items-start mb-1">
                <h3 className="text-xl font-medium">
                  {resume.title || 'Untitled'}
                </h3>
                <Edit className="h-6 w-6 text-gray-400 pl-2 cursor-pointer" />
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Updated {formatDate(resume.metadata.updatedAt)}
              </p>

              <div className="w-[200px] mb-4 border-2 border-blue-50 rounded-[8px] bg-blue-100">
                <Badge className="bg-green-500 text-white font-medium m-1">
                  75%
                </Badge>
                <span className="ml-2 text-sm">Your resume score</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Target className="text-blue-400 h-5 w-5 mr-2" />
                  <span>Tailor to job listing</span>
                  <Badge className="ml-2 bg-blue-100 text-blue-500 text-xs uppercase">
                    NEW
                  </Badge>
                </div>
                <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600">
                  <Download className="text-blue-400 h-5 w-5 mr-2" />
                  <span>Download PDF</span>
                </div>
                <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600">
                  <FileText className="text-blue-400 h-5 w-5 mr-2" />
                  <span>Export to DOCX</span>
                </div>
                <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600">
                  <FileText className="text-blue-400 h-5 w-5 mr-2" />
                  <span>Export to TXT</span>
                </div>
                <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600">
                  <MoreHorizontal className="text-blue-400 h-5 w-5 mr-2" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <NewResume />

      {/* Add New Resume Button */}
      <div
        className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
        onClick={() => {
          /* TODO: Handle create new resume */
        }}
      >
        <Plus className="h-6 w-6 text-gray-400 mr-2" />
        <span className="text-gray-600">Create New Resume</span>
      </div>
    </div>
  );
}
