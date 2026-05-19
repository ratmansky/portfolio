import React from 'react';
import { Link } from 'react-router-dom';

export default function HoverLink({ to, href, className, children }) {
  const isRouterLink = Boolean(to);
  const isExternal = href?.startsWith('http');
  const classNames = className ? `hover-link ${className}` : 'hover-link';

  if (isRouterLink) {
    return (
      <Link className={classNames} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={classNames}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  );
}
