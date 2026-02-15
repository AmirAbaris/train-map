import { describe, it, expect } from "vitest";
import { getStations } from "./get-stations";

describe("getStations", () => {
  it("returns success and data array", async () => {
    const response = await getStations();
    expect(response.success).toBe(true);
    if (response.success) {
      expect(Array.isArray(response.data)).toBe(true);
    }
  });

  it("returns stations with id, name, city, lat, lng", async () => {
    const response = await getStations();
    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data.length).toBeGreaterThan(0);
      for (const station of response.data) {
        expect(station).toHaveProperty("id");
        expect(station).toHaveProperty("name");
        expect(station).toHaveProperty("city");
        expect(station).toHaveProperty("lat");
        expect(station).toHaveProperty("lng");
      }
    }
  });
});
