import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join BridgeCraft Engineers & Consultants. Explore current job openings in structural, bridge, and transportation engineering.',
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
