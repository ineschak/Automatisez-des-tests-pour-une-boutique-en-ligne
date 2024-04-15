describe('Adding a Review after Login', () => {
  it('Should successfully add a review after logging in', () => {
    // Effectuer d'abord la demande de connexion pour obtenir un jeton d'authentification
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: "test2@test.fr",
        password: "testtest",
      }
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200); // Vérifiez que la connexion a réussi
      const authToken = loginResponse.body.token; // Récupérez le jeton d'authentification
      
      // Ensuite, utilisez le jeton d'authentification pour envoyer une demande d'ajout d'avis
      const reviewToAdd = {
        title: 'Great Product',
        comment: 'I really loved this product! It works great and smells amazing.',
        rating: 5 // Rating should be a number between 1 and 5
      };

      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/reviews',
        headers: {
          Authorization: `Bearer ${authToken}` // Incluez le jeton d'authentification dans les en-têtes de la requête
        },
        body: reviewToAdd
      }).then((addReviewResponse) => {
        expect(addReviewResponse.status).to.eq(200); // Vérifiez que l'ajout de l'avis a réussi
        expect(addReviewResponse.body).to.have.property('id'); // Vérifiez que la réponse contient l'ID de l'avis créé

        // Vous pouvez ajouter d'autres vérifications si nécessaire
      });
    });
  });
});
