describe('Color page tests', () => {
  before(() => {
    cy.visit('/color');
  });
  it('Loads correctly', () => {
    cy.get('[data-testid="homeButton"]').should('be.disabled');
    cy.injectAxe();
    cy.checkA11y();
  });
  it('Typing incorrect color prevents button from being enabled', () => {
    cy.get('[data-testid="colorTextInput"]').should('have.value', '');
    cy.get('[data-testid="invalidMessage"]').should('not.be.visible');
    cy.get('[data-testid="validMessage"]').should('not.be.visible');

    cy.get('[data-testid="colorTextInput"]').clear().type('pink');
    cy.get('[data-testid="invalidMessage"]').should('be.visible');
    cy.get('[data-testid="validMessage"]').should('not.be.visible');
    cy.get('[data-testid="homeButton"]').should('be.disabled');
  });

  it('Typing color enables button', () => {
    cy.get('[data-testid="colorTextInput"]').clear().type('red');
    cy.get('[data-testid="invalidMessage"]').should('not.be.visible');
    cy.get('[data-testid="validMessage"]').should('be.visible');
    cy.get('[data-testid="homeButton"]').should('not.be.disabled');
  });

  it('Clicking home button navigates to home page', () => {
    cy.get('[data-testid="colorTextInput"]').clear().type('red');
    cy.get('[data-testid="homeButton"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
