#!/usr/bin/env node
/**
 * Generate professional placeholder images for BridgeCraft website.
 * These serve as visible defaults until real images are uploaded via Sanity.
 */
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const OUT_DIR = join(import.meta.dirname, '..', 'public', 'images');
mkdirSync(OUT_DIR, { recursive: true });

// Color palette
const COLORS = {
  primary: '#1e3a5f',    // Dark blue
  secondary: '#2d6a9f',  // Medium blue
  accent: '#e8b931',     // Gold/amber
  light: '#f0f4f8',      // Light gray-blue
  dark: '#0f1f33',       // Very dark blue
  text: '#ffffff',        // White text
  muted: '#8facc4',      // Muted blue
};

function createSVG({ width, height, label, sublabel, bgColor, accentColor, icon }) {
  const cx = width / 2;
  const cy = height / 2;
  const titleSize = Math.max(16, Math.min(width / 20, 36));
  const subSize = Math.max(12, Math.min(width / 30, 20));
  const iconSize = Math.max(30, Math.min(width / 8, 80));

  // Icon SVGs
  const icons = {
    camera: `<path d="M${cx-iconSize/2} ${cy-iconSize*0.8} l${iconSize*0.2} ${-iconSize*0.3} h${iconSize*0.6} l${iconSize*0.2} ${iconSize*0.3} h${iconSize*0.15} a${iconSize*0.1} ${iconSize*0.1} 0 0 1 ${iconSize*0.1} ${iconSize*0.1} v${iconSize*0.7} a${iconSize*0.1} ${iconSize*0.1} 0 0 1 ${-iconSize*0.1} ${iconSize*0.1} h${-iconSize*1.3} a${iconSize*0.1} ${iconSize*0.1} 0 0 1 ${-iconSize*0.1} ${-iconSize*0.1} v${-iconSize*0.7} a${iconSize*0.1} ${iconSize*0.1} 0 0 1 ${iconSize*0.1} ${-iconSize*0.1} z" fill="none" stroke="${accentColor}" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy-iconSize*0.2}" r="${iconSize*0.25}" fill="none" stroke="${accentColor}" stroke-width="2"/>`,
    building: `<rect x="${cx-iconSize*0.4}" y="${cy-iconSize*0.8}" width="${iconSize*0.35}" height="${iconSize*0.9}" fill="none" stroke="${accentColor}" stroke-width="2" rx="2"/>
    <rect x="${cx+iconSize*0.05}" y="${cy-iconSize*0.5}" width="${iconSize*0.35}" height="${iconSize*0.6}" fill="none" stroke="${accentColor}" stroke-width="2" rx="2"/>
    <line x1="${cx-iconSize*0.25}" y1="${cy-iconSize*0.55}" x2="${cx-iconSize*0.25}" y2="${cy-iconSize*0.45}" stroke="${accentColor}" stroke-width="2"/>
    <line x1="${cx-iconSize*0.1}" y1="${cy-iconSize*0.55}" x2="${cx-iconSize*0.1}" y2="${cy-iconSize*0.45}" stroke="${accentColor}" stroke-width="2"/>`,
    bridge: `<path d="M${cx-iconSize*0.6} ${cy-iconSize*0.2} Q${cx} ${cy-iconSize*0.8} ${cx+iconSize*0.6} ${cy-iconSize*0.2}" fill="none" stroke="${accentColor}" stroke-width="2.5"/>
    <line x1="${cx-iconSize*0.6}" y1="${cy-iconSize*0.2}" x2="${cx-iconSize*0.6}" y2="${cy+iconSize*0.15}" stroke="${accentColor}" stroke-width="2"/>
    <line x1="${cx+iconSize*0.6}" y1="${cy-iconSize*0.2}" x2="${cx+iconSize*0.6}" y2="${cy+iconSize*0.15}" stroke="${accentColor}" stroke-width="2"/>
    <line x1="${cx-iconSize*0.7}" y1="${cy+iconSize*0.15}" x2="${cx+iconSize*0.7}" y2="${cy+iconSize*0.15}" stroke="${accentColor}" stroke-width="2.5"/>`,
    person: `<circle cx="${cx}" cy="${cy-iconSize*0.55}" r="${iconSize*0.2}" fill="none" stroke="${accentColor}" stroke-width="2"/>
    <path d="M${cx-iconSize*0.35} ${cy+iconSize*0.1} Q${cx-iconSize*0.35} ${cy-iconSize*0.25} ${cx} ${cy-iconSize*0.25} Q${cx+iconSize*0.35} ${cy-iconSize*0.25} ${cx+iconSize*0.35} ${cy+iconSize*0.1}" fill="none" stroke="${accentColor}" stroke-width="2"/>`,
    grid: `<rect x="${cx-iconSize*0.35}" y="${cy-iconSize*0.7}" width="${iconSize*0.3}" height="${iconSize*0.3}" fill="none" stroke="${accentColor}" stroke-width="2" rx="3"/>
    <rect x="${cx+iconSize*0.05}" y="${cy-iconSize*0.7}" width="${iconSize*0.3}" height="${iconSize*0.3}" fill="none" stroke="${accentColor}" stroke-width="2" rx="3"/>
    <rect x="${cx-iconSize*0.35}" y="${cy-iconSize*0.3}" width="${iconSize*0.3}" height="${iconSize*0.3}" fill="none" stroke="${accentColor}" stroke-width="2" rx="3"/>
    <rect x="${cx+iconSize*0.05}" y="${cy-iconSize*0.3}" width="${iconSize*0.3}" height="${iconSize*0.3}" fill="none" stroke="${accentColor}" stroke-width="2" rx="3"/>`,
    document: `<rect x="${cx-iconSize*0.3}" y="${cy-iconSize*0.7}" width="${iconSize*0.6}" height="${iconSize*0.8}" fill="none" stroke="${accentColor}" stroke-width="2" rx="3"/>
    <line x1="${cx-iconSize*0.15}" y1="${cy-iconSize*0.35}" x2="${cx+iconSize*0.15}" y2="${cy-iconSize*0.35}" stroke="${accentColor}" stroke-width="1.5"/>
    <line x1="${cx-iconSize*0.15}" y1="${cy-iconSize*0.15}" x2="${cx+iconSize*0.15}" y2="${cy-iconSize*0.15}" stroke="${accentColor}" stroke-width="1.5"/>
    <line x1="${cx-iconSize*0.15}" y1="${cy+iconSize*0.05}" x2="${cx+iconSize*0.05}" y2="${cy+iconSize*0.05}" stroke="${accentColor}" stroke-width="1.5"/>`,
    mail: `<rect x="${cx-iconSize*0.4}" y="${cy-iconSize*0.45}" width="${iconSize*0.8}" height="${iconSize*0.55}" fill="none" stroke="${accentColor}" stroke-width="2" rx="3"/>
    <path d="M${cx-iconSize*0.4} ${cy-iconSize*0.45} L${cx} ${cy-iconSize*0.05} L${cx+iconSize*0.4} ${cy-iconSize*0.45}" fill="none" stroke="${accentColor}" stroke-width="2"/>`,
    wrench: `<circle cx="${cx}" cy="${cy-iconSize*0.4}" r="${iconSize*0.25}" fill="none" stroke="${accentColor}" stroke-width="2"/>
    <line x1="${cx+iconSize*0.15}" y1="${cy-iconSize*0.2}" x2="${cx+iconSize*0.45}" y2="${cy+iconSize*0.1}" stroke="${accentColor}" stroke-width="2.5"/>`,
    globe: `<circle cx="${cx}" cy="${cy-iconSize*0.3}" r="${iconSize*0.35}" fill="none" stroke="${accentColor}" stroke-width="2"/>
    <ellipse cx="${cx}" cy="${cy-iconSize*0.3}" rx="${iconSize*0.15}" ry="${iconSize*0.35}" fill="none" stroke="${accentColor}" stroke-width="1.5"/>
    <line x1="${cx-iconSize*0.35}" y1="${cy-iconSize*0.3}" x2="${cx+iconSize*0.35}" y2="${cy-iconSize*0.3}" stroke="${accentColor}" stroke-width="1.5"/>`,
    star: `<polygon points="${cx},${cy-iconSize*0.5} ${cx+iconSize*0.12},${cy-iconSize*0.2} ${cx+iconSize*0.45},${cy-iconSize*0.15} ${cx+iconSize*0.2},${cy+iconSize*0.05} ${cx+iconSize*0.3},${cy+iconSize*0.35} ${cx},${cy+iconSize*0.15} ${cx-iconSize*0.3},${cy+iconSize*0.35} ${cx-iconSize*0.2},${cy+iconSize*0.05} ${cx-iconSize*0.45},${cy-iconSize*0.15} ${cx-iconSize*0.12},${cy-iconSize*0.2}" fill="none" stroke="${accentColor}" stroke-width="2"/>`,
    road: `<path d="M${cx-iconSize*0.5} ${cy+iconSize*0.15} L${cx-iconSize*0.15} ${cy-iconSize*0.6} L${cx+iconSize*0.15} ${cy-iconSize*0.6} L${cx+iconSize*0.5} ${cy+iconSize*0.15} Z" fill="none" stroke="${accentColor}" stroke-width="2"/>
    <line x1="${cx}" y1="${cy-iconSize*0.5}" x2="${cx}" y2="${cy-iconSize*0.3}" stroke="${accentColor}" stroke-width="2" stroke-dasharray="4,4"/>
    <line x1="${cx}" y1="${cy-iconSize*0.15}" x2="${cx}" y2="${cy+iconSize*0.05}" stroke="${accentColor}" stroke-width="2" stroke-dasharray="4,4"/>`,
  };

  const iconSvg = icons[icon] || icons.camera;

  // Diagonal pattern for visual texture
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgColor}"/>
      <stop offset="100%" stop-color="${darken(bgColor, 20)}"/>
    </linearGradient>
    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="0.8" fill="${accentColor}" opacity="0.15"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#dots)"/>
  <g opacity="0.6">${iconSvg}</g>
  <text x="${cx}" y="${cy + iconSize * 0.55}" font-family="system-ui, -apple-system, sans-serif" font-size="${titleSize}" font-weight="600" fill="${COLORS.text}" text-anchor="middle" opacity="0.9">${escapeXml(label)}</text>
  ${sublabel ? `<text x="${cx}" y="${cy + iconSize * 0.55 + subSize * 1.5}" font-family="system-ui, -apple-system, sans-serif" font-size="${subSize}" fill="${COLORS.muted}" text-anchor="middle" opacity="0.7">${escapeXml(sublabel)}</text>` : ''}
  <rect x="0" y="0" width="${width}" height="3" fill="${accentColor}" opacity="0.8"/>
  <rect x="0" y="${height - 3}" width="${width}" height="3" fill="${accentColor}" opacity="0.4"/>
