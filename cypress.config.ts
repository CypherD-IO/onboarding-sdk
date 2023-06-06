import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://public-dev.cypherd.io/sdk',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
