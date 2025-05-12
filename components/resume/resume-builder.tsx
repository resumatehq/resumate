"use client";

import { useEffect, useState } from "react";
import { useResume } from "@/context/resume-context";
import type { IResume } from "@/schemas/resume.schema";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Save,
  Download,
  Eye,
  EyeOff,
  Undo,
  Redo,
  ChevronDown,
} from "lucide-react";
import type { SectionType } from "@/schemas/resume.schema";
import { SectionEditor, AVAILABLE_SECTION_TYPES } from "./section-editor";
import { ResumePreview } from "./resume-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  useCreateResumeMutation,
  useUpdateResumeMutation,
} from "@/queries/useResume";
import { toast } from "@/hooks/use-toast";
import type { CreateResumeType } from "@/schemas/resume.schema";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResumeBuilderProps {
  initialResume?: IResume;
}

// Define section types with user-friendly labels
const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  personal: "Personal Information",
  education: "Education",
  experience: "Work Experience",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  awards: "Awards",
  languages: "Languages",
  interests: "Interests",
  volunteer: "Volunteer Experience",
  summary: "Summary",
  references: "References",
  publications: "Publications",
  custom: "Custom Section",
};

export function ResumeBuilder({ initialResume }: ResumeBuilderProps) {
  const { resume, setResume, addSection, undo, redo, canUndo, canRedo } =
    useResume();

  const [previewMode, setPreviewMode] = useState<"split" | "full" | "hidden">(
    "split"
  );
  const [activeTab, setActiveTab] = useState("edit");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState("");

  const createResumeMutation = useCreateResumeMutation();
  const updateResumeMutation = useUpdateResumeMutation();
  const router = useRouter();

  // Improved initialResume handling
  useEffect(() => {
    console.log(
      "useEffect triggered with initialResume:",
      JSON.stringify(initialResume, null, 2)
    );

    if (initialResume) {
      console.log(
        "Personal Info Content:",
        JSON.stringify(
          initialResume.sections.find((s) => s.type === "personal")?.content,
          null,
          2
        )
      );

      // Process initialResume to ensure consistent format
      const processedResume = { ...initialResume };

      // Ensure personal info section has content in array format
      const personalSection = processedResume.sections.find(
        (s) => s.type === "personal"
      );
      if (personalSection && !Array.isArray(personalSection.content)) {
        console.log("Converting personal section content to array format");
        personalSection.content = [personalSection.content || {}];
      }

      // Make sure we're setting the resume with a deep copy to avoid reference issues
      setResume(JSON.parse(JSON.stringify(processedResume)));
      console.log("Resume data set in context");
    }
  }, [initialResume, setResume]);

  // Check if resume exists and has sections
  if (!resume || !Array.isArray(resume.sections)) {
    console.log("Showing loading state. Resume:", resume);
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading resume builder...
          </p>
        </div>
      </div>
    );
  }

  const handleAddSection = (type: SectionType) => {
    // Check if section already exists for unique section types
    const existingSections =
      resume?.sections.filter((s) => s.type === type) || [];

    // If it's a unique section type that already exists, don't add it again
    if (type === "personal" && existingSections.length > 0) {
      toast({
        title: "Section already exists",
        description: "You can only have one Personal Information section",
        variant: "destructive",
      });
      return;
    }

    addSection(type);
  };

  const isUniqueSection = (type: SectionType): boolean => {
    return type === "personal";
  };

  const canAddSection = (type: SectionType): boolean => {
    // If it's not a unique section, it can always be added
    if (!isUniqueSection(type)) return true;

    // If it's a unique section, check if it already exists
    const existingSections =
      resume?.sections.filter((s) => s.type === type) || [];
    return existingSections.length === 0;
  };

  const togglePreviewMode = () => {
    if (previewMode === "split") {
      setPreviewMode("full");
    } else if (previewMode === "full") {
      setPreviewMode("hidden");
    } else {
      setPreviewMode("split");
    }
  };

  const handleSave = async () => {
    if (!resume) return;

    try {
      // Hiển thị trạng thái đang lưu
      toast({
        title: "Saving...",
        description: "Please wait while we save your resume",
      });

      // Chuẩn bị dữ liệu theo CreateResumeType
      const resumeData: CreateResumeType = {
        title: resume.title,
        templateId: resume.templateId,
        language: resume.language,
        sections: resume.sections.map((section) => ({
          ...section,
          content: section.content || [],
          settings: section.settings || {
            visibility: "public",
            layout: "standard",
            styling: {},
          },
        })),
        targetPosition: resume.targetPosition,
        industry: resume.industry,
      };

      let response;

      // Kiểm tra nếu có _id thì update, không thì create mới
      if (resume._id) {
        response = await updateResumeMutation.mutateAsync({
          resumeId: resume._id,
          data: resumeData,
        });

        console.log("cap nhat thanh cong");
        toast({
          title: "Success",
          description: "Resume updated successfully",
        });
      } else {
        response = await createResumeMutation.mutateAsync(resumeData);
        toast({
          title: "Success",
          description: "Resume created successfully",
        });

        // Chuyển hướng đến trang edit resume chỉ khi tạo mới
        if (response.payload?._id) {
          router.push(`/app/documents/resumes/${response.payload._id}/edit`);
        }
      }
    } catch (error: any) {
      console.error("Error saving resume:", error);
      toast({
        title: "Error",
        description: error?.payload?.message || "Failed to save resume",
        variant: "destructive",
      });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const handleTitleSubmit = () => {
    if (resume) {
      setResume({
        ...resume,
        title: titleInput,
      });
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTitleSubmit();
    } else if (e.key === "Escape") {
      setIsEditingTitle(false);
      setTitleInput(resume?.title || "");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {isEditingTitle ? (
            <input
              type="text"
              value={titleInput}
              onChange={handleTitleChange}
              onBlur={handleTitleSubmit}
              onKeyDown={handleTitleKeyDown}
              className="text-2xl font-bold text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none px-1"
              autoFocus
            />
          ) : (
            <h1
              className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-blue-600"
              onClick={() => {
                setIsEditingTitle(true);
                setTitleInput(resume?.title || "");
              }}
            >
              {resume?.title || "Untitled Resume"}
            </h1>
          )}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
              className={!canUndo ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Undo className="w-4 h-4 mr-2" />
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={redo}
              disabled={!canRedo}
              className={!canRedo ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Redo className="w-4 h-4 mr-2" />
              Redo
            </Button>
            <Button variant="outline" size="sm" onClick={togglePreviewMode}>
              {previewMode === "hidden" ? (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Show Preview
                </>
              ) : previewMode === "full" ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Full Preview
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="default" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Editor area - hidden in full preview mode */}
        {previewMode !== "full" && (
          <div
            className={`${
              previewMode === "split" ? "w-1/2" : "w-full"
            } h-full overflow-y-auto border-r`}
          >
            <div className="p-6">
              <Tabs defaultValue="sections" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="sections">Sections</TabsTrigger>
                  <TabsTrigger value="template">Template</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="sections" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Resume Sections</h2>
                    <div className="flex space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Section
                            <ChevronDown className="w-4 h-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {AVAILABLE_SECTION_TYPES.filter(
                            (sectionType) =>
                              sectionType !== "summary" &&
                              canAddSection(sectionType)
                          ).map((sectionType) => (
                            <DropdownMenuItem
                              key={sectionType}
                              onClick={() => handleAddSection(sectionType)}
                            >
                              {SECTION_TYPE_LABELS[sectionType]}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {resume.sections.map((section) => (
                      <Card key={section._id} className="overflow-hidden">
                        <SectionEditor key={section._id} section={section} />
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="template">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-4">Choose a Template</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-md p-2 cursor-pointer hover:border-blue-500">
                        <div className="bg-gray-200 h-32 mb-2 rounded"></div>
                        <p className="text-sm font-medium">Professional</p>
                      </div>
                      <div className="border rounded-md p-2 cursor-pointer hover:border-blue-500">
                        <div className="bg-gray-200 h-32 mb-2 rounded"></div>
                        <p className="text-sm font-medium">Modern</p>
                      </div>
                      <div className="border rounded-md p-2 cursor-pointer hover:border-blue-500">
                        <div className="bg-gray-200 h-32 mb-2 rounded"></div>
                        <p className="text-sm font-medium">Creative</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-4">Resume Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Target Position
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="e.g. Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Industry
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="e.g. Technology"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Language
                        </label>
                        <select className="w-full px-3 py-2 border rounded-md">
                          <option value="en">English</option>
                          <option value="vi">Vietnamese</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {/* Preview area - hidden in hidden preview mode */}
        {previewMode !== "hidden" && (
          <div
            className={`${
              previewMode === "split" ? "w-1/2" : "w-full"
            } h-full overflow-y-auto bg-gray-100`}
          >
            <div className="p-6 flex justify-center">
              <div className="w-full max-w-[800px] bg-white shadow-lg rounded-lg overflow-hidden">
                <ResumePreview resume={resume} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
