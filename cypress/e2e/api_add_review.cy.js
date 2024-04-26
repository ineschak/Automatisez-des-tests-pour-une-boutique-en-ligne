describe("Ajouter un avis", () => {
  const apiUrl = `${Cypress.env("apiUrl")}`;
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
      Cypress.env("authToken", loginResponse.body.token); // Stocker le jeton d'authentification dans une variable d'environnement
    });
  });

  it("Ajouter un avis complet", () => {
    const ReviewData = {
      title: "TEST",
      comment: "C'est un excellent produit, je le recommande vivement !",
      rating: 5,
    };

    // Envoyer une requête POST pour ajouter un avis complet
    cy.request({
      method: "POST",
      url: apiUrl + "/reviews",
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      body: ReviewData,
    }).then((addReviewResponse) => {
      expect(addReviewResponse.status).to.eq(200);
      // Vérifier le schéma de la réponse
      expect(addReviewResponse.body).to.have.property("id").that.is.a("number");
      expect(addReviewResponse.body)
        .to.have.property("date")
        .that.is.a("string");
      expect(addReviewResponse.body)
        .to.have.property("title")
        .that.is.a("string");
      expect(addReviewResponse.body)
        .to.have.property("comment")
        .that.is.a("string");
      expect(addReviewResponse.body)
        .to.have.property("rating")
        .that.is.a("number");
      expect(addReviewResponse.body)
        .to.have.property("author")
        .that.is.an("object");
      expect(addReviewResponse.body.author)
        .to.have.property("id")
        .that.is.a("number");
      expect(addReviewResponse.body.author)
        .to.have.property("email")
        .that.is.a("string");
      expect(addReviewResponse.body.author)
        .to.have.property("roles")
        .that.is.an("array");
      expect(addReviewResponse.body.author)
        .to.have.property("password")
        .that.is.a("string");
      expect(addReviewResponse.body.author)
        .to.have.property("firstname")
        .that.is.a("string");
      expect(addReviewResponse.body.author)
        .to.have.property("lastname")
        .that.is.a("string");
      expect(addReviewResponse.body.author)
        .to.have.property("password")
        .that.is.a("string");
      expect(addReviewResponse.body.author)
        .to.have.property("userIdentifier")
        .that.is.a("string");
      expect(addReviewResponse.body.author)
        .to.have.property("username")
        .that.is.a("string");
      expect(addReviewResponse.body.author)
        .to.have.property("salt")
        .that.satisfy((salt) => {
          return typeof salt === "string" || salt === null;
        });
    });
  });

  it("Ajouter un avis malveillant", () => {
    const ReviewData = {
      title: "",
      comment: '<script>alert("XSS");</script>',
      rating: 1,
    };

    // Envoyer une requête POST pour ajouter un avis sans titre
    cy.request({
      method: "POST",
      url: apiUrl + "/reviews",
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      body: ReviewData,
      failOnStatusCode: false, // Ne pas échouer sur le code d'état de réponse
    }).then((addReviewResponse) => {
      cy.log("Response:", addReviewResponse.body);
      expect(addReviewResponse.status).to.eq(400);
      expect(addReviewResponse.body).to.have.property("error");
    });
  });

  it("Ajouter un avis sans titre", () => {
    const ReviewData = {
      title: "",
      comment: "test", 
      rating: 1,
    };

    // Envoyer une requête POST pour ajouter un avis sans titre
    cy.request({
      method: "POST",
      url: apiUrl + "/reviews",
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      body:ReviewData,
      failOnStatusCode: false, // Ne pas échouer sur le code d'état de réponse
    }).then((addReviewResponse) => {
      cy.log("Response:", addReviewResponse.body);
      expect(addReviewResponse.status).to.eq(400);
      expect(addReviewResponse.body).to.have.property("error");
    });
  });
  it("Ajouter un avis sans commentaire", () => {
    const ReviewData = {
      title: "TEST",
      comment: "",
      rating: 1,
    };

    // Envoyer une requête POST pour ajouter un avis sans commentaire
    cy.request({
      method: "POST",
      url: apiUrl + "/reviews",
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      body: ReviewData,
      failOnStatusCode: false, // Ne pas échouer sur le code d'état de réponse
    }).then((addReviewResponse) => {
      cy.log("Response:", addReviewResponse.body);
      expect(addReviewResponse.status).to.eq(400);
      expect(addReviewResponse.body).to.have.property("error");
    });
  });
  it("Ajouter un avis sans rating", () => {
    const ReviewData = {
      title: "TEST",
      comment: "test",
      rating: "",
    };

    // Envoyer une requête POST pour ajouter un avis sans rating
    cy.request({
      method: "POST",
      url: apiUrl + "/reviews",
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      body: ReviewData,
      failOnStatusCode: false, // Ne pas échouer sur le code d'état de réponse
    }).then((addReviewResponse) => {
      cy.log("Response:", addReviewResponse.body);
      expect(addReviewResponse.status).to.eq(400);
      expect(addReviewResponse.body).to.have.property("error");
    });
  });
  it("Ajouter un avis avec rating >5", () => {
    const ReviewData = {
      title: "TEST",
      comment: "test",
      rating: "6",
    };

    // Envoyer une requête POST pour ajouter un avis avec rating >5
    cy.request({
      method: "POST",
      url: apiUrl + "/reviews",
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      body: ReviewData,
      failOnStatusCode: false, // Ne pas échouer sur le code d'état de réponse
    }).then((addReviewResponse) => {
      cy.log("Response:", addReviewResponse.body);
      expect(addReviewResponse.status).to.eq(400);
      expect(addReviewResponse.body).to.have.property("error");
    });
  });
  it("Ajouter un avis avec rating non entier", () => {
    const ReviewData = {
      title: "TEST",
      comment: "test",
      rating: "a",
    };

    // Envoyer une requête POST pour ajouter un avis avec rating non entier
    cy.request({
      method: "POST",
      url: apiUrl + "/reviews",
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      body: ReviewData,
      failOnStatusCode: false, // Ne pas échouer sur le code d'état de réponse
    }).then((addReviewResponse) => {
      cy.log("Response:", addReviewResponse.body);
      expect(addReviewResponse.status).to.eq(400);
      expect(addReviewResponse.body).to.have.property("error");
    });
  });
});
