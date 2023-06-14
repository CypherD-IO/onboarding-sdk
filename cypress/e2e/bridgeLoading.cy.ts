describe('To check if the bridge loading screen is rendered fine', () => {
  it('should render the bridge loading and maximize / minimize should work fine', () => {
    cy.visit('/sdkTest.html');

    cy.getById("address").type('0x6baa80fa2ad0cc622198b5a5128caf135ca34374');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("appId").type("CYPRESS_TEST")

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.getById("addPopup").click();
    cy.intercept('GET', '**/swap/evm/chains', {
      fixture: 'swapChains.json'
    }).as('swapChainsCheck');
    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });

    cy.contains('tr', 'Matic Token').find('.exchange-token-button').eq(0).click()

    cy.getById('bp-amount-value').type('10');
    cy.getByClass('bridge-input-submit').click();

    cy.getById('switch-chain-screen').should('exist');
    cy.intercept('POST', '**/v1/bridge/sdk/quote').as('getBridgeQuote');
    cy.getByClass('switch-chain-button').click();

    cy.getById('bridge-summary-screen').should('exist');

    cy.wait('@getBridgeQuote', {timeout: 50000})
      .its('response.statusCode')
      .should('eq', 201);

    cy.getById('bridge-submit-blue-button')
      .should('not.be.disabled');

    cy.getById('bridge-submit-blue-button')
      .click()

    cy.intercept('**/v1/bridge/sdk/quote/**/deposit').as('depositCall');
    cy.intercept('**v1/prices/gas/**').as('getGasPrice');

    cy.getById('bridge-loading-screen').should('exist');

    cy.wait('@getGasPrice', { timeout: 50000 });
    cy.wait('@depositCall', { timeout: 50000 });

    cy.getById('sdkContainer')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
      .and('have.css', 'backdrop-filter', 'none')
      .and('have.css', 'zoom', '0.4')
      .should(($element) => {
        const height = $element.height();
        const width = $element.width();
        const top = parseFloat($element.css('top'));
        const left = parseFloat($element.css('left'));

        expect(height).to.be.closeTo(495, 1);
        expect(width).to.be.closeTo(1000, 1);
        expect(top).to.be.closeTo(1155, 1);
        expect(left).to.be.closeTo(1500, 1);
      })

    cy.get(".maximize-onclick").click({force: true});


    cy.get("#sdkContainer")
        .should("have.css", "zoom", "1")
        .should(($element) => {
          const height = $element.height();
          const width = $element.width();
          const top = parseFloat($element.css('top'));
          const left = parseFloat($element.css('left'));

          expect(height).to.be.closeTo(660, 1);
          expect(width).to.be.closeTo(1000, 1);
          expect(top).to.be.closeTo(0, 1);
          expect(left).to.be.closeTo(0, 1);
        });

    const interceptAndWait = () => {
      cy.intercept('**/v1/activities/status/bridge/**').as('statusCheck')

      cy.wait('@statusCheck', {timeout: 50000}).then((interception) => {
        const response = interception.response;
        if (response.body.activityStatus.status !== 'COMPLETED') {
          interceptAndWait();
        }
      });
    }

    interceptAndWait();


    cy.getById('bridge-success-screen').should('exist');

  })
});
