import React from 'react';
import { Link } from 'react-router-dom';
import useDelayedLinkClick from '../hooks/useDelayedLinkClick';

export default function HoverLink({ to, href, className, children }) {
  const handleDelayedClick = useDelayedLinkClick();
  const isRouterLink = Boolean(to);
  const isExternal = href?.startsWith('http');
  const classNames = className ? `hover-link ${className}` : 'hover-link';

  const onClick = (event) => {
    handleDelayedClick(event, { to, href, isExternal });
  };

  if (isRouterLink) {
    return (
      <Link className={classNames} to={to} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={classNames}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
