describe('To check if bridge summary screen is rendered fine', ()=>{
  beforeEach(() => {
    cy.visit('http://localhost:8080/sample/indexTest.html');

    cy.getById("address").type('0xfe1d0f3a779a3968c5728940cbc6416867ab527b');
    cy.getById("targetChainIdHex").type('0x1');
    cy.getById("requiredTokenContractAddress").type('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("addPopup").click();


    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.intercept('GET', '**/swap/evm/chains/**').as('swapTokensCheck');

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });
    cy.wait('@swapTokensCheck', { timeout: 50000 });

    cy.getByClass('exchange-token-button').eq(0).click()

  })

  it('should check whether summary screen renders correctly' , ()=>{
    cy.getById('bp-amount-value').type('20');
    cy.getByClass('bridge-input-submit').click();
    cy.get('#bridge-summary-screen').should('exist');
  });

  it('should go back to enter screen when back button is clicked',()=>{
    cy.getById('bp-amount-value').type('20');
    cy.getByClass('bridge-input-submit').click();
    cy.getByClass('back-button').click();
    cy.getById('bridge-input-screen').should('exist');
  })

  it('should check if images are rendered properly' , ()=>{

    cy.getById('bp-amount-value').type('20');
    cy.getByClass('bridge-input-submit').click();

    cy.getById('from-token-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.getById('from-chain-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.getById('to-token-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.getById('to-chain-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  })

  it('should check whether exchange button is disabled and enabled properly',()=>{
    cy.getById('bp-amount-value').type('20');
    cy.getByClass('bridge-input-submit').click();

    cy.get('#bridge-submit-blue-button')
      .should('be.disabled');

    cy.intercept('POST', '**/v1/bridge/sdk/quote').as('getBridgeQuote');

    cy.wait('@getBridgeQuote')
      .its('response.statusCode')
      .should('eq', 201);

    cy.get('#bridge-submit-blue-button')
      .should('not.be.disabled');

  })

  it.only('should check whether close popup works correctly' , ()=>{
    cy.get('.close-popup')
      .click();

    cy.get('#sdkContainer')
      .should('not.exist');
  })

});
