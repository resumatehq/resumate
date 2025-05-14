//ts-ignore
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import resumeApiRequest from '@/apiRequest/resume.api';

// GET a resume by ID
export async function GET(
  request: NextRequest,
  context: { params: { resumeId: string } }
) {
  try {
    const { resumeId } = context.params;

    const cookieStore = await cookies(); 
    const access_token = cookieStore.get('access_token')?.value;

    if (!access_token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await resumeApiRequest.sGetResumeById(resumeId, access_token);
    return NextResponse.json(response.payload); 
  } catch (error: any) {
    console.error(`Error fetching resume ${context.params.resumeId}:`, error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch resume' },
      { status: error.status || 500 }
    );
  }
}


// PUT to update a resume
export async function PUT(
  request: NextRequest,
  { params }: { params: { resumeId: string } }
) {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access_token')?.value;

    if (!access_token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { resumeId } = params;
    const data = await request.json();
    const response = await resumeApiRequest.sUpdateResume(resumeId, data, access_token);
    return NextResponse.json(response.payload);
  } catch (error: any) {
    console.error(`Error updating resume ${params.resumeId}:`, error);
    return NextResponse.json(
      { message: error.message || 'Failed to update resume' },
      { status: error.status || 500 }
    );
  }
}

// DELETE a resume
export async function DELETE(
  request: NextRequest,
  { params }: { params: { resumeId: string } }
) {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access_token')?.value;

    if (!access_token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { resumeId } = params;
    await resumeApiRequest.sDeleteResume(resumeId, access_token);
    return NextResponse.json({ message: 'Resume deleted successfully' });
  } catch (error: any) {
    console.error(`Error deleting resume ${params.resumeId}:`, error);
    return NextResponse.json(
      { message: error.message || 'Failed to delete resume' },
      { status: error.status || 500 }
    );
  }
} 