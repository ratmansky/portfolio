import React, { useEffect, useMemo, useState } from 'react';
import CaseStudyImage from '../components/CaseStudyImage';
import {
  CaseStudyParagraphContent,
  getCaseStudyParagraphKey,
} from '../components/CaseStudyInlineLink';
import HoverLink from '../components/HoverLink';
import ImageModal from '../components/ImageModal';
import { defaultUiContent } from '../content/siteContent';
import { useLocalizedContent } from '../content/locale';
import {
  covo as baseContent,
  getCovoContextIllustration,
  getCovoContextSectionIndex,
  getCovoPreviewSections,
} from '../projects/covo/content';

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

function CaseStudyMobilePreview({ image, onOpenPreview }) {
  if (!image?.src) {
    return null;
  }

  return (
    <button
      className="case-study-mobile-preview"
      type="button"
      aria-label="Open section illustration"
      onClick={() => onOpenPreview(image)}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
      />
    </button>
  );
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
      <CaseStudyMobilePreview
        image={subsection.previewImage}
        onOpenPreview={onOpenPreview}
      />
      <CaseStudyParagraphs
        paragraphs={subsection.paragraphs}
        inlinePreview={null}
        onOpenPreview={onOpenPreview}
      />
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
  const mobilePreview = section.contextIllustration ?? section.previewImage ?? null;

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
        <>
          <CaseStudyMobilePreview
            image={mobilePreview}
            onOpenPreview={onOpenPreview}
          />
          <CaseStudyParagraphs
            paragraphs={section.paragraphs}
            inlinePreview={null}
            onOpenPreview={onOpenPreview}
          />
        </>
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

function CaseStudyScrollPreview({
  sections,
  previewSections,
  activeSectionIndex,
  contextSectionIndex,
  backgroundImage,
}) {
  const [subsectionPreview, setSubsectionPreview] = useState(null);
  const [openPreview, setOpenPreview] = useState(null);

  const activeSection = sections[activeSectionIndex];
  const isContextSection = activeSectionIndex === contextSectionIndex;

  const sectionForegroundPreview = !isContextSection && activeSection?.previewImage?.src
    ? activeSection.previewImage
    : null;

  const foregroundPreview = sectionForegroundPreview ?? subsectionPreview;
  const visiblePreview = foregroundPreview ?? backgroundImage;

  useEffect(() => {
    if (backgroundImage?.src) {
      const bg = new Image();
      bg.src = backgroundImage.src;
    }

    previewSections.forEach((preview) => {
      const image = new Image();
      image.src = preview.src;
    });
  }, [backgroundImage, previewSections]);

  useEffect(() => {
    if (!activeSection?.subsections?.length || typeof window === 'undefined') {
      setSubsectionPreview(null);
      return undefined;
    }

    let frame = 0;
    const initialTimers = [];

    const updateSubsectionPreview = () => {
      frame = 0;

      const sectionRow = document.querySelector(
        `[data-case-section-index="${activeSectionIndex}"]`,
      );

      if (!sectionRow) {
        return;
      }

      const marker = window.innerHeight * 0.42;
      const previewBlocks = [...sectionRow.querySelectorAll('[data-case-preview-index]')];
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
        setSubsectionPreview((currentPreview) => (
          currentPreview?.src === nextPreview.src ? currentPreview : nextPreview
        ));
      }
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateSubsectionPreview);
      }
    };

    updateSubsectionPreview();
    initialTimers.push(window.setTimeout(updateSubsectionPreview, 120));
    initialTimers.push(window.setTimeout(updateSubsectionPreview, 480));
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
  }, [activeSection, activeSectionIndex, previewSections]);

  if (!visiblePreview?.src) {
    return null;
  }

  return (
    <figure className="case-study-scroll-preview">
      <button
        className="case-study-scroll-preview-button"
        type="button"
        aria-label="Open image"
        onClick={() => setOpenPreview(foregroundPreview ?? backgroundImage)}
      >
        {backgroundImage?.src ? (
          <img
            className="case-study-scroll-preview-bg"
            src={backgroundImage.src}
            alt=""
            loading="eager"
            decoding="async"
          />
        ) : null}
        {foregroundPreview?.src ? (
          <img
            key={foregroundPreview.src}
            className="case-study-scroll-preview-fg"
            src={foregroundPreview.src}
            alt={foregroundPreview.alt}
            loading="eager"
            decoding="async"
          />
        ) : null}
      </button>
      {openPreview ? (
        <ImageModal image={openPreview} onClose={() => setOpenPreview(null)} />
      ) : null}
    </figure>
  );
}

