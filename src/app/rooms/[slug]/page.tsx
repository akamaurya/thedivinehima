import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '../../../../sanity/lib/client';
import { urlForImage } from '../../../../sanity/lib/image';
import PageHero from '@/components/PageHero';
import styles from '../page.module.css';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const query = `*[_type == "room"] { "slug": slug.current }`;
  const slugs = await client.fetch(query);
  if (!slugs || slugs.length === 0) {
    return [{ slug: 'dummy' }];
  }
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const query = `*[_type == "room" && slug.current == $slug][0] { name, description }`;
  const room = await client.fetch(query, { slug });
  if (!room) return { title: 'Room Not Found' };
  return {
    title: `${room.name} | The Divine Hima`,
    description: room.description,
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const query = `*[_type == "room" && slug.current == $slug][0] {
    _id,
    name,
    roomType,
    description,
    images,
    amenities,
    price
  }`;
  
  const room = await client.fetch(query, { slug });

  if (!room) {
    notFound();
  }

  const heroImage = room.images && room.images.length > 0 
    ? urlForImage(room.images[0]).url() 
    : 'https://thedivinehima.com/wp-content/uploads/2024/12/premium-3.jpg';

  return (
    <main className={styles.main}>
      <PageHero 
        title={room.name} 
        backgroundImage={heroImage}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '0.5rem 1rem', 
              backgroundColor: 'var(--primary-color)', 
              color: 'white', 
              borderRadius: '2rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              {room.roomType} Room
            </span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}>{room.name}</h1>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary-color)' }}>₹{room.price} / Night</p>
          </div>

          <div style={{ marginBottom: '3rem', fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}>
            <p>{room.description}</p>
          </div>

          {room.amenities && room.amenities.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--secondary-color)' }}>Room Amenities</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {room.amenities.map((amenity: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <span style={{ color: 'var(--primary-color)' }}>✨</span> {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}

          {room.images && room.images.length > 1 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--secondary-color)' }}>Gallery</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {room.images.slice(1).map((img: any, i: number) => (
                  <img 
                    key={i} 
                    src={urlForImage(img).url()} 
                    alt={`${room.name} - Image ${i + 2}`} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ))}
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>Book Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
