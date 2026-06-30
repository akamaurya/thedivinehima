import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest stories and updates from The Divine Hima, Dharamshala.',
  openGraph: {
    title: 'Blog | The Divine Hima',
    description: 'Read the latest stories and updates from The Divine Hima, Dharamshala.',
    url: 'https://thedivinehima.com/blog',
    images: [
      {
        url: 'https://thedivinehima.com/wp-content/uploads/2018/04/takling-la-1.jpg',
        width: 1200,
        height: 630,
        alt: 'The Divine Hima Blog',
      }
    ],
  },
  alternates: {
    canonical: '/blog',
  },
};

export const dynamic = 'force-static';

export default async function BlogPage() {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    publishedAt,
    categories
  }`;

  const posts = await client.fetch(query);

  return (
    <main>
      <PageHero 
        title="Our Blog" 
        subtitle="Stories, tips, and updates from the mountains."
        backgroundImage="https://thedivinehima.com/wp-content/uploads/2018/04/takling-la-1.jpg"
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {posts.length === 0 ? (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>No blog posts yet. Check back soon!</p>
            ) : (
              posts.map((post: any, index: number) => {
                const coverUrl = post.coverImage 
                  ? urlForImage(post.coverImage).url() 
                  : 'https://thedivinehima.com/wp-content/uploads/2024/12/premium-1.jpg'; // fallback
                const date = new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                });

                return (
                  <AnimateOnScroll key={post._id} delay={index * 100}>
                    <Link href={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ 
                        backgroundColor: 'white', 
                        borderRadius: '12px', 
                        overflow: 'hidden', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <div style={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden' }}>
                          <img src={coverUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {post.categories?.map((cat: string, i: number) => (
                              <span key={i} style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-color)', backgroundColor: '#f0f4f0', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>
                                {cat}
                              </span>
                            ))}
                          </div>
                          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--secondary-color)', lineHeight: 1.4 }}>{post.title}</h2>
                          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #eee', fontSize: '0.85rem', color: '#888' }}>
                            {date}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
