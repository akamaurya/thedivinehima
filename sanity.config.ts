import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectId, dataset } from './sanity/env';
import { room } from './sanity/schemas/room';
import { blogPost } from './sanity/schemas/blogPost';
import { gallery } from './sanity/schemas/gallery';
import { testimonial } from './sanity/schemas/testimonial';
import { siteSettings } from './sanity/schemas/siteSettings';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  basePath: isProd ? '/thedivinehima/studio' : '/studio',
  projectId,
  dataset,
  title: 'The Divine Hima',
  plugins: [structureTool()],
  schema: {
    types: [room, blogPost, gallery, testimonial, siteSettings],
  },
});
