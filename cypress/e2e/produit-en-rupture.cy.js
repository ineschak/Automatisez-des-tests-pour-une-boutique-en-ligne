// add_out_of_stock_product

describe('Add Out of Stock Product to Cart Test', () => {
    it('Should not add an out of stock product to the cart', () => {
      const productId = 456; // Remplacez 456 par l'identifiant réel du produit en rupture de stock
  
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/orders/add',
        body: {
          productId: productId,
          quantity: 1 // Spécifiez la quantité du produit à ajouter au panier
        },
        failOnStatusCode: false // Permet de continuer même si la requête échoue
      }).then((response) => {
        // Vérifiez ici la réponse de l'API
        expect(response.status).to.eq(400); // Vérifiez le code de statut
        expect(response.body).to.have.property('error', 'Product out of stock'); // Vérifiez le message d'erreur
      });
    });
  });
  