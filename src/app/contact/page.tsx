import PageHero from '@/components/layout/PageHero';
import { sanityFetch } from '@/lib/sanity';
import { contactInfoQuery } from '@/lib/queries';
import { companyInfo } from '@/lib/seed-data';
import ContactClient from './ContactClient';

export const revalidate = 60;

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with BridgeCraft Engineers & Consultants for your infrastructure and engineering project needs.',
};

export default async function ContactPage() {
  const sanityContact = await sanityFetch<{
    heroImage?: { asset: unknown; alt?: string };
    address: string;
    phone: string;
    email: string;
  }>(contactInfoQuery);

  const contactInfo = {
    address: sanityContact?.address ?? companyInfo.address,
    phone: sanityContact?.phone ?? companyInfo.phone,
    email: sanityContact?.email ?? companyInfo.email,
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We would love to hear about your project"
        image={sanityContact?.heroImage}
      />

      <ContactClient contactInfo={contactInfo} />
    </>
  );
}
