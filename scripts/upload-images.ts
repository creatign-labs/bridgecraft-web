/**
 * Bulk image uploader for BridgeCraft Sanity CMS.
 *
 * This script reads images from a local folder and uploads them to the
 * correct Sanity documents, setting alt text and image fields automatically.
 *
 * SETUP:
 *   1. Generate all images using Midjourney / DALL-E / etc.
 *   2. Place them in a folder (default: ./images/) using the file names below.
 *   3. Set environment variables:
 *        SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN
 *   4. Run:
 *        npm run upload:images
 *
 * FILE NAMING CONVENTION:
 *   Hero banners (1920x600):  hero-homepage.jpg, hero-about-intro.jpg, etc.
 *   Service cards (600x400):  service-preconstruction.jpg, etc.
 *   Service icons (200x200):  icon-preconstruction.png, etc.
 *   Project images (1200x800): project-marine-bridge-nh04.jpg, etc.
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

/* ------------------------------------------------------------------ */
/*  Configuration                                                      */
/* ------------------------------------------------------------------ */

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;
const imagesDir = process.env.IMAGES_DIR || path.resolve(process.cwd(), "images");

if (!projectId || !token) {
  console.error(
    "Missing required environment variables.\n" +
      "Set SANITY_PROJECT_ID and SANITY_API_TOKEN before running.",
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

/* ------------------------------------------------------------------ */
/*  Image → Document Mapping                                           */
/* ------------------------------------------------------------------ */

// Singleton hero banners: filename → { _type, field, alt }
const SINGLETON_HEROES: Record<
  string,
  { _type: string; field: string; alt: string }
> = {
  "hero-homepage.jpg": {
    _type: "homepage",
    field: "heroImage",
    alt: "Aerial view of a large bridge under construction over a river at golden hour",
  },
  "hero-about-intro.jpg": {
    _type: "aboutIntroduction",
    field: "heroImage",
    alt: "Engineering team reviewing blueprints at a construction site",
  },
  "hero-about-vision.jpg": {
    _type: "visionValues",
    field: "heroImage",
    alt: "Modern highway interchange illuminated at dusk",
  },
  "hero-about-mission.jpg": {
    _type: "missionStatement",
    field: "heroImage",
    alt: "Survey equipment set up on a construction site",
  },
  "hero-about-strategy.jpg": {
    _type: "corporateStrategy",
    field: "heroImage",
    alt: "Modern office with engineering plans and structural analysis software",
  },
  "hero-contact.jpg": {
    _type: "contactInfo",
    field: "heroImage",
    alt: "Modern corporate office reception with engineering models",
  },
  "hero-brochure.jpg": {
    _type: "brochure",
    field: "heroImage",
    alt: "Flat lay of engineering documents and blueprints on a white desk",
  },
};

// Page hero banners that don't have a singleton document — these are
// uploaded as Sanity assets only. They can be manually assigned in Studio
// or referenced via the seed data. We still upload + log the asset ID.
const STANDALONE_HEROES: Record<string, string> = {
  "hero-about-team.jpg":
    "Group of civil engineers at a project site with bridge structure behind them",
  "hero-services.jpg":
    "Split composition of bridge structure, drilling rig, survey equipment, and blueprints",
  "hero-projects.jpg":
    "Dramatic wide-angle view of a completed cable-stayed bridge over water",
  "hero-sectors.jpg":
    "Aerial view of mixed infrastructure — highway, solar farm, railway bridge, and buildings",
  "hero-clients.jpg":
    "Professional handshake at a construction site with bridge in background",
  "hero-careers.jpg":
    "Young engineer using a tablet at a modern construction site",
};

// Service images: filename → { slug, field, alt }
interface ServiceImageMapping {
  slug: string;
  field: "cardImage" | "iconImage";
  alt: string;
}

const SERVICE_IMAGES: Record<string, ServiceImageMapping> = {
  // Card images (600x400)
  "service-preconstruction.jpg": {
    slug: "project-management-consultancy",
    field: "cardImage",
    alt: "Engineers reviewing architectural plans with 3D structural models on screen",
  },
  "service-structural.jpg": {
    slug: "structural-engineering",
    field: "cardImage",
    alt: "Reinforced concrete bridge pier under construction with steel rebar cage",
  },
  "service-geotechnical.jpg": {
    slug: "bridge-engineering",
    field: "cardImage",
    alt: "Soil drilling rig operating at a borehole investigation site",
  },
  "service-geophysical.jpg": {
    slug: "transportation-engineering",
    field: "cardImage",
    alt: "Geophysical survey team using ground penetrating radar in an open field",
  },
  // Icon images (200x200)
  "icon-preconstruction.png": {
    slug: "project-management-consultancy",
    field: "iconImage",
    alt: "Pre-construction planning icon",
  },
  "icon-structural.png": {
    slug: "structural-engineering",
    field: "iconImage",
    alt: "Structural engineering icon",
  },
  "icon-geotechnical.png": {
    slug: "bridge-engineering",
    field: "iconImage",
    alt: "Geotechnical investigation icon",
  },
  "icon-geophysical.png": {
    slug: "transportation-engineering",
    field: "iconImage",
    alt: "Geophysical survey icon",
  },
};

// Project images: filename → { slug, alt }
// Uploaded to the project's `images` array (first image also set as coverImage)
interface ProjectImageMapping {
  slug: string;
  alt: string;
}

const PROJECT_IMAGES: Record<string, ProjectImageMapping> = {
  "project-marine-bridge-nh04.jpg": {
    slug: "major-marine-bridge-nh04",
    alt: "Marine bridge under construction over a creek between tropical islands",
  },
  "project-deep-geotech-middle-strait.jpg": {
    slug: "deep-geotechnical-investigation-middle-strait",
    alt: "Deep borehole drilling rig on a barge in a marine creek",
  },
  "project-nh04-corridor-26km.jpg": {
    slug: "nh04-corridor-upgradation-26km",
    alt: "National highway winding through dense tropical forest in the Andaman Islands",
  },
  "project-nh45c-60km.jpg": {
    slug: "nh45c-vikravandi-sethiyathope-60km",
    alt: "Four-lane national highway construction in Tamil Nadu",
  },
  "project-thiruvarur-bypass.jpg": {
    slug: "thiruvarur-bypass-nh67-14km",
    alt: "Highway bypass construction through South Indian town",
  },
  "project-rob-nh67.jpg": {
    slug: "rob-129a-134a-nh67",
    alt: "Railway overbridge under construction spanning railway tracks",
  },
  "project-manair-railway.jpg": {
    slug: "manair-river-railway-bridge",
    alt: "Railway bridge over the Manair river in rural Telangana",
  },
  "project-solar-350mw-phase1.jpg": {
    slug: "350mw-solar-phase-1",
    alt: "Utility-scale solar farm with geotechnical drilling rig",
  },
  "project-solar-350mw-phase2.jpg": {
    slug: "350mw-solar-phase-2",
    alt: "Aerial view of expansive solar power plant with trial pit excavation",
  },
  "project-cpwd-gri-dindigul.jpg": {
    slug: "cpwd-gri-dindigul-campus",
    alt: "Institutional campus building under construction in Dindigul",
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

async function uploadAsset(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : "image/jpeg";
  const buffer = fs.readFileSync(filePath);

  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
    contentType,
  });

  return asset._id;
}

function imageRef(assetId: string, alt: string) {
  return {
    _type: "image",
    alt,
    asset: { _type: "reference", _ref: assetId },
  };
}

function imageRefWithKey(assetId: string, alt: string) {
  const key = Math.random().toString(36).slice(2, 10);
  return {
    _type: "image",
    _key: key,
    alt,
    asset: { _type: "reference", _ref: assetId },
  };
}

async function findSingletonId(docType: string): Promise<string | null> {
  const doc = await client.fetch<{ _id: string } | null>(
    `*[_type == $type][0]{ _id }`,
    { type: docType },
  );
  return doc?._id ?? null;
}

async function findBySlug(
  docType: string,
  slug: string,
): Promise<string | null> {
  const doc = await client.fetch<{ _id: string } | null>(
    `*[_type == $type && slug.current == $slug][0]{ _id }`,
    { type: docType, slug },
  );
  return doc?._id ?? null;
}

function fileExists(filename: string): string | null {
  const filePath = path.join(imagesDir, filename);
  return fs.existsSync(filePath) ? filePath : null;
}

/* ------------------------------------------------------------------ */
/*  Upload Steps                                                       */
/* ------------------------------------------------------------------ */

async function uploadSingletonHeroes() {
  console.log("\n=== Singleton Hero Banners ===\n");

  for (const [filename, mapping] of Object.entries(SINGLETON_HEROES)) {
    const filePath = fileExists(filename);
    if (!filePath) {
      console.log(`  SKIP  ${filename} (file not found)`);
      continue;
    }

    const docId = await findSingletonId(mapping._type);
    if (!docId) {
      console.log(`  SKIP  ${filename} (no ${mapping._type} document in Sanity)`);
      continue;
    }

    const assetId = await uploadAsset(filePath);
    await client
      .patch(docId)
      .set({ [mapping.field]: imageRef(assetId, mapping.alt) })
      .commit();

    console.log(`  OK    ${filename} → ${mapping._type}.${mapping.field}`);
  }
}

async function uploadStandaloneHeroes() {
  console.log("\n=== Standalone Hero Assets ===");
  console.log("  (Uploaded as assets — assign manually in Studio)\n");

  for (const [filename, alt] of Object.entries(STANDALONE_HEROES)) {
    const filePath = fileExists(filename);
    if (!filePath) {
      console.log(`  SKIP  ${filename} (file not found)`);
      continue;
    }

    const assetId = await uploadAsset(filePath);
    console.log(`  OK    ${filename} → asset ${assetId}  alt: "${alt}"`);
  }
}

async function uploadServiceImages() {
  console.log("\n=== Service Images ===\n");

  for (const [filename, mapping] of Object.entries(SERVICE_IMAGES)) {
    const filePath = fileExists(filename);
    if (!filePath) {
      console.log(`  SKIP  ${filename} (file not found)`);
      continue;
    }

    const docId = await findBySlug("service", mapping.slug);
    if (!docId) {
      console.log(`  SKIP  ${filename} (service "${mapping.slug}" not found)`);
      continue;
    }

    const assetId = await uploadAsset(filePath);
    await client
      .patch(docId)
      .set({ [mapping.field]: imageRef(assetId, mapping.alt) })
      .commit();

    console.log(`  OK    ${filename} → service/${mapping.slug}.${mapping.field}`);
  }
}

async function uploadProjectImages() {
  console.log("\n=== Project Images ===\n");

  for (const [filename, mapping] of Object.entries(PROJECT_IMAGES)) {
    const filePath = fileExists(filename);
    if (!filePath) {
      console.log(`  SKIP  ${filename} (file not found)`);
      continue;
    }

    const docId = await findBySlug("project", mapping.slug);
    if (!docId) {
      console.log(`  SKIP  ${filename} (project "${mapping.slug}" not found)`);
      continue;
    }

    const assetId = await uploadAsset(filePath);
    const img = imageRefWithKey(assetId, mapping.alt);

    // Set as coverImage AND append to images array
    await client
      .patch(docId)
      .set({ coverImage: imageRef(assetId, mapping.alt) })
      .setIfMissing({ images: [] })
      .append("images", [img])
      .commit();

    console.log(`  OK    ${filename} → project/${mapping.slug} (cover + gallery)`);
  }
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

async function main() {
  if (!fs.existsSync(imagesDir)) {
    console.error(`Images directory not found: ${imagesDir}`);
    console.error("Create the directory and place your generated images inside.");
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
  console.log(`Found ${files.length} image(s) in ${imagesDir}`);

  await uploadSingletonHeroes();
  await uploadStandaloneHeroes();
  await uploadServiceImages();
  await uploadProjectImages();

  console.log("\nDone! Open Sanity Studio to verify and set hotspots.");
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
