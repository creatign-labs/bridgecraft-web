/**
 * Seed script: Populate Sanity with BridgeCraft project documents.
 *
 * Prerequisites:
 *   1. Set environment variables:
 *      - SANITY_PROJECT_ID  (your Sanity project ID)
 *      - SANITY_DATASET     (e.g. "production")
 *      - SANITY_API_TOKEN   (a write-enabled token from sanity.io/manage)
 *
 *   2. Run:
 *      npm run seed:projects
 *
 *      Or directly:
 *      npx tsx scripts/seed-projects.ts
 */

import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing required environment variables.\n" +
      "Please set SANITY_PROJECT_ID and SANITY_API_TOKEN before running this script.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

interface ProjectSeed {
  title: string;
  slug: string;
  client: string;
  authority: string;
  location: string;
  scope: string;
  keyHighlights: string[];
  featured: boolean;
}

const projects: ProjectSeed[] = [
  {
    title: "Major Marine Bridge – NH-04",
    slug: "major-marine-bridge-nh04",
    client: "RKEC Projects Limited",
    authority: "NHIDCL",
    location: "South Andaman – Baratang Island, Andaman & Nicobar Islands",
    scope:
      "Full Detailed Design Engineering includes bridge foundation, substructure, superstructure, highway alignment, hydrological studies, geotechnical investigations, and authority coordination.",
    keyHighlights: [
      "Marine bridge infrastructure",
      "Hydrology & hydraulic studies",
      "GAD preparation & approvals",
      "Highway alignment & pavement design",
      "Integrated geotechnical investigations",
      "Long-term EPC engagement",
    ],
    featured: true,
  },
  {
    title: "Additional Deep Geotechnical Investigation – Middle Strait Creek",
    slug: "deep-geotechnical-investigation-middle-strait",
    client: "RKEC Projects Limited",
    authority: "NHIDCL",
    location: "Andaman & Nicobar Islands",
    scope:
      "Deep borehole investigations (30–50m), SPT testing, rock coring, lab testing, foundation evaluation.",
    keyHighlights: [
      "27 deep boreholes",
      "30–50m depth exploration",
      "Marine & creek condition drilling",
      "SPT & rock core recovery",
      "Foundation design inputs",
    ],
    featured: false,
  },
  {
    title: "NH-04 Corridor Upgradation (26 km)",
    slug: "nh04-corridor-upgradation-26km",
    client: "RKEC Projects Limited",
    authority: "NHIDCL",
    location: "Jarwa – Rangat Section, Andaman & Nicobar Islands",
    scope:
      "Highway alignment, pavement design, bridges & culverts, retaining structures, surveys, geotechnical investigations.",
    keyHighlights: [
      "26 km highway corridor",
      "Bridge & culvert design",
      "Pavement engineering",
      "DGPS & topographical surveys",
      "Geotechnical investigations",
    ],
    featured: true,
  },
  {
    title: "NH-45C Vikravandi – Sethiyathope (60 km Corridor)",
    slug: "nh45c-vikravandi-sethiyathope-60km",
    client: "Assystem India Ltd",
    authority: "NHAI",
    location: "Tamil Nadu",
    scope:
      "Subsurface investigations for bridge locations including boreholes, SPT testing, laboratory soil & rock analysis.",
    keyHighlights: [
      "60 km highway corridor",
      "Bridge foundation investigations",
      "Rock coring & soil profiling",
      "IS-compliant lab testing",
    ],
    featured: true,
  },
  {
    title: "Thiruvarur Bypass – NH-67 (14 km)",
    slug: "thiruvarur-bypass-nh67-14km",
    client: "Assystem India Ltd",
    authority: "NHAI",
    location: "Tamil Nadu",
    scope:
      "Borehole investigations, SPT, CBR testing, laboratory soil analysis for pavement & bridge design.",
    keyHighlights: [
      "14 km corridor",
      "Pavement subgrade evaluation",
      "Soil classification & CBR testing",
      "Detailed geotechnical reporting",
    ],
    featured: false,
  },
  {
    title: "ROB 129A & ROB 134A – NH-67",
    slug: "rob-129a-134a-nh67",
    client: "Assystem India Ltd",
    authority: "NHAI",
    location: "Tamil Nadu",
    scope:
      "Confirmatory boreholes and foundation investigation for ROB structures.",
    keyHighlights: [
      "Bridge-specific investigations",
      "Rock coring & SPT testing",
      "Foundation design inputs",
    ],
    featured: false,
  },
  {
    title: "Manair River Railway Bridge",
    slug: "manair-river-railway-bridge",
    client: "Assystem India Ltd",
    authority: "South Central Railway",
    location: "Telangana",
    scope:
      "Deep borehole investigations, soil & rock analysis, liquefaction assessment.",
    keyHighlights: [
      "30 boreholes",
      "20m soil & 6m rock exploration",
      "Liquefaction studies",
      "Foundation capacity evaluation",
    ],
    featured: false,
  },
  {
    title: "350 MW Solar Power Project – Phase 1",
    slug: "350mw-solar-phase-1",
    client: "Chinta Green Energy Pvt Ltd",
    authority: "Private Utility-Scale Renewable Developer",
    location: "India",
    scope:
      "Boreholes, trial pits, Electrical Resistivity Testing, soil classification & reporting.",
    keyHighlights: [
      "350 MW capacity",
      "Boreholes & trial pits",
      "ERT surveys",
      "Integrated geotechnical reporting",
    ],
    featured: false,
  },
  {
    title: "350 MW Solar Power Project – Phase 2",
    slug: "350mw-solar-phase-2",
    client: "Chinta Green Energy Pvt Ltd",
    authority: "Private Renewable Infrastructure",
    location: "India",
    scope:
      "22 boreholes, 12 trial pits, plant-wide resistivity surveys.",
    keyHighlights: [
      "22 boreholes",
      "12 trial pits",
      "IS 3043 compliant ERT",
      "Foundation & earthing design inputs",
    ],
    featured: false,
  },
  {
    title: "CPWD Institutional Campus – GRI Dindigul",
    slug: "cpwd-gri-dindigul-campus",
    client: "Central Public Works Department (CPWD)",
    authority: "Government of India",
    location: "Dindigul, Tamil Nadu",
    scope:
      "Boreholes, SPT testing, laboratory soil & rock testing, SBC evaluation.",
    keyHighlights: [
      "21 boreholes",
      "NABL lab testing",
      "CPWD 2019 compliance",
      "15-day execution timeline",
    ],
    featured: false,
  },
];

async function seed() {
  console.log(`Seeding ${projects.length} projects into Sanity (${dataset})...\n`);

  let created = 0;
  let skipped = 0;

  for (const project of projects) {
    // Check if a project with this slug already exists
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "project" && slug.current == $slug][0]{ _id }`,
      { slug: project.slug },
    );

    if (existing) {
      console.log(`  SKIP  "${project.title}" (already exists: ${existing._id})`);
      skipped++;
      continue;
    }

    const doc = await client.create({
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      client: project.client,
      authority: project.authority,
      location: project.location,
      scope: project.scope,
      keyHighlights: project.keyHighlights,
      featured: project.featured,
    });

    console.log(`  CREATE "${project.title}" → ${doc._id}`);
    created++;
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
