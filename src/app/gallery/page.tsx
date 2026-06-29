import type { Metadata } from 'next';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import PageHero from '@/components/PageHero';
import GalleryClient, { GalleryImage } from '@/components/GalleryClient';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gallery | The Divine Hima',
  description: 'A visual journey through The Divine Hima, Dharamshala.',
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
        title="Gallery" 
        subtitle="A glimpse into The Divine Hima"
        backgroundImage="https://thedivinehima.com/wp-content/uploads/2018/04/takling-la-1.jpg"
      />
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <GalleryClient images={images} />
        </div>
      </section>
    </main>
  );
}
