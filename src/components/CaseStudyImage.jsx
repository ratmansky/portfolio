import React, { useState } from 'react';
import ImageModal from './ImageModal';

export default function CaseStudyImage({ image, wide }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!image) {
    return null;
  }

  return (
    <figure className={`case-study-figure ${wide ? 'case-study-figure--wide' : ''}`}>
      <button
        className="case-study-image-button"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open image"
      >
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      </button>

      {isOpen ? <ImageModal image={image} onClose={() => setIsOpen(false)} /> : null}
    </figure>
  );
}
