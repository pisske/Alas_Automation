class CartPage {
  verifyCartItemCount(expectedCount) {
    cy.get(".shopping_cart_badge").should("have.text", expectedCount);
  }

  openCart() {
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");
  }

  verifyItemsInCart(itemNames) {
    itemNames.forEach((itemName) => {
      cy.contains(".inventory_item_name", itemName).should("exist");
    });
  }

  removeItem(itemName) {
    // Wait for the item to be visible and then remove it
    cy.contains(".inventory_item_name", itemName)
      .parents(".cart_item")
      .should("be.visible")
      .find('[data-test*="remove"]') // Adjust if needed to match actual selector
      .click();
  }

  proceedToCheckout() {
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");
  }
}

export const cartPage = new CartPage();
