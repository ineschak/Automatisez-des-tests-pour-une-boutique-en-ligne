describe('User Cart API Test', () => {
    let authToken;
  
    // Avant chaque test, connectez-vous et obtenez le jeton d'authentification
    beforeEach(() => {
      cy.request('POST', 'http://localhost:8081/login', {
        username: 'test2@test.fr',
        password: 'testtest'
      }).then((response) => {
        expect(response.status).to.eq(200);
        authToken = response.body.token;
      });
    });
  
    it('Should return the cart of the authenticated user', () => {
      // Assurez-vous d'avoir un jeton d'authentification valide avant d'accéder à l'API du panier
      expect(authToken).to.not.be.undefined;
  
      // Envoyer une requête GET avec le jeton d'authentification pour récupérer le panier de l'utilisateur connecté
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then((response) => {
        // Vérifiez ici la réponse de l'API.
        expect(response.status).to.eq(200);
        // Vérifiez que la réponse contient la propriété orderLines
        expect(response.body).to.have.property('orderLines');
        // Vérifiez que la liste des produits dans le panier n'est pas vide
        expect(response.body.orderLines).to.be.an('array').to.have.length.above(0);
        // Pour chaque ligne de commande, vérifiez que le produit a les propriétés attendues
        response.body.orderLines.forEach((orderLine) => {
          expect(orderLine).to.have.property('product');
          expect(orderLine.product).to.have.property('name');
          expect(orderLine.product).to.have.property('description');
          expect(orderLine.product).to.have.property('price');
          expect(orderLine.product).to.have.property('picture');
        });
      });
    });

    it('Should return 404 if no order is in progress', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders', // URL de récupération du panier
        headers: {
          Authorization: `Bearer ${authToken}` // Incluez le token d'authentification dans les en-têtes de la requête
        },
        failOnStatusCode: false // Permet de continuer même si la requête échoue
      }).then((response) => {
        // Vérifiez ici la réponse de l'API
        expect(response.status).to.eq(404); // Vérifiez le code de statut
        expect(response.body).to.have.property('error', 'No order in progress'); // Vérifiez le message d'erreur
      });
    });
    
  });
  