describe("Fetching Specific Product after Login", () => {
  it("Should retrieve the details of a specific product after logging in", () => {
    // Effectuer d'abord la demande de connexion pour obtenir un jeton d'authentification

    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200); // Vérifiez que la connexion a réussi
      const authToken = loginResponse.body.token; // Récupérez le jeton d'authentification

      // Ensuite, utilisez le jeton d'authentification pour récupérer les détails du produit spécifique
      const id = 5; // Remplacez 5 par l'ID réel du produit que vous souhaitez récupérer

      cy.request({
        method: "GET",
        url: `http://localhost:8081/products/${id}`,
        headers: {
          Authorization: `Bearer ${authToken}`, // Incluez le jeton d'authentification dans les en-têtes de la requête
        },
      }).then((productResponse) => {
        expect(productResponse.status).to.eq(200); // Vérifiez que la récupération des détails du produit a réussi
      });
    });
  });
});
