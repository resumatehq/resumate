"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Save,
  Download,
  Share2,
  ArrowLeft,
  Sparkles,
  Wand2,
} from "lucide-react";
import { PersonalInfoForm } from "@/components/resume/personal-info-form";
import { ExperienceForm } from "@/components/resume/experience-form";
import { EducationForm } from "@/components/resume/education-form";
import { SkillsForm } from "@/components/resume/skills-form";
import { ResumePreview } from "@/components/resume/resume-preview";
import { AiAssistant } from "@/components/resume/ai-assistant";
import { TemplateSelector } from "@/components/resume/template-selector";
import { AtsScanner } from "@/components/resume/ats-scanner";
import { CertificationsForm } from "@/components/resume/certifications-form";
import { AwardsForm } from "@/components/resume/awards-form";
import { ProjectsForm } from "@/components/resume/projects-form";
import { useGetResumeByIdQuery } from "@/queries/useResume";
import { ResumeProvider, ResumeData } from "@/context/resume-context";

export default function EditResumePage() {
  const params = useParams();
  const resumeId = params.id as string;
  const [activeTab, setActiveTab] = useState("personal");
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");

  const { data: resumeResponse, isLoading } = useGetResumeByIdQuery(resumeId);

  // Transform API data into initial form data
  const getInitialFormData = () => {
    const resume = resumeResponse?.data?.resume;
    if (!resume?.sections) return null;

    const sections = resume.sections;
    const initialData: Partial<ResumeData> = {
      personal: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        summary: "",
      },
      experience: [],
      education: [],
      skills: {
        technical: [],
        soft: [],
        languages: [],
      },
      projects: [],
      certifications: [],
      awards: [],
    };

    sections.forEach((section: any) => {
      switch (section.type) {
        case "personal":
          if (section.content) {
            const personalData = section.content;
            initialData.personal = {
              fullName: personalData.fullName || "",
              jobTitle: personalData.jobTitle || "",
              email: personalData.email || "",
              phone: personalData.phone || "",
              location: personalData.location || "",
              website: personalData.website || "",
              linkedin: personalData.socialLinks?.linkedin || "",
              summary: personalData.professionalSummary || "",
            };
          }
          break;
        case "experience":
          if (Array.isArray(section.content)) {
            initialData.experience = section.content.map((exp: any) => ({
              id: exp._id || Math.random().toString(),
              company: exp.company || "",
              position: exp.position || "",
              location: exp.location || "",
              startDate: exp.startDate
                ? new Date(exp.startDate).toISOString().split("T")[0]
                : "",
              endDate: exp.endDate
                ? new Date(exp.endDate).toISOString().split("T")[0]
                : "",
              current: !exp.endDate,
              description: exp.description || "",
            }));
          }
          break;
        case "education":
          if (Array.isArray(section.content)) {
            initialData.education = section.content.map((edu: any) => ({
              id: edu._id || Math.random().toString(),
              institution: edu.institution || "",
              degree: edu.degree || "",
              fieldOfStudy: edu.fieldOfStudy || "",
              location: edu.location || "",
              startDate: edu.startDate
                ? new Date(edu.startDate).toISOString().split("T")[0]
                : "",
              endDate: edu.endDate
                ? new Date(edu.endDate).toISOString().split("T")[0]
                : "",
              description: edu.description || "",
            }));
          }
          break;
        case "skills":
          if (section.content) {
            const skillsData = section.content;
            initialData.skills = {
              technical: skillsData.technical || [],
              soft: skillsData.soft || [],
              languages: skillsData.languages || [],
            };
          }
          break;
        case "projects":
          if (Array.isArray(section.content)) {
            initialData.projects = section.content.map((proj: any) => ({
              id: proj._id || Math.random().toString(),
              title: proj.title || "",
              description: proj.description || "",
              startDate: proj.startDate
                ? new Date(proj.startDate).toISOString().split("T")[0]
                : "",
              endDate: proj.endDate
                ? new Date(proj.endDate).toISOString().split("T")[0]
                : "",
              current: !proj.endDate,
              url: proj.url || "",
              technologies: proj.technologies || [],
            }));
          }
          break;
        case "certifications":
          if (Array.isArray(section.content)) {
            initialData.certifications = section.content.map((cert: any) => ({
              id: cert._id || Math.random().toString(),
              name: cert.name || "",
              issuer: cert.issuingOrganization || "",
              date: cert.issueDate
                ? new Date(cert.issueDate).toISOString().split("T")[0]
                : "",
              url: cert.credentialUrl || "",
              description: cert.description || "",
            }));
          }
          break;
        case "awards":
          if (Array.isArray(section.content)) {
            initialData.awards = section.content.map((award: any) => ({
              id: award._id || Math.random().toString(),
              title: award.title || "",
              issuer: award.issuingOrganization || "",
              date: award.dateReceived
                ? new Date(award.dateReceived).toISOString().split("T")[0]
                : "",
              description: award.description || "",
            }));
          }
          break;
      }
    });

    return initialData;
  };

  useEffect(() => {
    const resume = resumeResponse?.data?.resume;
    if (resume?.templateId) {
      setSelectedTemplate(resume.templateId);
    }
  }, [resumeResponse]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  const initialData = getInitialFormData();

  return (
    <ResumeProvider initialData={initialData}>
      <div className="min-h-screen bg-muted/30">
        <header className="bg-background border-b sticky top-0 z-10">
          <div className="container mx-auto py-3 px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link
                href="/app/documents/resumes"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back to Resumes</span>
              </Link>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <FileText className="h-5 w-5 text-primary" />
              <span>Edit Resume</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
              <Button size="sm" className="gap-1">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto py-4 px-2">
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="bg-background rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Edit Your Resume</h1>
                  <Button
                    variant={showAiAssistant ? "default" : "outline"}
                    onClick={() => setShowAiAssistant(!showAiAssistant)}
                    className="gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    AI Assistant
                  </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-8 mb-6">
                    <TabsTrigger value="personal" className="gap-2">
                      <span className="hidden sm:inline">Personal</span>
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="gap-2">
                      <span className="hidden sm:inline">Experience</span>
                    </TabsTrigger>
                    <TabsTrigger value="education" className="gap-2">
                      <span className="hidden sm:inline">Education</span>
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="gap-2">
                      <span className="hidden sm:inline">Skills</span>
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="gap-2">
                      <span className="hidden sm:inline">Projects</span>
                    </TabsTrigger>
                    <TabsTrigger value="certifications" className="gap-2">
                      <span className="hidden sm:inline">Certs</span>
                    </TabsTrigger>
                    <TabsTrigger value="awards" className="gap-2">
                      <span className="hidden sm:inline">Awards</span>
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="gap-2">
                      <span className="hidden sm:inline">Templates</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal">
                    <PersonalInfoForm />
                  </TabsContent>

                  <TabsContent value="experience">
                    <ExperienceForm />
                  </TabsContent>

                  <TabsContent value="education">
                    <EducationForm />
                  </TabsContent>

                  <TabsContent value="skills">
                    <SkillsForm />
                  </TabsContent>

                  <TabsContent value="projects">
                    <ProjectsForm />
                  </TabsContent>

                  <TabsContent value="certifications">
                    <CertificationsForm />
                  </TabsContent>

                  <TabsContent value="awards">
                    <AwardsForm />
                  </TabsContent>

                  <TabsContent value="templates">
                    <TemplateSelector
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={setSelectedTemplate}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {showAiAssistant && (
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <AiAssistant />
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Wand2 className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">ATS Optimization</h2>
                  </div>
                  <AtsScanner />
                </CardContent>
              </Card>
            </div>

            <div className="sticky top-[73px] self-start">
              <div className="bg-background rounded-lg shadow-sm p-3">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold">Preview</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-muted rounded border">
                  <ResumePreview template={selectedTemplate} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ResumeProvider>
  );
}
