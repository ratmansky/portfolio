import React, { useEffect } from 'react';
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

export default function Covo() {
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
              {content.meta ??
                [content.client, content.period, content.role].filter(Boolean).join(' · ')}
            </p>
            <h1 className="case-study-title">{content.title}</h1>

            {content.summary ? (
              <div className="case-study-summary" role="group" aria-label="Project overview">
                <div className="case-study-summary-heading case-study-summary-heading--left">
                  {content.summary.logo ? (
                    <img
                      src={content.summary.logo}
                      alt=""
                      className="case-study-summary-logo"
                      width={16}
                      height={16}
                      decoding="async"
                    />
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
                  <p className="case-study-summary-year">{content.summary.team.year}</p>
                </aside>
              </div>
            ) : null}
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
