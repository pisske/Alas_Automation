const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.saucedemo.com",
  },
  env: {
    API_URL: "https://gorest.co.in/public/v2",
    API_TOKEN:
      "04365e4ff1fd5e66b865947c63c9f0aa4acea7a22b056b6d0f31a0991d456501",
  },
});
