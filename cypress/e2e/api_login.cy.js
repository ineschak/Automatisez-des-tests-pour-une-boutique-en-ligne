describe("Test de l'API de connexion", () => {
  const apiLogin = `${Cypress.env("apiUrl")}/login`;
  it("Devrait se connecter avec succès avec des identifiants valides", () => {
    cy.request({
      method: "POST",
      url: apiLogin,
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");
    });
  });

  it("Devrait échouer avec un code d'erreur 401 pour des identifiants invalides", () => {
    cy.request({
      method: "POST",
      url: apiLogin,
      body: {
        username: "utilisateur_invalide",
        password: "mot_de_passe_invalide",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        code: 401,
        message: "Invalid credentials.",
      });
    });
  });
});
