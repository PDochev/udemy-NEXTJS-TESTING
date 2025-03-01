// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// polyfill necessary for jsdom test environment
import { TextDecoder, TextEncoder } from "util";

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

import { server } from "./__tests__/__mocks__/msw/server";
import { resetDb } from "./__tests__/__mocks__/db/utils/reset-db";

beforeAll(() => server.listen());

beforeEach(async () => {
  await resetDb();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
