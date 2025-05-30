import { NextRequest, NextResponse } from 'next/server';
import resumeApiRequest from '@/apiRequest/resume.api';

export async function GET(
  request: NextRequest,
  context: { params: { shareableLink: string } }
) {
  try {
    const { shareableLink } = await Promise.resolve(context.params);

    const response = await resumeApiRequest.sGetSharedResume(shareableLink);
    return NextResponse.json(response.payload);
  } catch (error: any) {
    console.error(`Error fetching shared resume:`, error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch shared resume' },
      { status: error.status || 500 }
    );
  }
}
