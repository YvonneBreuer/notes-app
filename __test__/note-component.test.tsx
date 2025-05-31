import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Note from "@/components/note";
import { NoteProps } from "@/types/note-interfaces";

const baseProps: NoteProps = {
  id: "1",
  title: "Test Title",
  note: "Test note content",
  editable: false,
  index: 0,
  updateNote: vi.fn(),
  removeNote: vi.fn(),
};

describe("Note component", () => {
  test("renders note title and content", () => {
    render(<Note {...baseProps} />);
    expect(screen.getByText("Test Title")).toBeDefined();
    expect(screen.getByText("Test note content")).toBeDefined();
  });

  test("calls editNote when edit button is clicked", () => {
    render(<Note {...baseProps} />);
    const editButton = screen.getByRole("button", { name: /edit note/i });
    fireEvent.click(editButton);
    // After clicking, the form should appear
    expect(screen.getByDisplayValue("Test Title")).toBeDefined();
    expect(screen.getByDisplayValue("Test note content")).toBeDefined();
  });

  test("shows delete confirmation dialog when delete is clicked", () => {
    render(<Note {...baseProps} />);
    const deleteButton = screen.getByRole("button", {
      name: /delete note/i,
    });
    fireEvent.click(deleteButton);
    expect(screen.getByText("Are you absolutely sure?")).toBeDefined();
  });
});
