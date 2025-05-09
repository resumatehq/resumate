"use client";

import { useEffect, useState } from "react";
import { useResume } from "@/context/resume-context";
import { IResume } from "@/schemas/resume.schema";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Save,
  Download,
  Eye,
  EyeOff,
  Settings,
  Undo,
  Redo,
} from "lucide-react";
import { SectionType } from "@/schemas/resume.schema";
import { SectionEditor } from "./section-editor";
import { ResumePreview } from "./resume-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface ResumeBuilderProps {
  initialResume?: IResume;
}

export function ResumeBuilder({ initialResume }: ResumeBuilderProps) {
  const { resume, setResume, addSection } = useResume();
  const [previewMode, setPreviewMode] = useState<"split" | "full" | "hidden">(
    "split"
  );
  const [activeTab, setActiveTab] = useState("edit");

  // Debug logs
  console.log("initialResume in ResumeBuilder:", initialResume);
  console.log("resume state in ResumeBuilder:", resume);

  useEffect(() => {
    console.log("useEffect triggered with initialResume:", initialResume);
    if (initialResume) {
      console.log("Setting resume with initialResume");
      setResume(initialResume);
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
    addSection(type);
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

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">
            {resume.title || "Untitled Resume"}
          </h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Undo className="w-4 h-4 mr-2" />
              Undo
            </Button>
            <Button variant="outline" size="sm">
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
            <Button variant="outline" size="sm">
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddSection("personal")}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Section
                      </Button>
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
