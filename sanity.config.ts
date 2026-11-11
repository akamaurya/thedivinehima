import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { projectId, dataset } from './sanity/env';
import { room } from './sanity/schemas/room';
import { blogPost } from './sanity/schemas/blogPost';
import { gallery } from './sanity/schemas/gallery';
import { testimonial } from './sanity/schemas/testimonial';
import { siteSettings } from './sanity/schemas/siteSettings';
import { aboutPage } from './sanity/schemas/aboutPage';
import { diningPage } from './sanity/schemas/diningPage';
import { tourPackage } from './sanity/schemas/package';

export default defineConfig({
  basePath: process.env.STUDIO_BASE_PATH,
  projectId,
  dataset,
  title: 'The Divine Hima',
  plugins: [structureTool(), media()],
  schema: {
    types: [room, blogPost, gallery, testimonial, siteSettings, aboutPage, diningPage, tourPackage],
  },
});
