import { screen, render } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test("Displays reservations and purchase more button when reservation exits", async () => {
  render(<UserReservations userId={1} />);

  const purchaseButton = await screen.findByRole("button", {
    name: /purchase more tickets/i,
  });

  expect(purchaseButton).toBeInTheDocument();
});

test("Displays no reservations and purchase tickets button when no reservations exist", async () => {
  render(<UserReservations userId={0} />);

  const purchaseButton = await screen.findByRole("button", {
    name: /purchase tickets/i,
  });

  expect(purchaseButton).toBeInTheDocument();

  const ticketsHeading = screen.getByRole("heading", {
    name: /your tickets/i,
  });

  expect(ticketsHeading).not.toBeInTheDocument();
});
