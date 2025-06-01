"use client";
import { Button } from "@/components/ui/button";
import { cloneDeep } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Header from "@/components/header";
import Note from "@/components/note";
import { useLocalStorageSync } from "@/hooks/useLocalStorageSync";
import { NoteProps } from "@/types/note-interfaces";

const appName = "my-notes-app";

// Notes is the main page component for displaying and managing all notes.
// - Uses a custom hook to persist notes in localStorage.
// - Allows users to add, edit, and remove notes. All changes are immediately saved to localStorage.
export default function Notes() {
  const [notes, setNotes] = useLocalStorageSync<NoteProps>(appName);

  const addEmptyNote = () => {
    setNotes([
      {
        id: `${notes.length}:${Date.now()}`,
        title: "",
        note: "",
        editable: true,
      },
      ...notes,
    ]);
  };

  const updateNote = (index: number, title: string, note: string) => {
    const newNotes = cloneDeep(notes);
    newNotes[index]["title"] = title;
    newNotes[index]["note"] = note;
    newNotes[index]["editable"] = false;
    setNotes(newNotes);
  };

  const removeNote = (index: number) => {
    const newNotes = cloneDeep(notes);
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-5 gap-8 sm:p-5 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col grow gap-[12px] row-start-2 items-center text-custom3">
        <h2 className="mb-4 text-2xl font-semibold">Notes Overview</h2>
        <div className="mb-4 flex gap-4">
          <Button
            aria-label="Add new note"
            className="bg-custom-500 text-white hover:bg-custom-400"
            onClick={addEmptyNote}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
        {notes.length > 0 && (
          <div
            className={`rounded-md bg-indigo-50 grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`}
          >
            {notes.map((note, index) => (
              <Note
                key={note.id}
                id={note.id}
                index={index}
                title={note.title}
                note={note.note}
                editable={note.editable}
                updateNote={updateNote}
                removeNote={removeNote}
              ></Note>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
