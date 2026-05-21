import React from 'react';
import { Link } from 'react-router-dom';
import useDelayedLinkClick from '../hooks/useDelayedLinkClick';

export default function ProjectItem({ project, onPreviewShow }) {
  const handleDelayedClick = useDelayedLinkClick();
  const isRouterLink = project.to?.startsWith('/');
  const isExternal = project.href?.startsWith('http');
  const href = project.href || project.to || '#';

  const onClick = (event) => {
    handleDelayedClick(event, {
      to: isRouterLink ? project.to : undefined,
      href: isRouterLink ? undefined : href,
      isExternal,
    });
  };

  const linkBody = (
    <>
      <div className="project-header">
        <span className="project-title hover-link">{project.title}</span>
        <span className="project-date">{project.period}</span>
      </div>
      <p className="project-description">{project.description}</p>
    </>
  );

  return (
    <article className="project-item">
      <div
        className="project-item-content"
        onMouseEnter={() => onPreviewShow(project)}
        onFocus={() => onPreviewShow(project)}
      >
        {isRouterLink ? (
          <Link className="project-item-link" to={project.to} onClick={onClick}>
            {linkBody}
          </Link>
        ) : (
          <a
            className="project-item-link"
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
            onClick={onClick}
          >
            {linkBody}
          </a>
        )}
      </div>
    </article>
  );
}
