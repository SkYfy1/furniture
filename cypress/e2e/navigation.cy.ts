describe("navigation tests", () => {
  it("mobile test open-close", () => {
    cy.viewport("iphone-6");
    cy.visit("/");

    cy.get('[data-id="open-menu"]').should("not.be.exist");

    cy.get('[data-id="menu-toggle-btn"]').click();
    cy.get('[data-id="open-menu"]').should("be.visible");

    cy.get('[data-id="menu-toggle-btn"]').click();
    cy.get('[data-id="open-menu"]').should("not.be.exist");
  });

  it("mobile test navigation", () => {
    cy.viewport("iphone-6");
    cy.visit("/");

    cy.contains(/browse categories/i).should("not.exist");

    cy.get('[data-id="menu-toggle-btn"]').click();
    cy.get('[data-id="mobile-shop-link"]').click();

    cy.get('[data-id="open-menu"]').should("not.be.exist");

    cy.url().should("eq", "http://localhost:3000/shop");
    cy.contains(/browse categories/i);
  });

  it("desktop test navigation", () => {
    cy.viewport(1600, 900);
    cy.visit("/");

    cy.contains(/browse categories/i).should("not.exist");

    cy.get('[data-id="desktop-shop-link"]').click();
    cy.url().should("eq", "http://localhost:3000/shop");
    cy.contains(/browse categories/i);
  });
});
