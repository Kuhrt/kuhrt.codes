import { CaseStudy } from '@/models/caseStudies/CaseStudy';

/**
 * Mock case study data — replace with real professional projects (anonymized).
 * Node positions are in pixel-space for React Flow (positive-y = down).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'order-processing-overhaul',
    title: 'Order Processing Overhaul',
    subtitle:
      'Replaced a brittle synchronous pipeline with an event-driven architecture that eliminated cascade failures.',
    problem:
      'A Fortune 500 retail client processed 50K+ orders daily through a synchronous REST chain of 6 services. When any single service went down, the entire pipeline failed — causing order loss, customer complaints, and manual recovery processes that took hours. During peak sales events, the system regularly buckled under load.',
    constraints: [
      '12-week deadline before the next major sales event',
      'Zero tolerance for order loss during migration',
      'Team of 8 engineers, half unfamiliar with async patterns',
      'Legacy services had no test coverage'
    ],
    approach:
      'I designed a phased migration using the strangler fig pattern. We introduced a message broker (RabbitMQ) as a new spine alongside the existing REST chain, then migrated services one at a time. Each service got a dead letter queue for failed messages, ensuring zero order loss. We ran both systems in parallel for 3 weeks with automated reconciliation checks before cutting over.',
    outcomes: [
      { metric: 'Cascade failures', value: 'Eliminated' },
      { metric: 'Order throughput', value: '3x increase' },
      { metric: 'Recovery time', value: 'Hours → Automatic' },
      { metric: 'Orders lost', value: '0' }
    ],
    retrospective:
      "I'd start with better observability. We added monitoring after the migration, but having distributed tracing from day one would have caught issues faster during the parallel-run phase. I'd also have invested more upfront in training the team on async patterns — two engineers struggled with eventual consistency concepts, which slowed the middle weeks.",
    architecture: {
      before: {
        nodes: [
          { id: 'web', label: 'Web App', type: 'frontend', position: { x: 0, y: 0 } },
          { id: 'api-gw', label: 'API Gateway', type: 'api', position: { x: 250, y: 0 } },
          { id: 'order-svc', label: 'Order Service', type: 'service', position: { x: 500, y: 0 } },
          { id: 'inventory-svc', label: 'Inventory', type: 'service', position: { x: 750, y: 0 } },
          { id: 'payment-svc', label: 'Payment', type: 'service', position: { x: 750, y: 200 } },
          { id: 'shipping-svc', label: 'Shipping', type: 'service', position: { x: 500, y: 200 } },
          { id: 'notification-svc', label: 'Notifications', type: 'service', position: { x: 250, y: 200 } },
          { id: 'order-db', label: 'Orders DB', type: 'database', position: { x: 500, y: 400 } },
          { id: 'inv-db', label: 'Inventory DB', type: 'database', position: { x: 750, y: 400 } }
        ],
        connections: [
          { from: 'web', to: 'api-gw' },
          { from: 'api-gw', to: 'order-svc' },
          { from: 'order-svc', to: 'inventory-svc' },
          { from: 'inventory-svc', to: 'payment-svc' },
          { from: 'payment-svc', to: 'shipping-svc' },
          { from: 'shipping-svc', to: 'notification-svc' },
          { from: 'order-svc', to: 'order-db' },
          { from: 'inventory-svc', to: 'inv-db' }
        ]
      },
      after: {
        nodes: [
          { id: 'web', label: 'Web App', type: 'frontend', position: { x: 0, y: 0 } },
          { id: 'api-gw', label: 'API Gateway', type: 'api', position: { x: 250, y: 0 } },
          { id: 'order-svc', label: 'Order Service', type: 'service', position: { x: 500, y: 0 } },
          { id: 'broker', label: 'Message Broker', type: 'queue', position: { x: 500, y: 180 }, addedInAfter: true },
          { id: 'dlq', label: 'Dead Letter Queue', type: 'queue', position: { x: 250, y: 350 }, addedInAfter: true },
          { id: 'inventory-svc', label: 'Inventory', type: 'service', position: { x: 750, y: 120 } },
          { id: 'payment-svc', label: 'Payment', type: 'service', position: { x: 750, y: 250 } },
          { id: 'shipping-svc', label: 'Shipping', type: 'service', position: { x: 250, y: 180 } },
          { id: 'notification-svc', label: 'Notifications', type: 'service', position: { x: 250, y: 260 } },
          { id: 'order-db', label: 'Orders DB', type: 'database', position: { x: 500, y: 400 } },
          { id: 'inv-db', label: 'Inventory DB', type: 'database', position: { x: 750, y: 400 } },
          { id: 'monitoring', label: 'Monitoring', type: 'external', position: { x: 850, y: 0 }, addedInAfter: true }
        ],
        connections: [
          { from: 'web', to: 'api-gw' },
          { from: 'api-gw', to: 'order-svc' },
          { from: 'order-svc', to: 'broker', animated: true, addedInAfter: true },
          { from: 'broker', to: 'inventory-svc', animated: true, addedInAfter: true },
          { from: 'broker', to: 'payment-svc', animated: true, addedInAfter: true },
          { from: 'broker', to: 'shipping-svc', animated: true, addedInAfter: true },
          { from: 'broker', to: 'notification-svc', animated: true, addedInAfter: true },
          { from: 'broker', to: 'dlq', addedInAfter: true },
          { from: 'order-svc', to: 'order-db' },
          { from: 'inventory-svc', to: 'inv-db' },
          { from: 'monitoring', to: 'broker', addedInAfter: true }
        ]
      }
    },
    tags: ['System Design', 'DevOps & Platform', 'Team Leadership']
  },
  {
    slug: 'dashboard-performance',
    title: 'Dashboard Performance Rescue',
    subtitle:
      'Took a data-heavy analytics dashboard from 8-second loads to sub-400ms through architecture, not just optimization.',
    problem:
      'An internal analytics dashboard used by 300+ analysts loaded in 8+ seconds and frequently timed out on larger datasets. Users had resorted to exporting data to Excel rather than using the tool. The frontend fetched all data upfront and rendered everything in a single pass — no pagination, no virtualization, no caching.',
    constraints: [
      'Could not change the database schema (shared with other products)',
      'Budget for 2 engineers over 6 weeks',
      'Had to maintain API backward compatibility for 3 other consumers',
      'No existing test suite to prevent regressions'
    ],
    approach:
      'Rather than just slapping pagination on the frontend, I redesigned the data flow end-to-end. Added a Redis caching layer for expensive aggregation queries, implemented cursor-based pagination at the API level, and rebuilt the frontend with virtual scrolling and progressive data loading. We also added a BFF (Backend-for-Frontend) layer so the dashboard could get exactly the data shape it needed without affecting other API consumers.',
    outcomes: [
      { metric: 'Initial load', value: '8s → 400ms' },
      { metric: 'DB query load', value: '80% reduction' },
      { metric: 'Excel workaround', value: 'Eliminated' },
      { metric: 'User satisfaction', value: '34% → 91%' }
    ],
    retrospective:
      "The BFF layer was the right call architecturally, but I underestimated the maintenance burden it added for a 2-person team. If I did this again, I'd explore GraphQL as the BFF replacement — it would have given us the same data-shaping flexibility with less custom code. I also wish we'd written load tests earlier; we found a connection pool issue in staging that would have been caught sooner.",
    architecture: {
      before: {
        nodes: [
          { id: 'dashboard', label: 'Dashboard SPA', type: 'frontend', position: { x: 0, y: 100 } },
          { id: 'rest-api', label: 'REST API', type: 'api', position: { x: 400, y: 100 } },
          { id: 'analytics-db', label: 'Analytics DB', type: 'database', position: { x: 400, y: 350 } },
          { id: 'mobile', label: 'Mobile App', type: 'frontend', position: { x: 800, y: 0 } },
          { id: 'third-party', label: '3rd Party API', type: 'external', position: { x: 800, y: 200 } }
        ],
        connections: [
          { from: 'dashboard', to: 'rest-api' },
          { from: 'mobile', to: 'rest-api' },
          { from: 'third-party', to: 'rest-api' },
          { from: 'rest-api', to: 'analytics-db' }
        ]
      },
      after: {
        nodes: [
          { id: 'dashboard', label: 'Dashboard SPA', type: 'frontend', position: { x: 0, y: 0 } },
          { id: 'bff', label: 'BFF Layer', type: 'api', position: { x: 250, y: 150 }, addedInAfter: true },
          { id: 'rest-api', label: 'REST API', type: 'api', position: { x: 550, y: 150 } },
          { id: 'redis', label: 'Redis Cache', type: 'cache', position: { x: 400, y: 300 }, addedInAfter: true },
          { id: 'analytics-db', label: 'Analytics DB', type: 'database', position: { x: 400, y: 450 } },
          { id: 'mobile', label: 'Mobile App', type: 'frontend', position: { x: 800, y: 0 } },
          { id: 'third-party', label: '3rd Party API', type: 'external', position: { x: 800, y: 200 } }
        ],
        connections: [
          { from: 'dashboard', to: 'bff', animated: true, addedInAfter: true },
          { from: 'bff', to: 'redis', addedInAfter: true },
          { from: 'bff', to: 'rest-api', addedInAfter: true },
          { from: 'mobile', to: 'rest-api' },
          { from: 'third-party', to: 'rest-api' },
          { from: 'rest-api', to: 'redis', addedInAfter: true },
          { from: 'rest-api', to: 'analytics-db' }
        ]
      }
    },
    tags: ['Frontend Architecture', 'Data & APIs', 'System Design']
  }
];
