import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: "s47waj",
    baseUrl: 'http://127.0.0.1:8080/test',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
