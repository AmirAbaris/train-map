import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StationList } from "./station-list";

const stations = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.5251, lng: 13.3694 },
  { id: 2, name: "Hamburg Hbf", city: "Hamburg", lat: 53.553, lng: 10.0067 },
];

describe("StationList", () => {
  it("renders title and search placeholder", () => {
    render(
      <StationList
        stations={stations}
        search=""
        onSearchChange={() => {}}
      />
    );
    expect(screen.getByText("Train Stations around Germany")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search cities...")).toBeInTheDocument();
  });

  it("shows list items for given stations", () => {
    render(
      <StationList
        stations={stations}
        search=""
        onSearchChange={() => {}}
      />
    );
    expect(screen.getByText("Berlin Hbf - Berlin")).toBeInTheDocument();
    expect(screen.getByText("Hamburg Hbf - Hamburg")).toBeInTheDocument();
  });

  it("calls onSearchChange when typing in input", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(
      <StationList
        stations={stations}
        search=""
        onSearchChange={onSearchChange}
      />
    );
    await user.type(screen.getByPlaceholderText("Search cities..."), "a");
    expect(onSearchChange).toHaveBeenCalledWith("a");
  });

  it("calls onSearchChange with empty string when clear button is clicked", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(
      <StationList
        stations={stations}
        search="x"
        onSearchChange={onSearchChange}
      />
    );
    const clearButton = screen.getByRole("button", { name: "" });
    await user.click(clearButton);
    expect(onSearchChange).toHaveBeenCalledWith("");
  });

  it("shows No stations found when stations is empty", () => {
    render(
      <StationList
        stations={[]}
        search=""
        onSearchChange={() => {}}
      />
    );
    expect(screen.getByText("No stations found")).toBeInTheDocument();
  });

  it("calls onStationSelect with station when station button is clicked", async () => {
    const user = userEvent.setup();
    const onStationSelect = vi.fn();
    render(
      <StationList
        stations={stations}
        search=""
        onSearchChange={() => {}}
        onStationSelect={onStationSelect}
      />
    );
    await user.click(screen.getByText("Berlin Hbf - Berlin"));
    expect(onStationSelect).toHaveBeenCalledWith(stations[0]);
  });
});
