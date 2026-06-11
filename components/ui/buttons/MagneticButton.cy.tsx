import MagneticButton from './MagneticButton';

describe('<MagneticButton />', () => {
  it('renders a button by default', () => {
    cy.mount(<MagneticButton>Click me</MagneticButton>);

    cy.get('button').should('contain.text', 'Click me');
    cy.get('button').should('have.class', 'magnetic-btn');
    cy.get('button').should('have.attr', 'type', 'button');
    cy.get('button').should('have.attr', 'data-hover', 'hover');
    cy.get('a').should('not.exist');
  });

  it('renders an anchor when href is provided', () => {
    cy.mount(
      <MagneticButton href="mailto:test@example.com">
        Start a project
      </MagneticButton>
    );

    cy.get('a').should('contain.text', 'Start a project');
    cy.get('a').should('have.class', 'magnetic-btn');
    cy.get('a').should('have.attr', 'href', 'mailto:test@example.com');
    cy.get('a').should('have.attr', 'data-hover', 'hover');
    cy.get('button').should('not.exist');
  });

  it('applies custom className alongside defaults', () => {
    cy.mount(<MagneticButton className="text-2xl">Styled</MagneticButton>);

    cy.get('button').should('have.class', 'magnetic-btn');
    cy.get('button').should('have.class', 'text-2xl');
  });

  it('fires onClick when rendered as a button', () => {
    const onClick = cy.stub().as('onClick');
    cy.mount(<MagneticButton onClick={onClick}>Click me</MagneticButton>);

    cy.get('button').click();
    cy.get('@onClick').should('have.been.calledOnce');
  });

  it('translates on mousemove and resets on mouseleave', () => {
    cy.mount(<MagneticButton>Magnetic</MagneticButton>);

    cy.get('button').trigger('mousemove', { clientX: 0, clientY: 0 });
    cy.get('button').should(($btn) => {
      expect($btn[0].style.transform).to.match(/^translate3d\(/);
      expect($btn[0].style.transform).to.not.equal(
        'translate3d(0px, 0px, 0px)'
      );
    });

    cy.get('button').trigger('mouseleave');
    cy.get('button').should(($btn) => {
      expect($btn[0].style.transform).to.equal('translate3d(0px, 0px, 0px)');
    });
  });
});
