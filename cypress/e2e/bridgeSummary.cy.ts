describe('To check if bridge summary screen is rendered fine', () => {
  beforeEach(() => {
    cy.visit('/sdkTest.html');

    cy.getById("address").type('0xfe1d0f3a779a3968c5728940cbc6416867ab527b');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("appId").type("CYPRESS_TEST")

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');

    cy.getById("cyd-addPopup").click();

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.contains('tr', 'ETH').find('.cyd-exchange-token-button').eq(0).click()
  })
  it('should check whether summary screen renders correctly without switch chain', () => {
    cy.getById('cyd-bp-amount-value').type('10');
    cy.getByClass('cyd-bridge-input-submit').click();
    cy.getById('cyd-switch-chain-screen').should('not.exist');
    cy.get('#cyd-bridge-summary-screen').should('exist');
  });

  it('should check whether summary screen renders correctly', () => {
    cy.getById('cyd-bp-amount-value').type('10');
    cy.getByClass('cyd-bridge-input-submit').click();
    cy.get('#cyd-bridge-summary-screen').should('exist');
  });

  it('should go back to enter screen when back button is clicked', () => {
    cy.getById('cyd-bp-amount-value').type('10');
    cy.getByClass('cyd-bridge-input-submit').click();
    cy.wait(1000)
    cy.getByClass('cyd-back-button').click();
    cy.getById('cyd-bridge-input-screen').should('exist');
  })

  it('should check if images are rendered properly', () => {

    cy.getById('cyd-bp-amount-value').type('10');
    cy.getByClass('cyd-bridge-input-submit').click();

    cy.getById('cyd-from-token-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.getById('cyd-from-chain-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.getById('cyd-to-token-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.getById('cyd-to-chain-img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  })

  it('should check whether close popup works correctly', () => {
    cy.get('.cyd-close-popup')
      .click();

    cy.get('#cyd-sdk-container')
      .should('not.exist');
  })

});

describe('To check whether exchange button is disabled and enabled fine', () => {
  it('should check whether exchange button is disabled and enabled properly', () => {
    cy.visit('/sdkTest.html');
    cy.getById("address").type('0xfe1d0f3a779a3968c5728940cbc6416867ab527b');
    cy.getById("targetChainIdHex").type('0x89');
    cy.getById("requiredTokenContractAddress").type('0x0000000000000000000000000000000000001010');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("appId").type("CYPRESS_TEST")

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept({ method: 'GET', url: '**/swap/evm/chains', times: 1 }).as('swapChainsCheck');
    cy.intercept({ method: 'GET', url: '**/swap/evm/chains/**', times: 1 }).as('swapTokensCheck');

    cy.getById("cyd-addPopup").click();

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });
    cy.wait('@swapTokensCheck', { timeout: 50000 });

    cy.contains('tr', 'ETH').find('.cyd-exchange-token-button').eq(0).click()

    cy.getById('cyd-bp-amount-value').type('10');
    cy.intercept('POST', '**/v1/bridge/sdk/quote').as('getBridgeQuote');

    cy.getByClass('cyd-bridge-input-submit').click();

    cy.get('#cyd-bridge-submit-button')
      .should('be.disabled');

    cy.wait('@getBridgeQuote', { timeout: 50000 })
      .its('response.statusCode')
      .should('eq', 201);

    cy.get('#cyd-bridge-submit-button')
      .should('not.be.disabled');
  })
});
