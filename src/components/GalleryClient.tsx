'use client';
import { useState } from 'react';
import styles from '../app/gallery/page.module.css';

export interface GalleryImage {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories = ['All', 'Property', 'Rooms', 'Dining', 'Views', 'Activities'];

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
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
            key={img._id} 
            className={styles.masonryItem}
            onClick={() => setLightboxImage(img.imageUrl)}
          >
            <img src={img.imageUrl} alt={img.title || 'Gallery Image'} className={styles.galleryImage} />
          </div>
        ))}
      </div>

      {lightboxImage && (
        <div className={styles.lightbox} onClick={() => setLightboxImage(null)}>
          <button className={styles.closeLightbox} onClick={() => setLightboxImage(null)}>✕</button>
          <img src={lightboxImage} alt="Enlarged view" className={styles.lightboxImg} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
