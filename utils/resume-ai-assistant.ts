import { IResume } from "@/schemas/resume.schema";

/**
 * Resume AI Assistant 
 * This assistant provides resume optimization features including:
 * - Professional job description suggestions
 * - Content quality assessment and improvement recommendations
 * - Keyword optimization for ATS systems
 * - Skills suggestions by industry
 * - Job posting match analysis
 */

/**
 * Helper function to make AI API calls
 * @param prompt The prompt to send to the AI
 * @returns The AI response
 */
async function callAI(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error calling AI API:', error);
    throw error;
  }
}

/**
 * Get professional job description suggestions
 * @param resumeData Current resume data
 * @param jobTitle Job title for suggestions
 * @returns Professional job description suggestions
 */
export async function getJobDescriptionSuggestions(resumeData: IResume, jobTitle: string) {
  try {
    const prompt = `
      I need help improving my job descriptions for my resume. My current job title is ${jobTitle}.
      
      Here is a summary of my current resume:
      - Name: ${resumeData.sections.find(s => s.type === 'personal')?.content?.[0]?.fullName || 'Not specified'}
      - Current Position: ${jobTitle}
      
      Please provide professional, achievement-oriented job description suggestions with:
      - Strong action verbs at the beginning of each bullet point
      - Quantifiable results and metrics where possible
      - Focus on impact and achievements rather than responsibilities
      - At least 5-7 bullet points that I can choose from
      
      Format your response with clear sections and bullet points.
    `;
    
    return await callAI(prompt);
  } catch (error) {
    console.error("Error getting job description suggestions:", error);
    return "Failed to get job description suggestions. Please try again later.";
  }
}

/**
 * Assess content quality and provide improvement suggestions
 * @param resumeData Current resume data
 * @returns Assessment and improvement suggestions
 */
export async function getContentQualityAssessment(resumeData: IResume) {
  try {
    // Extract key information from resume for a more concise prompt
    const personalInfo = resumeData.sections.find(s => s.type === 'personal')?.content?.[0];
    const experiences = resumeData.sections.filter(s => s.type === 'experience').map(s => s.content).flat();
    const education = resumeData.sections.filter(s => s.type === 'education').map(s => s.content).flat();
    const skills = resumeData.sections.find(s => s.type === 'skills')?.content?.[0];
    
    const prompt = `
      Please analyze my resume content quality and provide specific improvement suggestions.
      
      Here is a summary of my current resume:
      - Name: ${personalInfo?.fullName || 'Not specified'}
      - Current Position: ${personalInfo?.jobTilte || 'Not specified'}
      - Number of work experiences: ${experiences?.length || 0}
      - Number of education entries: ${education?.length || 0}
      - Has skills section: ${skills ? 'Yes' : 'No'}
      
      Evaluate the following aspects of my resume:
      1. Overall strength of content
      2. Areas that need improvement
      3. Specific suggestions for each section
      4. General recommendations for better impact
      
      Format your response with clear sections and bullet points.
    `;
    
    return await callAI(prompt);
  } catch (error) {
    console.error("Error getting content quality assessment:", error);
    return "Failed to analyze resume content. Please try again later.";
  }
}

/**
 * Optimize resume for ATS keywords
 * @param resumeData Current resume data
 * @param jobDescription Target job description
 * @returns ATS optimization suggestions
 */
export async function getATSOptimization(resumeData: IResume, jobDescription: string) {
  try {
    const prompt = `
      I need to optimize my resume for ATS systems for the following job description:
      
      "${jobDescription}"
      
      Please analyze this job description and my resume to provide ATS optimization suggestions.
      Focus on:
      
      1. Important keywords from the job description that are missing in my resume
      2. Relevant skills and qualifications to add
      3. Optimization strategies to pass ATS filters
      4. Recommendations for section organization and formatting
      
      Format your response with clear sections and bullet points.
    `;
    
    return await callAI(prompt);
  } catch (error) {
    console.error("Error getting ATS optimization:", error);
    return "Failed to get ATS optimization suggestions. Please try again later.";
  }
}

/**
 * Get industry-specific skill suggestions
 * @param industry Target industry
 * @param yearsExperience Years of experience
 * @returns Skill suggestions for the industry
 */
export async function getIndustrySkillSuggestions(industry: string, yearsExperience: number) {
  try {
    const prompt = `
      Please suggest relevant skills for someone in the ${industry} industry with ${yearsExperience} years of experience.
      
      Provide:
      1. Technical skills specific to the ${industry} field
      2. Soft skills that would be valuable for this industry
      3. Current tools and technologies that are in demand
      4. Any certifications or qualifications that would be valuable
      
      Format your response with clear sections for each type of skill.
    `;
    
    return await callAI(prompt);
  } catch (error) {
    console.error("Error getting industry skill suggestions:", error);
    return "Failed to get industry skill suggestions. Please try again later.";
  }
}

/**
 * Analyze resume match against job posting
 * @param resumeData Current resume data
 * @param jobDescription Target job description
 * @returns Match analysis and improvement suggestions
 */
export async function getJobMatchAnalysis(resumeData: IResume, jobDescription: string) {
  try {
    // Extract key information
    const personalInfo = resumeData.sections.find(s => s.type === 'personal')?.content?.[0];
    
    const prompt = `
      Please analyze how well my resume matches the following job description:
      
      "${jobDescription}"
      
      My current position is: ${personalInfo?.jobTilte || 'Not specified'}
      
      Based on this job description and my resume information, please provide:
      1. An estimated match percentage
      2. Key matching qualifications
      3. Important missing qualifications
      4. Specific suggestions to tailor my resume for this job
      
      Format your response with clear sections and bullet points.
    `;
    
    return await callAI(prompt);
  } catch (error) {
    console.error("Error getting job match analysis:", error);
    return "Failed to get job match analysis. Please try again later.";
  }
}

/**
 * Optimize resume content automatically based on provided job description
 * @param resumeData Current resume data
 * @param jobDescription Target job description
 * @returns Optimized resume data with suggested improvements
 */
export async function getOptimizedResume(resumeData: IResume, jobDescription: string) {
  try {
    const prompt = `
      Please help me optimize my resume for the following job description:
      
      "${jobDescription}"
      
      Provide specific recommendations for:
      1. Improving my professional summary
      2. Enhancing job descriptions
      3. Adding or modifying skills
      4. Any other changes to increase my chances of getting this job
      
      Focus on making concrete, actionable suggestions.
    `;
    
    await callAI(prompt);
    
    // In a real implementation, we would parse the AI response and apply changes
    // For now, return the original resume as we'd need more complex logic to apply changes
    return resumeData;
  } catch (error) {
    console.error("Error auto-optimizing resume:", error);
    return resumeData;
  }
} 