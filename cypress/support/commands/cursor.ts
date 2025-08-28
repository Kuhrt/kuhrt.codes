Cypress.Commands.add('shouldHaveCursorPosition', (x: number, y: number) => {
  cy.get('#cursor').should('have.css', 'left', `${x}px`);
  cy.get('#cursor').should('have.css', 'top', `${y}px`);
});

Cypress.Commands.add('shouldHaveCursorEffect', (effectClass: string) => {
  cy.get('#cursor').should('have.class', effectClass);
});

Cypress.Commands.add('shouldNotHaveCursorEffect', (effectClass: string) => {
  cy.get('#cursor').should('not.have.class', effectClass);
});