export default function Covo() {
  const content = useLocalizedContent('covo', baseContent);
  const ui = useLocalizedContent('ui', defaultUiContent);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [openInlinePreview, setOpenInlinePreview] = useState(null);

  const contextSectionIndex = useMemo(
    () => getCovoContextSectionIndex(content.sections),
    [content.sections],
  );

  const contextIllustration = useMemo(
    () => getCovoContextIllustration(content.sections),
    [content.sections],
  );

  const previewSections = useMemo(
    () => getCovoPreviewSections(content.sections),
    [content.sections],
  );

  const scrollPreviewBackground = activeSectionIndex === contextSectionIndex
    ? contextIllustration
    : null;

  const sectionPreviewMarkers = useMemo(
    () => content.sections.map((section) => {
      if (section.previewImage?.src) {
        return previewSections.find((item) => item.sectionIndex === content.sections.indexOf(section))?.previewIndex;
      }

      if (section.subsections?.length) {
        return section.subsections.map((subsection, subsectionIndex) => (
          subsection.previewImage?.src
            ? previewSections
              .filter((item) => item.sectionIndex === content.sections.indexOf(section))[subsectionIndex]?.previewIndex
            : undefined
        ));
      }

      return undefined;
    }),
    [previewSections],
  );

  useEffect(() => {
    document.title = `${content.client} — ${content.title} | Vladimir Ratmansky`;
  }, [content.client, content.title]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;

      const marker = window.innerHeight * 0.42;
      const sectionRows = [...document.querySelectorAll('[data-case-section-index]')];
      const currentRow = sectionRows.reduce((current, row) => {
        const rect = row.getBoundingClientRect();
        const distance = Math.abs(rect.top - marker);

        if (rect.top <= marker && rect.bottom >= 80) {
          return { row, distance: 0 };
        }

        if (!current || distance < current.distance) {
          return { row, distance };
        }

        return current;
      }, null);

      if (!currentRow) {
        return;
      }

      const index = Number(currentRow.row.dataset.caseSectionIndex);
      setActiveSectionIndex((current) => (current === index ? current : index));
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    const initialTimer = window.setTimeout(updateActiveSection, 120);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('pageshow', requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.clearTimeout(initialTimer);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('pageshow', requestUpdate);
    };
  }, []);

  const sectionIsActive = (index) => activeSectionIndex === index;

  const sectionHasActivePreview = (section, index) => {
    if (!sectionIsActive(index)) {
      return false;
    }

    if (section.previewImage?.src) {
      return true;
    }

    return Boolean(section.subsections?.some((subsection) => subsection.previewImage?.src));
  };

  return (
    <main className="page page--case-study">
      <CaseStudyScrollPreview
        sections={content.sections}
        previewSections={previewSections}
        activeSectionIndex={activeSectionIndex}
        contextSectionIndex={contextSectionIndex}
        backgroundImage={scrollPreviewBackground}
      />

      <article className="case-study">
        <header className="case-study-header portfolio-row">
          <p className="portfolio-label">
            <HoverLink to={`/`}>{`← ${ui.backToProjects}`}</HoverLink>
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
              data-case-section-index={index}
              data-case-preview-index={rowPreviewIndex}
            >
              <p className="portfolio-label" aria-hidden="true">
                <span
                  className={[
                    'hover-link',
                    sectionIsActive(index) ? 'hover-link--filled' : '',
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
