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

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  basePath: isProd ? '/thedivinehima/studio' : '/studio',
  projectId,
  dataset,
  title: 'The Divine Hima',
  plugins: [structureTool(), media()],
  schema: {
    types: [room, blogPost, gallery, testimonial, siteSettings, aboutPage, diningPage],
  },
});
