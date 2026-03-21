import { createClient, type QueryParams } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0];

/**
 * Whether Sanity is configured with real credentials.
 * When false, pages fall back to seed data.
 */
export const isSanityConfigured =
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

// Only create the client when Sanity is configured to avoid validation errors
export const client = isSanityConfigured
  ? createClient(sanityConfig)
  : (null as unknown as ReturnType<typeof createClient>);

export function urlFor(source: SanityImageSource) {
  if (!isSanityConfigured || !client) {
    throw new Error('Sanity is not configured. Cannot build image URLs.');
  }
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}

/**
 * Fetch data from Sanity. Returns `null` if Sanity is not configured
 * or the query fails, allowing callers to fall back to seed data.
 */
export async function sanityFetch<T>(
  query: string,
  params?: QueryParams,
): Promise<T | null> {
  if (!isSanityConfigured || !client) return null;

  try {
    const data = await client.fetch<T>(query, params ?? {});
    return data;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}
