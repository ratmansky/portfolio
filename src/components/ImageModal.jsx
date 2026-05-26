import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ImageModal({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!image) {
    return null;
  }

  return createPortal(
    <div
      className="image-modal"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || 'Image preview'}
      onClick={onClose}
    >
      <button
        className="image-modal-close"
        type="button"
        aria-label="Close image"
        onClick={onClose}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <img
        className="image-modal-image"
        src={image.src}
        alt={image.alt}
        decoding="async"
        onClick={(event) => event.stopPropagation()}
      />
    </div>,
    document.body,
  );
}
