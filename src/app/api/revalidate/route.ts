import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Sanity webhook revalidation endpoint.
 *
 * Configure a Sanity webhook to POST to /api/revalidate whenever
 * content is published. The body should include { _type: "..." }.
 */

const TYPE_TO_PATHS: Record<string, string[]> = {
  homepage: ['/'],
  service: ['/', '/services'],
  project: ['/', '/projects'],
  client: ['/', '/clients'],
  teamMember: ['/about/team'],
  sector: ['/sectors'],
  aboutIntroduction: ['/about/introduction'],
  visionValues: ['/about/vision-values'],
  missionStatement: ['/about/mission-statement'],
  corporateStrategy: ['/about/corporate-strategy'],
  brochure: ['/brochure'],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { _type } = body;

    if (!_type) {
      return NextResponse.json(
        { revalidated: false, message: 'Missing _type in body' },
        { status: 400 }
      );
    }

    const paths = TYPE_TO_PATHS[_type] ?? ['/'];

    for (const path of paths) {
      revalidatePath(path);
    }

    // Also revalidate individual service/project pages
    if (_type === 'service' && body.slug?.current) {
      revalidatePath(`/services/${body.slug.current}`);
    }
    if (_type === 'project' && body.slug?.current) {
      revalidatePath(`/projects/${body.slug.current}`);
    }

    return NextResponse.json({ revalidated: true, paths });
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, message: 'Invalid request body' },
      { status: 500 }
    );
  }
}
