import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { client } from '../../../../sanity/lib/client';
import { urlForImage } from '../../../../sanity/lib/image';
import PageHero from '@/components/PageHero';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const query = `*[_type == "blogPost"] { "slug": slug.current }`;
  const slugs = await client.fetch(query);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const query = `*[_type == "blogPost" && slug.current == $slug][0] { title, body, coverImage }`;
  const post = await client.fetch(query, { slug });
  if (!post) return { title: 'Post Not Found' };
  
  // Extract a short description from the body if possible
  const description = post.body && post.body.length > 0 
    ? (post.body.find((b: any) => b._type === 'block')?.children?.[0]?.text || '').slice(0, 150) + '...'
    : 'Read our latest blog post.';
    
  const coverUrl = post.coverImage 
    ? urlForImage(post.coverImage).url() 
    : 'https://thedivinehima.com/wp-content/uploads/2018/04/takling-la-1.jpg';
    
  return {
    title: `${post.title}`,
    description,
    openGraph: {
      title: `${post.title} | The Divine Hima`,
      description,
      url: `https://thedivinehima.com/blog/${slug}`,
      type: 'article',
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ]
    },
    alternates: {
      canonical: `/blog/${slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    coverImage,
    publishedAt,
    body,
    categories
  }`;
  
  const post = await client.fetch(query, { slug });

  if (!post) {
    notFound();
  }

  const coverUrl = post.coverImage 
    ? urlForImage(post.coverImage).url() 
    : 'https://thedivinehima.com/wp-content/uploads/2018/04/takling-la-1.jpg'; // fallback
    
  const date = new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div style={{ margin: '2rem 0' }}>
            <img 
              alt={value.alt || 'Blog image'} 
              src={urlForImage(value).url()} 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
            />
          </div>
        );
      },
      callToAction: ({ value }: any) => {
        const targetUrl = (!value.url || value.url === '/contact') 
          ? 'https://asiatech.in/booking_engine/index3?token=MTA4NDQ=' 
          : value.url;

        return (
          <div style={{ margin: '3rem 0', textAlign: 'center' }}>
            <Link 
              href={targetUrl} 
              className="btn btn-primary"
              style={{ padding: '1rem 3rem', fontSize: '1.2rem', display: 'inline-block', borderRadius: '8px' }}
            >
              {value.text || 'Book Now'}
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <main>
      <PageHero 
        title={post.title} 
        backgroundImage={coverUrl}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              {post.categories?.map((cat: string, i: number) => (
                <span key={i} style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)', backgroundColor: '#f0f4f0', padding: '0.25rem 1rem', borderRadius: '2rem' }}>
                  {cat}
                </span>
              ))}
            </div>
            <div style={{ fontSize: '1rem', color: '#888' }}>
              Published on {date}
            </div>
          </div>

          <div style={{ 
            fontSize: '1.1rem', 
            lineHeight: 1.8, 
            color: '#333',
            fontFamily: 'var(--font-lato), sans-serif'
          }}>
            {post.body ? (
              <PortableText value={post.body} components={components} />
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
