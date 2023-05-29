describe('To test if footer section is rendered conditionally' , ()=> {
   beforeEach(()=>{
    cy.visit('http://localhost:8080/sample/index.html');
    cy.getById("addPopup").click();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.intercept('GET', '**/swap/evm/chains/**').as('swapTokensCheck');

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });
    cy.wait('@swapTokensCheck', { timeout: 50000 });

   })

  it('should redirect to cypher site when clicked' , ()=>{
    cy.get('a#cyd-site-redirect')
    .should('have.attr', 'href')
    .should('contain', 'https://www.cypherwallet.io');
  });


  it.only('should toggle dark mode when the toggle label is clicked', () => {
    cy.getByClass('close-popup').click();
    cy.wait(1000);
    cy.getById("addPopup").click();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.intercept('GET', '**/swap/evm/chains/**').as('swapTokensCheck');

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });
    cy.wait('@swapTokensCheck', { timeout: 50000 });
    // Click the toggle label with class "toggle-input"
    cy.get('.toggle-switch').click();

    // Assert that the dark mode is enabled
    cy.get('body').should('have.class', 'dark');

    // Click the toggle label again
    cy.get('.toggle-switch').click();

    // Assert that the dark mode is disabled
    cy.get('body').should('not.have.class', 'dark');
  });
  });

