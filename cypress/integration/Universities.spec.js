import { universitiesAPI } from '../../src/js/axios.config';

describe('University page tests', () => {
  before(() => {
    cy.intercept(universitiesAPI.url(), { fixture: 'universities.json' }).as(
      'getUniversities'
    );
    cy.visit('/universities');
    cy.wait('@getUniversities');
  });
  it('Loads correctly', () => {
    cy.get('[data-testid="uniListItem"]').should('exist');
    cy.injectAxe();
    cy.checkA11y();
  });
});
