describe('To test if portfolio screen is rendered conditionaly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/sample/indexTest.html');
  })
  it('should work fine for empty wallet when showInfoScreen is TRUE', () => {
    cy.getById("address").type('0x5759664ddb0100029b618f9c32be1d31c2b68863');
    cy.getById("targetChainIdHex").type('0x1');
    cy.getById("requiredTokenContractAddress").type('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenTrue").check();
    cy.getById("addPopup").click();

    cy.getById("portfolio-loading-screen").should("not.exist");

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.intercept('GET', '**/swap/evm/chains/**').as('swapTokensCheck');

    cy.wait('@fetchPortfolioBalances', { timeout: 10000 });
    cy.wait('@swapChainsCheck', { timeout: 10000 });
    cy.wait('@swapTokensCheck', { timeout: 10000 });

    cy.getById('empty-wallet-screen').should('exist');
  });

  it('should work fine for empty wallet when showInfoScreen is FALSE', () => {
    cy.getById("address").type('0x5759664ddb0100029b618f9c32be1d31c2b68863');
    cy.getById("targetChainIdHex").type('0x1');
    cy.getById("requiredTokenContractAddress").type('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("addPopup").click();

    cy.getById("portfolio-loading-screen").should("exist");

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.intercept('GET', '**/swap/evm/chains/**').as('swapTokensCheck');

    cy.wait('@fetchPortfolioBalances', { timeout: 10000 });
    cy.wait('@swapChainsCheck', { timeout: 10000 });
    cy.wait('@swapTokensCheck', { timeout: 10000 });

    cy.getById('empty-wallet-screen').should('exist');
  });

  it('should work fine fetching balances and showing portfolio balances', () => {
    cy.getById("address").type('0x3d063C72b5A5b5457cb02076d134c806eca63Cff');
    cy.getById("targetChainIdHex").type('0x1');
    cy.getById("requiredTokenContractAddress").type('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("addPopup").click();

    cy.getById("portfolio-loading-screen").should("exist");

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.intercept('GET', '**/swap/evm/chains/**').as('swapTokensCheck');

    cy.wait('@fetchPortfolioBalances', { timeout: 10000 });
    cy.wait('@swapChainsCheck', { timeout: 10000 });
    cy.wait('@swapTokensCheck', { timeout: 10000 });

    cy.getById('portfolio-balance-screen').should('exist');

    cy.getById('required-token-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.getById('required-chain-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0)
  });
});
