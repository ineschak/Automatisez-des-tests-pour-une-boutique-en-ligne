describe("Accèder aux données confidentielles d'un utilisateur avant connexion", () => {
  it("Devrait vérifier que je reçois une erreur 403", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/orders`,
      failOnStatusCode: false, // Permet de continuer même si la requête échoue
    }).then((response) => {
      // Vérifiez ici la réponse de l'API pour une erreur 403
      expect(response.status).to.eq(403);
    });
  });
});
