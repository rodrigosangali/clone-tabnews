import orchestrator from "tests/orchestrator";
import path from "node:path";

// console.log("query no banco:", database.query("SELECT 1+1;"));

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
      expect(responseBody).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: path.resolve(
              "infra/migrations/1770380448925_create-second-test.js",
            ),
          }),
        ]),
      );
    });
  });
});

