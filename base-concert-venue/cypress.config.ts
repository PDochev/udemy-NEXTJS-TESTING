import { defineConfig } from "cypress";
import { resetDb } from "./__tests__/__mocks__/db/utils/reset-db";
import { addBand } from "./lib/features/bands/queries";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        "db:reset": () => resetDb().then(() => null),
        addBand: (newBand) => addBand(newBand).then(() => null),
      });
    },
  },
});
