/**
 * ELLI case assets — временно скопированы из `public/covo/`
 * и используются как заметные плейсхолдеры до финального экспорта.
 */
const elliAssets = '/elli';
const elliPlaceholderImage = `${elliAssets}/cov-screens-getting-dressed.png`;
const elliPlaceholderAlt = 'Elli placeholder image';

export const elliContextSectionHeading = 'Контекст';

export const elli = {
  id: 'elli',
  title: 'Elli',
  listTitle: 'Elli',
  meta: 'ELLI | literacy-learning app for adult migrants',
  client: 'ELLI',
  period: '2026 – now',
  role: 'Co-founder · Product design · UX · Mobile UI',
  summary: {
    heading: 'ELLI | 2026-now',
    paragraphs: [
      'Elli is a mobile app for alpha-level integration courses. It helps adult migrants practice basic literacy in German outside the classroom and gives teachers a digital way to assign work and see progress.',
      'I work on the product as a co-founder and lead it almost end-to-end: product logic, UX, mobile UI, exercise design, content tooling, and implementation through vibe coding workflows.',
    ],
    team: {
      heading: 'Team',
      members: [
        { text: 'Co-founder + product design: 1 (me)' },
        { text: 'Alpha-course teacher expert: 1' },
        { text: 'Vibe coding + no-code/AI toolchain', muted: true },
      ],
    },
  },
  sections: [
    {
      type: 'section',
      heading: 'Context',
      contextIllustration: {
        src: elliPlaceholderImage,
        alt: elliPlaceholderAlt,
      },
      paragraphs: [
        'Elli grew out of a very specific real-world context. My wife teaches integration courses in Germany, including alpha groups where some students cannot read or write even in their native language.',
        'In that environment standard digital learning patterns break down. Even after months of study, learners may still struggle to rely on letters, syllables, and written instructions, which means the product has to explain itself visually rather than through text.',
        'I started the project from scratch: set it up on Expo, shaped the product logic, designed the mobile UI, mapped the teacher flow, and built a fast production loop around vibe coding tools.',
      ],
    },
    {
      type: 'section',
      heading: 'Problem',
      previewImage: {
        src: elliPlaceholderImage,
        alt: elliPlaceholderAlt,
      },
      paragraphs: [
        'The main pain point was not the absence of one more learning app. It was the gap between classroom teaching and independent practice. Students received knowledge during lessons, but outside class teachers had almost no digital tool to continue training, track progress, and dose material carefully.',
        'The unusual challenge was the audience itself. If the user cannot read, the product cannot rely on text, standard forms, or familiar navigation patterns as its primary layer.',
        'At the same time the second side of the product had to work just as well. Before learning can even start, a teacher needs to create a class, add students, hand out understandable credentials, and assemble assignments without extra administrative friction.',
      ],
    },
    {
      type: 'section',
      heading: 'Key Insight',
      paragraphs: [
        'The key insight was that this problem could not be solved by simply “simplifying the UI.” If a person cannot read, the whole product has to be rebuilt around audio, video, repetition, large actions, and visual cues instead of text.',
        'That insight shaped the product frame itself. Elli is not just a set of flashcards. It is a system that combines a teacher dashboard, guided exercises, progress tracking, and a content pipeline that turns classroom material into repeatable digital practice.',
      ],
    },
    {
      type: 'section',
      heading: 'Solution',
      previewImage: {
        src: elliPlaceholderImage,
        alt: elliPlaceholderAlt,
      },
      paragraphs: [
        'I led Elli from zero to the first working version. That included setting up the app on Expo, defining the UX architecture, designing the mobile UI, shaping both teacher and student flows, and inventing the exercise mechanics themselves: what the learner does, in which order, how feedback appears, and how progress accumulates.',
        'A large part of the work was not only designing screens, but building the production environment around the product. I used a vibe coding approach to assemble interfaces quickly, test hypotheses, and iteratively refine logic inside a live app.',
      ],
    },
    {
      type: 'section',
      heading: 'Design Decisions',
      subsections: [
        {
          heading: 'Built the teacher flow as the foundation of the product',
          paragraphs: [
            'One of the strongest parts of the project was taking the product from zero to the first coherent version. I had to design not just isolated screens, but a working system: class creation, student setup, credentials handout, assignment creation, and progress reading.',
            'This flow matters because without it the learner never even reaches the educational part of the product. In Elli, teacher UX is not a secondary admin layer. It is the foundation of the whole digital learning model.',
          ],
        },
        {
          heading: 'Designed exercises for learners who cannot read',
          previewImage: {
            src: elliPlaceholderImage,
            alt: elliPlaceholderAlt,
          },
          paragraphs: [
            'The challenge was not only the interface, but the exercises themselves. I had to invent mechanics in which a learner can progress through video, sound, repetition, and visual discrimination instead of through long written instructions.',
            'That meant designing not just UI, but the logic of the exercises: how syllables and sounds are introduced, how stages work, when feedback appears, and how the learner moves from observation to recognition and then to independent action.',
          ],
        },
        {
          heading: 'Built internal tools for content production',
          paragraphs: [
            'To make the product truly buildable, I added internal tools around it. One of them was a component showcase from a designer’s perspective: a place to validate states, edge cases, and UI behavior without a long loop through the main app.',
            'Another layer was production tooling. I built Time Studio for video timestamping and subtitle preparation, and I also handled part of the video and audio processing myself. My sound engineering background became useful here not as an isolated skill, but as a practical part of a product system where content and interface are tightly connected.',
          ],
        },
      ],
    },
    {
      type: 'section',
      heading: 'Outcome',
      previewImage: {
        src: elliPlaceholderImage,
        alt: elliPlaceholderAlt,
      },
      paragraphs: [
        'At this stage Elli is not a growth-metrics case. It is a case about deep product development in a difficult niche from zero. We assembled the working core of the product, tested key flows, and turned a vague idea into a system where real educational hypotheses can already be validated.',
        'Just as importantly, the project was built as a connection between product and production. Interface, exercises, video, audio, timestamps, the teacher dashboard, and the component showcase evolved as parts of one system rather than as disconnected artifacts.',
      ],
    },
    {
      type: 'section',
      heading: 'Learnings',
      paragraphs: [
        'Elli became a very personal case for me about what happens when product design works with a real nearby pain point instead of an abstract audience. It raised the bar for precision: a beautiful UI is meaningless if the user physically cannot read the interface.',
        'The second major learning is that products like this require a much wider role from the designer. In Elli I combine co-founder responsibility, UX, mobile UI, product logic, content infrastructure, and AI-assisted making. That combination is exactly what allowed the project to start moving for real.',
      ],
    },
  ],
};

export function getElliContextSectionIndex(sections) {
  return sections.findIndex((section) => section.contextIllustration);
}

export function getElliContextIllustration(sections) {
  const contextSection = sections.find((section) => section.contextIllustration);
  return contextSection?.contextIllustration ?? null;
}

export function getElliPreviewSections(sections) {
  const previews = [];

  sections.forEach((section, sectionIndex) => {
    if (section.previewImage?.src) {
      previews.push({
        ...section.previewImage,
        sectionIndex,
        previewIndex: previews.length,
      });
    }

    section.subsections?.forEach((subsection) => {
      if (subsection.previewImage?.src) {
        previews.push({
          ...subsection.previewImage,
          sectionIndex,
          previewIndex: previews.length,
        });
      }
    });
  });

  return previews;
}
