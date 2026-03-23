import { groq } from 'next-sanity';

// Homepage (singleton)
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroHeading,
    heroSubheading,
    heroImage { asset->, alt },
    introText,
    stats[] { label, value },
    ctaText,
    ctaLink
  }
`;

// About - Introduction (singleton)
export const aboutIntroductionQuery = groq`
  *[_type == "aboutIntroduction"][0] {
    heroImage { asset->, alt },
    content,
    image
  }
`;

// Vision & Values (singleton)
export const visionValuesQuery = groq`
  *[_type == "visionValues"][0] {
    heroImage { asset->, alt },
    visionText,
    values[] { title, description, icon }
  }
`;

// Mission Statement (singleton)
export const missionStatementQuery = groq`
  *[_type == "missionStatement"][0] {
    heroImage { asset->, alt },
    content
  }
`;

// Corporate Strategy (singleton)
export const corporateStrategyQuery = groq`
  *[_type == "corporateStrategy"][0] {
    heroImage { asset->, alt },
    pillars[] { title, description, bulletPoints }
  }
`;

// Team Members
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    designation,
    photo,
    bio,
    order
  }
`;

// Services - All
export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    iconImage { asset->, alt },
    icon,
    keyCapabilities
  }
`;

// Service - By Slug
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    heroImage { asset->, alt },
    icon,
    keyCapabilities
  }
`;

// Projects - All
export const allProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    client,
    location,
    description,
    images,
    featured,
    sector-> { name, slug }
  }
`;

// Project - By Slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    authority,
    location,
    scope,
    description,
    keyHighlights,
    heroImage { asset->, alt },
    images,
    featured,
    sector-> { name, slug }
  }
`;

// Featured Projects
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    client,
    location,
    description,
    images,
    sector-> { name, slug }
  }
`;

// Sectors
export const allSectorsQuery = groq`
  *[_type == "sector"] {
    _id,
    name,
    slug,
    description,
    icon
  }
`;

// Clients
export const allClientsQuery = groq`
  *[_type == "client"] | order(order asc) {
    _id,
    name,
    logo,
    websiteUrl,
    order
  }
`;

// Brochure (singleton)
export const brochureQuery = groq`
  *[_type == "brochure"][0] {
    heroImage { asset->, alt },
    title,
    description,
    "fileUrl": file.asset->url
  }
`;

// Job Openings
export const activeJobOpeningsQuery = groq`
  *[_type == "jobOpening" && isActive == true] {
    _id,
    title,
    department,
    location,
    type,
    description,
    heroImage { asset->, alt }
  }
`;

export const allJobOpeningsQuery = groq`
  *[_type == "jobOpening"] {
    _id,
    title,
    department,
    location,
    type,
    description,
    isActive,
    heroImage { asset->, alt }
  }
`;

// Contact Info (singleton)
export const contactInfoQuery = groq`
  *[_type == "contactInfo"][0] {
    heroImage { asset->, alt },
    address,
    phone,
    email,
    mapLat,
    mapLng
  }
`;

// Site Settings (singleton)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    logo,
    tagline,
    socialLinks[] { platform, url }
  }
`;
