describe('To check if the bridge loading screen is rendered fine', () => {
  it('should render the bridge loading and maximize / minimize should work fine', () => {
    cy.visit('http://localhost:8080/sample/indexTest.html');

    cy.getById("address").type('0x71d357ef7e29f07473f9edfb2140f14605c9f309');
    cy.getById("targetChainIdHex").type('0x1');
    cy.getById("requiredTokenContractAddress").type('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("appId").type("CYPRESS_TEST")
    cy.getById("addPopup").click();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.intercept('GET', '**/swap/evm/chains/**').as('swapTokensCheck');

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });
    cy.wait('@swapTokensCheck', { timeout: 50000 });

    cy.contains('tr', 'Matic Token').find('.exchange-token-button').eq(0).click()

    cy.getById('bp-amount-value').type('10');
    cy.getByClass('bridge-input-submit').click();

    cy.getById('switch-chain-screen').should('exist');
    cy.getByClass('switch-chain-button').click();

    cy.getById('bridge-summary-screen').should('exist');

    cy.intercept('POST', '**/v1/bridge/sdk/quote').as('getBridgeQuote');

    cy.wait('@getBridgeQuote')
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

    cy.intercept('**/v1/activities/status/bridge/**').as('statusCheck')

    cy.wait('@statusCheck', {timeout: 50000});

    cy.getById('bridge-success-screen').should('exist');

  })
});