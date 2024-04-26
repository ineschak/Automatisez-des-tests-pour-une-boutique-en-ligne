const { url } = require("inspector");

describe("Affichage des produits sur la page d’accueil", () => {
  it("Devrait afficher tous les produits avec leurs informations", () => {
    // Visitez la page d'accueil
    cy.visit("http://localhost:8080");

    // Vérifiez l'affichage de tous les produits avec leurs informations

    cy.getBySel("product-home").each(($product) => {
      cy.wrap($product).within(() => {
        cy.getBySel("product-home-img").should("be.visible");
        cy.getBySel("product-home-name").should("be.visible");
        cy.getBySel("product-home-ingredients").should("be.visible");
        cy.getBySel("product-home-price").should("be.visible");
        cy.getBySel("product-home-link").should("be.visible");
      });
    });
  });

  it("Devrait vérifiez l’affichage de CHAQUE produit et leurs informations ", () => {
    // Visitez la page d'accueil
    cy.visit("http://localhost:8080");
    // Sélectionnez tous les liens de produits
    cy.getBySel("product-home-link").then(($products) => {
      // Parcourez chaque lien de produit
      for (let i = 0; i < $products.length; i++) {
        // Cliquez sur le lien du produit actuel
        cy.getBySel("product-home-link").eq(i).click();
        // Vérifiez la visibilité des éléments du produit
        cy.getBySel("detail-product-img").should("be.visible");
        cy.getBySel("detail-product-name").should("be.visible");
        cy.getBySel("detail-product-description").should("be.visible");
        cy.getBySel("detail-product-skin").should("be.visible");
        cy.getBySel("detail-product-aromas").should("be.visible");
        cy.getBySel("detail-product-ingredients").should("be.visible");
        cy.getBySel("detail-product-price").should("be.visible");
        cy.getBySel("detail-product-stock").should("be.visible");
        cy.getBySel("detail-product-quantity").should("be.visible");
        cy.getBySel("detail-product-add").should("be.visible");
        // Revenez à la page précédente pour sélectionner le prochain produit
        cy.go("back");
      }
    });
  });
});
