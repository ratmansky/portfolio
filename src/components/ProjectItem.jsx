import React from 'react';
import HoverLink from './HoverLink';

export default function ProjectItem({ project, onPreviewShow }) {
  const linkProps = project.to?.startsWith('/')
    ? { to: project.to }
    : { href: project.href || project.to || '#' };

  return (
    <article
      className="project-item"
      onMouseEnter={() => onPreviewShow(project)}
      onFocus={() => onPreviewShow(project)}
    >
      <div className="project-header">
        <HoverLink {...linkProps} className="project-title">
          {project.title}
        </HoverLink>
        <p className="project-date">{project.period}</p>
      </div>
      <p className="project-description">{project.description}</p>
    </article>
  );
}
