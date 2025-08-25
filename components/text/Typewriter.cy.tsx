import Typewriter from './Typewriter';

describe('<Typewriter />', () => {
  beforeEach(() => {
    // Stub timers to control the typewriter animation
    cy.clock();
  });

  afterEach(() => {
    // Restore timers after each test
    cy.clock().then((clock) => clock.restore());
  });

  it('renders with empty text initially', () => {
    cy.mount(<Typewriter>Hello World</Typewriter>);

    cy.get('p').should('exist');
    cy.get('p').should('have.text', '');
  });

  it('animates text character by character', () => {
    const testText = 'Hello';
    cy.mount(<Typewriter>{testText}</Typewriter>);

    // Initially empty
    cy.get('p').should('have.text', '');

    // After first character
    cy.tick(100);
    cy.get('p').should('have.text', 'H');

    // After second character
    cy.tick(100);
    cy.get('p').should('have.text', 'He');

    // After third character
    cy.tick(100);
    cy.get('p').should('have.text', 'Hel');

    // After fourth character
    cy.tick(100);
    cy.get('p').should('have.text', 'Hell');

    // After fifth character
    cy.tick(100);
    cy.get('p').should('have.text', 'Hello');
  });

  it('completes the full animation', () => {
    const testText = 'Test';
    cy.mount(<Typewriter>{testText}</Typewriter>);

    // Fast forward through all characters
    for (let i = 0; i < testText.length; i++) {
      cy.tick(100);
    }

    cy.get('p').should('have.text', testText);
  });

  it('handles single character text', () => {
    cy.mount(<Typewriter>A</Typewriter>);

    cy.get('p').should('have.text', '');
    cy.tick(100);
    cy.get('p').should('have.text', 'A');
  });

  it('handles long text content', () => {
    const longText =
      'This is a very long text that should animate properly without any issues';
    cy.mount(<Typewriter>{longText}</Typewriter>);

    // Fast forward through all characters
    for (let i = 0; i < longText.length; i++) {
      cy.tick(100);
    }

    cy.get('p').should('have.text', longText);
  });

  it('handles text with special characters and numbers', () => {
    const specialText = 'Hello 123! @#$% &*()';
    cy.mount(<Typewriter>{specialText}</Typewriter>);

    // Fast forward through all characters
    for (let i = 0; i < specialText.length; i++) {
      cy.tick(100);
    }

    cy.get('p').should('have.text', specialText);
  });

  it('handles text with spaces', () => {
    const textWithSpaces = 'Hello World';
    cy.mount(<Typewriter>{textWithSpaces}</Typewriter>);

    // Fast forward through all characters
    for (let i = 0; i < textWithSpaces.length; i++) {
      cy.tick(100);
    }

    cy.get('p').should('have.text', textWithSpaces);
  });

  it('handles empty string gracefully', () => {
    cy.mount(<Typewriter></Typewriter>);

    cy.get('p').should('exist');
    cy.get('p').should('have.text', '');
  });

  it('throws error for non-string children', () => {
    // Test with number
    expect(() => {
      cy.mount(<Typewriter>{123}</Typewriter>);
    }).to.throw('Children must be text only');

    // Test with object
    expect(() => {
      cy.mount(
        <Typewriter>
          <span>hello</span>
        </Typewriter>
      );
    }).to.throw('Children must be text only');

    // Test with array
    expect(() => {
      cy.mount(<Typewriter>{['hello', 'world']}</Typewriter>);
    }).to.throw('Children must be text only');
  });

  it('applies custom HTML attributes', () => {
    cy.mount(
      <Typewriter
        className="custom-class"
        data-testid="typewriter"
        id="test-id"
      >
        Hello World
      </Typewriter>
    );

    cy.get('p').should('have.class', 'custom-class');
    cy.get('p').should('have.attr', 'data-testid', 'typewriter');
    cy.get('p').should('have.attr', 'id', 'test-id');
  });

  it('maintains proper timing between characters', () => {
    const testText = 'ABC';
    cy.mount(<Typewriter>{testText}</Typewriter>);

    // Check that characters appear with appropriate delays
    cy.get('p').should('have.text', '');

    cy.tick(50); // Minimum delay
    cy.get('p').should('have.text', 'A');

    cy.tick(50); // Next character
    cy.get('p').should('have.text', 'AB');

    cy.tick(50); // Final character
    cy.get('p').should('have.text', 'ABC');
  });

  it('handles unicode characters correctly', () => {
    const unicodeText = 'Hello 🌍 世界 👋';
    cy.mount(<Typewriter>{unicodeText}</Typewriter>);

    // Fast forward through all characters
    for (let i = 0; i < unicodeText.length; i++) {
      cy.tick(100);
    }

    cy.get('p').should('have.text', unicodeText);
  });
});
