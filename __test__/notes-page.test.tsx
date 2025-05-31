import { describe, expect, test } from "vitest";
import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Page from "@/app/notes/page";

describe("Notes-Page", () => {
  test("page rendering", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: "My Notes App" })
    ).toBeDefined();
    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("heading", { level: 2, name: "Notes Overview" })
    ).toBeDefined();
  });

  test("display note form when adding a new note", () => {
    render(<Page />);
    const main = within(screen.getByRole("main"));
    const addNoteButton = main.getByRole("button", { name: /add new note/i });
    expect(addNoteButton).toBeDefined();
    // Simulate clicking the add note button
    fireEvent.click(main.getByRole("button", { name: /add new note/i }));
    // Check if the note form is displayed
    expect(main.getByPlaceholderText(/title/i)).toBeDefined();
    expect(main.getByPlaceholderText(/note/i)).toBeDefined();
    // Close the note editor
    fireEvent.click(main.getByRole("button", { name: /close note editor/i }));
  });

  test("removes a note from the overview", async () => {
    render(<Page />);
    // Add a note
    const main = within(screen.getByRole("main"));
    fireEvent.click(main.getByRole("button", { name: /add new note/i }));
    // Fill and save the note
    fireEvent.change(main.getByPlaceholderText(/title/i), {
      target: { value: "To Delete" },
    });
    fireEvent.change(main.getByPlaceholderText(/note/i), {
      target: { value: "Delete me" },
    });
    fireEvent.click(main.getByRole("button", { name: /save note/i }));

    const element = await waitFor(() =>
      screen.getByRole("button", { name: /delete note/i })
    );

    // Delete the note
    fireEvent.click(element);
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    // The note should be gone
    expect(screen.queryByText("To Delete")).toBeNull();
    expect(screen.queryByText("Delete me")).toBeNull();
  });
});
