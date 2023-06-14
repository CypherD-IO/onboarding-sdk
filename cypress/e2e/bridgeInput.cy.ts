describe('To check if bridge input screen is rendered fine ', () => {
  beforeEach(() => {
    cy.visit('/sdkTest.html');

    cy.getById("address").type('0xfe1d0f3a779a3968c5728940cbc6416867ab527b');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.getById("addPopup").click();
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.wait('@fetchPortfolioBalances', { timeout: 50000 }).then(() => {
      cy.wait('@swapChainsCheck', { timeout: 50000 });
    });

    cy.getByClass('exchange-token-button').eq(0).click()
  })

  it('should render bridge input when exchange clicked', () => {
    cy.getById('bridge-input-screen').should('exist');

    // it should show a error toast when empty value is submitted
    cy.getByClass('bridge-input-submit').click();
    cy.getById('swal2-html-container').should('contain', 'Please Enter a value greater than the minimum amount ( $10.00 ).');

    cy.wait(5500);

    // it should show error toast when value bellow $10 is submitted
    cy.getById('bp-amount-value').type('2');
    cy.getByClass('bridge-input-submit').click();
    cy.getById('swal2-html-container').should('contain', 'Please Enter a value greater than the minimum amount ( $10.00 ).');

    cy.wait(5500);

    // it should show error toast when value greater than balance is submitted
    cy.getById('bp-amount-value').type('{selectall}{backspace}')
    cy.getById('bp-amount-value').type('999999999');
    cy.getByClass('bridge-input-submit').click();
    cy.getById('swal2-html-container').should('contain', 'Value entered is greater than your balance');

    cy.wait(5500);

    // check if Max button works
    cy.getById('bp-amount-value').type('{selectall}{backspace}')
    cy.getByClass('bp-max-button').click();
    cy.getById('bp-amount-value').should('not.have.value', '');
  });

    // check if back button works
  it('should go back to portfolio balance screen', () => {
    cy.getByClass('back-button').click();
    cy.getById('portfolio-balance-screen').should('exist');
    });

  it('should check whether close popup works correctly' , ()=>{
    cy.get('.close-popup')
      .click();

    cy.get('#sdkContainer')
      .should('not.exist');
    })
});
