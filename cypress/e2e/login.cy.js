import { loginPage } from "../support/pageObject/loginPage";

describe("Login with Incorrect Credentials", () => {
  beforeEach(() => {
    cy.fixture("invalidUser").as("invalidUser");
  });

  it("Should not allow login with incorrect username and password", function () {
    loginPage.visit();

    loginPage.login(
      this.invalidUser.invalid_user.username,
      this.invalidUser.invalid_user.password
    );

    loginPage.verifyErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
