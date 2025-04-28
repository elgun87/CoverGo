const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false, // helps with cross-origin sometimes
    specPattern: "cypress/integration/examples/*.js",
  },
});
