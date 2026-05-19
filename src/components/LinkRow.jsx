import React from 'react';
import HoverLink from './HoverLink';

export default function LinkRow({ links }) {
  return (
    <div className="link-row" aria-label="Contact links">
      {links.map((item, index) => (
        <HoverLink
          key={`${item.label}-${index}`}
          href={item.href}
          to={item.to}
        >
          {item.label}
        </HoverLink>
      ))}
    </div>
  );
}
