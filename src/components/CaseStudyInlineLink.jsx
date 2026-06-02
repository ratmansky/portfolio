import React, { useEffect, useState } from 'react';
import HoverLink from './HoverLink';

const MEASUREMATE_FAVICON = '/covo/cov-icon.svg';
const MEASUREMATE_FAVICON_FALLBACK = '/covo/cov-icon.png';

function getExternalFaviconSrc(href) {
  try {
    return `${new URL(href).origin}/favicon.ico`;
  } catch {
    return undefined;
  }
}

function CaseStudyLinkIcon({ href, icon }) {
  const primarySrc = icon || getExternalFaviconSrc(href);
  const fallbackSrc = icon?.includes('mezuremate') || href?.includes('mezuremate')
    ? MEASUREMATE_FAVICON
    : undefined;
  const [src, setSrc] = useState(primarySrc);

  useEffect(() => {
    setSrc(primarySrc);
  }, [primarySrc]);

  if (!src) {
    return null;
  }

  const handleError = () => {
    if (fallbackSrc && src !== fallbackSrc) {
      setSrc(fallbackSrc);
      return;
    }

    if (
      (icon?.includes('mezuremate') || href?.includes('mezuremate'))
      && src !== MEASUREMATE_FAVICON_FALLBACK
    ) {
      setSrc(MEASUREMATE_FAVICON_FALLBACK);
      return;
    }

    setSrc(undefined);
  };

  return (
    <img
      className="case-study-link-icon"
      src={src}
      alt=""
      width={16}
      height={16}
      loading="lazy"
      decoding="async"
      onError={handleError}
    />
  );
}

export default function CaseStudyInlineLink({ href, label, icon }) {
  return (
    <HoverLink href={href} className="case-study-inline-link">
      <CaseStudyLinkIcon href={href} icon={icon} />
      {label}
    </HoverLink>
  );
}

export function getCaseStudyParagraphKey(paragraph) {
  if (typeof paragraph === 'string') {
    return paragraph.slice(0, 48);
  }

  return paragraph
    .map((part) => (typeof part === 'string' ? part : part.label ?? part.text ?? ''))
    .join('')
    .slice(0, 48);
}

export function CaseStudyParagraphContent({ paragraph }) {
  if (typeof paragraph === 'string') {
    return paragraph;
  }

  return paragraph.map((part, index) => {
    if (typeof part === 'string') {
      return part;
    }

    if (part.type === 'link') {
      return (
        <CaseStudyInlineLink
          key={`${part.href}-${index}`}
          href={part.href}
          label={part.label}
          icon={part.icon}
        />
      );
    }

    return part.text ?? null;
  });
}
