import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import NoteForm from "@/components/note-form";
import { NoteFormData, NoteProps } from "@/types/note-interfaces";
import RemoveNoteWarning from "./remove-note-warning";

const Note: React.FC<NoteProps> = (props) => {
  const [title, setTitle] = useState(props.title);
  const [note, setNote] = useState(props.note);
  const [editable, setEditable] = useState(props.editable);
  const [warning, setWarning] = useState(false);

  const handleSubmit = (data: NoteFormData) => {
    const newTitle = data.title ?? "";
    const newNote = data.note ?? "";
    setTitle(newTitle);
    setNote(newNote);
    setEditable(false);
    if (props.updateNote && props.index !== undefined)
      props.updateNote(props.index, newTitle, newNote);
  };

  const editNote = () => setEditable(true);

  const removeNoteWarning = () => setWarning(true);

  const closeNoteEditor = () => {
    if (title !== "" || note !== "") {
      removeNoteWarning();
      return;
    }
    handleRemoveNote(true);
  };

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
