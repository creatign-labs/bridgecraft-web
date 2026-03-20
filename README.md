# BridgeCraft Engineers & Consultants — Website

Production-ready website for **BridgeCraft Engineers & Consultants**, a Civil & Infrastructure Design Consultancy.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **CMS:** Sanity v3 (embedded studio at `/studio`)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter (body) + Outfit (headings)
- **Deployment:** Vercel

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Copy `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
NEXT_PUBLIC_SITE_URL=https://bridgecraft.in
```

### 3. Create a Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project
2. Copy the project ID into `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Add `http://localhost:3000` to the CORS origins in your Sanity project settings

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Sanity Studio

Access the content management studio at [http://localhost:3000/studio](http://localhost:3000/studio).

The studio allows the client to manage:
- Homepage content, stats, and CTA text
- About pages (introduction, vision & values, mission, corporate strategy)
- Team members
- Services (4 core disciplines)
- Projects portfolio
- Sectors served
- Client logos
- Company brochure (PDF upload)
- Job openings
- Contact information
- Site-wide settings (logo, tagline, social links)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # About Us sub-pages
│   ├── api/revalidate/     # Sanity webhook revalidation
│   ├── brochure/
│   ├── careers/
│   ├── clients/
│   ├── contact/
│   ├── projects/[slug]/    # Dynamic project pages
│   ├── sectors/
│   ├── services/[slug]/    # Dynamic service pages
│   └── studio/[[...tool]]/ # Embedded Sanity Studio
├── components/
│   ├── layout/             # Header, Footer, PageHero
│   ├── ui/                 # Button, Card, SectionHeading, StatsCounter, AnimatedSection
│   ├── sections/           # ServicesGrid, ProjectsGrid, ClientsBar, CTABanner
│   └── sanity/             # PortableTextRenderer
├── lib/
│   ├── sanity.ts           # Sanity client configuration
│   ├── queries.ts          # GROQ queries
│   └── seed-data.ts        # Static seed data for demo
└── sanity/
    ├── sanity.config.ts    # Sanity studio configuration
    └── schemas/            # 14 document type schemas
```

## Deployment to Vercel

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Custom Domain

1. In Vercel project settings, go to **Domains**
2. Add your custom domain (e.g., `bridgecraft.in`)
3. Update DNS records as directed by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` to match

## Switching from Seed Data to Sanity

The site ships with static seed data (`src/lib/seed-data.ts`) so it works immediately without a Sanity connection. To switch to live CMS data:

1. Set up your Sanity project and populate content via `/studio`
2. In each page file, replace seed data imports with Sanity client fetches using the queries in `src/lib/queries.ts`
3. Add `export const revalidate = 60` to pages for ISR

## Build

```bash
pnpm build
```
