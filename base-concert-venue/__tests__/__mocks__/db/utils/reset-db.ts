import { readFakeData } from "@/__tests__/__mocks__/fakeData";

import { filenames, writeJSONToFile } from "@/lib/db/db-utils";

export const resetDb = async () => {
  // failsafe against resetting production db
  const safeToReset = process.env.NODE_ENV === "test" || process.env.CYPRESS;
  if (!safeToReset) {
    // eslint-disable-next-line no-console
    console.log("Warning: database reset unavailabe outside test environment!");
    return;
  }

  const { fakeBands, fakeReservations, fakeShows, fakeUsers } =
    await readFakeData();

  // overwrite data in files
  await Promise.all([
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.reservations, fakeReservations),
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.users, fakeUsers),
  ]);
};
