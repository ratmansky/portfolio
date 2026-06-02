import React, { useEffect, useMemo, useState } from 'react';
import CaseStudyImage from '../components/CaseStudyImage';
import {
  CaseStudyParagraphContent,
  getCaseStudyParagraphKey,
} from '../components/CaseStudyInlineLink';
import HoverLink from '../components/HoverLink';
import ImageModal from '../components/ImageModal';
import {
  redesignOfTeacherDashboard as content,
  getTeacherDashboardPreviewSections,
} from '../projects/redesign-of-teacher-dashboard/content';

function CaseStudyParagraphs({ paragraphs, inlinePreview, onOpenPreview }) {
  return paragraphs?.map((paragraph, paragraphIndex) => (
    <p key={getCaseStudyParagraphKey(paragraph)} className="case-study-text">
      {paragraphIndex === 0 && inlinePreview ? (
        <button
          className="case-study-inline-preview"
          type="button"
          aria-label="Open section illustration"
          onClick={() => onOpenPreview(inlinePreview)}
        >
          <img
            src={inlinePreview.src}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </button>
      ) : null}
      <CaseStudyParagraphContent paragraph={paragraph} />
    </p>
  ));
}

function CaseStudySubsection({
  subsection,
  previewMarker,
  onOpenPreview,
}) {
  return (
    <div
      className="case-study-subsection"
      data-case-preview-index={previewMarker}
    >
      <h3 className="case-study-subheading">{subsection.heading}</h3>
      <CaseStudyParagraphs
        paragraphs={subsection.paragraphs}
        inlinePreview={subsection.previewImage}
        onOpenPreview={onOpenPreview}
      />
      <CaseStudyImage image={subsection.image} wide />
    </div>
  );
}

function CaseStudySection({ section, metrics, previewMarkers, onOpenPreview }) {
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
        section.subsections?.length ? 'case-study-block--with-subsections' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {section.subsections?.length ? (
        section.subsections.map((subsection, subsectionIndex) => (
          <CaseStudySubsection
            key={subsection.heading}
            subsection={subsection}
            previewMarker={previewMarkers?.[subsectionIndex]}
            onOpenPreview={onOpenPreview}
          />
        ))
      ) : (
        <CaseStudyParagraphs
          paragraphs={section.paragraphs}
          inlinePreview={section.previewImage}
          onOpenPreview={onOpenPreview}
        />
      )}

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

function CaseStudyScrollPreview({ previewSections, onActiveSectionIndexChange }) {
  const [activePreview, setActivePreview] = useState(previewSections[0] ?? null);
  const [openPreview, setOpenPreview] = useState(null);

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

      const previewIndex = Number(currentBlock.block.dataset.casePreviewIndex);
      const nextPreview = previewSections.find((preview) => preview.previewIndex === previewIndex);

      if (nextPreview) {
        onActiveSectionIndexChange?.(nextPreview.sectionIndex);
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
  }, [onActiveSectionIndexChange, previewSections]);

  if (!activePreview) {
    return null;
  }

  return (
    <figure className="case-study-scroll-preview">
      <button
        className="case-study-scroll-preview-button"
        type="button"
        aria-label="Open image"
        onClick={() => setOpenPreview(activePreview)}
      >
        <img
          key={activePreview.src}
          src={activePreview.src}
          alt={activePreview.alt}
          loading="eager"
          decoding="async"
        />
      </button>
      {openPreview ? (
        <ImageModal image={openPreview} onClose={() => setOpenPreview(null)} />
      ) : null}
    </figure>
  );
}

export default function RedesignOfTeacherDashboard() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [openInlinePreview, setOpenInlinePreview] = useState(null);

  const previewSections = useMemo(
    () => getTeacherDashboardPreviewSections(content.sections),
    [],
  );

  const sectionPreviewMarkers = useMemo(
    () => content.sections.map((section) => {
      if (section.previewImage?.src) {
        return previewSections.find((item) => item.src === section.previewImage.src)?.previewIndex;
      }

      if (section.subsections?.length) {
        return section.subsections.map((subsection) => (
          subsection.previewImage?.src
            ? previewSections.find((item) => item.src === subsection.previewImage.src)?.previewIndex
            : undefined
        ));
      }

      return undefined;
    }),
    [previewSections],
  );

  useEffect(() => {
    document.title = `${content.client} — ${content.title} | Vladimir Ratmansky`;
  }, []);

  const sectionHasActivePreview = (section, index) => {
    const marker = sectionPreviewMarkers[index];

    if (marker === undefined) {
      return false;
    }

    if (Array.isArray(marker)) {
      const activePreview = previewSections.find((item) => item.sectionIndex === index);
      return Boolean(activePreview && activeSectionIndex === index);
    }

    const activePreview = previewSections.find((item) => item.previewIndex === marker);
    return activePreview?.sectionIndex === index && activeSectionIndex === index;
  };

  return (
    <main className="page page--case-study page--case-study-square">
      <CaseStudyScrollPreview
        previewSections={previewSections}
        onActiveSectionIndexChange={setActiveSectionIndex}
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

                <aside className="case-study-summary-cell case-study-summary-cell--right" aria-label="Scope">
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

        {content.sections.map((section, index) => {
          const previewMarker = sectionPreviewMarkers[index];
          const rowPreviewIndex = typeof previewMarker === 'number' ? previewMarker : undefined;

          return (
            <div
              className={[
                'case-study-body',
                'portfolio-row',
                sectionHasActivePreview(section, index) ? 'case-study-body--preview-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              key={section.heading || section.type}
              data-case-preview-index={rowPreviewIndex}
            >
              <p className="portfolio-label" aria-hidden="true">
                <span
                  className={[
                    previewMarker !== undefined ? 'hover-link' : '',
                    sectionHasActivePreview(section, index) ? 'hover-link--filled' : '',
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
                  previewMarkers={Array.isArray(previewMarker) ? previewMarker : undefined}
                  onOpenPreview={setOpenInlinePreview}
                />
              </div>
            </div>
          );
        })}
      </article>

      {openInlinePreview ? (
        <ImageModal image={openInlinePreview} onClose={() => setOpenInlinePreview(null)} />
      ) : null}
    </main>
  );
}
