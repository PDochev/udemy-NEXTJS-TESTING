import { findByRole, render, screen } from "@testing-library/react";

import { Reservation } from "@/components/reservations/Reservation";

test("reservation page shows correct number of available seats", async () => {
  render(<Reservation showId={0} submitPurchase={jest.fn()} />);

  const seatCountText = await screen.findByText(/10 seats left/i);

  expect(seatCountText).toBeInTheDocument();
});

test("Reservation page shows sold out message and no purchase button if there are no seats available", async () => {
  render(<Reservation showId={1} submitPurchase={jest.fn()} />);

  const soldOutMessage = await screen.findByRole("heading", {
    name: /sold out/i,
  });
  const purchaseButton = screen.queryByRole("button", {
    name: /purchase/i,
  });

  expect(soldOutMessage).toBeInTheDocument();
  expect(purchaseButton).not.toBeInTheDocument();
});
