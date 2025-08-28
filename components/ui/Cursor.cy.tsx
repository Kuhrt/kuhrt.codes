import Cursor from './Cursor';

describe('<Cursor />', () => {
  beforeEach(() => {
    // Mock the document and window for cursor functionality
    cy.window().then((win) => {
      // Mock document.querySelectorAll to return elements with data-hover attributes
      cy.stub(win.document, 'querySelectorAll').returns([
        {
          addEventListener: cy.stub().as('addEventListener'),
          removeEventListener: cy.stub().as('removeEventListener'),
          getAttribute: cy.stub().returns('hover-effect'),
          setAttribute: cy.stub()
        }
      ]);
    });
  });

  it('renders cursor element with correct attributes', () => {
    cy.mount(<Cursor />);

    cy.get('#cursor').should('exist');
    cy.get('#cursor').should('have.class', 'cursor');
  });

  it('renders cursor element with correct ref', () => {
    cy.mount(<Cursor />);

    cy.get('#cursor').should('exist');
    // The cursor should be a div element
    cy.get('#cursor').should('have.prop', 'tagName', 'DIV');
  });

  it('has correct positioning styles', () => {
    cy.mount(<Cursor />);

    cy.get('#cursor').should('exist');
    // Initially should not have positioning styles
    cy.get('#cursor').should('not.have.css', 'left');
    cy.get('#cursor').should('not.have.css', 'top');
  });

  it('responds to mouse movement', () => {
    cy.mount(<Cursor />);

    // Simulate mouse movement
    cy.get('body').trigger('mousemove', { clientX: 100, clientY: 200 });

    // The cursor should now have positioning styles
    cy.get('#cursor').should('have.css', 'left', '100px');
    cy.get('#cursor').should('have.css', 'top', '200px');
  });

  it('updates position on multiple mouse movements', () => {
    cy.mount(<Cursor />);

    // First movement
    cy.get('body').trigger('mousemove', { clientX: 50, clientY: 75 });
    cy.get('#cursor').should('have.css', 'left', '50px');
    cy.get('#cursor').should('have.css', 'top', '75px');

    // Second movement
    cy.get('body').trigger('mousemove', { clientX: 300, clientY: 400 });
    cy.get('#cursor').should('have.css', 'left', '300px');
    cy.get('#cursor').should('have.css', 'top', '400px');
  });

  it('handles mouse leave events', () => {
    cy.mount(<Cursor />);

    // Add some effect classes first
    cy.get('#cursor').then(($cursor) => {
      $cursor[0].classList.add('hover', 'glow');
    });

    // Trigger mouse leave
    cy.get('body').trigger('mouseleave');

    // The effect classes should be removed
    cy.get('#cursor').should('not.have.class', 'hover');
    cy.get('#cursor').should('not.have.class', 'glow');
  });

  it('sets up event listeners for hover elements', () => {
    cy.mount(<Cursor />);

    // Check that addEventListener was called for mouseenter and mouseleave
    cy.get('@addEventListener').should('have.been.called');
  });

  it('handles cursor effect classes on hover elements', () => {
    cy.mount(<Cursor />);

    // Create a hover element with data-hover attribute
    cy.get('body').then(($body) => {
      const hoverElement = document.createElement('div');
      hoverElement.setAttribute('data-hover', 'custom-effect');
      $body[0].appendChild(hoverElement);

      // Trigger mouse enter on the hover element
      cy.wrap(hoverElement).trigger('mouseenter');

      // The cursor should have the custom effect class
      cy.get('#cursor').should('have.class', 'custom-effect');
    });
  });

  it('removes effect classes when leaving hover elements', () => {
    cy.mount(<Cursor />);

    // Create a hover element
    cy.get('body').then(($body) => {
      const hoverElement = document.createElement('div');
      hoverElement.setAttribute('data-hover', 'custom-effect');
      $body[0].appendChild(hoverElement);

      // Add effect classes first
      cy.get('#cursor').then(($cursor) => {
        $cursor[0].classList.add('custom-effect');
      });

      // Trigger mouse leave
      cy.wrap(hoverElement).trigger('mouseleave');

      // The effect class should be removed
      cy.get('#cursor').should('not.have.class', 'custom-effect');
    });
  });

  it('maintains cursor position during hover effects', () => {
    cy.mount(<Cursor />);

    // Set initial position
    cy.get('body').trigger('mousemove', { clientX: 150, clientY: 250 });
    cy.get('#cursor').should('have.css', 'left', '150px');
    cy.get('#cursor').should('have.css', 'top', '250px');

    // Create and hover over an element
    cy.get('body').then(($body) => {
      const hoverElement = document.createElement('div');
      hoverElement.setAttribute('data-hover', 'test-effect');
      $body[0].appendChild(hoverElement);

      // Trigger mouse enter
      cy.wrap(hoverElement).trigger('mouseenter');

      // Position should remain the same
      cy.get('#cursor').should('have.css', 'left', '150px');
      cy.get('#cursor').should('have.css', 'top', '250px');
      // But should have the effect class
      cy.get('#cursor').should('have.class', 'test-effect');
    });
  });

  it('handles multiple hover elements correctly', () => {
    cy.mount(<Cursor />);

    cy.get('body').then(($body) => {
      // Create first hover element
      const hoverElement1 = document.createElement('div');
      hoverElement1.setAttribute('data-hover', 'effect1');
      $body[0].appendChild(hoverElement1);

      // Create second hover element
      const hoverElement2 = document.createElement('div');
      hoverElement2.setAttribute('data-hover', 'effect2');
      $body[0].appendChild(hoverElement2);

      // Hover over first element
      cy.wrap(hoverElement1).trigger('mouseenter');
      cy.get('#cursor').should('have.class', 'effect1');

      // Hover over second element
      cy.wrap(hoverElement2).trigger('mouseenter');
      cy.get('#cursor').should('have.class', 'effect2');

      // Leave second element
      cy.wrap(hoverElement2).trigger('mouseleave');
      cy.get('#cursor').should('not.have.class', 'effect2');
    });
  });
});
