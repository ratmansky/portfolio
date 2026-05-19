import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HoverLink from '../components/HoverLink';
import { redesignOfTeacherDashboard as content } from '../projects/redesign-of-teacher-dashboard/content';

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
  if (section.type === 'intro') {
    return (
      <div className="case-study-block case-study-block--intro">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="case-study-text">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  if (section.type === 'metrics') {
    return (
      <div className="case-study-block">
        <h2 className="case-study-heading">{section.heading}</h2>
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
      {section.heading ? (
        <h2 className={`case-study-heading ${isSubsection ? 'case-study-heading--sub' : ''}`}>
          {section.heading}
        </h2>
      ) : null}

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

export default function RedesignOfTeacherDashboard() {
  useEffect(() => {
    document.title = `${content.client} — ${content.title} | Vladimir Ratmansky`;
  }, []);

  return (
    <main className="page page--case-study">
      <article className="case-study">
        <header className="case-study-header portfolio-row">
          <p className="portfolio-label">
            <HoverLink to="/">← Projects</HoverLink>
          </p>

          <div className="portfolio-content case-study-header-content">
            <p className="case-study-meta">
              {content.client}
              {' · '}
              {content.period}
              {' · '}
              {content.role}
            </p>
            <motion.h1
              layoutId={content.layoutId}
              className="case-study-title"
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.title}
            </motion.h1>
          </div>
        </header>

        <div className="case-study-body portfolio-row">
          <p className="portfolio-label" aria-hidden="true">
            Case study
          </p>

          <div className="portfolio-content case-study-content">
            {content.sections.map((section) => (
              <CaseStudySection
                key={section.heading || section.type}
                section={section}
                metrics={content.metrics}
              />
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
