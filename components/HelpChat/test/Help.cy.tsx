import React from "react";
import Help from "../Help";

describe("<Help />", () => {
  it("renders, open and close chat", () => {
    cy.mount(<Help />);

    cy.get('[data-id="chat-block"]').should("not.exist");
    cy.get('[data-id="chat-open-btn"]').click();

    cy.get('[data-id="chat-block"]').should("exist");

    cy.get('[data-id="chat-close-btn"]').should("exist").click();

    cy.get('[data-id="chat-block"]').should("not.exist");
  });

  it("renders, opens and type in input", () => {
    cy.mount(<Help />);

    cy.get('[data-id="chat-open-btn"]').click();

    cy.get('[data-id="chat-questions"]').should("not.exist");
    cy.get('[data-id="chat-block"]')
      .find("input")
      .should("exist")
      .type("Where");

    cy.get('[data-id="chat-questions"]').should("exist");

    cy.get('[data-id="chat-questions"]')
      .children()
      .should("have.length", 1)
      .should("contain", "Where is my order?")
      .click();

    cy.get('[data-id="chat-block"]')
      .find("input")
      .should("have.value", "")
      .and("be.focused");

    cy.contains("Where is my order?");
    cy.get('[data-id="chat-questions"]').should("not.exist");
    cy.get('[data-id="chat-messages"]').children().should("have.length", 2);
  });

  it("shows multiple question suggestions", () => {
    cy.mount(<Help />);

    cy.get('[data-id="chat-open-btn"]').click();

    cy.get('[data-id="chat-block"]').find("input").should("exist").type("W");

    cy.get('[data-id="chat-questions"]')
      .children()
      .should("have.length.greaterThan", 1);
  });

  it("questions selecting", () => {
    cy.mount(<Help />);

    cy.get('[data-id="chat-open-btn"]').click();

    cy.get('[data-id="chat-block"]')
      .find("input")
      .type("Where")
      .should("be.focused");

    cy.window().trigger("keydown", {
      key: "ArrowDown",
    });

    cy.get('[data-id="chat-block"]').find("input").should("not.be.focused");

    cy.get('[data-id="chat-questions"]')
      .children()
      .first()
      .should("be.focused");

    cy.window().trigger("keydown", {
      key: "ArrowUp",
    });

    cy.get('[data-id="chat-questions"]')
      .children()
      .first()
      .should("not.be.focused");
  });
});
