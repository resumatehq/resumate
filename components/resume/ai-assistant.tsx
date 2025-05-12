"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Send,
  Copy,
  CheckCheck,
  Loader2,
  Lightbulb,
  FileText,
  Target,
  Briefcase,
  Badge,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { IResume } from "@/schemas/resume.schema";
import {
  getJobDescriptionSuggestions,
  getContentQualityAssessment,
  getATSOptimization,
  getIndustrySkillSuggestions,
  getJobMatchAnalysis,
  getOptimizedResume,
} from "@/utils/resume-ai-assistant";
import { useResume } from "@/context/resume-context";

interface ResumeAIAssistantProps {
  resume: IResume;
}

export function ResumeAIAssistant({ resume }: ResumeAIAssistantProps) {
  const { setResume } = useResume();
  const [activeTab, setActiveTab] = useState("job-descriptions");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [yearsExperience, setYearsExperience] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleJobDescriptionSuggestions = async () => {
    if (!jobTitle) {
      toast({
        title: "Job title required",
        description: "Please enter a job title to get suggestions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const suggestions = await getJobDescriptionSuggestions(resume, jobTitle);
      setResult(suggestions);
    } catch (error) {
      console.error("Error getting job description suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to get job description suggestions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentQualityAssessment = async () => {
    setIsLoading(true);
    try {
      const assessment = await getContentQualityAssessment(resume);
      setResult(assessment);
    } catch (error) {
      console.error("Error getting content quality assessment:", error);
      toast({
        title: "Error",
        description: "Failed to get content quality assessment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleATSOptimization = async () => {
    if (!jobDescription) {
      toast({
        title: "Job description required",
        description: "Please enter a job description to optimize for",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const optimization = await getATSOptimization(resume, jobDescription);
      setResult(optimization);
    } catch (error) {
      console.error("Error getting ATS optimization:", error);
      toast({
        title: "Error",
        description: "Failed to get ATS optimization suggestions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoOptimize = async () => {
    if (!jobDescription) {
      toast({
        title: "Job description required",
        description: "Please enter a job description to optimize for",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      toast({
        title: "Optimizing Resume",
        description:
          "AI is optimizing your resume based on the job description. This may take a moment...",
      });

      const optimizedResume = await getOptimizedResume(resume, jobDescription);

      // Update the resume with the optimized version
      setResume(optimizedResume);

      setResult(
        "Resume has been automatically optimized based on the job description. The changes have been applied to your resume."
      );

      toast({
        title: "Resume Optimized",
        description:
          "Your resume has been automatically optimized for the target job!",
      });
    } catch (error) {
      console.error("Error auto-optimizing resume:", error);
      toast({
        title: "Error",
        description: "Failed to optimize resume automatically",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleIndustrySkillSuggestions = async () => {
    if (!industry) {
      toast({
        title: "Industry required",
        description: "Please enter an industry to get skill suggestions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const suggestions = await getIndustrySkillSuggestions(
        industry,
        parseInt(yearsExperience) || 0
      );
      setResult(suggestions);
    } catch (error) {
      console.error("Error getting industry skill suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to get industry skill suggestions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobMatchAnalysis = async () => {
    if (!jobDescription) {
      toast({
        title: "Job description required",
        description: "Please enter a job description to analyze match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const analysis = await getJobMatchAnalysis(resume, jobDescription);
      setResult(analysis);
    } catch (error) {
      console.error("Error getting job match analysis:", error);
      toast({
        title: "Error",
        description: "Failed to get job match analysis",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setResult("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "job-descriptions":
        return <FileText className="h-4 w-4 mr-1.5" />;
      case "content-quality":
        return <Lightbulb className="h-4 w-4 mr-1.5" />;
      case "ats-optimization":
        return <Target className="h-4 w-4 mr-1.5" />;
      case "skills-suggestions":
        return <Badge className="h-4 w-4 mr-1.5" />;
      case "job-match":
        return <Briefcase className="h-4 w-4 mr-1.5" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <CardTitle className="flex items-center text-indigo-700">
          <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
          Resume AI Assistant
        </CardTitle>
        <CardDescription>
          Get AI-powered suggestions to improve your resume
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="job-descriptions" onValueChange={handleTabChange}>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {/* First row - 3 tabs */}
            <TabsList className="rounded-lg grid grid-cols-3 p-1 bg-slate-100">
              <TabsTrigger value="job-descriptions">
                {getTabIcon("job-descriptions")}
                <span className="hidden sm:inline">Job Descriptions</span>
                <span className="sm:hidden">Jobs</span>
              </TabsTrigger>
              <TabsTrigger value="content-quality">
                {getTabIcon("content-quality")}
                <span className="hidden sm:inline">Content Quality</span>
                <span className="sm:hidden">Quality</span>
              </TabsTrigger>
              <TabsTrigger value="ats-optimization">
                {getTabIcon("ats-optimization")}
                <span className="hidden sm:inline">ATS Optimization</span>
                <span className="sm:hidden">ATS</span>
              </TabsTrigger>
            </TabsList>

            {/* Second row - 2 tabs */}
            <TabsList className="rounded-lg grid grid-cols-2 p-1 bg-slate-100 mx-auto w-full max-w-[400px]">
              <TabsTrigger value="skills-suggestions">
                {getTabIcon("skills-suggestions")}
                <span className="hidden sm:inline">Skills Suggestions</span>
                <span className="sm:hidden">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="job-match">
                {getTabIcon("job-match")}
                <span className="hidden sm:inline">Job Match</span>
                <span className="sm:hidden">Match</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-slate-50 p-3 sm:p-6 rounded-lg mb-6">
            <TabsContent value="job-descriptions">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="job-title" className="text-sm font-medium">
                    Job Title
                  </Label>
                  <Input
                    id="job-title"
                    placeholder="e.g. Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  onClick={handleJobDescriptionSuggestions}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="sm:inline hidden">
                        Getting suggestions...
                      </span>
                      <span className="sm:hidden">Loading...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      <span className="sm:inline hidden">
                        Get Professional Job Descriptions
                      </span>
                      <span className="sm:hidden">Get Job Descriptions</span>
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="content-quality">
              <div className="space-y-4">
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs sm:text-sm text-blue-700 flex items-start">
                    <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                    Our AI will analyze your resume content quality and provide
                    specific improvement suggestions to make your resume stand
                    out.
                  </p>
                </div>
                <Button
                  onClick={handleContentQualityAssessment}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="sm:inline hidden">
                        Analyzing content...
                      </span>
                      <span className="sm:hidden">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      <span>Analyze Content Quality</span>
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="ats-optimization">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="job-description"
                    className="text-sm font-medium"
                  >
                    Job Description
                  </Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here..."
                    className="h-32 mt-1"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleATSOptimization}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Target className="mr-2 h-4 w-4" />
                        Analyze for ATS
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleAutoOptimize}
                    disabled={isLoading}
                    variant="default"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Auto-Optimize Resume
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills-suggestions">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry" className="text-sm font-medium">
                      Industry
                    </Label>
                    <Input
                      id="industry"
                      placeholder="e.g. Software Development"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="years-experience"
                      className="text-sm font-medium"
                    >
                      Years of Experience
                    </Label>
                    <Input
                      id="years-experience"
                      type="number"
                      min="0"
                      placeholder="e.g. 5"
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleIndustrySkillSuggestions}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting suggestions...
                    </>
                  ) : (
                    <>
                      <Badge className="mr-2 h-4 w-4" />
                      Get Industry Skills Suggestions
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="job-match">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="job-match-description"
                    className="text-sm font-medium"
                  >
                    Job Description
                  </Label>
                  <Textarea
                    id="job-match-description"
                    placeholder="Paste the job description here..."
                    className="h-32 mt-1"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleJobMatchAnalysis}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing match...
                    </>
                  ) : (
                    <>
                      <Briefcase className="mr-2 h-4 w-4" />
                      Analyze Job Match
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
                <p className="text-gray-600 text-sm">
                  AI is working on your request...
                </p>
              </div>
            </div>
          )}

          {result && !isLoading && (
            <div className="mt-2 bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="flex justify-between items-center px-3 sm:px-4 py-2 bg-slate-50 border-b">
                <Label className="font-medium text-xs sm:text-sm text-slate-700">
                  AI Assistant Results
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-7 sm:h-8 px-2 sm:px-3"
                >
                  {copied ? (
                    <CheckCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="p-3 sm:p-4 whitespace-pre-wrap text-xs sm:text-sm bg-white max-h-[350px] overflow-y-auto">
                {result}
              </div>
            </div>
          )}
        </Tabs>
      </CardContent>
      <CardFooter className="bg-slate-50 border-t px-6 py-4">
        <p className="text-xs text-slate-500 w-full text-center">
          Powered by Mastra AI - Improve your resume with AI-powered suggestions
        </p>
      </CardFooter>
    </Card>
  );
}
