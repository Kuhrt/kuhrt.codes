import Container from './Container';

describe('<Container />', () => {
  it('renders with default props', () => {
    cy.mount(<Container>Test content</Container>);

    cy.get('div').should('contain.text', 'Test content');
    cy.get('div').should('have.class', 'relative');
    cy.get('div').should('have.class', 'px-2');
    cy.get('div').should('have.class', 'max-w-7xl');
    cy.get('div').should('have.class', 'mx-auto');
    cy.get('div').should('have.class', 'z-20');
  });

  it('renders with custom className', () => {
    cy.mount(<Container className="custom-class">Test content</Container>);

    cy.get('div').should('have.class', 'custom-class');
    cy.get('div').should('have.class', 'relative');
    cy.get('div').should('have.class', 'px-2');
  });

  it('renders with additional HTML attributes', () => {
    cy.mount(
      <Container id="test-id" data-testid="container">
        Test content
      </Container>
    );

    cy.get('div').should('have.attr', 'id', 'test-id');
    cy.get('div').should('have.attr', 'data-testid', 'container');
  });

  it('renders with complex children', () => {
    const complexContent = (
      <>
        <h1>Title</h1>
        <p>Paragraph</p>
        <button>Button</button>
      </>
    );

    cy.mount(<Container>{complexContent}</Container>);

    cy.get('div').should('contain.text', 'Title');
    cy.get('div').should('contain.text', 'Paragraph');
    cy.get('div').should('contain.text', 'Button');
    cy.get('h1').should('exist');
    cy.get('p').should('exist');
    cy.get('button').should('exist');
  });

  it('applies custom styling through className prop', () => {
    cy.mount(
      <Container className="bg-blue-500 text-white p-4">
        Styled content
      </Container>
    );

    cy.get('div').should('have.class', 'bg-blue-500');
    cy.get('div').should('have.class', 'text-white');
    cy.get('div').should('have.class', 'p-4');
    // Should still have default classes
    cy.get('div').should('have.class', 'relative');
    cy.get('div').should('have.class', 'px-2');
  });

  it('handles empty children gracefully', () => {
    cy.mount(<Container />);

    cy.get('div').should('exist');
    cy.get('div').should('have.class', 'relative');
    cy.get('div').should('have.class', 'px-2');
  });
});
