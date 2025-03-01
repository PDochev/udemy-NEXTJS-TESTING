import userAuthHandler from "@/pages/api/users/index";
import { testApiHandler } from "next-test-api-route-handler";

import userReservationsHandler from "@/pages/api/users/[userId]/reservations";

jest.mock("@/lib/auth/utils");

test("POST /api/users receives token with correct credentials", async () => {
  await testApiHandler({
    handler: userAuthHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.test",
          password: "test",
        }),
      });
      expect(res.status).toBe(200);
      const json = await res.json();

      expect(json).toHaveProperty("user");
      expect(json.user.id).toEqual(1);
      expect(json.user.email).toEqual("test@test.test");
      expect(json.user).toHaveProperty("token");
    },
  });
});

test("GET /api/users/[userId]/reservations returns correct number of reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.userReservations).toHaveLength(2);
    },
  });
});

test("GET /api/users/[userId]/reservations returns empty array for user without reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.userReservations).toHaveLength(0);
    },
  });
});
