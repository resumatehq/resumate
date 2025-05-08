import { getAccessToken } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import resumeApiRequest from '@/apiRequest/resume.api';

export async function POST(request: NextRequest) {
  try {
    const token = getAccessToken();
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    // Assuming we need to add an empty template creation API in the backend
    // For now, we can just use the regular create API
    const response = await resumeApiRequest.sCreateResume(data, token);
    return NextResponse.json(response.payload);
  } catch (error: any) {
    console.error('Error creating empty resume:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to create empty resume' },
      { status: error.status || 500 }
    );
  }
} 