it("displays shows page after clicking 'purchase more tickets' button", () => {
  // log in using custom command
  cy.task("db:reset").signIn(
    Cypress.env("TEST_USER_EMAIL"),
    Cypress.env("TEST_PASSWORD")
  );

  // visit the user page
  cy.visit("/user");

  // find and click the "purchase more tickets" button
  cy.findByRole("button", { name: /purchase more tickets/i }).click();

  // confirm "Shows" page is displayed
  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});
