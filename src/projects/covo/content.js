/**
 * COVO case assets — папка `public/covo/` (URL: /covo/…)
 *
 * cov1  — Контекст: иллюстрация (главная + фон липкого превью на «Контекст»)
 * cov2  — Проблема (липкое превью слева)
 * cov3  — не используется в коде (можно удалить или перезаписать)
 * cov-screens-getting-dressed — временная плашка для секций без финальных скринов
 *
 * cov-logo / cov-logo-light — логотип в шапке кейса
 * cov-icon — favicon MeasureMate в тексте
 */
const covoAssets = "/covo";
const measureMateFavicon = `${covoAssets}/cov-icon.svg`;
const covoPlaceholderImage = `${covoAssets}/cov-screens-getting-dressed.png`;

export const covoContextSectionHeading = "Контекст";

export const covo = {
  id: "covo",
  title: "Taking a corporate intranet from 0 to MVP",
  listTitle: "Taking a corporate intranet 0→MVP",
  meta: "COVO | corporate ecosystem and intranet platform",
  client: "COVO",
  period: "Jan 2025 – now",
  role: "Led product design",
  summary: {
    logo: `${covoAssets}/cov-logo.svg`,
    logoLight: `${covoAssets}/cov-logo-light.svg`,
    heading: "COVO | 2025-now",
    paragraphs: [
      "COVO is a corporate social network and intranet platform that helps employees stay connected, share knowledge, and quickly find relevant information inside the company.",
    ],
    team: {
      heading: "Team",
      members: [
        { text: "Product design: 1 (me)" },
        { text: "2 developers" },
        { text: "Project management" },
      ],
    },
  },
  sections: [
    {
      type: "section",
      heading: "Context",
      contextIllustration: {
        src: `${covoAssets}/cov1.png`,
        alt: "COVO context illustration",
      },
      paragraphs: [
        "When I joined the project, the team already had a product idea, a working backend, and the first screens. On paper it looked like a classic design task: clean up the interface and extend the missing flows.",
        "In reality the problem was deeper. The product did not need a few more screens. It needed a way to assemble, test, and evolve the interface quickly as the scope grew.",
      ],
    },
    {
      type: "section",
      heading: "Problem",
      previewImage: {
        src: `${covoAssets}/cov2.png`,
        alt: "Fragmented legacy interface system preview",
      },
      paragraphs: [
        "Before I joined, the interface had been assembled as an early working draft. The team needed to show the product idea quickly, so screens appeared situationally, without a cohesive visual language or design system.",
        "As a result, the product felt less mature than its ambition. The style looked dated, screens lacked hierarchy and focus, and interaction states were only partially designed.",
        "My task was not simply to add more screens. I had to redefine the look and feel of COVO, build a visual system, and turn an early interface into a scalable MVP foundation.",
      ],
    },
    {
      type: "section",
      heading: "How the task changed",
      paragraphs: [
        "The original request was to build a design system on top of the existing screens. But after the first deep dive it became clear that systematizing the current UI would not be enough.",
        "The product needed a new visual language: more modern, more tactile, and more approachable. So the task shifted from styling a design system to rebuilding the interface as the basis for the MVP.",
        "That changed my role in the project. I was not only designing screens in Figma, but also assembling working components, validating them closer to code, and accelerating the path from idea to interface together with the developer.",
      ],
    },
    {
      type: "section",
      heading: "Solution: Progressive Render",
      previewImage: {
        src: covoPlaceholderImage,
        alt: "Screens are getting dressed placeholder",
      },
      paragraphs: [
        "For COVO I built a process I called Progressive Render. The idea was simple: assemble a working form quickly, test it in the browser, and only then polish it into a reusable system.",
        "Instead of a long “Figma -> development -> feedback -> back to Figma” cycle, we worked in short iterations. I designed a component or flow in Figma, used AI to generate the first code layer, refined the UI in React, checked it in a live environment, and then synced the result back into Figma through Codex.",
        "That rhythm let us make decisions based on a working interface rather than on assumptions inside a mockup.",
      ],
    },
    {
      type: "section",
      heading: "Design decisions",
      subsections: [
        {
          heading: "Brought design and frontend into one repository",
          paragraphs: [
            "Sharing one repository with the developer became more than a technical detail. It changed the way I worked. I could not only design a solution, but also immediately see how it assembled in code, where it broke, and how it behaved in real states.",
            "That removed a big part of the translation gap between design and engineering. Instead of discussing how something should look, we could move much faster to how it should actually work.",
          ],
        },
        {
          heading: "Moved hypothesis testing into a React lab",
          previewImage: {
            src: covoPlaceholderImage,
            alt: "Screens are getting dressed placeholder",
          },
          paragraphs: [
            "To avoid waiting for the main product cycle, I set up a separate React lab in Cursor. It became a fast environment for UI validation, where I could assemble a scenario, show it to the client, and immediately see whether the solution worked in context.",
            "This allowed us to move in parallel with core development and avoid being blocked by backend dependencies or release timing.",
          ],
        },
        {
          heading: "Built custom tools on top of MeasureMate",
          previewImage: {
            src: covoPlaceholderImage,
            alt: "Screens are getting dressed placeholder",
          },
          paragraphs: [
            [
              "While working on COVO, I started extending ",
              {
                type: "link",
                label: "MeasureMate",
                href: "https://mezuremate.xyz/",
                icon: measureMateFavicon,
              },
              " into a browser-based toolset for precise UI iteration on top of a live interface. It gave us a custom inspector with grids, layout overlays, and a layer for working with the rendered DOM.",
            ],
            "It helped us do more than just look at the page. We could quickly understand which blocks and containers shaped the layout, where the target element lived, and what exactly needed to change.",
          ],
        },
        {
          heading: "Created an AI flow for precise in-browser edits",
          paragraphs: [
            "A key part of this approach was the Prompt Targeting Layer. It let me select the exact frame in the browser, capture container names, DOM structure, and nearby interface context, and automatically assemble a task for an AI agent.",
            "That meant the AI received a precise request instead of a vague prompt like “fix this card.” It sped up the workflow dramatically: instead of writing a long manual explanation, we could move straight to a sharply scoped task for Codex, Cursor, or another AI tool.",
          ],
        },
        {
          heading: "Built a lightweight component showcase",
          previewImage: {
            src: covoPlaceholderImage,
            alt: "Screens are getting dressed placeholder",
          },
          paragraphs: [
            "To keep the system alive outside Figma and isolated screens, I built a lightweight component library with a state showcase. It captured key interface patterns, variants, edge cases, and important states.",
            "This made it easy to test whether a component could survive real usage scenarios without setting up heavyweight infrastructure. The showcase became a bridge between design and engineering and shifted conversations from pixels to behavior, constraints, and scalability.",
          ],
        },
      ],
    },
    {
      type: "section",
      heading: "Outcome",
      previewImage: {
        src: covoPlaceholderImage,
        alt: "Screens are getting dressed placeholder",
      },
      paragraphs: [
        "Instead of a collection of disconnected screens, the team gained a more resilient interface production system. New scenarios became easier to assemble, test, and refine without constant manual recreation.",
        "Inside COVO this led to clearer product patterns: bookmarks for posts, tag-based filtering, states for different content types, and a more coherent relationship between feed, communities, profiles, and events. But the bigger outcome was broader than individual features: we built a working AI-driven environment where the designer contributes not only to visuals, but also to frontend logic, behavior, and implementation context.",
        "About six weeks after kickoff, we deployed the product to a friendly pilot company and ran 10 interviews with users and HR specialists. That helped us quickly spot weak logic and wrong priorities, and feed those insights back into the product immediately instead of burying them in a backlog.",
      ],
    },
    {
      type: "section",
      heading: "Learnings",
      paragraphs: [
        "COVO became a case not only about product design, but also about a new role for the designer inside an AI-first process. When a designer shares the repository with engineering, validates ideas in a live interface, and uses custom tools to collaborate with AI agents, the speed of decision-making changes completely.",
        "The cycle of idea -> interface -> validation -> correction shrinks from days to minutes. At that point design stops being a preparatory phase and becomes a way to find the working form of the product faster.",
        "The work on COVO is still ongoing, and the next step is to test this approach in educational products in Germany, starting with integration-course contexts where the team already has access to partner organizations and a path to real validation.",
      ],
    },
  ],
};

export function getCovoContextSectionIndex(sections) {
  return sections.findIndex((section) => section.contextIllustration);
}

export function getCovoContextIllustration(sections) {
  const contextSection = sections.find((section) => section.contextIllustration);
  return contextSection?.contextIllustration ?? null;
}

export function getCovoPreviewSections(sections) {
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
