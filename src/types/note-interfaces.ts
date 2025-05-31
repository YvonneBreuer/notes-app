export interface NoteBase {
  title: string;
  note: string;
  editable: boolean;
}
export interface NoteProps extends NoteBase {
  id: string;
  index?: number;
  updateNote?: (index: number, title: string, note: string) => void;
  removeNote?: (index: number) => void;
}

export interface NoteState extends NoteBase {
  warning: boolean;
}

export interface NoteFormData {
  title: string;
  note: string;
}

export interface NoteFormProps extends NoteFormData {
  handleSubmit: (data: { title: string; note: string }) => void;
  closeNoteEditor: () => void;
}
