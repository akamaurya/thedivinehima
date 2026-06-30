'use client';

import Image, { ImageProps } from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanity/lib/client';

// Initialize the builder with the Sanity client
const builder = imageUrlBuilder(client);

// The custom loader uses Sanity's Edge CDN for on-the-fly resizing and WebP/AVIF conversion
const sanityLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return builder
    .image(src)
    .width(width)
    .quality(quality || 75)
    .auto('format') // This ensures Sanity automatically serves WebP or AVIF when supported
    .url();
};

export interface SanityImageProps extends Omit<ImageProps, 'src'> {
  // `image` accepts the raw image object or reference returned from Sanity
  image: any; 
  alt: string;
}

import { forwardRef } from 'react';

export default forwardRef<HTMLImageElement, SanityImageProps>(
  function SanityImage({ image, alt, ...props }, ref) {
    if (!image?.asset?._ref && !image?.asset?._id && typeof image !== 'string') {
      return null;
    }

    const imageRef = typeof image === 'string' ? image : (image?.asset?._ref || image?.asset?._id);
    
    // Generate the Sanity CDN URL directly. 
    // Since Next.js has `unoptimized: true` set globally for static exports, 
    // the custom loader prop is ignored. We must pass the absolute URL directly.
    const imageUrl = builder
      .image(imageRef)
      .auto('format')
      .url();

    return (
      <Image
        ref={ref}
        src={imageUrl}
        alt={alt || "Sanity Image"}
        {...props}
      />
    );
  }
);
