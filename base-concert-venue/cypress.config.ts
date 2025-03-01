/* eslint-disable no-param-reassign */
import { defineConfig } from "cypress";
import { resetDb } from "./__tests__/__mocks__/db/utils/reset-db";
import { addBand } from "./lib/features/bands/queries";
import { addReservation } from "./lib/features/reservations/queries";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
      // to access within a test function
      // Cypress.env.REVALIDATION_SECRET

      on("task", {
        "db:reset": () => resetDb().then(() => null),
        addBand: (newBand) => addBand(newBand).then(() => null),
        addReservation: (newReservation) =>
          addReservation(newReservation).then(() => null),
      });
      return config;
    },
  },
});
