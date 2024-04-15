describe("Fetching Product List", () => {
  it("Should retrieve the list of products", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/products",
    }).then((response) => {
      expect(response.status).to.eq(200); // Vérifiez que le code de statut est 200
      expect(response.body).to.be.an("array"); // Vérifiez que la réponse est un tableau

      // Vérifiez la structure de chaque produit dans la liste
      response.body.forEach((product) => {
        expect(product).to.have.property("id").that.is.a("number");
        expect(product).to.have.property("name").that.is.a("string");
        expect(product).to.have.property("availableStock").that.is.a("number");
        expect(product).to.have.property("skin").that.is.a("string");
        expect(product).to.have.property("aromas").that.is.a("string");
        expect(product).to.have.property("ingredients").that.is.a("string");
        expect(product).to.have.property("description").that.is.a("string");
        expect(product).to.have.property("price").that.is.a("number");
        expect(product).to.have.property("picture").that.is.a("string");
        expect(product).to.have.property("varieties").that.is.a("number");
      });
    });
  });
});
