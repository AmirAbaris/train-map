import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StationMap } from "./station-map";

vi.mock("next/dynamic", () => ({
  default: (fn: () => Promise<{ Map: unknown }>) => {
    const DynamicMap = () => <div data-testid="map" />;
    return DynamicMap;
  },
}));

vi.mock("@/features/station/hooks/use-station", () => ({
  useStation: vi.fn(),
}));

import { useStation } from "@/features/station/hooks/use-station";

const mockStations = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.5251, lng: 13.3694 },
];

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("StationMap", () => {
  beforeEach(() => {
    vi.mocked(useStation).mockReturnValue({
      stations: undefined,
      isLoading: true,
      error: null,
    });
  });

  it("shows skeleton when loading", () => {
    render(<StationMap />, { wrapper: createWrapper() });
    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });

  it("shows list and map when data loads", () => {
    vi.mocked(useStation).mockReturnValue({
      stations: mockStations,
      isLoading: false,
      error: null,
    });
    render(<StationMap />, { wrapper: createWrapper() });
    expect(screen.getByText("Train Stations around Germany")).toBeInTheDocument();
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  it("shows error when useStation returns error", () => {
    vi.mocked(useStation).mockReturnValue({
      stations: undefined,
      isLoading: false,
      error: new Error("Network error"),
    });
    render(<StationMap />, { wrapper: createWrapper() });
    expect(screen.getByText("Failed to load stations")).toBeInTheDocument();
    expect(screen.getByText("Network error")).toBeInTheDocument();
  });
});
