describe('Form', () => {
  it('When visiting the home page, the form is visible', () => {
    cy.visit('http://localhost:9002/');
    cy.get('[data-hook=mainForm]').should('be.visible');
  });

  it('When typing a value into origin city autocomplete, this autocomplete is visible and has typed value', () => {
    cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin');

    cy.get('@autocompleteOrigin').should('be.visible');
    cy.get('@autocompleteOrigin').type('Харьков');
    cy.get('@autocompleteOrigin').should('have.value', 'Харьков');
  });

  it('When typing a value into destination city autocomplete, this autocomplete is visible and has typed value', () => {
    cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination');

    cy.get('@autocompleteDestination').should('be.visible');
    cy.get('@autocompleteDestination').type('Киев');
    cy.get('@autocompleteDestination').should('have.value', 'Киев');
  });

  it('When clicking on the depart datepicker, the datepicker modal should opens', () => {
    cy.get('[data-hook=datepickerDepartInput]').as('datepickerDepartInput');
    cy.get('[data-hook=datepickerDepartWrap] .datepicker-container').as('modalWindow');

    cy.get('@datepickerDepartInput').click();
    cy.get('@modalWindow').should('be.visible');
  });

  it('After selecting the departing date, it sholud be displayed in the input field in the right format', () => {
    cy.get('[data-hook=datepickerDepartWrap] .datepicker-container .is-today').as('today');
    cy.get('[data-hook=datepickerDepartWrap] .datepicker-container .btn-flat').as('modalButtons');
    cy.get('[data-hook=datepickerDepartInput]').as('datepickerDepartInput');

    cy.get('@today').click();
    cy.get('@today').should('have.class', 'is-selected');
    cy.get('@modalButtons').contains('Ok').click();

    cy.get('@datepickerDepartInput').then(($input) => {
      const val = $input.val();
      expect(val).to.match(/^\d{4}-\d{2}$/);
    })
  })

  it('When selecting the currency from the header dropdown it should be changed and visible in the header', () => {
    cy.get('[data-hook=currencySelect] .dropdown-trigger').as('currencySelect');
    cy.get('[data-hook=currencySelect] .dropdown-content li').as('currencyItem');

    cy.get('@currencySelect').click();
    cy.get('@currencyItem').contains('€ Euro').click();
    cy.get('@currencySelect').should('have.value', '€ Euro');

  })
})