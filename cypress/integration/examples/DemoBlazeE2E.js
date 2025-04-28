/// <reference types="cypress" />
import "cypress-slow-down/commands";

describe("Demoblaze Website Tests", function () {
  beforeEach(function () {
    cy.fixture("config").then((data) => {
      this.config = data;
    });

    // Slow down before each test
    cy.slowDown(3000); // <-- Add this line
  });

  afterEach(function () {
    cy.slowDownEnd(); // <-- Reset slowdown after each test
  });

  // it("should open Sign Up modal and sign up a new user", function () {
  //   cy.visit(this.config.baseUrl);
  //   // Click on Sign Up button
  //   cy.get("#signin2").should("be.visible").click();

  //   // Ensure Modal appeared
  //   cy.get("#signInModal").should("be.visible");

  //   // Fill username and password
  //   cy.get("#sign-username").clear().type(this.config.newUsername);
  //   cy.get("#sign-password").clear().type(this.config.newPassword);

  //   // Submit form
  //   cy.get("#signInModal .btn-primary").should("be.visible").click();

  //   // Verify success alert appears
  //   cy.on("window:alert", (alertText) => {
  //     expect(alert).to.eq.toString("Sign up successful.");
  //   });
  // });

  it("Test case 1 - should open Login modal and log in with new user", function () {
    // Click on Login button
    cy.visit(this.config.baseUrl);
    cy.get("#login2").should("be.visible").click();

    // Ensure Modal appeared
    cy.get("#logInModal").should("be.visible");

    // Fill username and password
    cy.get("#loginusername").clear().type(this.config.newUsername);
    cy.get("#loginpassword").clear().type(this.config.newPassword);

    // Submit form
    cy.get("#logInModal .btn-primary").should("be.visible").click();

    // Verify Logout button appears
    cy.get("#logout2").should("be.visible");

    // Verify user lgged in successfully
    cy.get("#nameofuser").should("contain", this.config.newUsername);
  });

  // Visit the base URL and verify each category loads products
  cy.visit(this.config.baseUrl); // Open the home page
  this.config.category.forEach((cat) => {
    cy.get(".list-group") // Find the category list section
      .contains(cat.name) // Find and click the category by name
      .click();
    cy.get(".card-title") // Verify at least one product card appears
      .should("exist");
  });

  // Test case 3 - Verify homepage loads correctly
  it("Test case 3 - should load the homepage", function () {
    cy.visit(this.config.baseUrl); // Open the home page
    cy.url().should("include", this.config.urlName); // Verify URL contains expected part
    cy.title().should("include", "STORE"); // Verify page title contains 'STORE'
  });

  // Test case 4 - Verify navigation to Phones category
  it("Test case 4 - should navigate to Phones category", function () {
    cy.visit(this.config.baseUrl); // Open the home page
    cy.contains("Phones") // Find and click the 'Phones' category
      .click();
    cy.get(".card-title") // Verify product cards exist
      .should("exist");
  });

  // Test case 5 - Verify navigation to Laptops category
  it("Test case 5 - should navigate to Laptops category", function () {
    cy.visit(this.config.baseUrl); // Open the home page
    cy.contains("Laptops") // Find and click the 'Laptops' category
      .click();
    cy.get(".card-title") // Verify product cards exist
      .should("exist");
  });

  // Test case 6 - Verify navigation to Monitors category
  it("Test case 6 - should navigate to Monitors category", function () {
    cy.visit(this.config.baseUrl); // Open the home page
    cy.contains("Monitors") // Find and click the 'Monitors' category
      .click();
    cy.get(".card-title") // Verify product cards exist
      .should("exist");
  });

  it("Test case 7 - should verify each product card has title, price, and image", function () {
    cy.visit(this.config.baseUrl);

    // Wait for products to load
    cy.get(".card", { timeout: 10000 }).should("have.length.greaterThan", 0);

    // Verify each product card
    cy.get(".card").each(($card) => {
      cy.wrap($card).within(() => {
        // Check Image
        cy.get("img")
          .should("be.visible")
          .and("have.attr", "src")
          .and("not.be.empty");

        // Check Title (inside <a> under <h4 class="card-title">)
        cy.get(".card-title a").should("be.visible").and("not.be.empty");

        // Check Price (inside <h5>)
        cy.get("h5").should("be.visible").and("not.be.empty");
      });
    });
  });

  it("Test case 8 - should add a product to the cart", function () {
    cy.visit(this.config.baseUrl);

    // Click Laptops
    cy.contains("Laptops").click();

    // Wait for products to load
    cy.get(".card-title", { timeout: 10000 }).should(
      "have.length.greaterThan",
      0
    );

    // Save product name
    cy.get(".card-title")
      .first()
      .invoke("text")
      .then((productName) => {
        const trimmedProductName = productName.trim();

        // Click the first product
        cy.contains(trimmedProductName).click();

        // Add to cart
        cy.get(".btn-success").should("be.visible").click();

        // Handle Alert
        cy.on("window:alert", (alertText) => {
          expect(alertText).to.eq("Product added");
        });

        // Go to cart
        cy.get("#cartur").click();

        // Wait for cart page
        cy.get("#tbodyid", { timeout: 10000 }).should("exist");

        // Check if product exists in cart
        cy.get("#tbodyid").should("contain.text", trimmedProductName);
      });
  });

  it("Test case 9 - should remove a product from the cart", function () {
    cy.visit(this.config.baseUrl);

    // Click Laptops
    cy.contains("Laptops").click();

    // Wait for products to load
    cy.get(".card-title", { timeout: 10000 }).should(
      "have.length.greaterThan",
      0
    );

    // Save product name
    cy.get(".card-title")
      .first()
      .invoke("text")
      .then((productName) => {
        const trimmedProductName = productName.trim();

        // Click product
        cy.contains(trimmedProductName).click();

        // Add to cart
        cy.get(".btn-success").should("be.visible").click();

        // Handle alert
        cy.on("window:alert", (alertText) => {
          expect(alertText).to.eq("Product added");
        });

        // Go to cart
        cy.get("#cartur").click();

        // Wait for cart page
        cy.get("#tbodyid", { timeout: 10000 }).should(
          "contain.text",
          trimmedProductName
        );

        // Click "Delete" link
        cy.get("#tbodyid").contains("Delete").click();

        // Wait a bit for delete to process
        cy.wait(3000);

        // Verify product is removed
        cy.get("#tbodyid").should("not.contain.text", trimmedProductName);
      });
  });

  it("Test case 10 - should place an order", function () {
    cy.visit(this.config.baseUrl);

    // Step 1: Click Laptops
    cy.contains("Laptops").click();

    // Step 2: Wait for products to load
    cy.get(".card-title", { timeout: 10000 }).should(
      "have.length.greaterThan",
      0
    );

    // Step 3: Click first laptop
    cy.get(".card-title").first().click();

    // Step 4: Add to cart
    cy.get(".btn-success").should("be.visible").click();

    // Step 5: Handle alert "Product added"
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.eq("Product added");
    });

    // Step 6: Go to cart
    cy.get("#cartur").click();

    // Step 7: Verify cart page loads and product exists
    cy.get("#tbodyid", { timeout: 10000 }).should("have.length.greaterThan", 0);

    // Step 8: Click "Place Order" button
    cy.contains("Place Order").should("be.visible").click();

    // Step 9: Fill order form
    cy.get("#name").type(this.config.user.name);
    cy.get("#country").type(this.config.user.country);
    cy.get("#city").type(this.config.user.city);
    cy.get("#card").type(this.config.user.creditCard);
    cy.get("#month").type(this.config.user.month);
    cy.get("#year").type(this.config.user.year);

    // Step 10: Submit order
    cy.get("#orderModal").find(".btn-primary").contains("Purchase").click();

    // Step 11: Verify order confirmation
    cy.get(".sweet-alert", { timeout: 10000 }).should("be.visible");

    cy.get(".confirm.btn.btn-lg.btn-primary").should("be.visible").click();
  });
});
