import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import NoteForm from "@/components/note-form";

describe("NoteForm", () => {
  test("renders with initial values and submits", () => {
    const handleSubmit = vi.fn();
    const closeNoteEditor = vi.fn();
    render(
      <NoteForm
        title="Initial Title"
        note="Initial Note"
        handleSubmit={handleSubmit}
        closeNoteEditor={closeNoteEditor}
      />
    );
    expect(screen.getByDisplayValue("Initial Title")).toBeDefined();
    expect(screen.getByDisplayValue("Initial Note")).toBeDefined();

    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByPlaceholderText(/note/i), {
      target: { value: "New Note" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByDisplayValue("New Title")).toBeDefined();
    expect(screen.getByDisplayValue("New Note")).toBeDefined();
  });

  test("shows validation error for short title", async () => {
    const handleSubmit = vi.fn();
    const closeNoteEditor = vi.fn();
    render(
      <NoteForm
        title=""
        note=""
        handleSubmit={handleSubmit}
        closeNoteEditor={closeNoteEditor}
      />
    );
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: "a" },
    });
    fireEvent.change(screen.getByPlaceholderText(/note/i), {
      target: { value: "b" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(
      await screen.findByText(/title must be at least 2 characters/i)
    ).toBeDefined();
    expect(
      await screen.findByText(/note must be at least 2 characters/i)
    ).toBeDefined();
  });
});
