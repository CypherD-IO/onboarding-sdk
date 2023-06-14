import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportHeight: 660,
    viewportWidth: 1000,
    projectId: "u8y7y4",
    video: false,
    baseUrl: 'http://127.0.0.1:8080/test',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
