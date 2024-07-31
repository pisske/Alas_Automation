import { cartPage } from "../support/pageObject/cartPage";
import { checkoutPage } from "../support/pageObject/checkoutPage";
import { inventoryPage } from "../support/pageObject/inventoryPage";
import { loginPage } from "../support/pageObject/loginPage";

describe("Complete an order on SauceDemo", () => {
  beforeEach(() => {
    cy.fixture("users").as("users"); // Load user data
  });

  it("Should complete an order successfully", function () {
    //  Go to SauceDemo website
    loginPage.visit();

    //  Log in to the site
    loginPage.login(
      this.users.standard_user.username,
      this.users.standard_user.password
    );

    // Ensure inventory page loads
    cy.url().should("include", "/inventory.html");

    // Add an item from the list to the cart
    inventoryPage.addItemToCart("Sauce Labs Backpack");

    //  Verify that the cart badge is updated correctly
    cartPage.verifyCartItemCount("1");

    //  Open another item’s details page
    inventoryPage.openItemDetails("Sauce Labs Bike Light");

    //  Add the item to the cart
    inventoryPage.addItemToCart("Sauce Labs Bike Light");

    //  Open the cart
    cartPage.openCart();

    //  Verify that the correct items are present (2 different items)
    cartPage.verifyItemsInCart([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
    ]);

    // S Remove the first item from the cart
    cartPage.removeItem("Sauce Labs Backpack");

    // Verify that the correct item is present (1 item)
    cartPage.verifyItemsInCart(["Sauce Labs Bike Light"]);

    //Continue to the Checkout page
    cartPage.proceedToCheckout();

    // Complete the checkout form
    checkoutPage.fillCheckoutForm("John", "Doe", "12345");

    // Complete the order
    checkoutPage.completeOrder();

    //  Verify that the order is completed successfully with the displayed message
    checkoutPage.verifyOrderCompletion();
  });
});
