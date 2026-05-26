import React, { useEffect, useMemo, useState } from 'react';
import HoverLink from '../components/HoverLink';
import { covo as content } from '../projects/covo/content';

function CaseStudyImage({ image, wide }) {
  if (!image) {
    return null;
  }

  return (
    <figure className={`case-study-figure ${wide ? 'case-study-figure--wide' : ''}`}>
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
    </figure>
  );
}

function CaseStudySection({ section, metrics }) {
  if (section.type === 'metrics') {
    return (
      <div className="case-study-block">
        <ul className="case-study-metrics" aria-label="Project metrics">
          {metrics.map((metric) => (
            <li key={metric.label} className="case-study-metric">
              <p className="case-study-metric-value">{metric.value}</p>
              <p className="case-study-metric-label">{metric.label}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const isSubsection = section.type === 'subsection';
  const hasMedia = Boolean(section.image || section.imageGrid);

  return (
    <div
      className={[
        'case-study-block',
        isSubsection ? 'case-study-block--subsection' : '',
        hasMedia ? 'case-study-block--with-media' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="case-study-text">
          {paragraph}
        </p>
      ))}

      {section.list ? (
        <ul className="case-study-list">
          {section.list.map((item) => (
            <li key={item.title} className="case-study-list-item">
              <p className="case-study-list-title">{item.title}</p>
              <p className="case-study-text">{item.text}</p>
            </li>
          ))}
        </ul>
      ) : null}

      <CaseStudyImage image={section.image} wide />

      {section.imageGrid ? (
        <div className="case-study-grid">
          {section.imageGrid.map((image) => (
            <CaseStudyImage key={image.src} image={image} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CaseStudyScrollPreview({ sections, onActiveIndexChange }) {
  const previewSections = useMemo(
    () => sections
      .map((section, index) => ({ ...section.previewImage, index }))
      .filter((preview) => preview.src),
    [sections],
  );
  const [activePreview, setActivePreview] = useState(previewSections[0] ?? null);

  useEffect(() => {
    previewSections.forEach((preview) => {
      const image = new Image();
      image.src = preview.src;
    });
  }, [previewSections]);

  useEffect(() => {
    if (!previewSections.length || typeof window === 'undefined') {
      return undefined;
    }

    let frame = 0;
    const initialTimers = [];

    const updateActivePreview = () => {
      frame = 0;

      const marker = window.innerHeight * 0.42;
      const previewBlocks = [...document.querySelectorAll('[data-case-preview-index]')];
      const currentBlock = previewBlocks.reduce((current, block) => {
        const rect = block.getBoundingClientRect();
        const distance = Math.abs(rect.top - marker);

        if (rect.top <= marker && rect.bottom >= 80) {
          return { block, distance: 0 };
        }

        if (!current || distance < current.distance) {
          return { block, distance };
        }

        return current;
      }, null);

      if (!currentBlock) {
        return;
      }

      const index = Number(currentBlock.block.dataset.casePreviewIndex);
      const nextPreview = previewSections.find((preview) => preview.index === index);

      if (nextPreview) {
        onActiveIndexChange?.(index);
        setActivePreview((currentPreview) => (
          currentPreview?.src === nextPreview.src ? currentPreview : nextPreview
        ));
      }
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateActivePreview);
      }
    };

    updateActivePreview();
    initialTimers.push(window.setTimeout(updateActivePreview, 120));
    initialTimers.push(window.setTimeout(updateActivePreview, 480));
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('pageshow', requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      initialTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('pageshow', requestUpdate);
    };
  }, [onActiveIndexChange, previewSections]);

  if (!activePreview) {
    return null;
  }

  return (
    <figure className="case-study-scroll-preview" aria-hidden="true">
      <img
        key={activePreview.src}
        src={activePreview.src}
        alt=""
        loading="eager"
        decoding="async"
      />
    </figure>
  );
}

export default function Covo() {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  useEffect(() => {
    document.title = `${content.client} — ${content.title} | Vladimir Ratmansky`;
  }, []);

  return (
    <main className="page page--case-study">
      <CaseStudyScrollPreview
        sections={content.sections}
        onActiveIndexChange={setActivePreviewIndex}
      />

      <article className="case-study">
        <header className="case-study-header portfolio-row">
          <p className="portfolio-label">
            <HoverLink to="/">← Projects</HoverLink>
          </p>

          <div className="portfolio-content case-study-header-content">
            <p className="case-study-meta">
              {content.meta ??
                [content.client, content.period, content.role].filter(Boolean).join(' · ')}
            </p>
            <h1 className="case-study-title">{content.title}</h1>

            {content.summary ? (
              <div className="case-study-summary" role="group" aria-label="Project overview">
                <div className="case-study-summary-heading case-study-summary-heading--left">
                  {content.summary.logo ? (
                    <>
                      <img
                        src={content.summary.logo}
                        alt=""
                        className="case-study-summary-logo case-study-summary-logo--theme-dark"
                        width={24}
                        height={24}
                        decoding="async"
                      />
                      {content.summary.logoLight ? (
                        <img
                          src={content.summary.logoLight}
                          alt=""
                          className="case-study-summary-logo case-study-summary-logo--theme-light"
                          width={24}
                          height={24}
                          decoding="async"
                        />
                      ) : null}
                    </>
                  ) : null}
                  <span>{content.summary.heading}</span>
                </div>
                <p className="case-study-summary-heading case-study-summary-heading--right">
                  {content.summary.team.heading}
                </p>

                <div className="case-study-summary-cell case-study-summary-cell--left">
                  {content.summary.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="case-study-text">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <aside className="case-study-summary-cell case-study-summary-cell--right" aria-label="Team">
                  <ul className="case-study-summary-team">
                    {content.summary.team.members.map((member) => (
                      <li
                        key={member.text}
                        className={member.muted ? 'case-study-summary-team-item--muted' : undefined}
                      >
                        {member.text}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            ) : null}
          </div>
        </header>

        {content.sections.map((section, index) => (
          <div
            className={[
              'case-study-body',
              'portfolio-row',
              section.previewImage && activePreviewIndex === index ? 'case-study-body--preview-active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            key={section.heading || section.type}
            data-case-preview-index={section.previewImage ? index : undefined}
          >
            <p className="portfolio-label" aria-hidden="true">
              <span
                className={[
                  section.previewImage ? 'hover-link' : '',
                  section.previewImage && activePreviewIndex === index ? 'hover-link--filled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {section.heading || 'Case study'}
              </span>
            </p>

            <div className="portfolio-content case-study-content">
              <CaseStudySection
                section={section}
                metrics={content.metrics}
              />
            </div>
          </div>
        ))}
      </article>
    </main>
  );
}
