import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import schemaTypes from './schemas';

export default defineConfig({
  name: 'bridgecraft',
  title: 'BridgeCraft CMS',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
