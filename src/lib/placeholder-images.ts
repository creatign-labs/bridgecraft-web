// Local placeholder images used when Sanity is not configured.
// These map to files in /public/images/.

export const heroImages: Record<string, string> = {
  homepage: '/images/hero-homepage.jpg',
  services: '/images/hero-services.jpg',
  projects: '/images/hero-projects.jpg',
  sectors: '/images/hero-sectors.jpg',
  clients: '/images/hero-clients.jpg',
  careers: '/images/hero-careers.jpg',
  contact: '/images/hero-contact.jpg',
  brochure: '/images/hero-brochure.jpg',
  'about-introduction': '/images/hero-about-intro.jpg',
  'about-mission': '/images/hero-about-mission.jpg',
  'about-vision': '/images/hero-about-vision.jpg',
  'about-strategy': '/images/hero-about-strategy.jpg',
  'about-team': '/images/hero-about-team.jpg',
};

export const serviceImages: Record<string, string> = {
  'structural-engineering': '/images/service-structural.jpg',
  'bridge-engineering': '/images/service-geotechnical.jpg',
  'transportation-engineering': '/images/service-preconstruction.jpg',
  'project-management-consultancy': '/images/service-geophysical.jpg',
};

export const serviceIconImages: Record<string, string> = {
  'structural-engineering': '/images/icon-structural.png',
  'bridge-engineering': '/images/icon-geotechnical.png',
  'transportation-engineering': '/images/icon-preconstruction.png',
  'project-management-consultancy': '/images/icon-geophysical.png',
};

// Project images cycle through available project photos
const projectImagePool = [
  '/images/project-cpwd-gri-dindigul.jpg',
  '/images/project-deep-geotech-middle-strait.jpg',
  '/images/project-manair-railway.jpg',
  '/images/project-marine-bridge-nh04.jpg',
  '/images/project-nh04-corridor-26km.jpg',
  '/images/project-nh45c-60km.jpg',
  '/images/project-rob-nh67.jpg',
  '/images/project-solar-350mw-phase1.jpg',
  '/images/project-solar-350mw-phase2.jpg',
  '/images/project-thiruvarur-bypass.jpg',
];

export function getProjectImage(index: number): string {
  return projectImagePool[index % projectImagePool.length];
}
