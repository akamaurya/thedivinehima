import type { Metadata } from 'next';
import { cache } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '../../../../sanity/lib/client';
import { urlForImage } from '../../../../sanity/lib/image';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/JsonLd';
import { ROOM_FAQS } from '@/lib/faqs';
import { BOOKING_URL, HOTEL_ID, SITE } from '@/lib/schema';
import styles from '../../divine-rooms/page.module.css';

export const dynamic = 'force-static';

// One Sanity request per page, shared by generateMetadata and the page.
const get = cache((slug: string) => client.fetch(`*[_type == "room" && slug.current == $slug][0]`, { slug }));
const getOthers = cache((slug: string) =>
  client.fetch(`*[_type == "room" && defined(slug.current) && slug.current != $slug] | order(price asc) { name, "slug": slug.current, price }`, { slug }),
);

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const heroOf = (room: any) => (room.images?.length ? urlForImage(room.images[0]).width(1920).url() : '/wp-content/uploads/2024/12/premium-3.jpg');
const describe = (room: any) =>
  room.seoDescription ||
  `${room.price ? `From ${inr(room.price)} a night with breakfast. ` : ''}${room.description ?? ''}`.slice(0, 155).replace(/\s+\S*$/, '…');

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "room" && defined(slug.current)] { "slug": slug.current }`);
  if (!slugs || slugs.length === 0) {
    return [{ slug: 'dummy' }];
  }
  return slugs
    .filter((s: { slug: string | null }) => typeof s.slug === 'string' && s.slug.length > 0)
    .map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = await get(slug);
  if (!room) return { title: 'Room Not Found' };

  const title = room.seoTitle || `${room.name} | Boutique Room in Dharamshala | The Divine Hima`;
  const description = describe(room);

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: `${SITE}/rooms/${slug}/`,
      images: [{ url: heroOf(room), width: 1200, height: 630, alt: `${room.name} at The Divine Hima, Dharamshala` }],
    },
    alternates: { canonical: `/rooms/${slug}/` },
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [room, others] = await Promise.all([get(slug), getOthers(slug)]);

  if (!room) {
    notFound();
  }

  const url = `${SITE}/rooms/${slug}/`;
  const images: string[] = (room.images ?? []).map((img: any) => urlForImage(img).width(1200).url());

  return (
    <main className={styles.main}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HotelRoom',
          '@id': `${url}#room`,
          name: room.name,
          url,
          description: room.description,
          image: images,
          containedInPlace: { '@id': HOTEL_ID },
          amenityFeature: (room.amenities ?? []).map((name: string) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
          ...(room.price
            ? { offers: { '@type': 'Offer', price: String(room.price), priceCurrency: 'INR', unitText: 'per night', description: 'Breakfast included, taxes extra', url: BOOKING_URL } }
            : {}),
        }}
      />
      <PageHero
        title={room.name}
        subtitle={room.roomType ? `${room.roomType[0].toUpperCase()}${room.roomType.slice(1)} room at The Divine Hima, Dharamshala` : 'A boutique room at The Divine Hima, Dharamshala'}
        backgroundImage={heroOf(room)}
        alt={`${room.name} at The Divine Hima, Dharamshala`}
      />
      <Breadcrumbs items={[{ name: 'Rooms', href: '/divine-rooms/' }, { name: room.name, href: `/rooms/${slug}/` }]} />

      <section className="section">
        <div className={`container ${styles.detail}`}>
          <div className={styles.detailMeta}>
            {room.price ? <p className={styles.roomPrice}>From {inr(room.price)} a night, breakfast included</p> : <span />}
            <a href={BOOKING_URL} className="btn btn-primary">Check availability</a>
          </div>

          <div className="prose">
            <h2>About this room</h2>
            <p>{room.description}</p>
            <p>
              Every stay includes complimentary breakfast and daily housekeeping. Taxes are extra. Check-in is from 2:00 PM and check-out by 11:00 AM.
            </p>

            {room.amenities?.length > 0 && (
              <>
                <h2>Room amenities</h2>
                <ul className={styles.amenitiesGrid}>
                  {room.amenities.map((amenity: string) => (
                    <li key={amenity} className={styles.amenityPill}>{amenity}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {images.length > 1 && (
            <>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', marginTop: '3.5rem' }}>Photos</h2>
              <div className={styles.detailGallery}>
                {images.slice(1).map((src, i) => (
                  <img key={src} src={src} alt={`${room.name} at The Divine Hima, photo ${i + 2}`} loading="lazy" />
                ))}
              </div>
            </>
          )}

          {others?.length > 0 && (
            <div className="prose" style={{ marginTop: '3.5rem' }}>
              <h2>Other rooms at The Divine Hima</h2>
              <ul className={styles.otherRooms}>
                {others.map((o: any) => (
                  <li key={o.slug}>
                    <Link href={`/rooms/${o.slug}/`}>{o.name}</Link>
                    {o.price ? `, from ${inr(o.price)}` : ''}
                  </li>
                ))}
              </ul>
              <p><Link href="/divine-rooms/">Compare all rooms</Link></p>
            </div>
          )}
        </div>
      </section>

      <FAQ items={ROOM_FAQS} title="Before you book" />

      <section className="section" style={{ textAlign: 'center', paddingTop: 0 }}>
        <a href={BOOKING_URL} className="btn btn-primary">Book {room.name}</a>
      </section>
    </main>
  );
}
