# Component Tests

This directory contains Cypress component tests for all React components in the project.

## Test Files

### Layout Components

- **`Container.cy.tsx`** - Tests for the Container layout component
  - Default rendering with base classes
  - Custom className prop handling
  - HTML attribute forwarding
  - Complex children rendering
  - Custom styling through className

### Text Components

- **`GradientHeading.cy.tsx`** - Tests for the GradientHeading component
  - All heading levels (h1-h6) rendering
  - Text content display
  - Base styling classes (font-display, text-gradient, transition-all)
  - Custom className prop application
  - data-hover attribute for cursor effects
  - Edge cases (empty text, long text, special characters)

### UI Components

- **`Cursor.cy.tsx`** - Tests for the custom Cursor component
  - Element rendering and attributes
  - Mouse movement tracking and positioning
  - Hover effect class management
  - Event listener setup and cleanup
  - Multiple hover element handling
  - Effect class addition/removal

## Running Component Tests

### Run all component tests:
```bash
npm run test:component
```

### Run tests in interactive mode:
```bash
npm run cy:open
```
Then select "Component Testing" and choose your browser.

### Run specific test file:
```bash
npx cypress run --component --spec "components/ui/Cursor.cy.tsx"
```

## Test Coverage

The component tests cover:

- **Rendering**: Component mounts correctly with expected elements
- **Props**: All prop variations and edge cases
- **Styling**: CSS classes and styling application
- **Interactions**: Mouse events, hover effects, and user interactions
- **State Management**: Component state changes and updates
- **Edge Cases**: Empty content, null values, extreme inputs
- **Accessibility**: Proper HTML structure and attributes

## Custom Commands

The tests use custom Cypress commands for common assertions:

- `shouldHaveCursorPosition(x, y)` - Asserts cursor positioning
- `shouldHaveCursorEffect(effectClass)` - Asserts cursor effect class presence
- `shouldNotHaveCursorEffect(effectClass)` - Asserts cursor effect class absence

## Test Environment

Tests run in a jsdom environment with:
- Full DOM simulation
- Event handling
- CSS class management
- Component lifecycle testing
- Mocked browser APIs where needed

## Best Practices

- Each test focuses on a single behavior
- Tests are isolated and don't depend on each other
- Proper cleanup between tests
- Realistic user interaction simulation
- Comprehensive edge case coverage
