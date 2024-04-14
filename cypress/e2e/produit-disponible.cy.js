// add_to_cart.spec.js

describe('Add Product to Cart Test', () => {
    it('Should add a product to the cart', () => {
      const productId = 5;  
  
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/orders/add',
        body: {
          productId: productId,
          quantity: 1  
        },
        failOnStatusCode: false
      }).then((response) => {
        // Vérifiez ici la réponse de l'API
        expect(response.status).to.eq(200); // Vérifiez le code de statut
        expect(response.body).to.have.property('message', 'Product added to cart successfully'); // Vérifiez le message de confirmation
      });
    });
  });
  