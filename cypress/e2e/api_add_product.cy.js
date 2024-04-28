describe("Ajouter un produit dans le panier", () => {
  const apiUrl = `${Cypress.env("apiUrl")}`;
  let authToken;

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
      authToken = loginResponse.body.token; // Stocker le jeton d'authentification dans authToken
    });
  });
  it("Ajouter un produit disponible au panier", () => {
    const productId = 5;

    // Récupérer le produit et vérifier s'il est disponible
    cy.request({
      method: "GET",
      url: `http://localhost:8081/products/${productId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      failOnStatusCode: false,
    }).then((productResponse) => {
      expect(productResponse.status).to.eq(200);
      // Le produit est disponible, ajoutez-le au panier
      cy.request({
        method: "POST",
        url: "http://localhost:8081/orders/add",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          product: productId,
          quantity: 1,
        },
      }).then((addToCartResponse) => {
        // Vérifiez que le produit a été ajouté au panier avec succès
        expect(addToCartResponse.status).to.eq(200);
        // Vérifier le schéma de la réponse
        expect(addToCartResponse.body)
          .to.have.property("id")
          .that.is.a("number");
        expect(addToCartResponse.body)
          .to.have.property("firstname")
          .that.is.a("string");
        expect(addToCartResponse.body)
          .to.have.property("lastname")
          .that.is.a("string");
        expect(addToCartResponse.body)
          .to.have.property("address")
          .that.is.a("string");
        expect(addToCartResponse.body)
          .to.have.property("zipCode")
          .that.is.a("string");
        expect(addToCartResponse.body)
          .to.have.property("city")
          .that.is.a("string");
        expect(addToCartResponse.body)
          .to.have.property("date")
          .that.is.a("string");
        expect(addToCartResponse.body)
          .to.have.property("validated")
          .that.is.a("boolean");
        expect(addToCartResponse.body)
          .to.have.property("orderLines")
          .that.is.an("array");

        // Vérifier le schéma des éléments de orderLines
        const orderLine = addToCartResponse.body.orderLines[0];
        expect(orderLine).to.have.property("id").that.is.a("number");
        expect(orderLine).to.have.property("product").that.is.an("object");
        expect(orderLine.product).to.have.property("id").that.is.a("number");
        expect(orderLine.product).to.have.property("name").that.is.a("string");
        expect(orderLine.product)
          .to.have.property("description")
          .that.is.a("string");
        expect(orderLine.product).to.have.property("price").that.is.a("number");
        expect(orderLine.product)
          .to.have.property("picture")
          .that.is.a("string");
        const orderLine1 = addToCartResponse.body.orderLines[1];
        expect(orderLine1).to.have.property("quantity");
      });
    });
  });

  it("Ajouter un produit non disponible dans le panier", () => {
    const productId = 2;
    // Récupérer le produit non disponible et vérifier la réponse
    cy.request({
      method: "GET",
      url: `http://localhost:8081/products/${productId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      failOnStatusCode: false,
    }).then((productResponse) => {
      expect(productResponse.status).to.eq(404);
      cy.request({
        method: "POST",
        url: "http://localhost:8081/orders/add",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          product: productId,
          quantity: 1,
        },
      }).then((addToCartResponse) => {
        expect(addToCartResponse.status).to.eq(400);
      });
    });
  });
});
