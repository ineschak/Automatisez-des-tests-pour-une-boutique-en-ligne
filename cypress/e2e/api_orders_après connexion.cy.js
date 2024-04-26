describe("Test de récupération du panier après connexion", () => {
  const apiUrl = `${Cypress.env("apiUrl")}`;
  beforeEach(() => {
    // Effectuer d'abord la demande de connexion pour obtenir un jeton d'authentification
    cy.request({
      method: "POST",
      url: apiUrl + "/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
      Cypress.env("authToken", loginResponse.body.token); // Stocker le jeton d'authentification dans une variable d'environnement
    });
  });

  it("Récupérer le panier avec une commande en cours", () => {
    cy.request({
      method: "GET",
      url: apiUrl + "/orders",
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      failOnStatusCode: false, // Permet de ne pas échouer si la commande n'est pas trouvée
    }).then((orderResponse) => {
      expect(orderResponse.status).to.equal(200);
      // Vérifier le schéma de la réponse
      expect(orderResponse.body).to.have.property("id").that.is.a("number");
      expect(orderResponse.body)
        .to.have.property("firstname")
        .that.satisfy((firstname) => {
          return typeof firstname === "string" || firstname === null;
        });
      expect(orderResponse.body)
        .to.have.property("lastname")
        .that.satisfy((lastname) => {
          return typeof lastname === "string" || lastname === null;
        });
      expect(orderResponse.body)
        .to.have.property("address")
        .that.satisfy((address) => {
          return typeof address === "string" || address === null;
        });
      expect(orderResponse.body)
        .to.have.property("zipCode")
        .that.satisfy((zipCode) => {
          return typeof zipCode === "string" || zipCode === null;
        });
      expect(orderResponse.body)
        .to.have.property("city")
        .that.satisfy((city) => {
          return typeof city === "string" || city === null;
        });
      expect(orderResponse.body)
        .to.have.property("date")
        .that.satisfy((date) => {
          return typeof date === "string" || date === null;
        });
      expect(orderResponse.body)
        .to.have.property("validated")
        .that.is.a("boolean");
      expect(orderResponse.body)
        .to.have.property("orderLines")
        .that.is.an("array");
    });
  });

  // Deuxième test pour récupérer le panier sans une commande en cours
  it("Récupérer le panier sans une commande en cours", () => {
    cy.request({
      method: "GET",
      url: apiUrl + "/orders",
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      failOnStatusCode: false, // Permet de ne pas échouer si la commande n'est pas trouvée
    }).then((orderResponse) => {
      expect(orderResponse.status).to.equal(404);
      expect(orderResponse.body).to.have.property(
        "error",
        "Aucune commande en cours"
      );
    });
  });
});
