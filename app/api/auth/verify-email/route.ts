import { NextResponse } from 'next/server';
import http from '@/lib/http';
import { HttpError } from '@/lib/http';

export async function POST(request: Request) {
    const body = await request.json();
    const { token } = body;

    if (!token) {
        return NextResponse.json(
            {
                message: 'Token is required',
            },
            {
                status: 400,
            }
        );
    }

    try {
        const response = await http.post('auth/verify-email', { token });

        return NextResponse.json(response.payload);
    } catch (error) {
        if (error instanceof HttpError) {
            return NextResponse.json(error.payload, {
                status: error.status,
            });
        } else {
            return NextResponse.json(
                {
                    message: 'Email verification failed',
                },
                {
                    status: 500,
                }
            );
        }
    }
} 