describe("Retourner un produit spécifique après connexion", () => {
  it("Retourner la fiche d'un produit spécifique après connexion", () => {
    // Effectuer d'abord la demande de connexion pour obtenir un jeton d'authentification
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
      const authToken = loginResponse.body.token;

      //Récupérer un produit disponible
      cy.log("Détail d'un produit");
      cy.request({
        method: "GET",
        url: `http://localhost:8081/products/${5}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        failOnStatusCode: false, // Ne pas échouer sur le code d'état de réponse
      }).then((productResponse) => {
        expect(productResponse.status).to.equal(200);
        expect(productResponse.body).to.have.property("id", 5);
        expect(productResponse.body)
          .to.have.property("name")
          .that.is.a("string");
        expect(productResponse.body)
          .to.have.property("description")
          .that.is.a("string");
        expect(productResponse.body)
          .to.have.property("price")
          .that.is.a("number");
        //Récupérer un produit non disponible

        cy.request({
          method: "GET",
          url: `http://localhost:8081/products/${2}`,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          failOnStatusCode: false, // Ne pas échouer sur le code d'état de réponse
        }).then((productResponse) => {
          expect(productResponse.status).to.equal(404);
          cy.log("Produit inexistant");
        });
      });
    });
  });
});
