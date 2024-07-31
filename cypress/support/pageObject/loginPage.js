class LoginPage {
  visit() {
    cy.visit("/");
  }

  login(username, password) {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  }

  // New method to verify error message
  verifyErrorMessage(expectedMessage) {
    cy.get('[data-test="error"]').should("contain.text", expectedMessage);
  }
}

export const loginPage = new LoginPage();
