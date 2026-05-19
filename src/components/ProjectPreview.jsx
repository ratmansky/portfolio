import React from 'react';

export default function ProjectPreview({ visible, color, image, imageAlt }) {
  const hasImage = Boolean(image);

  return (
    <div
      className={[
        'project-preview',
        visible ? 'is-visible' : '',
        hasImage ? 'project-preview--image' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--preview-color': color }}
      aria-hidden={!visible}
    >
      {hasImage ? (
        <img
          className="project-preview-image"
          src={image}
          alt={imageAlt || ''}
          loading="eager"
          decoding="async"
        />
      ) : null}
    </div>
  );
}
