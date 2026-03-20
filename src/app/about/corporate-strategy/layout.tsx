import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Strategy',
  description:
    'Discover the four strategic pillars that guide BridgeCraft Engineers: Technical Excellence, Client-Centric Approach, Sustainable Growth, and Innovation.',
};

export default function CorporateStrategyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
