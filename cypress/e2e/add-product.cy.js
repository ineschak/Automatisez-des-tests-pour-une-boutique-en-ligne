describe('Adding Available Product to Cart', () => {
    it('Should add an available product to the cart', () => {
      const productToAdd = {
        productId: 5,// Spécifiez l'ID du produit que vous souhaitez ajouter au panier
        quantity: 1 // Spécifiez la quantité du produit à ajouter au panier
      };
  
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/orders/add',
        body: productToAdd,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200); // Vérifiez que le code de statut est 200
        expect(response.body).to.have.property('message', 'Product added to cart'); // Vérifiez que le message indique que le produit a été ajouté au panier
  
      });
    });
  });
  