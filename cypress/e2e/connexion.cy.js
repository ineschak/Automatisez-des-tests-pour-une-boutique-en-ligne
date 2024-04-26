describe("Connexion", () => {
  it("Devrait se connecter avec succès et afficher le bouton panier", () => {
    // Visitez la page d'accueil
    cy.visit("http://localhost:8080/");

    // Cliquez sur le bouton de connexion
    cy.contains("Connexion").click();

    // Remplissez le formulaire de connexion
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("testtest");
    cy.getBySel("login-submit").click();

    // Vérifiez que le bouton panier est visible
    cy.getBySel("nav-link-cart").should("be.visible");
  });
});
