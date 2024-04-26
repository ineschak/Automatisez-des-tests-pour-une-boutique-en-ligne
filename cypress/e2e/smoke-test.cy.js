describe("Smoke tests", () => {
  it("Devrait vérifiez la présence des champs et boutons de connexion", () => {
    // Visitez la page d'accueil
    cy.visit("http://localhost:8080");

    // Cliquez sur le bouton de connexion
    cy.getBySel("nav-link-login").click();

    // Remplissez le formulaire de connexion
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("testtest");
    cy.getBySel("login-submit").click();
  });

  it("Devrait vérifiez la présence des boutons d’ajout au panier et du champ de disponibilité du produit", () => {
    cy.visit("http://localhost:8080");
    // Cliquez sur le bouton Produits
    cy.getBySel("nav-link-products").click();

    // Sélectionnez tous les éléments correspondant à la classe 'product-link'
    cy.getBySel("product-link").then(($products) => {
      // Parcourez chaque produit via son index
      for (let i = 0; i < $products.length; i++) {
        // Cliquez sur le lien du produit
        cy.getBySel("product-link").eq(i).click();
        // Vérifiez la présence du bouton d'ajout au panier
        cy.getBySel("detail-product-add").should("be.visible");
        // Vérifiez la présence du champ de disponibilité du produit
        cy.getBySel("detail-product-stock").should("be.visible");
        // Retournez à la page précédente pour sélectionner le prochain produit
        cy.go("back");
      }
    });
  });
});
