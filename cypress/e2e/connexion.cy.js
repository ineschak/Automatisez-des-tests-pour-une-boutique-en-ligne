describe('Connexion', () => {
    it('Devrait se connecter avec succès et afficher le bouton panier', () => {
      // Visitez la page d'accueil
      cy.visit('http://localhost:8080');
  
      // Cliquez sur le bouton de connexion
      cy.contains('Connexion').click();
  
      // Remplissez le formulaire de connexion
      cy.get('input[name="Email"]').type('test2@test.fr');
      cy.get('input[name="Mot de passe"]').type('testtest');
      cy.get('button[type="submit"]').click();
  
      // Vérifiez que l'utilisateur est connecté
      cy.contains('Se déconnecter').should('be.visible');
  
      // Vérifiez que le bouton panier est visible
      cy.contains('Panier').should('be.visible');
    });
  });
  