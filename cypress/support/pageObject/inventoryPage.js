class InventoryPage {
  addItemToCart(itemName) {
    cy.contains(itemName, { timeout: 10000 })
      .should("exist")
      .parentsUntil(".inventory_item")
      .find('[data-test^="add-to-cart"]')
      .click();
  }

  openItemDetails(itemName) {
    cy.contains(itemName, { timeout: 10000 })
      .should("exist")
      .parentsUntil(".inventory_item")
      .find("a")
      .click();
  }

  sortItems(sortOption) {
    cy.get('[data-test="product-sort-container"]')
      .should("be.visible")
      .select(sortOption);
  }

  verifySorting(sortOption) {
    cy.get('[data-test="product-sort-container"]', { timeout: 10000 })
      .should("be.visible")
      .then(($dropdown) => {
        // Log the current value of the dropdown for debugging
        const currentValue = $dropdown.val();
        cy.log("Current sorting option:", currentValue);

        // Verify sorting based on item names
        cy.get(".inventory_item_name", { timeout: 10000 }).then(($items) => {
          const itemNames = $items.map((i, el) => Cypress.$(el).text()).get();
          let sortedNames;

          if (sortOption === "Name (A to Z)") {
            sortedNames = [...itemNames].sort();
          } else if (sortOption === "Name (Z to A)") {
            sortedNames = [...itemNames].sort().reverse();
          } else if (sortOption === "Price (low to high)") {
            cy.get(".inventory_item_price", { timeout: 10000 }).then(
              ($prices) => {
                const itemPrices = $prices
                  .map((i, el) =>
                    parseFloat(Cypress.$(el).text().replace("$", ""))
                  )
                  .get();
                sortedNames = [...itemPrices].sort((a, b) => a - b);
                expect(itemPrices).to.deep.equal(sortedNames);
              }
            );
            return;
          } else if (sortOption === "Price (high to low)") {
            cy.get(".inventory_item_price", { timeout: 10000 }).then(
              ($prices) => {
                const itemPrices = $prices
                  .map((i, el) =>
                    parseFloat(Cypress.$(el).text().replace("$", ""))
                  )
                  .get();
                sortedNames = [...itemPrices].sort((a, b) => b - a);
                expect(itemPrices).to.deep.equal(sortedNames);
              }
            );
            return;
          }

          // Assertion to verify sorting
          expect(itemNames).to.deep.equal(sortedNames);
        });
      });
  }
}

export const inventoryPage = new InventoryPage();
