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

export default function ResumeList() {
  return (
    <div>
      {/* Existing Resume Card */}
      <div className=" bg-white border-none overflow-hidden">
        <div className="grid grid-cols-[1fr_2fr]">
          <div className="max-w-60 max-h-80 bg-white border border-gray-200 p-6 ml-1 flex items-center justify-center rounded-md ">
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
              <h3 className="text-xl font-medium">Untitled</h3>
              <Edit className="h-6 w-6 text-gray-400 pl-2" />
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Updated 13 March, 16:08
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
              <div className="flex items-center text-gray-700">
                <Download className="text-blue-400 h-5 w-5 mr-2" />
                <span>Download PDF</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FileText className="text-blue-400 h-5 w-5 mr-2" />
                <span>Export to DOCX</span>
              </div>
              <div className="flex items-center">
                <FileText className="text-blue-400 h-5 w-5 mr-2" />
                <span>Export to TXT</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MoreHorizontal className="text-blue-400 h-5 w-5 mr-2" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
