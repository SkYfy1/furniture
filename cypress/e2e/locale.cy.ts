describe("Locale testing", () => {
  it("Change locale", () => {
    cy.viewport("macbook-16");
    cy.setCookie("FRNTR_LOCALE", "en");
    cy.visit("/");

    cy.contains(/Sale/i).should("exist");

    cy.get('[data-id="lang-select"]')
      .should("have.value", "en")
      .select("fr")
      .should("have.value", "fr");

    cy.getCookie("FRNTR_LOCALE").should("have.property", "value", "fr");

    cy.contains(/vente/i).should("exist");

    cy.reload();
    cy.get('[data-id="lang-select"]').should("have.value", "fr");
    cy.contains(/vente/i).should("exist");
  });
});
