import { signIn } from "next-auth/react";
import { findByRole } from "@testing-library/react";
it("runs auth flow for successful login to protected reservation page ", () => {
  // visit reservation page for the first show (id = 0)
  cy.task("db:reset").visit("/reservations/0");

  // check for sign in form
  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "exist"
  );

  // check that there's no option to purchase tickets
  cy.findByRole("button", { name: /purchase/i }).should("not.exist");

  // enter valid sign-in credentials
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));

  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_PASSWORD"));

  // submit the form
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check for purchase button and band name
  cy.findByRole("button", { name: /purchase/i }).should("exist");
  cy.findByRole("heading", { name: /the wandering bunnies/i }).should("exist");

  // check for email and sign out button on the navbar
  cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
    "exist"
  );
  cy.findByRole("button", { name: /sign out/i }).should("exist");

  // check that sign in button does not exist
  cy.findByRole("button", { name: /sign in/i }).should("not.exist");
});

it("runs auth flow for protected user page, including failed sign in", () => {
  // visit user page
  cy.task("db:reset").visit("/user");

  // check for sign in form
  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "exist"
  );

  // check there's no welcome message
  cy.findByRole("heading", { name: /welcome/i }).should("not.exist");

  // fill out sign in form with env variables, but bad password
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));

  cy.findByLabelText(/password/i)
    .clear()
    .type("bad-password");

  // submit the form

  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check for error message
  cy.findByText(/sign in failed/i).should("exist");

  // fill out sign in form again, with correct info
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));

  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_PASSWORD"));

  // submit the form

  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check that the user page now shows
  cy.findByRole("heading", { name: /welcome/i }).should("exist");
  cy.findByRole("heading", { name: /your tickets/i }).should("exist");

  // check for user and sign out button on the navbar
  cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
    "exist"
  );
  cy.findByRole("button", { name: /sign out/i }).should("exist");
  cy.findByRole("button", { name: /sign in/i }).should("not.exist");
});

it("redirects to sign in for protected pages", () => {
  cy.fixture("protected-pages.json").then((urls) => {
    urls.forEach(($url) => {
      cy.visit($url);
      cy.findByLabelText(/email address/i).should("exist");
      cy.findByLabelText(/password/i).should("exist");
    });
  });
});

it("does not show the sign in page when already signed in", () => {
  cy.task("db:reset").signIn(
    Cypress.env("TEST_USER_EMAIL"),
    Cypress.env("TEST_PASSWORD")
  );

  // access tickets page for the first show
  cy.visit("/reservations/0");

  // make sure there's no sign-in page
  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "not.exist"
  );

  // make sure ticket purchase button shows
  cy.findByRole("button", { name: /purchase/i }).should("exist");
});
