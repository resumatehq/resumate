import { NextRequest, NextResponse } from 'next/server';
import { mastra } from '@/utils/mastra';
import myAgent from '@/utils/mastra/agents';

export async function POST(request: NextRequest) {
  console.log('Mastra API route called');
  
  try {
    const body = await request.json();
    const { prompt } = body;

    console.log('Received prompt:', prompt ? `${prompt.substring(0, 50)}...` : 'undefined');

    if (!prompt) {
      console.error('Missing prompt in request');
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    console.log('Calling Mastra agent...');
    const response = await myAgent.generate([
      { role: "user", content: prompt }
    ]);
    console.log('Mastra response received:', response ? 'valid' : 'undefined');

    if (!response || !response.text) {
      console.error('Invalid Mastra response:', response);
      return NextResponse.json(
        { error: 'Invalid AI response format' },
        { status: 500 }
      );
    }

    console.log('Returning successful response with content length:', response.text.length);
    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error('Mastra API Error:', error);
    
    // Detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process AI request' },
      { status: 500 }
    );
  }
} 