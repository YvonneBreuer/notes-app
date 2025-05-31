import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Page from "@/app/page";

describe("Start-Page", () => {
  test("page rendering", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: "My Notes App" })
    ).toBeDefined();
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("link", { name: "Start" })).toBeDefined();
  });
});
