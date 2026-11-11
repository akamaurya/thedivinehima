import type { Metadata } from 'next';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import PageHero from '@/components/PageHero';
import GalleryClient, { GalleryImage } from '@/components/GalleryClient';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './page.module.css';

const description = 'Photos of The Divine Hima, Dharamshala: the rooms, the restaurant and café, the art on the walls and the Dhauladhar views from Sidhpur.';

export const metadata: Metadata = {
  title: { absolute: 'Photo Gallery: Rooms, Dining & Views | The Divine Hima, Dharamshala' },
  description,
  openGraph: {
    title: 'Photo Gallery | The Divine Hima, Dharamshala',
    description,
    url: 'https://thedivinehima.com/gallery/',
    images: [
      {
        url: '/wp-content/uploads/2018/04/takling-la-1.jpg',
        width: 1200,
        height: 630,
        alt: 'The Divine Hima Gallery',
      }
    ],
  },
  alternates: {
    canonical: '/gallery/',
  },
};

export const dynamic = 'force-static';

export default async function GalleryPage() {
  const query = `*[_type == "galleryImage"] | order(order asc) {
    _id,
    title,
    category,
    image
  }`;

  const fetchedImages = await client.fetch(query);
  const images: GalleryImage[] = fetchedImages.map((img: any) => ({
    _id: img._id,
    title: img.title || 'Gallery Image',
    category: img.category || 'property',
    imageUrl: img.image ? urlForImage(img.image).url() : '',
  })).filter((img: GalleryImage) => img.imageUrl !== '');

  return (
    <main className={styles.main}>
      <PageHero 
        title="Photo Gallery"
        subtitle="Rooms, dining and Himalayan views at The Divine Hima"
        backgroundImage="/wp-content/uploads/2018/04/takling-la-1.jpg"
        alt="The Takling La Pass room at The Divine Hima, Dharamshala"
      />
      <Breadcrumbs items={[{ name: 'Gallery', href: '/gallery/' }]} />
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <GalleryClient images={images} />
        </div>
      </section>
    </main>
  );
}
