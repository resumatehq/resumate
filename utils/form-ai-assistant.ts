import { IPersonalInfoContent, IResume, IResumeSection } from "@/schemas/resume.schema";

/**
 * Helper function to make AI API calls
 * @param prompt The prompt to send to the AI
 * @returns The AI response
 */
async function callMastraAPI(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/mastra', {
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
    
    if (!data.result) {
      console.error('Invalid API response:', data);
      throw new Error('Invalid API response: Missing result field');
    }
    
    return data.result;
  } catch (error) {
    console.error('Error calling Mastra API:', error);
    throw error;
  }
}

/**
 * Generate a professional summary based on the user's personal information
 * @param personalInfo Personal information content
 * @returns Generated professional summary
 */
export async function generateProfessionalSummary(personalInfo: IPersonalInfoContent): Promise<string> {
  try {
    if (!personalInfo.fullName) {
      return "Please provide your full name to generate a more personalized summary.";
    }

    const prompt = `
      Generate a professional summary for a person with the following information:
      - Name: ${personalInfo.fullName}
      - Job Title: ${personalInfo.jobTilte || "professional"}
      
      The summary should be:
      - Concise (3-4 sentences)
      - Professional and achievement-oriented
      - Highlight their value proposition as a ${personalInfo.jobTilte || "professional"}
      - Tailored for their resume
      - Include no labels or titles like "Professional Summary:" in your response
      - Start directly with the content
      
      Provide ONLY the summary text with no additional formatting, explanations, or labels.
    `;
    
    let result = await callMastraAPI(prompt);
    
    // Clean up result by removing headings like "Professional Summary:"
    result = result.replace(/^(Professional\s+Summary:?\s*)/i, '');
    result = result.replace(/^(Summary:?\s*)/i, '');
    
    // Trim extra whitespace
    result = result.trim();
    
    if (!result || result.length < 10) {
      throw new Error("Generated summary is too short or empty");
    }
    
    return result;
  } catch (error) {
    console.error("Error generating professional summary:", error);
    if (error instanceof Error) {
      return `Unable to generate summary: ${error.message}. Please try again later.`;
    }
    return "Error generating summary. Please check your network connection and try again.";
  }
}

/**
 * Generate suggestions for job descriptions
 * @param resume The current resume data
 * @param jobTitle Job title to generate descriptions for
 * @returns Array of suggested job descriptions
 */
export async function generateJobDescriptions(resume: IResume, jobTitle: string): Promise<string[]> {
  try {
    const prompt = `
      Create 3 professional job description bullet points for a ${jobTitle} role.
      
      Make them:
      - Achievement-oriented with quantifiable results
      - Use strong action verbs
      - Include specific skills and technologies where relevant
      - Highlight impact and outcomes
      
      Format each bullet point as a separate entry in a list without numbers or bullet points.
    `;
    
    const result = await callMastraAPI(prompt);
    
    // Split the response into separate lines and filter out empty lines
    const descriptions = result
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0);
    
    // Return at most 3 descriptions
    return descriptions.slice(0, 3);
  } catch (error) {
    console.error("Error generating job descriptions:", error);
    return ["Error generating job descriptions. Please try again."];
  }
}

/**
 * Generate skills suggestions based on job title/industry
 * @param jobTitle Target job title
 * @returns Array of suggested skills
 */
export async function generateSkillsSuggestions(jobTitle: string): Promise<string[]> {
  try {
    const prompt = `
      Generate a list of 10 relevant skills for a ${jobTitle} role.
      
      Include:
      - Technical skills specific to the role
      - Soft skills that would be valuable
      - Any tools or technologies that are commonly used
      
      Format each skill as a separate entry in a list without numbers or bullet points.
    `;
    
    const result = await callMastraAPI(prompt);
    
    // Split the response into separate lines and filter out empty lines
    const skills = result
      .split("\n")
      .map((line: string) => line.trim().replace(/^[-•*]\s*/, '')) // Remove any bullet point characters
      .filter((line: string) => line.length > 0);
    
    return skills;
  } catch (error) {
    console.error("Error generating skills suggestions:", error);
    return ["Error generating skills. Please try again."];
  }
}

