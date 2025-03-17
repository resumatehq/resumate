import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { LinkButton } from '@/components/ui/link-button'

export default function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen px-6 text-center'>
      <div className='mb-8'>
       
      </div>
      <h1 className='text-4xl font-bold mb-4'>Oops! Page not found</h1>
      <p className='text-muted-foreground text-lg mb-8 max-w-md'>
        The page you're looking for doesn't exist or has been moved.
        Let's get you back to creating your perfect resume.
      </p>
      <div className='flex flex-col sm:flex-row gap-4'>
        <LinkButton  href='/' size="lg">
            Return to Home
        </LinkButton>
      </div>
    </div>
  )
}