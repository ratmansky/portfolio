import React, { useEffect, useState } from 'react';
import HoverLink from '../components/HoverLink';
import LinkRow from '../components/LinkRow';
import ProjectItem from '../components/ProjectItem';
import ProjectPreview from '../components/ProjectPreview';
import { projects } from '../data/projects';

const introLinks = [
  { label: 'e-mail', href: 'mailto:hello@vladimirratmansky.com' },
  { label: 'telegram', href: 'https://t.me/ratmanskii' },
  {
    label: 'cv',
    href: 'https://docs.google.com/document/d/1h2_EXgUdPY3j5BnsrHYqhF5eolvo7RXaHXGzEy5MEUE/edit?usp=sharing',
  },
];

function shouldUsePointerPreview() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(min-width: 641px) and (max-width: 960px) and (hover: hover) and (pointer: fine)').matches;
}

export default function Home() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewColor, setPreviewColor] = useState('#ffffff');
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageAlt, setPreviewImageAlt] = useState('');
  const [previewPoint, setPreviewPoint] = useState(null);

  useEffect(() => {
    projects.forEach((project) => {
      if (!project.previewImage) {
        return;
      }

      const img = new Image();
      img.src = project.previewImage;
    });
  }, []);

  const showPreview = (project, point = null) => {
    setPreviewColor(project.previewColor);
    setPreviewImage(project.previewImage ?? null);
    setPreviewImageAlt(project.previewImageAlt ?? '');
    setPreviewPoint(shouldUsePointerPreview() ? point : null);
    setPreviewVisible(true);
  };

  const hidePreview = () => {
    setPreviewVisible(false);
    setPreviewPoint(null);
  };

  const handleProjectsFocusOut = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      hidePreview();
    }
  };

  return (
    <main className="page">
      <ProjectPreview
        visible={previewVisible}
        color={previewColor}
        image={previewImage}
        imageAlt={previewImageAlt}
        point={previewPoint}
      />

      <section className="portfolio-layout" aria-label="Portfolio overview">
        <div className="portfolio-row portfolio-row--intro">
          <div className="portfolio-intro-header">
            <div className="portfolio-portrait-wrap">
              <img
                className="portfolio-portrait"
                src="/assets/shared/portrait.png"
                alt="Vladimir Ratmansky"
                width={157}
                height={209}
                decoding="async"
              />
              <span className="portfolio-portrait-tint" aria-hidden="true" />
            </div>
            <p className="portfolio-label">Vladimir Ratmansky</p>
          </div>

          <div className="portfolio-content">
            <p className="portfolio-copy">
              Hi! Over the past 8 years, I&apos;ve worked on learning platforms, teacher
              tools, and B2C products used by millions of people - helping teams simplify
              workflows, improve engagement, and build products people can actually use.
            </p>
            <LinkRow links={introLinks} />
          </div>
        </div>

        <div className="portfolio-row">
          <p className="portfolio-label">Projects</p>

          <div
            className="portfolio-content portfolio-projects"
            onMouseLeave={hidePreview}
            onFocusOut={handleProjectsFocusOut}
          >
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                onPreviewShow={showPreview}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
