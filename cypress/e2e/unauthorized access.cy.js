describe("Unauthorized Access Test", () => {
  it("Should return 403 error when accessing user data without proper authentication", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false, // Permet de continuer même si la requête échoue
    }).then((response) => {
      // Vérifiez ici la réponse de l'API pour une erreur 403
      expect(response.status).to.eq(403);
    });
  });
});
