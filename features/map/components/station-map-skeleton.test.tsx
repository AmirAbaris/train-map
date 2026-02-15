import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StationMapSkeleton } from "./station-map-skeleton";

describe("StationMapSkeleton", () => {
  it("renders without throwing", () => {
    expect(() => render(<StationMapSkeleton />)).not.toThrow();
  });

  it("contains aside and skeleton placeholders", () => {
    render(<StationMapSkeleton />);
    expect(screen.getByRole("complementary")).toBeInTheDocument();
    const skeletons = document.querySelectorAll("[class*='animate-pulse']");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
