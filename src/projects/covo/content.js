const imageBase = '/assets/projects/redesign-of-teacher-dashboard';
const covoAssets = '/assets/projects/covo';

export const covo = {
  id: 'covo',
  title: 'Taking a corporate intranet from zero to MVP',
  listTitle: 'Corporate intranet from zero to MVP',
  meta: 'COVO | corporate ecosystem and intranet platform',
  client: 'COVO',
  period: 'Jan 2025 – present',
  role: 'Led product design',
  summary: {
    logo: `${covoAssets}/covo-logo.png`,
    heading: 'COVO',
    paragraphs: [
      'Placeholder: one sentence about the company or product — who they are and what they do.',
      'Placeholder: one sentence about your contribution on this project.',
    ],
    team: {
      heading: 'Team',
      members: [
        { text: '1 Designer (Me)' },
        { text: '2 Developers' },
        { text: '4 Ideated with', muted: true },
      ],
      year: '2025',
    },
  },
  metrics: [
    { value: '×1.8', label: 'increase in active teachers' },
    { value: '+17%', label: 'growth in teacher DAU' },
    { value: '+23%', label: 'increase in active students' },
  ],
  sections: [
    {
      type: 'intro',
      paragraphs: [
        'At the time this project started, Uchi.ru was one of the largest EdTech platforms in the world by user base and engagement. Founded in 2012, the product had grown into a core digital infrastructure for school education in Russia: more than 14 million students, hundreds of thousands of teachers, and millions of parents used the platform daily to support learning and classroom management. By its scale, Uchi.ru ranks among the largest EdTech products globally and today operates as part of the VK ecosystem.',
      ],
    },
    {
      type: 'section',
      heading: 'Teachers as the Key Growth Driver',
      paragraphs: [
        'The structure of the Russian school system directly shapes how the product is used. In primary school, a single teacher usually teaches all subjects to one class. In middle and high school (grades 5–11), the model changes: each subject is taught by a different teacher, and one class is shared by multiple educators.',
        'Historically, Uchi.ru was widely adopted in primary education, where this structure worked naturally. Over time, the platform expanded its content offering for grades 5–11, adding new subjects and learning scenarios. However, a new challenge emerged: while the educational content existed, there was no effective tool to reach and unite all subject teachers working with the same class.',
        'Due to the lack of collaboration tools within a class, teachers were forced to create their own duplicate classes. As a result, students often ended up enrolled in several identical classes for the same subject. This fragmented experience negatively affected key product metrics, including engagement, retention, and premium conversion. Since premium access can be purchased per subject, as a subject bundle, or as a full bundle (the most valuable option for the business), duplicate classes reduced clarity of value and made higher-tier purchases less likely.',
      ],
    },
    {
      type: 'section',
      heading: 'From classroom to purchase',
      image: {
        src: `${imageBase}/01-flow-from-classroom-to-purchase.png`,
        alt: 'Flow diagram: primary school path from teacher to parent purchase vs broken secondary school path with duplicate classes',
      },
      paragraphs: [
        'This chart shows the path from a teacher’s work with a class to a premium access purchase and how revenue is created—or lost—along the way. In primary school, the flow remains intact: a single class, unified student progress, and a clear purchase decision for parents. In middle and high school, the same path breaks due to class duplication—progress becomes fragmented, value unclear, and a significant portion of potential revenue is lost before the purchase stage.',
        'After mapping the path to purchase, it became clear that the losses occurred long before users reached the pricing screen. The class is the key point in the entire chain, it was formed within an interface that had not been revisited for a long time and no longer reflected how teachers actually worked. The next step was a closer look at the existing teacher dashboard interface.',
      ],
    },
    {
      type: 'section',
      paragraphs: [
        'After the first three interviews with teachers, it became clear that the issues were not isolated but systemic. Regardless of subject, experience level, or number of classes, teachers encountered the same problems when working with the class list and collaborating with other educators. This allowed us to quickly identify the key UX bottlenecks and focus on them moving forward.',
      ],
      image: {
        src: `${imageBase}/02-old-teacher-dashboard.png`,
        alt: 'Previous teacher dashboard interface',
      },
    },
    {
      type: 'section',
      heading: 'Key UX Problems (Before)',
      list: [
        {
          title: 'Lack of a safe and convenient way to connect other teachers',
          text: 'Collaboration was based on sharing a class code. This approach conflicted with basic security expectations and was physically inconvenient: the code had to be copied, manually shared, and its distribution controlled.',
        },
        {
          title: 'No visual hierarchy in the class list',
          text: 'All classes looked equally important, regardless of their relevance, number of students, or the teacher’s role. This made navigation and class management harder as the workload grew.',
        },
        {
          title: 'Classes were treated as technical entities, not a shared learning context',
          text: 'The interface exposed settings and actions, but did not help teachers perceive a class as a single, shared space for teaching and collaboration.',
        },
        {
          title: 'Poor scalability for experienced teachers',
          text: 'As the number of classes increased, the list became overloaded and difficult to manage: there were no clear states, grouping, or visual anchors to support orientation.',
        },
      ],
      image: {
        src: `${imageBase}/04-ux-problems.png`,
        alt: 'Annotated UX problems in the old class list',
      },
    },
    {
      type: 'section',
      heading: 'Design-led exploration',
      paragraphs: [
        'I didn’t start with classical research. The problem was systemic and already visible in the product, but teachers found it hard to articulate it verbally. Instead, I used design as a research tool: quickly prototyping key scenarios and validating them through interviews with teachers.',
        'This approach allowed me to focus on concrete product decisions. First, I confirmed that a class must be a single shared workspace where subjects, teachers, and roles are managed transparently. A table-based model for assigning subjects to teachers proved to be clear and easy to understand for educators with different levels of experience.',
        'As iterations progressed, it became clear that the changes affected core interface patterns rather than individual screens. As a result, this project became a trigger for developing and evolving the design system: new roles, states, and components emerged and were later reused across other parts of the product.',
        'I also confirmed that the existing way of connecting teachers via class codes did not scale. It was perceived as inconvenient and unsafe, which led to a complete rethink of the invitation flow and later became the foundation for a new teacher verification system.',
        'The old interface was not only inconvenient — visually, it no longer worked either. It looked outdated and “heavy,” making it harder for new users to trust the product and for experienced ones to navigate quickly. On top of that, inconsistencies and errors had accumulated in layouts and interface patterns: different states looked the same, elements behaved unpredictably, and identical entities were represented in different ways.',
        'When I started prototyping new scenarios, it became clear that it was impossible to assemble them properly using the old components. As a result, I began systematically updating the design system in parallel with the project: aligning core components, unifying states and interaction rules, and iteratively rolling out a more cohesive visual language. This provided a stable foundation for new screens and made future scaling much easier.',
      ],
      image: {
        src: `${imageBase}/03-teacher-dashboard-context.png`,
        alt: 'Research and exploration context screens',
      },
    },
    {
      type: 'subsection',
      heading: 'First iterations',
      image: {
        src: `${imageBase}/05-first-iterations.png`,
        alt: 'Early interface iterations for shared class and teacher collaboration',
      },
    },
    {
      type: 'subsection',
      heading: 'Design system',
      image: {
        src: `${imageBase}/06-design-system.png`,
        alt: 'Updated design system components and states',
      },
    },
    {
      type: 'section',
      heading: 'Result of work',
      paragraphs: [
        'When designing the new interface, I intentionally accounted for the age profile of teachers. In Russian schools, a significant number of educators are over 55–60 years old, which directly impacts interface requirements. It was important to make the experience clear, predictable, and visually calm.',
        'I deliberately designed larger interactive areas, clear visual hierarchy, strong contrast between states, and minimized distracting elements. Action labels were written in a straightforward and unambiguous way, avoiding complex terminology.',
        'These decisions were validated through interviews and prototype testing. It was especially important to ensure that teachers with different levels of digital literacy could navigate the new class structure quickly and complete core tasks without friction or cognitive overload.',
        'I increased clickable areas and reduced information density in tables to minimize accidental actions and lower cognitive load. I removed hidden hover-based interactions and small icon-only controls — all key scenarios became explicit and accessible without additional gestures.',
        'I validated these decisions through interviews and prototype testing. Teachers with different levels of digital literacy were able to navigate the new structure faster and made fewer errors when performing core tasks.',
      ],
      imageGrid: [
        {
          src: `${imageBase}/07-result-shared-class.png`,
          alt: 'New shared class workspace',
        },
        {
          src: `${imageBase}/08-result-invitations.png`,
          alt: 'Redesigned teacher invitation flow',
        },
        {
          src: `${imageBase}/09-result-class-list.png`,
          alt: 'Class list with clear hierarchy',
        },
        {
          src: `${imageBase}/10-result-accessibility.png`,
          alt: 'Accessible interface patterns for older teachers',
        },
      ],
    },
    {
      type: 'section',
      heading: 'What I learned',
      paragraphs: [
        'This project reinforced for me that growth problems are often rooted not in marketing or monetization, but in the structure of user interaction. In this case, revenue was not lost at the point of purchase, but much earlier — in how the class itself was formed.',
        'I also saw firsthand how design can function as a research tool. When a problem is difficult to articulate verbally, a prototype becomes a shared language between the designer and the user.',
        'Finally, this project reminded me that in complex products, local changes rarely work in isolation. When the interaction model is affected, it almost inevitably requires rethinking the system as a whole — including the design system.',
      ],
    },
    {
      type: 'metrics',
      heading: 'Key Metrics',
    },
  ],
};
