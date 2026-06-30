<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design Philosophy

For all future design updates/changes in this project, you MUST use the `frontend-design` skill (located in `.agents/skills/frontend-design/`) and strictly adhere to the **Editorial / Magazine** aesthetic. This entails content-led design, stark high-contrast colors (white/cream backgrounds with deep red accents), dramatic typography scale with serif headers (`Playfair Display`) and sans-serif body text (`Inter`), column grids, drop caps, pull quotes, and thin rules as dividers.

# SEO & GEO Strategy

When building or modifying pages, ALWAYS prioritize Search Engine Optimization (SEO) and Generative Engine Optimization (GEO). The following rules apply universally:

1. **Structured Data (JSON-LD):** Always inject robust schema.org JSON-LD scripts on relevant pages. Use `LocalBusiness` for hotel details and `FAQPage` where questions and answers are present. 
2. **Dynamic Metadata:** For any new routes, ensure `metadata` is properly exported with `title`, `description`, `canonical`, and `openGraph` properties. Use `generateMetadata` for dynamic routes like blogs or rooms.
3. **Semantic HTML & Alt Tags:** Use explicit semantic tags (`<article>`, `<section>`, `<main>`) and ensure every image has a descriptive `alt` attribute. 
4. **Sitemaps & Robots:** Ensure dynamic `sitemap.ts` and `robots.ts` are kept up to date if new major sections are added to the application, maintaining high priorities for commercial pages (e.g., Rooms, Dining).
5. **Content Quality:** Follow a content-led design that clearly answers typical generative engine queries (e.g., "Best time to visit", "Amenities available").
