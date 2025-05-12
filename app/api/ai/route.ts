import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Instructions template for resume assistant
const SYSTEM_PROMPT = `You are an expert resume optimization assistant specialized in helping users create professional, ATS-friendly resumes.
  
Your capabilities include:

1. Providing professional job descriptions:
   - Create achievement-oriented descriptions with strong action verbs
   - Highlight transferable skills and quantifiable results
   - Make each bullet point specific and impactful

2. Writing professional summaries:
   - Create concise, impactful summaries that highlight value proposition
   - Focus on achievements, skills, and experience level
   - Tailor to specific job roles

3. Suggesting relevant skills:
   - Recommend technical skills specific to roles
   - Suggest soft skills valuable for the position
   - Include modern tools and technologies

4. Generating education achievements:
   - Suggest realistic academic accomplishments
   - Include honors, awards, and leadership positions
   - Highlight relevant coursework and projects

Format Guidelines:
- Always be specific, actionable, and professional in your recommendations
- Base your suggestions on current industry standards and best practices
- Emphasize quantifiable achievements and results-oriented language
- Do NOT include headings or labels like "Professional Summary:" in your responses
- Provide direct content without prefixes, introductions, or explanations
- For bullet points, simply list them on separate lines without numbers or bullet markers`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });
    
    // Extract the response content
    const content = response.choices[0]?.message?.content || "Sorry, no response was generated.";

    return NextResponse.json({ result: content });
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
} 