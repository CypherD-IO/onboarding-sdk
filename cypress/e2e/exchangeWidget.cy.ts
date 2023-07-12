describe('To check if the exchange widget is rendered fine', () => {
  beforeEach(() => {
    cy.visit('/sdkTest.html');
  });

  it('should render the exchange widget', () => {
    cy.getById("address").type('0x6baa80fa2ad0cc622198b5a5128caf135ca34374');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("parentComponentId").type('cyd-widget');

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');

    cy.getById("cyd-addPopup").click();

    cy.getById("cyd-sdk-container").should('not.exist');
    cy.getById("cyd-portfolio-loading-screen").should("exist");

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.getById("cyd-exchange-widget").should('exist');
  });

  it('should work for the happy path of bridge', () => {
    cy.getById("address").type('0x6baa80fa2ad0cc622198b5a5128caf135ca34374');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("appId").type("CYPRESS_TEST")

    cy.getById("parentComponentId").type('cyd-widget');

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');

    cy.getById("cyd-addPopup").click();

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.getById("cyd-exchange-widget").should('exist');

    cy.getById("cyd-from-chain-dropdown").click();
    cy.contains('.cyd-dropdown-option', 'Polygon').click();
    cy.contains("#cyd-from-token-dropdown", 'Matic Token').should('exist');

    cy.getById('cyd-choosen-token-logo')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);

    cy.contains("#cyd-choosen-token-name", 'Matic Token').should('exist');
    cy.contains("#cyd-choosen-token", 'Matic Token').should('exist');

    cy.getById("cyd-from-token-dropdown").click();
    cy.contains('.cyd-dropdown-option', 'Matic Token').click();

    cy.getById("cyd-to-chain-dropdown").click();
    cy.get(".cyd-from-chain-dropdown-option").should('not.exist');

    cy.getById("cyd-to-token-dropdown").click();
    cy.get(".cyd-from-chain-dropdown-option").should('not.exist');

    cy.getById('cyd-bp-amount-value').type('10');
    cy.getByClass('cyd-bridge-input-submit').click();

    cy.getById('cyd-switch-chain-screen').should('exist');

    cy.intercept('POST', '**/v1/bridge/sdk/quote').as('getBridgeQuote');

    cy.getByClass('cyd-switch-chain-button').click();

    cy.getById('cyd-bridge-summary-screen').should('exist');


    cy.wait('@getBridgeQuote', { timeout: 50000 })
      .its('response.statusCode')
      .should('eq', 201);

    cy.getById('cyd-bridge-submit-button')
      .should('not.be.disabled');

    cy.intercept('**/v1/bridge/sdk/quote/**/deposit').as('depositCall');
    cy.intercept('**v1/prices/gas/**').as('getGasPrice');

    cy.getById('cyd-bridge-submit-button')
      .click()

    cy.getById('cyd-bridge-loading-screen').should('exist');

    cy.wait('@getGasPrice', { timeout: 50000 });
    cy.wait('@depositCall', { timeout: 50000 });

    const interceptAndWait = () => {
      cy.intercept('**/v1/activities/status/bridge/**').as('statusCheck')

      cy.wait('@statusCheck', { timeout: 50000 }).then((interception) => {
        const response = interception.response;
        if (response.body.activityStatus.status !== 'COMPLETED') {
          interceptAndWait();
        }
      });
    }

    interceptAndWait();

    cy.getById('cyd-bridge-success-screen').should('exist');
    cy.getById('cyd-bp-switch-container').should('exist');
    cy.getById('cyd-bp-switch-container').click();
  });

  it('should show proper alerts for wrong amount inputs and max button', () => {
    cy.getById("address").type('0x6baa80fa2ad0cc622198b5a5128caf135ca34374');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("appId").type("CYPRESS_TEST")

    cy.getById("parentComponentId").type('cyd-widget');

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');

    cy.getById("cyd-addPopup").click();

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.getById("cyd-exchange-widget").should('exist');

    cy.getById("cyd-from-chain-dropdown").click();
    cy.contains('.cyd-dropdown-option', 'Polygon').click();

    cy.getById("cyd-from-token-dropdown").click();
    cy.contains('.cyd-dropdown-option', 'Matic Token').click();

    cy.getByClass('cyd-bridge-input-submit').click();
    cy.getById('swal2-html-container').should('contain', 'Please Enter a value greater than the minimum amount ( $10.00 ).');

    cy.wait(5500);

    // it should show error toast when value bellow $10 is submitted
    cy.getById('cyd-bp-amount-value').type('2');
    cy.getByClass('cyd-bridge-input-submit').click();
    cy.getById('swal2-html-container').should('contain', 'Please Enter a value greater than the minimum amount ( $10.00 ).');

    cy.wait(5500);

    // it should show error toast when value greater than balance is submitted
    cy.getById('cyd-bp-amount-value').type('{selectall}{backspace}')
    cy.getById('cyd-bp-amount-value').type('999999999');
    cy.getByClass('cyd-bridge-input-submit').click();
    cy.getById('swal2-html-container').should('contain', 'Value entered is greater than your balance');

    cy.wait(5500);

    // check if Max button works
    cy.getById('cyd-bp-amount-value').type('{selectall}{backspace}')
    cy.getByClass('cyd-bp-max-button').click();
    cy.getById('cyd-bp-amount-value').should('not.have.value', '');
  });
})

