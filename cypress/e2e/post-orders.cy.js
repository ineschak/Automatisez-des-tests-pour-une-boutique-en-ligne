 // validate_order 

describe('Order Validation Test', () => {
    it('Should validate the order successfully', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/orders',  
        body: {
          firstname: 'John',
          lastname: 'Doe',
          address: '123 Main Street',
          zipCode: '12345',
          city: 'New York'
        }
      }).then((response) => {
        // Vérifiez ici la réponse de l'API
        expect(response.status).to.eq(200); // Vérifiez le code de statut
        expect(response.body).to.have.property('id'); // Vérifiez que la réponse contient l'ID de la commande
        expect(response.body).to.have.property('firstname', 'John'); // Vérifiez que le prénom est correct
        expect(response.body).to.have.property('lastname', 'Doe'); // Vérifiez que le nom de famille est correct
        expect(response.body).to.have.property('address', '123 Main Street'); // Vérifiez que l'adresse est correcte
        expect(response.body).to.have.property('zipCode', '12345'); // Vérifiez que le code postal est correct
        expect(response.body).to.have.property('city', 'New York'); // Vérifiez que la ville est correcte
        expect(response.body).to.have.property('validated', true); // Vérifiez que la commande est validée
        expect(response.body).to.have.property('date'); // Vérifiez que la date de commande est présente
        expect(response.body).to.have.property('orderLines').to.be.an('array'); // Vérifiez que les lignes de commande sont présentes et sont un tableau
      });
    });
  
    it('Should return 404 if no order is in progress', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/orders',  
        body: {
          firstname: 'Jane',
          lastname: 'Smith',
          address: '456 Oak Street',
          zipCode: '54321',
          city: 'Los Angeles'
        },
        failOnStatusCode: false // Permet de continuer même si la requête échoue
      }).then((response) => {
        // Vérifiez ici la réponse de l'API
        expect(response.status).to.eq(404); // Vérifiez le code de statut
        expect(response.body).to.have.property('error', 'No order in progress'); // Vérifiez le message d'erreur
      });
    });
  });
  