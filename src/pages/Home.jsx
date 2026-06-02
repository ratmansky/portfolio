import React, { useEffect, useState } from 'react';
import HoverLink from '../components/HoverLink';
import LinkRow from '../components/LinkRow';
import ProjectItem from '../components/ProjectItem';
import ProjectPreview from '../components/ProjectPreview';
import { projects } from '../data/projects';
import { defaultHomeContent, defaultUiContent } from '../content/siteContent';
import { useLocalizedContent } from '../content/locale';

const introLinks = [
  { label: 'e-mail', href: 'mailto:hello@vladimirratmansky.com' },
  { label: 'telegram', href: 'https://t.me/ratmanskii' },
  {
    label: 'cv',
    href: 'https://docs.google.com/document/d/1h2_EXgUdPY3j5BnsrHYqhF5eolvo7RXaHXGzEy5MEUE/edit?usp=sharing',
  },
];

const PREVIEW_WIDTH = 342;
const PREVIEW_HEIGHT = Math.round((PREVIEW_WIDTH * 3) / 4);
const PREVIEW_OFFSET = 16;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function shouldUsePointerPreview() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(min-width: 641px) and (max-width: 1280px) and (hover: hover) and (pointer: fine)').matches;
}

function getPreviewPoint(point) {
  if (!point || typeof window === 'undefined' || !shouldUsePointerPreview()) {
    return null;
  }

  const maxX = Math.max(PREVIEW_OFFSET, window.innerWidth - PREVIEW_WIDTH - PREVIEW_OFFSET);
  const maxY = Math.max(PREVIEW_OFFSET, window.innerHeight - PREVIEW_HEIGHT - PREVIEW_OFFSET);
  const preferredX = point.x + PREVIEW_OFFSET;
  const preferredY = point.y - PREVIEW_HEIGHT - PREVIEW_OFFSET;

  return {
    x: clamp(preferredX, PREVIEW_OFFSET, maxX),
    y: clamp(preferredY, PREVIEW_OFFSET, maxY),
  };
}

export default function Home() {
  const homeContent = useLocalizedContent('home', defaultHomeContent);
  const ui = useLocalizedContent('ui', defaultUiContent);
  const localizedProjects = useLocalizedContent('projects', projects);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewColor, setPreviewColor] = useState('#ffffff');
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageAlt, setPreviewImageAlt] = useState('');
  const [previewPoint, setPreviewPoint] = useState(null);

  useEffect(() => {
    localizedProjects.forEach((project) => {
      if (!project.previewImage) {
        return;
      }

      const img = new Image();
      img.src = project.previewImage;
    });
  }, [localizedProjects]);

  const showPreview = (project, point = null) => {
    setPreviewColor(project.previewColor);
    setPreviewImage(project.previewImage ?? null);
    setPreviewImageAlt(project.previewImageAlt ?? '');
    setPreviewPoint(getPreviewPoint(point));
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

      <section className="portfolio-layout" aria-label={ui.portfolioOverviewAria}>
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
            <p className="portfolio-label">{homeContent.nameLabel}</p>
          </div>

          <div className="portfolio-content">
            <p className="portfolio-copy">{homeContent.intro}</p>
            <LinkRow links={introLinks} />
          </div>
        </div>

        <div className="portfolio-row">
          <p className="portfolio-label">{ui.projectsLabel}</p>

          <div
            className="portfolio-content portfolio-projects"
            onMouseLeave={hidePreview}
            onFocusOut={handleProjectsFocusOut}
          >
            {localizedProjects.map((project) => (
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
