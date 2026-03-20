import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0];

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

export const client = createClient(sanityConfig);

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