</svg>`;
}

function darken(hex, amount) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ─── Image definitions ───

const heroImages = [
  { file: 'hero-homepage.jpg', w: 1920, h: 600, label: 'BridgeCraft', sub: 'Engineering Excellence', icon: 'bridge', bg: COLORS.primary },
  { file: 'hero-services.jpg', w: 1920, h: 600, label: 'Our Services', sub: 'Engineering & Consultancy', icon: 'wrench', bg: '#1a3550' },
  { file: 'hero-projects.jpg', w: 1920, h: 600, label: 'Our Projects', sub: 'Portfolio of Work', icon: 'bridge', bg: '#1e3a5f' },
  { file: 'hero-sectors.jpg', w: 1920, h: 600, label: 'Sectors', sub: 'Industries We Serve', icon: 'globe', bg: '#193352' },
  { file: 'hero-clients.jpg', w: 1920, h: 600, label: 'Our Clients', sub: 'Trusted Partnerships', icon: 'star', bg: '#1a3050' },
  { file: 'hero-careers.jpg', w: 1920, h: 600, label: 'Careers', sub: 'Join Our Team', icon: 'person', bg: '#1c3558' },
  { file: 'hero-contact.jpg', w: 1920, h: 600, label: 'Contact Us', sub: 'Get in Touch', icon: 'mail', bg: '#18304e' },
  { file: 'hero-brochure.jpg', w: 1920, h: 600, label: 'Company Brochure', sub: 'Download', icon: 'document', bg: '#1b3454' },
  { file: 'hero-about-intro.jpg', w: 1920, h: 600, label: 'About BridgeCraft', sub: 'Introduction', icon: 'building', bg: '#1e3a5f' },
  { file: 'hero-about-mission.jpg', w: 1920, h: 600, label: 'Mission Statement', sub: 'Our Purpose', icon: 'star', bg: '#1a3550' },
  { file: 'hero-about-vision.jpg', w: 1920, h: 600, label: 'Vision & Values', sub: 'What Drives Us', icon: 'globe', bg: '#193352' },
  { file: 'hero-about-strategy.jpg', w: 1920, h: 600, label: 'Corporate Strategy', sub: 'Our Approach', icon: 'grid', bg: '#1c3558' },
  { file: 'hero-about-team.jpg', w: 1920, h: 600, label: 'Our Team', sub: 'Leadership', icon: 'person', bg: '#1b3454' },
];

const serviceImages = [
  { file: 'service-structural.jpg', w: 600, h: 400, label: 'Structural Engineering', icon: 'building', bg: '#2d5a8a' },
  { file: 'service-geotechnical.jpg', w: 600, h: 400, label: 'Bridge Engineering', icon: 'bridge', bg: '#2a5580' },
  { file: 'service-preconstruction.jpg', w: 600, h: 400, label: 'Transportation', icon: 'road', bg: '#275078' },
  { file: 'service-geophysical.jpg', w: 600, h: 400, label: 'Project Management', icon: 'grid', bg: '#244b70' },
];

const iconImages = [
  { file: 'icon-structural.png', w: 200, h: 200, label: 'Structural', icon: 'building', bg: COLORS.primary },
  { file: 'icon-geotechnical.png', w: 200, h: 200, label: 'Bridge', icon: 'bridge', bg: COLORS.secondary },
  { file: 'icon-preconstruction.png', w: 200, h: 200, label: 'Transport', icon: 'road', bg: '#2a5580' },
  { file: 'icon-geophysical.png', w: 200, h: 200, label: 'PM', icon: 'grid', bg: '#275078' },
];

const projectImages = [
  { file: 'project-cpwd-gri-dindigul.jpg', w: 800, h: 500, label: 'CPWD GRI Dindigul', icon: 'bridge', bg: '#22466b' },
  { file: 'project-deep-geotech-middle-strait.jpg', w: 800, h: 500, label: 'Deep Geotech', icon: 'building', bg: '#1e4060' },
  { file: 'project-manair-railway.jpg', w: 800, h: 500, label: 'Manair Railway', icon: 'road', bg: '#1a3a58' },
  { file: 'project-marine-bridge-nh04.jpg', w: 800, h: 500, label: 'Marine Bridge NH04', icon: 'bridge', bg: '#1e3a5f' },
  { file: 'project-nh04-corridor-26km.jpg', w: 800, h: 500, label: 'NH04 Corridor 26km', icon: 'road', bg: '#22446a' },
  { file: 'project-nh45c-60km.jpg', w: 800, h: 500, label: 'NH45C 60km', icon: 'road', bg: '#1c3856' },
  { file: 'project-rob-nh67.jpg', w: 800, h: 500, label: 'ROB NH67', icon: 'bridge', bg: '#204264' },
  { file: 'project-solar-350mw-phase1.jpg', w: 800, h: 500, label: 'Solar 350MW Phase 1', icon: 'globe', bg: '#1a3654' },
  { file: 'project-solar-350mw-phase2.jpg', w: 800, h: 500, label: 'Solar 350MW Phase 2', icon: 'globe', bg: '#1e3e5e' },
  { file: 'project-thiruvarur-bypass.jpg', w: 800, h: 500, label: 'Thiruvarur Bypass', icon: 'road', bg: '#224468' },
];

const allImages = [
  ...heroImages,
  ...serviceImages,
  ...iconImages,
  ...projectImages,
];

async function generate() {
  console.log(`Generating ${allImages.length} placeholder images...`);

  for (const img of allImages) {
    const svg = createSVG({
      width: img.w,
      height: img.h,
      label: img.label,
      sublabel: img.sub || '',
      bgColor: img.bg,
      accentColor: COLORS.accent,
      icon: img.icon,
    });

    const outPath = join(OUT_DIR, img.file);
    const isPng = img.file.endsWith('.png');

    const pipeline = sharp(Buffer.from(svg));
    if (isPng) {
      await pipeline.png({ quality: 90 }).toFile(outPath);
    } else {
      await pipeline.jpeg({ quality: 85 }).toFile(outPath);
    }
    console.log(`  ✓ ${img.file} (${img.w}x${img.h})`);
  }

  console.log(`\nDone! ${allImages.length} images generated in public/images/`);
}

generate().catch((err) => { console.error(err); process.exit(1); });
