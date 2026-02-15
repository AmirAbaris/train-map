import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StationPopupContent } from "./station-popup-content";

const station = {
  id: 1,
  name: "Berlin Hbf",
  city: "Berlin",
  lat: 52.5251,
  lng: 13.3694,
};

describe("StationPopupContent", () => {
  it("renders station name and city", () => {
    render(<StationPopupContent station={station} />);
    expect(screen.getByText("Berlin Hbf")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
  });
});
