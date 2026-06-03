import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const CLOSE_DURATION_MS = 260;
const CLOSE_DURATION_REDUCED_MS = 160;

function getCloseDurationMs() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? CLOSE_DURATION_REDUCED_MS
    : CLOSE_DURATION_MS;
}

export default function ImageModal({ image, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef(null);
  const isClosingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (isClosingRef.current) {
      return;
    }

    isClosingRef.current = true;
    setIsClosing(true);
  }, []);

  useEffect(() => {
    if (!image) {
      return undefined;
    }

    setIsOpen(false);
    setIsClosing(false);
    isClosingRef.current = false;

    let outerFrame = 0;
    let innerFrame = 0;

    outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, [image]);

  useEffect(() => {
    if (!isClosing) {
      return undefined;
    }

    closeTimeoutRef.current = window.setTimeout(onClose, getCloseDurationMs());

    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, [isClosing, onClose]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  if (!image) {
    return null;
  }

  const modalClassName = [
    'image-modal',
    isOpen && 'is-open',
    isClosing && 'is-closing',
  ]
    .filter(Boolean)
    .join(' ');

  return createPortal(
    <div
      className={modalClassName}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || 'Image preview'}
      onClick={handleClose}
    >
      <div className="image-modal-backdrop" aria-hidden="true" />
      <div
        className="image-modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="image-modal-close"
          type="button"
          aria-label="Close image"
          onClick={handleClose}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <img
          className="image-modal-image"
          src={image.src}
          alt={image.alt}
          decoding="async"
        />
      </div>
    </div>,
    document.body,
  );
}
