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

  it('should toggle dark mode when the toggle label is clicked', () => {
    cy.get('#bridge-info').then(($el) => {
      const bgColor = $el.css('background-color');
      const isDarkMode = bgColor === 'rgb(22, 22, 25)';
      const isLightMode = bgColor === 'rgb(255, 255, 255)';
      expect(isDarkMode).to.be.true;
      cy.get('.toggle-input').click({force:true});
      cy.get('#bridge-info').should(($el) => {
        const newBgColor = $el.css('background-color');
        if (isDarkMode) {
          expect(newBgColor).to.equal('rgb(255, 255, 255)');
        } else if (isLightMode) {
          expect(newBgColor).to.equal('rgb(22, 22, 25)');
        }
      });
    });
  });

  });

