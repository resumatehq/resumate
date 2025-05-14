import { cookies } from 'next/headers';
import { NextResponse } from "next/server";
import resumeApiRequest from '@/apiRequest/resume.api';

export async function POST(
  request: Request,
  { params }: { params: { resumeId: string } }
) {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access_token')?.value;

    if (!access_token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { resumeId } = params;
    const body = await request.json();
    const { password, expiryDays, allowDownload, allowFeedback, allowEmbed } = body;

    const response = await resumeApiRequest.createShareResume(
      resumeId,
      {
        password,
        expiresAt: new Date(Date.now() + (expiryDays || 30) * 24 * 60 * 60 * 1000).toISOString(),
        allowDownload,
        allowFeedback,
        allowEmbed,
      }
    );

    return NextResponse.json(response.payload);
  } catch (error: any) {
    console.error("Error sharing resume:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: error.status || 500 }
    );
  }
} 