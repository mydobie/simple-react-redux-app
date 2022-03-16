import { dinoAPI } from '../../src/js/axios.config';
import { interceptIndefinitely } from '../support/utils';

describe('Dino page tests', () => {
  let interception;
  beforeEach(() => {
    interception = interceptIndefinitely(dinoAPI.url(), {
      body: [
        [
          'myDino',
          'Cedarosaurus',
          'Erlicosaurus',
          'Majungasaurus',
          'Parrosaurus',
          'Bonatitan',
        ],
      ],
      statusCode: 200,
    });
  });
  it('Loads correctly', () => {
    cy.visit('/dino');

    cy.get('[data-testid="Loading"]')
      .should('be.visible')
      .then(() => {
        interception.sendResponse();
        cy.get('[data-testid="Loading"]').should('not.exist');
        cy.get('[data-testid="dinoListItem"]').should('have.length', 6);
        cy.injectAxe();
        cy.checkA11y();
      });
  });

  it('Add and removing a dino from the selected list', () => {
    cy.visit('/dino');
    cy.get('[data-testid="Loading"]')
      .should('be.visible')
      .then(() => {
        interception.sendResponse();
        cy.get('[data-testid="dinoSelectedList"]')
          .contains('myDino')
          .should('not.exist');
        cy.get('[data-testid="dinoSelectList"]').contains('myDino').click();

        // Is added
        cy.get('[data-testid="dinoSelectedList"]')
          .contains('myDino')
          .should('have.length', 1);

        // Is removed
        cy.get('[data-testid="dinoSelectList"]').contains('myDino').click();
        cy.get('[data-testid="dinoSelectedList"]')
          .contains('myDino')
          .should('not.exist');
      });
  });
});
