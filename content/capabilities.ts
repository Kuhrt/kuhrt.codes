import { Capability } from '@/models/capabilities/Capability';

export const capabilities: Capability[] = [
  {
    name: 'System Design',
    color: '#3b82f6',
    tagline: 'Design for the requirements you have, not the scale you hope for.',
    description:
      'I design systems that are simple enough to understand, flexible enough to evolve, and robust enough to survive production. Premature abstraction kills more projects than monoliths — but I structure code so the monolith can be split when the time comes.',
    offer:
      "Inherited a half-built system nobody can extend? I'll get it stable, shippable, and safe to build on again.",
    examples: [
      {
        title: 'Event-driven order processing',
        detail:
          'Migrated legacy REST endpoints to async messaging, reducing failure cascade risk and improving throughput 3x.'
      },
      {
        title: 'Microservices decomposition',
        detail:
          'Led the breakup of a monolith into 12 bounded services with clear ownership boundaries and shared-nothing data stores.'
      },
      {
        title: 'Multi-tenant SaaS architecture',
        detail:
          'Designed tenant isolation strategy supporting 200+ clients on shared infrastructure without data leakage risk.'
      }
    ],
    relationships: [
      { target: 'Data & APIs', strength: 0.9 },
      { target: 'DevOps & Platform', strength: 0.7 },
      { target: 'Frontend Architecture', strength: 0.5 }
    ]
  },
  {
    name: 'Frontend Architecture',
    color: '#61dafb',
    tagline: 'Components are team scaling decisions disguised as UI.',
    description:
      "A component library isn't a collection of buttons — it's an agreement about how your team builds. I design frontend systems that are fast, accessible, and maintainable by teams of any size. Performance isn't an afterthought; it's a constraint I design around.",
    offer:
      "I'll find the UX friction that's costing you users — and ship an interface people actually want to use.",
    examples: [
      {
        title: 'Design system from scratch',
        detail:
          'Built a component system used across 4 product teams, reducing UI inconsistency reports by 90%.'
      },
      {
        title: 'Performance-critical rendering',
        detail:
          'Optimized a data-heavy dashboard from 8s to 400ms initial load through virtualization, code splitting, and strategic SSR.'
      },
      {
        title: 'State architecture at scale',
        detail:
          'Designed a state management pattern combining server state (React Query) with client state (Zustand) that eliminated prop drilling across 150+ components.'
      }
    ],
    relationships: [
      { target: 'System Design', strength: 0.5 },
      { target: 'Team Leadership', strength: 0.6 },
      { target: 'AI-Augmented Engineering', strength: 0.4 }
    ]
  },
  {
    name: 'DevOps & Platform',
    color: '#00ff88',
    tagline: 'The best deploy is the one nobody notices.',
    description:
      "I build pipelines and platforms that make shipping boring. If deploying feels risky, the pipeline is broken. I've worked across AWS, Azure, Docker, Kubernetes, and GitHub Actions — and I choose the simplest tool that solves the actual problem.",
    offer:
      "If every deploy feels like a gamble, that's fixable. I'll give you releases boring enough to ship on a Friday.",
    examples: [
      {
        title: '45-minute deploy to 3-minute pipeline',
        detail:
          'Rebuilt CI/CD from scratch with parallel stages, Docker layer caching, and automated rollbacks.'
      },
      {
        title: 'Multi-environment container orchestration',
        detail:
          'Designed a Docker Compose → Kubernetes migration path that let the team ship to staging in minutes, not hours.'
      },
      {
        title: 'Infrastructure as code adoption',
        detail:
          'Moved from manual server provisioning to fully automated infrastructure, eliminating environment drift across dev/staging/prod.'
      }
    ],
    relationships: [
      { target: 'System Design', strength: 0.7 },
      { target: 'Data & APIs', strength: 0.5 },
      { target: 'AI-Augmented Engineering', strength: 0.3 }
    ]
  },
  {
    name: 'Data & APIs',
    color: '#f59e0b',
    tagline: 'The best API is the one your consumers never complain about.',
    description:
      "I design data layers and APIs that are intuitive, performant, and evolvable. Schema design isn't just about normalization — it's about understanding access patterns, caching strategies, and how data flows through your entire system.",
    offer:
      "Slow pages and timeouts rarely need a rewrite. I'll find the root cause and make your data layer hold up under real load.",
    examples: [
      {
        title: 'API design for multi-platform',
        detail:
          'Designed a RESTful API serving web, mobile, and third-party integrations with consistent patterns and versioning strategy.'
      },
      {
        title: 'Database performance rescue',
        detail:
          'Identified and resolved N+1 query patterns causing 30-second page loads, reducing to sub-second with strategic indexing and query restructuring.'
      },
      {
        title: 'Caching architecture',
        detail:
          'Implemented multi-layer caching (Redis + CDN + application) that reduced database load by 80% and API response times by 60%.'
      }
    ],
    relationships: [
      { target: 'System Design', strength: 0.9 },
      { target: 'DevOps & Platform', strength: 0.5 },
      { target: 'Frontend Architecture', strength: 0.4 }
    ]
  },
  {
    name: 'Team Leadership',
    color: '#a855f7',
    tagline: 'Point the direction, supply what they need, remove obstacles.',
    description:
      "Technical leadership isn't about writing the most code — it's about making everyone around you faster. I establish patterns, run code reviews that teach, and make architectural decisions that unblock teams instead of creating bottlenecks.",
    offer:
      'I make the engineers around me faster — pressure-testing architecture, teaching through code review, and catching wrong directions before they cost a month.',
    examples: [
      {
        title: 'Cross-timezone team coordination',
        detail:
          'Led a team of 12 engineers across 3 time zones, establishing async communication patterns that maintained velocity without burnout.'
      },
      {
        title: 'Code review culture transformation',
        detail:
          'Shifted code reviews from gatekeeping to mentoring, reducing review cycle time by 60% while improving code quality metrics.'
      },
      {
        title: 'Technical onboarding system',
        detail:
          'Designed a structured onboarding path that reduced new engineer ramp-up from 6 weeks to 2 weeks.'
      }
    ],
    relationships: [
      { target: 'Frontend Architecture', strength: 0.6 },
      { target: 'System Design', strength: 0.4 },
      { target: 'AI-Augmented Engineering', strength: 0.5 }
    ]
  },
  {
    name: 'AI-Augmented Engineering',
    color: '#ec4899',
    tagline: "AI writes the code. I make sure it's the right code.",
    description:
      "AI gets anyone to a working demo faster than ever — and writes code that's confidently wrong just as fast. I use it as a force multiplier while supplying the judgment it can't: what to build, how to architect it, and when to push back. The last 80% is still engineering.",
    offer:
      'A working demo is the easy part now. I take products the rest of the way — the 20% that turns out to be 80% of the work.',
    examples: [
      {
        title: 'AI-assisted architecture exploration',
        detail:
          'Used AI pair programming to prototype 3 architectural approaches in a day, then selected the right one based on team constraints and scale requirements.'
      },
      {
        title: 'Automated code review augmentation',
        detail:
          'Integrated AI-powered code analysis into CI pipeline, catching pattern violations and security issues before human review.'
      },
      {
        title: 'Prototype-to-production hardening',
        detail:
          'Took an AI-generated prototype the rest of the way: restructured the architecture, added the test coverage it skipped, and shipped without losing the speed advantage.'
      }
    ],
    relationships: [
      { target: 'Team Leadership', strength: 0.5 },
      { target: 'Frontend Architecture', strength: 0.4 },
      { target: 'DevOps & Platform', strength: 0.3 }
    ]
  }
];
