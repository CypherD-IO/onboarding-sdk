describe('To test if information screen is rendered conditionaly', () => {
  beforeEach(() => {
    cy.visit('/sdkTest.html');
  })
  it('should work fine when showInfoScreen is set TRUE', () => {
    cy.getById("address").type('0x3d063C72b5A5b5457cb02076d134c806eca63Cff');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenTrue").check();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');

    cy.getById("cyd-addPopup").click();

    cy.getById("cyd-portfolio-loading-screen").should("not.exist");

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.getById('cyd-bridge-info-screen').should('exist')

    cy.getById('cyd-required-token-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  });

  it('should work fine when showInfoScreen is set FALSE', () => {
    cy.getById("address").type('0x3d063C72b5A5b5457cb02076d134c806eca63Cff');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');

    cy.getById("cyd-addPopup").click();

    cy.getById("cyd-portfolio-loading-screen").should("exist");

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.getById('cyd-bridge-info-screen').should('not.exist');
  });
});
