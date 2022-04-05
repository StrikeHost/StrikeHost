describe("Login page", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:8000/login", {
      statusCode: 200,
      fixture: "login",
    });
    cy.intercept("POST", "http://localhost:8000/register", { statusCode: 200 });
  });

  it("loads the page successfully when logged out", () => {
    cy.visit("/login");

    cy.get("#navbar").should("contain.text", "Login");
  });

  it("registers an account successfully", () => {
    cy.visit("/login");

    cy.get("#firstNameRegister").click().type("Sam");
    cy.get("#lastNameRegister").click().type("Gunner");
    cy.get("#emailRegister").click().type("test@test.test");
    cy.get("#passwordRegister").click().type("password1!");
    cy.get("#confirmPasswordRegister").click().type("password1!");
    cy.get("#registerButton").click();

    cy.url().should("equal", "http://localhost:3000/");
    cy.should("contain.text", "Dashboard");
  });

  it("logs into an account successfully", () => {
    cy.visit("/login");

    cy.get("#emailLogin").click().type("test@test.test");
    cy.get("#passwordLogin").click().type("password1!");
    cy.get("#loginButton").click();

    cy.url().should("equal", "http://localhost:3000/");
    cy.should("contain.text", "Dashboard");
  });
});
