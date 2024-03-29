describe('To check if the switch chain screen is rendered fine', () => {
  beforeEach(() => {
    cy.visit('/sdkTest.html');
  })
  it('should render the switch chain screen conditionally', () => {
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

    cy.getByClass('cyd-exchange-token-button').eq(0).click()

    cy.getById('cyd-bp-amount-value').type('20');
    cy.getByClass('cyd-bridge-input-submit').click();

    cy.getById('cyd-switch-chain-screen').should('exist');
    cy.getByClass('cyd-switch-chain-button').click();

    cy.get('#cyd-bridge-summary-screen').should('exist');
  })
});
