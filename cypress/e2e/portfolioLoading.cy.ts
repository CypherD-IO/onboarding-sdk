describe('To check maximise and minimise functionality in portfolio loading screem', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/sample/indexTest.html');
    cy.viewport(1000, 660);
  })
  it('should minimize the window when the minimize button is clicked', () => {

    cy.getById("address").type('0xfe1d0f3a779a3968c5728940cbc6416867ab527b');
    cy.getById("targetChainIdHex").type('0x1');
    cy.getById("requiredTokenContractAddress").type('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("addPopup").click();

    cy.getByClass('minimize-button').trigger("click");


    cy.getById('sdkContainer')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
      .and('have.css', 'backdrop-filter', 'none')
      .and('have.css', 'zoom', '0.4')
      .and('have.css', 'height', '495px')
      .and('have.css', 'width', '1000px')
      .and('have.css', 'top', '1155px')
      .and('have.css', 'left', '1500px');


    cy.get(".maximize-onclick").click({force: true});


    cy.get("#sdkContainer")
        .should("have.css", "zoom", "1")
        .and("have.css", "height", "660px")
        .and("have.css", "width", "1000px")
        .and("have.css", "top", "0px")
        .and("have.css", "left", "0px");

    cy.get("#sdkContainer")
        .should("have.css", "backgroundColor", "rgba(0, 0, 0, 0.4)")
        .and("have.css", "backdropFilter", "blur(5px)");

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.intercept('GET', '**/swap/evm/chains/**').as('swapTokensCheck');


    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });
    cy.wait('@swapTokensCheck', { timeout: 50000 });
  });


});
