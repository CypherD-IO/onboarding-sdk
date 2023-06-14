describe('To check maximise and minimise functionality in portfolio loading screem', () => {
  beforeEach(() => {
    cy.visit('/sdkTest.html');
  })
  it('should minimize the window when the minimize button is clicked', () => {

    cy.getById("address").type('0xfe1d0f3a779a3968c5728940cbc6416867ab527b');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');

    cy.getById("addPopup").click();

    cy.getByClass('minimize-button').trigger("click");

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

    cy.get("#sdkContainer")
        .should("have.css", "backgroundColor", "rgba(0, 0, 0, 0.4)")
        .and("have.css", "backdropFilter", "blur(5px)");

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 }).then(() => {
      cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
      cy.wait('@swapChainsCheck', { timeout: 50000 });
    });
  });
});
