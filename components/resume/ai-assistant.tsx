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
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Send, Copy, CheckCheck } from "lucide-react";
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resume AI Assistant</CardTitle>
        <CardDescription>
          Get AI-powered suggestions to improve your resume
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="job-descriptions" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="job-descriptions">Job Descriptions</TabsTrigger>
            <TabsTrigger value="content-quality">Content Quality</TabsTrigger>
            <TabsTrigger value="ats-optimization">ATS Optimization</TabsTrigger>
            <TabsTrigger value="skills-suggestions">
              Skills Suggestions
            </TabsTrigger>
            <TabsTrigger value="job-match">Job Match</TabsTrigger>
          </TabsList>

          <TabsContent value="job-descriptions">
            <div className="space-y-4">
              <div>
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  placeholder="e.g. Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <Button
                onClick={handleJobDescriptionSuggestions}
                disabled={isLoading}
              >
                {isLoading
                  ? "Getting suggestions..."
                  : "Get Professional Job Description Suggestions"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="content-quality">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Get an assessment of your resume content quality and suggestions
                for improvement.
              </p>
              <Button
                onClick={handleContentQualityAssessment}
                disabled={isLoading}
              >
                {isLoading ? "Analyzing content..." : "Analyze Content Quality"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ats-optimization">
            <div className="space-y-4">
              <div>
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the job description here..."
                  className="h-32"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleATSOptimization} disabled={isLoading}>
                  {isLoading ? "Optimizing..." : "Analyze for ATS"}
                </Button>
                <Button
                  onClick={handleAutoOptimize}
                  disabled={isLoading}
                  variant="default"
                >
                  {isLoading ? "Optimizing..." : "Auto-Optimize Resume"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills-suggestions">
            <div className="space-y-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g. Software Development"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="years-experience">Years of Experience</Label>
                <Input
                  id="years-experience"
                  type="number"
                  min="0"
                  placeholder="e.g. 5"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                />
              </div>
              <Button
                onClick={handleIndustrySkillSuggestions}
                disabled={isLoading}
              >
                {isLoading
                  ? "Getting suggestions..."
                  : "Get Industry Skills Suggestions"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="job-match">
            <div className="space-y-4">
              <div>
                <Label htmlFor="job-match-description">Job Description</Label>
                <Textarea
                  id="job-match-description"
                  placeholder="Paste the job description here..."
                  className="h-32"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <Button onClick={handleJobMatchAnalysis} disabled={isLoading}>
                {isLoading ? "Analyzing match..." : "Analyze Job Match"}
              </Button>
            </div>
          </TabsContent>

          {result && (
            <div className="mt-6">
              <Label htmlFor="result">AI Assistant Results</Label>
              <div className="p-4 border rounded-md bg-gray-50 mt-2 whitespace-pre-wrap">
                {result}
              </div>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
