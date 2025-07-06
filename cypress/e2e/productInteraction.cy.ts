describe("Product Interaction", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("/");
    cy.get('[data-id="drag-div"]').children().first().click();
  });

  it("Check Variants", () => {
    cy.url().should("contain", "/shop");
    cy.url().should("not.contain", "?sku=");

    cy.get('[data-id="variants-box"]').then(($box) => {
      if ($box) {
        $box.children().first().next().click();
        cy.url().should("contain", "?sku=cactus-m");
      }
    });
  });

  it("Add to Cart", () => {
    cy.get('[data-id="cart-size"]').should("not.exist");

    cy.get('[data-id="add-btn"]').should("not.be.disabled").click();
    cy.get('[data-id="cart-size"]').should("exist").should("have.text", 1);

    cy.get('[data-id="cart-link"]').click();
    cy.url().should("eq", "http://localhost:3000/cart");

    cy.contains(/cart/i);
  });
});
