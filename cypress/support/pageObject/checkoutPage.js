// cypress/support/pageObject/checkoutPage.js

class CheckoutPage {
  fillCheckoutForm(firstName, lastName, postalCode) {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
    cy.get('[data-test="continue"]').click();
    // Ensure that the checkout step two page has loaded
    cy.url().should("include", "/checkout-step-two.html");
  }

  completeOrder() {
    // Wait for the finish button to be visible and then click it
    cy.get('[data-test="finish"]').should("be.visible").click();
  }

  closePopupIfPresent() {
    // Check if the popup is present and close it if it is
    cy.get("body").then(($body) => {
      if ($body.find(".popup-class").length > 0) {
        // Replace '.popup-class' with the actual class or selector of the popup
        cy.get(".popup-class").click(); // Replace with the actual method to close the popup
      }
    });
  }

  verifyOrderCompletion() {
    // Close popup if present before verifying order completion
    this.closePopupIfPresent();

    // Wait for the complete-header to be visible and then assert the text
    cy.get(".complete-header", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Thank you for your order!");
  }
}

export const checkoutPage = new CheckoutPage();
