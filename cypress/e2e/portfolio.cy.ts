describe('To test if portfolio screen is rendered conditionaly', () => {
  beforeEach(() => {
    cy.visit('/sdkTest.html');
  })
  it('should work fine for empty wallet when showInfoScreen is TRUE', () => {
    cy.getById("address").type('0x5759664ddb0100029b618f9c32be1d31c2b68863');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenTrue").check();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.getById("addPopup").click();
    cy.getById("portfolio-loading-screen").should("not.exist");
    cy.intercept('GET', '**/swap/evm/chains', {
      fixture: 'swapChains.json'
    }).as('swapChainsCheck');
    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.getById('empty-wallet-screen').should('exist');
  });

  it('should work fine for empty wallet when showInfoScreen is FALSE', () => {
    cy.getById("address").type('0x5759664ddb0100029b618f9c32be1d31c2b68863');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.getById("addPopup").click();
    cy.getById("portfolio-loading-screen").should("exist");
    cy.intercept('GET', '**/swap/evm/chains', {
      fixture: 'swapChains.json'
    }).as('swapChainsCheck');
    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.getById('empty-wallet-screen').should('exist');
  });

  it('should work fine fetching balances and showing portfolio balances', () => {
    cy.getById("address").type('0xfe1d0f3a779a3968c5728940cbc6416867ab527b');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.getById("addPopup").click();
    cy.getById("portfolio-loading-screen").should("exist");
    cy.intercept('GET', '**/swap/evm/chains', {
      fixture: 'swapChains.json'
    }).as('swapChainsCheck');
    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.getById('portfolio-balance-screen').should('exist');

    // images of required token and chain must be loaded
    cy.getById('required-token-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.getById('required-chain-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    // the number of token listed should be >= 1
    cy.getById('portfolio-balance-table')
      .find('tr')
      .should('have.length.gte', 1);

    // every token balance listing should have token image and chain image
    cy.getByClass('portfolio-token-detail')
      .getById('td-token-icon')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.getByClass('portfolio-token-detail')
      .getById('td-chain-icon')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  });

  it('should check whether close popup works correctly' , ()=>{

    cy.getById("address").type('0xfe1d0f3a779a3968c5728940cbc6416867ab527b');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.getById("addPopup").click();
    cy.getById("portfolio-loading-screen").should("exist");
    cy.intercept('GET', '**/swap/evm/chains', {
      fixture: 'swapChains.json'
    }).as('swapChainsCheck');
    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.get('.close-popup')
      .click();

    cy.get('#sdkContainer')
      .should('not.exist');
  })
});
