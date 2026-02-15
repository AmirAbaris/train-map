import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StationMapError } from "./station-map-error";

describe("StationMapError", () => {
  it("renders Failed to load stations and custom message", () => {
    render(<StationMapError message="Custom error" />);
    expect(screen.getByText("Failed to load stations")).toBeInTheDocument();
    expect(screen.getByText("Custom error")).toBeInTheDocument();
  });

  it("shows fallback message when message is not provided", () => {
    render(<StationMapError />);
    expect(screen.getByText("Failed to load stations")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });
});
