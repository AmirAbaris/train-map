import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Map } from "./map";

const mockFlyTo = vi.fn();

vi.mock("react-leaflet", () => ({
  MapContainer: ({
    children,
    center,
    zoom,
  }: {
    children: React.ReactNode;
    center: [number, number];
    zoom: number;
  }) => (
    <div data-testid="map-container" data-center={JSON.stringify(center)} data-zoom={zoom}>
      {children}
    </div>
  ),
  TileLayer: () => null,
  Marker: ({
    children,
    position,
  }: {
    children: React.ReactNode;
    position: [number, number];
  }) => (
    <div data-testid="marker" data-position={JSON.stringify(position)}>
      {children}
    </div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useMap: () => ({ flyTo: mockFlyTo }),
}));

vi.mock("leaflet", () => ({
  __esModule: true,
  default: {
    Icon: class Icon {},
  },
}));

const stations = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.5251, lng: 13.3694 },
  { id: 2, name: "Hamburg Hbf", city: "Hamburg", lat: 53.553, lng: 10.0067 },
];

describe("Map", () => {
  it("renders map container with center and zoom", () => {
    const center: [number, number] = [51.5, 10];
    render(<Map center={center} zoom={8} />);
    const container = screen.getByTestId("map-container");
    expect(container).toBeInTheDocument();
    expect(container.getAttribute("data-center")).toBe(JSON.stringify(center));
    expect(container.getAttribute("data-zoom")).toBe("8");
  });

  it("renders default center and zoom when not provided", () => {
    render(<Map />);
    const container = screen.getByTestId("map-container");
    expect(container.getAttribute("data-center")).toBe(
      JSON.stringify([51.505, -0.09])
    );
    expect(container.getAttribute("data-zoom")).toBe("5");
  });

  it("renders a marker per station", () => {
    render(<Map stations={stations} center={[51.5, 10]} />);
    const markers = screen.getAllByTestId("marker");
    expect(markers).toHaveLength(2);
    expect(markers[0].getAttribute("data-position")).toBe(
      JSON.stringify([52.5251, 13.3694])
    );
    expect(markers[1].getAttribute("data-position")).toBe(
      JSON.stringify([53.553, 10.0067])
    );
  });
});
