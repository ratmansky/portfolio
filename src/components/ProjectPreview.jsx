import React from 'react';

export default function ProjectPreview({ visible, color, image, imageAlt, point }) {
  const hasImage = Boolean(image);
  const style = point
    ? {
        '--preview-color': color,
        '--preview-x': `${point.x}px`,
        '--preview-y': `${point.y}px`,
      }
    : { '--preview-color': color };

  return (
    <div
      className={[
        'project-preview',
        visible ? 'is-visible' : '',
        hasImage ? 'project-preview--image' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
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
