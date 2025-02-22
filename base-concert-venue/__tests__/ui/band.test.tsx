import { render, screen } from "@testing-library/react";

import BandComponent from "@/pages/bands/[bandId]";
import { readFakeData } from "../__mocks__/fakeData";

test("band component displays correct band information", async () => {
  const { fakeBands } = await readFakeData();
  render(<BandComponent band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });

  expect(heading).toBeInTheDocument();
});

test("Dispalys error if band data is not found", async () => {
  render(<BandComponent band={null} error="Band not found" />);
  const error = screen.getByRole("heading", { name: /Band not found/i });
  expect(error).toBeInTheDocument();
});
