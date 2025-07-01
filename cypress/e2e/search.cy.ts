describe("search product tests", () => {
  it("check correct search", () => {
    cy.viewport(1440, 900);
    cy.visit("/");

    cy.url().should("not.include", "?query");

    cy.get('[data-id="search-products"]').should("not.exist");
    cy.get('[data-id="search-overlay"]').should("not.exist");
    cy.get('[data-id="search-input"]').type("F");

    cy.url().should("include", "?query");

    cy.get('[data-id="search-overlay"]').should("exist");
    cy.get('[data-id="search-products"]')
      .should("exist")
      .children()
      .should("have.length", 2);

    cy.get('[data-id="search-input"]').clear();
    cy.get('[data-id="search-products"]').should("not.exist");
    cy.get('[data-id="search-overlay"]').should("not.exist");
  });

  it("check incorrect search and overlay click", () => {
    cy.viewport(1440, 900);
    cy.visit("/");

    cy.url().should("not.include", "?query");

    cy.get('[data-id="search-products"]').should("not.exist");
    cy.get('[data-id="search-overlay"]').should("not.exist");
    cy.get('[data-id="search-input"]').type("dsadasdadsada");

    cy.url().should("include", "?query");

    cy.get('[data-id="search-overlay"]').should("exist");
    cy.get('[data-id="search-products"]').should("not.exist");

    cy.get('[data-id="search-overlay"]').should("exist").click();
    cy.get('[data-id="search-input"]').should("not.have.value");

    cy.url().should("not.include", "?query");
  });
});
