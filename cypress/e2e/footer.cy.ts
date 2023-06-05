describe('To test if footer section is rendered conditionally' , ()=> {
   beforeEach(()=>{
    cy.visit('http://localhost:8080/sample/indexTest.html');

    cy.getById("address").type('0x3d063C72b5A5b5457cb02076d134c806eca63Cff');
    cy.getById("targetChainIdHex").type('0x1');
    cy.getById("requiredTokenContractAddress").type('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenTrue").check();
    cy.getById("addPopup").click();

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.intercept('GET', '**/swap/evm/chains/**').as('swapTokensCheck');

    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.wait('@swapChainsCheck', { timeout: 50000 });
    cy.wait('@swapTokensCheck', { timeout: 50000 });

   })

  it('should redirect to cypher site when clicked' , ()=>{
    cy.getById('cyd-site-redirect')
    .should('have.attr', 'href')
    .should('contain', 'https://www.cypherwallet.io');
  });

  it('should toggle dark mode when the toggle label is clicked', () => {
    cy.getById('bridge-info').then(($el) => {
      const bgColor = $el.css('background-color');
      const isDarkMode = bgColor === 'rgb(22, 22, 25)';
      const isLightMode = bgColor === 'rgb(255, 255, 255)';
      expect(isDarkMode).to.be.true;
      cy.getByClass('toggle-input').click({force:true});
      cy.getById('bridge-info').should(($el) => {
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

