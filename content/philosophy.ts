import { Philosophy } from '@/models/philosophy/Philosophy';

export const philosophies: Philosophy[] = [
  {
    title: 'Human-First',
    quote: "If people struggle with my application, they won't use it.",
    points: [
      [
        'Dig deep to find the real "why"',
        "Most problems have been solved already, the art is understanding what we're actually building"
      ],
      [
        'Accessibility is a requirement, not a feature',
        'Great software works for everyone from day one'
      ],
      [
        'UX/UI professionals are force multipliers',
        "I rely on designers heavily because frustrated users don't become successful users. This also means nailing the implementation"
      ],
      [
        'Automate the small friction points',
        'The best solutions make tedious processes disappear entirely'
      ]
    ]
  },
  {
    title: 'Craft',
    quote: 'Later means never - fix the code now or it decays rapidly',
    points: [
      [
        'Sign your work with pride',
        'Taking ownership transforms code from "works" to "crafted"'
      ],
      [
        'Business logic should be readable in code',
        "If requirements aren't easily visible in code, something's wrong"
      ],
      [
        "Testing code isn't optional",
        'Testing can define requirements and small, testable functions create maintainable systems'
      ],
      [
        'Small interfaces, deep implementations',
        "Clean abstractions hide complexity, don't eliminate it"
      ]
    ]
  },
  {
    title: 'Impact',
    quote: '20% of features deliver 80% of the value',
    points: [
      [
        'Relentlessly focus on what moves the needle',
        'Perfect execution on the wrong thing is still wrong'
      ],
      [
        'Communication is a core technical skill',
        'The right questions early prevent months of wrong solutions'
      ],
      [
        'Root cause analysis over feature requests',
        "What users think the problem is isn't always the problem"
      ],
      [
        'Measure what matters, ship what works',
        'Data-driven decisions separate successful products from feature factories'
      ]
    ]
  },
  {
    title: 'Growth',
    quote: 'Agile means how fast a team can change direction when needed',
    points: [
      [
        'Change is inevitable',
        'Great teams anticipate and adapt. Build systems and culture that embrace evolution, not resist it'
      ],
      [
        'Lifetime learning is non-negotiable',
        'Technology changes, curiosity is constant'
      ],
      [
        'Leadership is service',
        'Point the right direction, supply your team with what they need, and remove obstacles'
      ],
      [
        'Trust is the foundation of velocity',
        'Teams that trust each other, and what they can do, ship faster and better'
      ]
    ]
  }
] as const;
