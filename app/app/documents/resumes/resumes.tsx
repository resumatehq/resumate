'use client';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Edit,
  Target,
  Download,
  FileText,
  MoreHorizontal,
  Trash2,
  Calendar,
  Briefcase,
  Share2,
  Copy,
  Clock,
  Plus,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  useGetResumesQuery,
  useDeleteResumeMutation,
  useUpdateResumeMutation,
} from '@/queries/useResume';
import { IResume } from '@/schemas/resume.schema';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NewResume from './newResume';

interface ResumeListProps {
  onCreateClick?: () => void;
}

export default function ResumeList({ onCreateClick }: ResumeListProps) {
  const { data, isLoading, isError } = useGetResumesQuery();
  const deleteResumeMutation = useDeleteResumeMutation();
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleDeleteResume = async (resumeId: string) => {
    try {
      await deleteResumeMutation.mutateAsync(resumeId);
      toast({
        title: 'Success',
        description: 'Resume deleted successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.payload?.message || 'Failed to delete resume',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <ResumeSkeletons />;
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-red-500 mb-2">
          <FileText className="h-12 w-12 mx-auto mb-2" />
        </div>
        <h3 className="text-lg font-medium mb-2">Error loading resumes</h3>
        <p className="text-gray-500 mb-4">
          We couldn't load your resumes. Please try again later.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Refresh
        </Button>
      </div>
    );
  }
  // @ts-ignore
  if (!data?.payload?.data?.resumes || data.payload.data.resumes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-blue-500 mb-2">
          <FileText className="h-12 w-12 mx-auto mb-2" />
        </div>
        <h3 className="text-lg font-medium mb-2">No resumes found</h3>
        <p className="text-gray-500 mb-4">
          Create your first resume to get started with your job search!
        </p>
        <Button
          onClick={onCreateClick}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Resume
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      {/* @ts-ignore */}
      {data.payload.data.resumes.map((resume: ResumeType) => (
        <ResumeCard
          key={resume._id}
          resume={resume}
          onDelete={handleDeleteResume}
        />
      ))}
      <NewResume />
    </div>
  );
}

function ResumeCard({
  resume,
  onDelete,
}: {
  resume: IResume;
  onDelete: (id: string) => void;
}) {
  const { _id, title, targetPosition, industry, metadata } = resume;
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(title);
  const updateResumeMutation = useUpdateResumeMutation();

  const formattedDate = new Date(metadata.updatedAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const completionPercentage = 75;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const handleTitleSubmit = async () => {
    if (titleInput.trim() === '') {
      setTitleInput(title); // Reset to original title if empty
      setIsEditingTitle(false);
      return;
    }

    try {
      await updateResumeMutation.mutateAsync({
        resumeId: _id as string,
        data: { title: titleInput },
      });
      toast({
        title: 'Success',
        description: 'Resume title updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.payload?.message || 'Failed to update title',
        variant: 'destructive',
      });
      setTitleInput(title); // Reset to original title on error
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false);
      setTitleInput(title);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="grid grid-cols-[1fr_2fr]">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
          <div className="w-full max-w-[140px] aspect-[210/297] relative bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
            <div className="absolute inset-4 flex flex-col">
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
              <div className="h-2 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-gray-300 rounded w-full mb-3"></div>

              <div className="h-3 bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-2 bg-gray-300 rounded w-5/6 mb-1"></div>
              <div className="h-2 bg-gray-300 rounded w-3/4 mb-1"></div>
              <div className="h-2 bg-gray-300 rounded w-full mb-3"></div>

              <div className="h-3 bg-gray-700 rounded w-2/5 mb-2"></div>
              <div className="h-2 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-2 bg-gray-300 rounded w-4/5 mb-3"></div>

              <div className="mt-auto w-full flex justify-between">
                <div className="h-2 w-1/5 bg-gray-300 rounded"></div>
                <div className="h-2 w-1/5 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 px-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={titleInput}
                    onChange={handleTitleChange}
                    onBlur={handleTitleSubmit}
                    onKeyDown={handleTitleKeyDown}
                    className="text-xl font-medium text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none px-1"
                    autoFocus
                  />
                ) : (
                  <h3 className="text-xl font-medium text-gray-800">{title}</h3>
                )}
                <Edit
                  className="h-4 w-4 text-gray-400 hover:text-blue-500 cursor-pointer"
                  onClick={() => {
                    setIsEditingTitle(true);
                    setTitleInput(title);
                  }}
                />
              </div>

              <div className="flex items-center text-gray-500 text-sm mb-1">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Updated {formattedDate}</span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer">
                  <Copy className="h-4 w-4 mr-2" />
                  <span>Duplicate</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Share2 className="h-4 w-4 mr-2" />
                  <span>Share Resume</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 cursor-pointer"
                  onClick={() => onDelete(_id as string)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {targetPosition && (
              <div className="flex items-center bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full">
                <Briefcase className="h-3 w-3 mr-1" />
                {targetPosition}
              </div>
            )}

            {industry && (
              <div className="flex items-center bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full">
                <Calendar className="h-3 w-3 mr-1" />
                {industry}
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-gray-700">
                Completion
              </span>
              <span className="text-sm font-medium text-gray-700">
                {completionPercentage}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <Link
              href={`/app/documents/resumes/${_id}/edit`}
              className="flex items-center justify-center text-sm text-gray-700 border border-gray-200 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Edit className="text-blue-500 h-4 w-4 mr-2" />
              <span>Edit</span>
            </Link>

            <Link
              href={`/app/documents/resumes/${_id}/tailor`}
              className="flex items-center justify-center text-sm text-gray-700 border border-gray-200 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Target className="text-purple-500 h-4 w-4 mr-2" />
              <span>Tailor</span>
            </Link>

            <button className="flex items-center justify-center text-sm text-gray-700 border border-gray-200 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="text-green-500 h-4 w-4 mr-2" />
              <span>PDF</span>
            </button>

            <button className="flex items-center justify-center text-sm text-gray-700 border border-gray-200 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="text-orange-500 h-4 w-4 mr-2" />
              <span>DOCX</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResumeSkeletons() {
  return (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-[1fr_2fr]">
            <div className="bg-gray-50 h-60 flex items-center justify-center">
              <Skeleton className="h-40 w-32 rounded-md" />
            </div>
            <div className="p-6">
              <div className="flex justify-between">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-4 w-36 mb-4" />

              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>

              <Skeleton className="h-8 w-full mb-5" />

              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
