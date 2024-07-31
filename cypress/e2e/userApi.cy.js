describe("GoRest API Tests", () => {
  let userId;

  beforeEach(() => {
    // Load fixture data before each test
    cy.fixture("userData").as("userData");
  });

  it("Should create a new user", function () {
    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/users`,
      headers: {
        Authorization: `Bearer ${Cypress.env("API_TOKEN")}`,
      },
      body: this.userData.newUser,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property(
        "name",
        this.userData.newUser.name
      );
      expect(response.body).to.have.property(
        "email",
        this.userData.newUser.email
      );
      userId = response.body.id; // Capture the user ID for future use
    });
  });

  it("Should update user details", function () {
    cy.request({
      method: "PUT",
      url: `${Cypress.env("API_URL")}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("API_TOKEN")}`,
      },
      body: this.userData.updatedUser,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property(
        "name",
        this.userData.updatedUser.name
      );
      expect(response.body).to.have.property(
        "email",
        this.userData.updatedUser.email
      );
    });
  });

  it("Should delete a user", function () {
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("API_URL")}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("API_TOKEN")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });

    // Verify that the user is deleted
    cy.request({
      method: "GET",
      url: `${Cypress.env("API_URL")}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("API_TOKEN")}`,
      },
      failOnStatusCode: false, // Don't fail the test if the status code is not 2xx or 3xx
    }).then((response) => {
      expect(response.status).to.eq(404); // User should no longer exist
    });
  });
});
