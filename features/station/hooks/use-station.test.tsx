import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStation } from "./use-station";

vi.mock("../api/get-stations", () => ({
  getStations: vi.fn(),
}));

import { getStations } from "../api/get-stations";

const mockStations = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.5251, lng: 13.3694 },
];

function TestHarness() {
  const { stations, isLoading, error } = useStation();
  if (isLoading) return <span>Loading</span>;
  if (error) return <span>Error: {error.message}</span>;
  return (
    <ul>
      {stations?.map((s) => (
        <li key={s.id}>{s.name}</li>
      ))}
    </ul>
  );
}

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

describe("useStation", () => {
  beforeEach(() => {
    vi.mocked(getStations).mockResolvedValue({
      success: true,
      data: mockStations,
    });
  });

  it("renders station data after loading", async () => {
    render(<TestHarness />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByText("Berlin Hbf")).toBeInTheDocument();
    });
  });

  it("shows error when getStations fails", async () => {
    vi.mocked(getStations).mockRejectedValue(new Error("Network error"));
    render(<TestHarness />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/)).toBeInTheDocument();
    });
  });
});
