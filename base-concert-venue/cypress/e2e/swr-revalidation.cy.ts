import { findByRole } from "@testing-library/react";
import { generateNewReservation } from "../../__tests__/__mocks__/fakeData/newReservation";
import { generateRandomId } from "../../lib/features/reservations/utils";

const ONE_SECOND = 1000;
const FIFTHTEEN_SECONDS = 15 * ONE_SECOND;
const THIRTY_SECONDS = 30 * ONE_SECOND;

it("should refresh the shows page after 30 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/shows");

  // there should be only one sold-out show
  cy.findAllByText(/sold out/i).should("have.length", 1);

  // Buy all the tickets for the show (id: 0 , 10 seats available)
  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    seatCount: 10,
  });

  cy.task("addReservation", newReservation);

  // advance the time (less than 30 seconds revalidate interval) and check again
  cy.tick(ONE_SECOND);
  cy.findAllByText(/sold out/i).should("have.length", 1);

  // advance the clock by 30 seconds; now additional sold-out show should appear
  cy.tick(THIRTY_SECONDS);
  cy.findAllByText(/sold out/i).should("have.length", 2);
});

it("should refresh the reservations page after 15 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/reservations/0");

  // click sign-in button (from main page , not nav) to sign-in
  // (in an app where user / password weren't pre-filled)
  // would also neet to get from env vars and fill

  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // it should show 10 seats left
  cy.findByText(/10 seats left/i).should("exist");

  // the first show from fake data has an ID of 0 and 10 available seats
  const newReservation = generateNewReservation({
    reservationId: 12345,
    showId: 0,
    seatCount: 2,
  });

  cy.task("addReservation", newReservation);

  // advance time and check again
  cy.tick(ONE_SECOND);
  cy.findByText(/10 seats left/i).should("exist");

  // advance time and check again
  cy.tick(FIFTHTEEN_SECONDS);
  cy.findByText(/8 seats left/i).should("exist");
});
