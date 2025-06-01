import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import NoteForm from "@/components/note-form";
import { NoteFormData, NoteProps } from "@/types/note-interfaces";
import RemoveNoteWarning from "./remove-note-warning";

// Note is a reusable component that displays a single note with its title and content.
// - In view mode, it shows the note's title, content, and provides buttons to edit or delete the note.
// - In edit mode, it renders a form for editing the note's title and content.
// - Deleting a note triggers a confirmation dialog before removal.
const Note: React.FC<NoteProps> = (props) => {
  const [title, setTitle] = useState(props.title);
  const [note, setNote] = useState(props.note);
  const [editable, setEditable] = useState(props.editable);
  const [warning, setWarning] = useState(false);

  // handle form submission to create or update note
  const handleSubmit = (data: NoteFormData) => {
    const newTitle = data.title ?? "";
    const newNote = data.note ?? "";
    setTitle(newTitle);
    setNote(newNote);
    setEditable(false);
    if (props.updateNote && props.index !== undefined)
      props.updateNote(props.index, newTitle, newNote);
  };

  // display note in edit mode
  const editNote = () => setEditable(true);

  // show warning dialog
  const removeNoteWarning = () => setWarning(true);

  // close Note Editor only when note is not yet saved
  // otherwise it will show a warning dialog
  const closeNoteEditor = () => {
    if (title !== "" || note !== "") {
      removeNoteWarning();
      return;
    }
    handleRemoveNote(true);
  };

  // removes note if action is true
  // otherwise it will close the warning dialog
  const handleRemoveNote = (action: boolean) => {
    if (action && props.removeNote && props.index !== undefined)
      props.removeNote(props.index);
    else setWarning(false);
  };

  if (editable) {
    return (
      <div className="bg-white p-4 rounded-md self-center">
        <RemoveNoteWarning
          warning={warning}
          handleRemoveNote={handleRemoveNote}
        />
        <NoteForm
          title={title}
          note={note}
          handleSubmit={handleSubmit}
          closeNoteEditor={closeNoteEditor}
        />
      </div>
    );
  } else {
    return (
      <div className="bg-indigo-50 self-center">
        <RemoveNoteWarning
          warning={warning}
          handleRemoveNote={handleRemoveNote}
        />
        <div className="bg-white overflow-auto border-2 border-gray-200 p-4 rounded-md">
          <div className="flex gap-2">
            <h3 className="mb-4 text-xl font-bold flex-grow">{title}</h3>
            <Button
              aria-label="Edit note"
              className="bg-custom-500 text-white hover:bg-custom-400"
              onClick={editNote}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              aria-label="Delete note"
              className="bg-custom-500 text-white hover:bg-custom-400"
              onClick={removeNoteWarning}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
          <p className="whitespace-pre-line">{note}</p>
        </div>
      </div>
    );
  }
};

export default Note;
