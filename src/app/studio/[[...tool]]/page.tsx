'use client';

/**
 * Next.js Sanity Studio route.
 * Access at /studio to manage content.
 *
 * To enable, create a sanity.config.ts at the project root
 * and set your NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.
 */

import { NextStudio } from 'next-sanity/studio';
import sanityConfig from '@/sanity/sanity.config';

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'your_project_id') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-lg bg-white p-8 shadow text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Sanity Studio
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            Set your <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono">NEXT_PUBLIC_SANITY_PROJECT_ID</code> environment variable to enable the studio.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={sanityConfig} />;
}
