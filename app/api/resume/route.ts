import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import resumeApiRequest from '@/apiRequest/resume.api';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access_token')?.value;

    if (!access_token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const response = await resumeApiRequest.sGetResumes(access_token);
    
    return NextResponse.json(response.payload);
  } catch (error: any) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch resumes' },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access_token')?.value;

    if (!access_token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const response = await resumeApiRequest.sCreateResume(data, access_token);
    return NextResponse.json(response.payload);
  } catch (error: any) {
    console.error('Error creating resume:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to create resume' },
      { status: error.status || 500 }
    );
  }
} 