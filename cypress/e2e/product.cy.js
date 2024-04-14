// product.spec.js

describe('Product Details Test', () => {
    it('Should return the details of a specific product', () => {
      const productId = 5; 
  
      cy.request({
        method: 'GET',
        url: `http://localhost:8081/products/${productId}`
      }).then((response) => {
        // Vérifiez ici la réponse de l'API
        expect(response.status).to.eq(200); // Vérifiez le code de statut
        expect(response.body).to.have.property('id', productId); // Vérifiez que la fiche produit contient le bon identifiant
        expect(response.body).to.have.property('name'); // Vérifiez que la fiche produit contient le nom
        expect(response.body).to.have.property('description'); // Vérifiez que la fiche produit contient la description
        expect(response.body).to.have.property('price'); // Vérifiez que la fiche produit contient le prix
        expect(response.body).to.have.property('picture'); // Vérifiez que la fiche produit contient l'image
      });
    });
  });
  