/**
 * Suggest education descriptions and achievements
 * @param institution Institution name
 * @param degree Degree being pursued/completed
 * @returns Array of suggested achievements
 */
export async function generateEducationAchievements(institution: string, degree: string): Promise<string[]> {
  try {
    const prompt = `
      Generate 5 potential educational achievements for a student who attended ${institution} and studied for a ${degree}.
      
      Include achievements like:
      - Academic honors or awards
      - Projects or thesis topics
      - Leadership positions
      - Extracurricular activities
      - Relevant coursework or certifications
      
      Format each achievement as a separate entry in a list without numbers or bullet points.
    `;
    
    const result = await callMastraAPI(prompt);
    
    // Split the response into separate lines and filter out empty lines
    const achievements = result
      .split("\n")
      .map((line: string) => line.trim().replace(/^[-•*]\s*/, '')) // Remove any bullet point characters
      .filter((line: string) => line.length > 0);
    
    return achievements.slice(0, 5);
  } catch (error) {
    console.error("Error generating education achievements:", error);
    return ["Error generating education achievements. Please try again."];
  }
}

// Helper functions for generating random content
function getRandomSummary(jobTitle: string): string {
  const summaries = [
    `Results-driven ${jobTitle} with ${getRandomNumber(3, 10)}+ years of experience delivering high-quality solutions. Passionate about leveraging technology to solve complex problems and drive business value. Proven track record of leading teams and implementing innovative solutions that enhance efficiency and user experience.`,
    
    `Dedicated ${jobTitle} with a strong background in ${getRandomTechnology()} and ${getRandomTechnology()}. Committed to continuous learning and staying current with industry trends. Skilled in collaborating with cross-functional teams to deliver projects on time and within budget.`,
    
    `Creative and analytical ${jobTitle} with expertise in ${getRandomTechnology()} and ${getRandomTechnology()}. Demonstrated success in optimizing processes and driving innovation. Excellent communication skills with the ability to translate complex technical concepts to non-technical stakeholders.`,
    
    `Accomplished ${jobTitle} with a proven history of delivering impactful solutions across diverse industries. Strong problem-solving abilities and attention to detail. Adept at balancing technical excellence with business requirements to create scalable, maintainable systems.`
  ];
  
  return summaries[Math.floor(Math.random() * summaries.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTechnology(): string {
  const technologies = [
    "React", "Angular", "Vue.js", "Node.js", "Python", "Java", "AWS", "Azure",
    "Docker", "Kubernetes", "GraphQL", "RESTful APIs", "Microservices", "Serverless",
    "Machine Learning", "Data Analytics", "Cloud Computing", "DevOps", "CI/CD",
    "Blockchain", "IoT", "Big Data", "Artificial Intelligence"
  ];
  
  return technologies[Math.floor(Math.random() * technologies.length)];
}

function getRandomHonors(): string {
  const honors = ["cum laude", "magna cum laude", "summa cum laude", "high", "highest", "departmental"];
  return honors[Math.floor(Math.random() * honors.length)];
}

function getRandomGPA(): string {
  const gpa = (3 + Math.random()).toFixed(1);
  return gpa;
}

function getRandomScholarship(): string {
  const scholarships = [
    "Merit-based", "Presidential", "Dean's", "Excellence", "Achievement", "Leadership",
    "STEM", "Research", "Academic Excellence", "Innovation"
  ];
  
  return scholarships[Math.floor(Math.random() * scholarships.length)];
}

function getRandomThesisTopic(degree: string): string {
  const topics = [
    "Implementing Neural Networks for Predictive Analytics",
    "Sustainable Business Practices in Modern Corporations",
    "The Impact of Social Media on Consumer Behavior",
    "Advanced Algorithms for Data Compression",
    "Renewable Energy Solutions for Urban Environments",
    "User Experience Design in Mobile Applications",
    "Blockchain Applications in Supply Chain Management",
    "The Psychology of Leadership in Virtual Teams",
    "Quantum Computing Applications in Cryptography",
    "Ethical Considerations in Artificial Intelligence"
  ];
  
  return topics[Math.floor(Math.random() * topics.length)];
} 