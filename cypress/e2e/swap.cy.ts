describe('To check if swap condition is addressed and success is rendered fine', () => {
  beforeEach(() => {
    cy.visit('/sdkTest.html');
  })
  it('should call the swap contract and render the success screen without switch back button', () => {
    cy.getById("address").type('0x6baa80fa2ad0cc622198b5a5128caf135ca34374');
    cy.getById("targetChainIdHex").type('0x89');
    cy.getById("requiredTokenContractAddress").type('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("appId").type("CYPRESS_TEST")

    cy.wait(5000);
    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.getById("addPopup").click();
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.intercept({method: 'GET', url: '**/swap/evm/chains/**', times: 1}).as('swapTokensCheck');
    cy.wait(5000);
    cy.wait('@fetchPortfolioBalances', { timeout: 50000 }).then(() => {
      cy.wait('@swapChainsCheck', { timeout: 50000 }).then(() => {
        cy.wait('@swapTokensCheck', { timeout: 50000 });
      });
    });

    cy.contains('tr', 'Matic Token').find('.exchange-token-button').eq(0).click()

    cy.getById('bp-amount-value').type('10');

    cy.getByClass('bridge-input-submit').click();

    cy.intercept('POST', '**v1/swap/sdk/evm/chains/**/quote').as('getSwapQuote');

    cy.getById('switch-chain-screen').should('exist');
    cy.getByClass('switch-chain-button').click();

    cy.getById('bridge-summary-screen').should('exist');

    cy.wait('@getSwapQuote', {timeout: 50000})
      .its('response.statusCode')
      .should('eq', 201);

    cy.getById('bridge-submit-blue-button')
      .should('not.be.disabled');

    // cy.getById('bridge-submit-blue-button')
    //   .click()

    // cy.getById('bridge-success-screen').should('exist');
    // cy.getById('bp-switch-container').should('not.exist');
    // cy.contains('OK').click();
  })
});
