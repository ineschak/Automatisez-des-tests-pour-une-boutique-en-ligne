describe('Affichage des produits sur la page d’accueil', () => {
    it('Devrait afficher tous les produits avec leurs informations', () => {
      // Visitez la page d'accueil
      cy.visit('http://localhost:8080');
  
      // Vérifiez le chargement de la page
      cy.url().should('eq', 'http://localhost:8080/');
  
      // Vérifiez l'affichage de tous les produits avec leurs informations
      cy.get('.product').each(($product) => {
        cy.wrap($product).within(() => {
          // Vérifiez l'affichage de l'image
          cy.get('img').should('be.visible');
  
          // Vérifiez l'affichage de la description
          cy.get('.description').should('be.visible');
  
          // Vérifiez l'affichage du bouton "Consulter"
          cy.contains('Consulter').should('be.visible');
  
          // Vérifiez l'affichage du prix
          cy.get('.price').should('be.visible');
  
          // Vérifiez l'affichage du stock
          cy.get('.stock').should('be.visible');
        });
      });
    });
  });
  