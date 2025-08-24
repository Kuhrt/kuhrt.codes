import GradientHeading from './GradientHeading';

describe('GradientHeading Component', () => {
  it('renders h1 heading with correct text', () => {
    cy.mount(<GradientHeading level="h1" text="Main Title" />);

    cy.get('h1').should('contain.text', 'Main Title');
    cy.get('h1').should('have.class', 'font-display');
    cy.get('h1').should('have.class', 'text-gradient');
    cy.get('h1').should('have.class', 'transition-all');
  });

  it('renders h2 heading with correct text', () => {
    cy.mount(<GradientHeading level="h2" text="Section Title" />);

    cy.get('h2').should('contain.text', 'Section Title');
    cy.get('h2').should('have.class', 'font-display');
    cy.get('h2').should('have.class', 'text-gradient');
    cy.get('h2').should('have.class', 'transition-all');
  });

  it('renders h3 heading with correct text', () => {
    cy.mount(<GradientHeading level="h3" text="Subsection Title" />);

    cy.get('h3').should('contain.text', 'Subsection Title');
    cy.get('h3').should('have.class', 'font-display');
    cy.get('h3').should('have.class', 'text-gradient');
    cy.get('h3').should('have.class', 'transition-all');
  });

  it('renders h4 heading with correct text', () => {
    cy.mount(<GradientHeading level="h4" text="Small Title" />);

    cy.get('h4').should('contain.text', 'Small Title');
    cy.get('h4').should('have.class', 'font-display');
    cy.get('h4').should('have.class', 'text-gradient');
    cy.get('h4').should('have.class', 'transition-all');
  });

  it('renders h5 heading with correct text', () => {
    cy.mount(<GradientHeading level="h5" text="Tiny Title" />);

    cy.get('h5').should('contain.text', 'Tiny Title');
    cy.get('h5').should('have.class', 'font-display');
    cy.get('h5').should('have.class', 'text-gradient');
    cy.get('h5').should('have.class', 'transition-all');
  });

  it('renders h6 heading with correct text', () => {
    cy.mount(<GradientHeading level="h6" text="Smallest Title" />);

    cy.get('h6').should('contain.text', 'Smallest Title');
    cy.get('h6').should('have.class', 'font-display');
    cy.get('h6').should('have.class', 'text-gradient');
    cy.get('h6').should('have.class', 'transition-all');
  });

  it('applies custom className prop', () => {
    cy.mount(
      <GradientHeading
        level="h1"
        text="Custom Styled Title"
        className="text-2xl font-bold text-center"
      />
    );

    cy.get('h1').should('contain.text', 'Custom Styled Title');
    cy.get('h1').should('have.class', 'text-2xl');
    cy.get('h1').should('have.class', 'font-bold');
    cy.get('h1').should('have.class', 'text-center');
    // Should still have default classes
    cy.get('h1').should('have.class', 'font-display');
    cy.get('h1').should('have.class', 'text-gradient');
    cy.get('h1').should('have.class', 'transition-all');
  });

  it('has correct data-hover attribute for cursor effects', () => {
    cy.mount(<GradientHeading level="h1" text="Hoverable Title" />);

    cy.get('h1').should('have.attr', 'data-hover', 'glow');
  });

  it('handles empty text gracefully', () => {
    cy.mount(<GradientHeading level="h1" text="" />);

    cy.get('h1').should('exist');
    cy.get('h1').should('have.class', 'font-display');
    cy.get('h1').should('have.class', 'text-gradient');
    cy.get('h1').should('have.class', 'transition-all');
    cy.get('h1').should('have.attr', 'data-hover', 'glow');
  });

  it('handles long text content', () => {
    const longText =
      'This is a very long heading text that should still render properly and maintain all the expected styling and functionality';

    cy.mount(<GradientHeading level="h1" text={longText} />);

    cy.get('h1').should('contain.text', longText);
    cy.get('h1').should('have.class', 'font-display');
    cy.get('h1').should('have.class', 'text-gradient');
    cy.get('h1').should('have.class', 'transition-all');
  });

  it('renders with special characters and numbers', () => {
    const specialText = 'Title with 123 & special chars! @#$%';

    cy.mount(<GradientHeading level="h1" text={specialText} />);

    cy.get('h1').should('contain.text', specialText);
    cy.get('h1').should('have.class', 'font-display');
    cy.get('h1').should('have.class', 'text-gradient');
    cy.get('h1').should('have.class', 'transition-all');
  });
});
