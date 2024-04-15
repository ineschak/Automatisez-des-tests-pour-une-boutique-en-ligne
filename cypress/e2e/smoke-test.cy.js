describe('Smoke tests', () => {
    it('Devrait vérifier les éléments de base sur la page', () => {
      // Visitez la page d'accueil
      cy.visit('http://localhost:8080');
  
      // Vérifiez la présence des champs et boutons de connexion
      cy.contains('Connexion').should('be.visible');
  
      // Vérifiez la présence des boutons d’ajout au panier quand vous êtes connecté
      cy.contains('Connexion').click();
      cy.get('input[name="Email"]').type('test2@test.fr');
      cy.get('input[name="Mot de passe"]').type('testtest');
      cy.get('button[type="submit"]').click();
      cy.contains('Mon panier').should('be.visible');
  
      // Vérifiez la présence du champ de disponibilité du produit
      cy.get('.availability').should('be.visible');
    });
  });
  