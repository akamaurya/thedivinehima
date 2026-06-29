'use client';
import { useState } from 'react';
import PageHero from '@/components/PageHero';
import styles from './page.module.css';

const images = [
  { id: 1, category: 'property', src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', alt: 'Property View' },
  { id: 2, category: 'rooms', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', alt: 'Premium Room' },
  { id: 3, category: 'rooms', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80', alt: 'Superior Room' },
  { id: 4, category: 'rooms', src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80', alt: 'Deluxe Room' },
  { id: 5, category: 'dining', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', alt: 'The Restaurant' },
  { id: 6, category: 'dining', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80', alt: 'Divine Cafe' },
  { id: 7, category: 'dining', src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', alt: 'Firewood Pizzeria' },
  { id: 8, category: 'dining', src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80', alt: 'The Bar By Far' },
  { id: 9, category: 'views', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: 'Mountain View' },
  { id: 10, category: 'views', src: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80', alt: 'Himalayan Scenery' },
  { id: 11, category: 'views', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', alt: 'Landscape' },
  { id: 12, category: 'property', src: 'https://images.unsplash.com/photo-1585136917935-1a7dd2e8e5b1?w=600&q=80', alt: 'Hotel Exterior' },
];

const categories = ['All', 'Property', 'Rooms', 'Dining', 'Views', 'Activities'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <main className={styles.main}>
      <PageHero 
        title="Gallery" 
        subtitle="A glimpse into The Divine Hima"
        backgroundImage="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
      />

      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          
          <div className={styles.filterContainer}>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.masonryGrid}>
            {filteredImages.map((img) => (
              <div 
                key={img.id} 
                className={styles.masonryItem}
                onClick={() => setLightboxImage(img.src.replace('w=600', 'w=1200'))}
              >
                <img src={img.src} alt={img.alt} className={styles.galleryImage} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {lightboxImage && (
        <div className={styles.lightbox} onClick={() => setLightboxImage(null)}>
          <button className={styles.closeLightbox} onClick={() => setLightboxImage(null)}>✕</button>
          <img src={lightboxImage} alt="Enlarged view" className={styles.lightboxImg} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
