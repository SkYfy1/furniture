describe("products filters tests", () => {
  it("custom select and slider test", () => {
    cy.viewport("macbook-16");
    cy.visit("/shop/plants");

    cy.url().should("not.contain", "orderBy");

    cy.get('[data-id="select"]')
      .should("exist")
      .select("PRICE_DESC")
      .should("have.value", "PRICE_DESC");

    cy.wait(700);
    cy.url().should("contain", "orderBy");

    cy.get('[data-id="slider"]').should("not.exist");

    cy.get('[data-id="slider-open-btn"]').click();
    cy.get('[data-id="slider"]').should("exist");

    cy.get('[data-id="products-block"]').contains("€117.00").should("exist");

    let valueMin;

    cy.get('[data-id="select-min"]')
      .invoke("text")
      .then((text) => {
        valueMin = text;

        cy.get('[data-id="slider"] .MuiSlider-thumb[data-index=1]');

        cy.window().then((win) => {
          const slider = win.document.querySelector('[data-id="slider"]');

          const event = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            clientX: 320,
            clientY: 0,
          });

          slider?.dispatchEvent(event);
        });

        cy.url().should("contain", "min=");
        cy.get('[data-id="select-min"]').should("not.have.text", valueMin);
      });

    cy.get('[data-id="products-block"]')
      .contains("€117.00")
      .should("not.exist");
  });
});
