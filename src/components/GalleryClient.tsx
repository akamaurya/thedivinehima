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

  // Only offer filters that have photos, so no tab opens onto an empty grid.
  const categories = ['All', 'Property', 'Rooms', 'Dining', 'Views', 'Activities'].filter(
    (cat) => cat === 'All' || images.some((img) => img.category?.toLowerCase() === cat.toLowerCase())
  );

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <div className={styles.filterRow}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.filterPill} ${activeCategory === cat ? styles.filterPillActive : ''}`}
            aria-pressed={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.masonryGrid}>
        {filteredImages.map((img) => (
          <button
            type="button"
            key={img._id}
            className={styles.galleryItem}
            aria-label={`Enlarge ${img.title || 'photo'}`}
            onClick={() => setLightboxImage(img.imageUrl)}
          >
            <img src={img.imageUrl} alt={img.title || 'Gallery Image'} />
          </button>
        ))}
      </div>

      {lightboxImage && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxImage(null)}>
          <button className={styles.lightboxClose} aria-label="Close" onClick={() => setLightboxImage(null)}>✕</button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage} alt="Enlarged view" />
          </div>
        </div>
      )}
    </>
  );
}
