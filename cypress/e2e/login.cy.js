describe('Login API Test', () => {
  it('Should successfully log in with correct credentials', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((response) => {
      // Vérifiez ici la réponse de l'API.
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('Should handle incorrect credentials', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'incorrect_username',
        password: 'incorrect_password'
      },
      failOnStatusCode: false // Permet de continuer même si la requête échoue
    }).then((response) => {
      // Vérifiez ici la réponse de l'API pour un échec de connexion.
      expect(response.status).to.eq(401);
    });
  });
});
