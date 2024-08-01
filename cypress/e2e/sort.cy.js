import { loginPage } from "../support/pageObject/loginPage";
import { inventoryPage } from "../support/pageObject/inventoryPage";

describe("Sort items on SauceDemo", () => {
  beforeEach(() => {
    cy.fixture("users").as("users"); // Load user data
  });

  it("Should sort items correctly", function () {
    //  Go to SauceDemo website
    loginPage.visit();

    //  Log in to the site
    loginPage.login(
      this.users.standard_user.username,
      this.users.standard_user.password
    );

    //  Verify that the items are sorted by Name (A to Z)
    inventoryPage.verifySorting("Name (A to Z)");

    // Change the sorting to Name (Z to A)
    inventoryPage.sortItems("Name (Z to A)");

    //  Verify that the items are sorted by Name (Z to A)
    inventoryPage.verifySorting("Name (Z to A)");

    //  Change the sorting to Price (low to high)
    inventoryPage.sortItems("Price (low to high)");

    //  Verify that the items are sorted by Price (low to high)
    inventoryPage.verifySorting("Price (low to high)");
  });
});
