

describe("Navigation", () => {
  before(() => {
    cy.request("GET", "/api/debug/reset");
  })
  it("should visit root", () => {
    cy.visit("/");
  });
});