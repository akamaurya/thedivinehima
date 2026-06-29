'use client';
import { useState } from 'react';
import PageHero from '@/components/PageHero';
import styles from './page.module.css';

const images = [
  { id: 1, category: 'property', src: 'https://thedivinehima.com/wp-content/uploads/2016/03/divine-hima0044.jpg', alt: 'Property View' },
  { id: 2, category: 'rooms', src: 'https://thedivinehima.com/wp-content/uploads/2024/12/premium-1.jpg', alt: 'Premium Room' },
  { id: 3, category: 'rooms', src: 'https://thedivinehima.com/wp-content/uploads/2024/12/luxury-1.jpg', alt: 'Superior Room' },
  { id: 4, category: 'rooms', src: 'https://thedivinehima.com/wp-content/uploads/2024/12/deluxe-2.jpg', alt: 'Deluxe Room' },
  { id: 5, category: 'dining', src: 'https://thedivinehima.com/wp-content/uploads/2024/12/restro-icon.jpg', alt: 'The Restaurant' },
  { id: 6, category: 'dining', src: 'https://thedivinehima.com/wp-content/uploads/2024/12/cafe.jpg', alt: 'Divine Cafe' },
  { id: 7, category: 'dining', src: 'https://thedivinehima.com/wp-content/uploads/2024/12/pizerria.jpg', alt: 'Firewood Pizzeria' },
  { id: 8, category: 'dining', src: 'https://thedivinehima.com/wp-content/uploads/2024/12/bar.jpg', alt: 'The Bar By Far' },
  { id: 9, category: 'views', src: 'https://thedivinehima.com/wp-content/uploads/2018/04/takling-la-1.jpg', alt: 'Mountain View' },
  { id: 10, category: 'views', src: 'https://thedivinehima.com/wp-content/uploads/2023/12/southcol-main.jpg', alt: 'Himalayan Scenery' },
  { id: 11, category: 'views', src: 'https://thedivinehima.com/wp-content/uploads/2024/12/luxury-hotel-in-dharamshala.jpg', alt: 'Landscape' },
  { id: 12, category: 'property', src: 'https://thedivinehima.com/wp-content/uploads/2019/01/IMG_20181205_091933.jpg', alt: 'Hotel Exterior' },
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
        backgroundImage="https://thedivinehima.com/wp-content/uploads/2018/04/takling-la-1.jpg"
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
