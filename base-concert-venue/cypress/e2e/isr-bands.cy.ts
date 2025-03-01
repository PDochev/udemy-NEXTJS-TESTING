// From: https://glebbahmutov.com/blog/ssr-e2e/
it("displays bands when skiping client-side javascript , confirming inital ISR", () => {
  cy.request("/bands")
    .its("body")
    .then((html) => {
      // remove the scripts so they don't start automatically
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHtml);
    });
  cy.findByRole("heading", { name: /the wandering bunnies/i }).should("exist");
  cy.findByRole("heading", { name: /shamrock pete/i }).should("exist");
  cy.findByRole("heading", { name: /the joyous nun riot/i }).should("exist");
});
