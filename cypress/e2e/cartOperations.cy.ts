describe("Product Interaction", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("/");

    cy.get('[data-id="drag-div"]').children().first().click();
    cy.get('[data-id="add-btn"]').should("not.be.disabled").click();

    cy.visit("/cart");
  });

  it("Change Quantity", () => {
    cy.get('[data-id="cart-item-quantity"]').should("have.text", 1);

    cy.get('[data-id="increase-quantity"]').should("exist").click();
    cy.get('[data-id="cart-item-quantity"]').should("have.text", 2);

    cy.get('[data-id="decrease-quantity"]').click();
    cy.get('[data-id="cart-item-quantity"]').should("have.text", 1);
  });

  it("Remove Item", () => {
    cy.get('[data-id="cart-block"]').should("exist");

    cy.get('[data-id="cart-item-quantity"]').should("have.text", 1);
    cy.get('[data-id="decrease-quantity"]').should("not.exist");

    cy.get('[data-id="remove-item"]').should("exist").click();

    cy.get('[data-id="cart-block"]').should("not.exist");
    cy.get('[data-id="cart-empty"]').should("exist");
  });
});
