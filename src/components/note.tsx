import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  note: z.string().min(2, { message: "Note must be at least 2 characters." }),
});

const NoteForm: React.FC<{
  title: string;
  content: string;
  handleSubmit: (data: { title: string; note: string }) => void;
  closeNoteEditor: () => void;
}> = ({ title, content, handleSubmit, closeNoteEditor }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: title, note: content },
  });
  return (
    <div>
      <div className="flex justify-end">
        <Button
          aria-label="Close note editor"
          className="bg-custom-500 text-white hover:bg-custom-400"
          onClick={closeNoteEditor}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of your note.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="Note" {...field} />
                </FormControl>
                <FormDescription>
                  This is the content of your note.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-custom-500 text-white hover:bg-custom-400"
            type="submit"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

interface NoteProps {
  id: string;
  index: number;
  title: string;
  content: string;
  editable: boolean;
  updateNote: (index: number, title: string, content: string) => void;
  removeNote: (index: number) => void;
}

interface NoteState {
  title: string;
  content: string;
  editable: boolean;
  warning: boolean;
}

class Note extends React.Component<NoteProps, NoteState> {
  constructor(props: NoteProps) {
    super(props);
    this.state = {
      title: props.title,
      content: props.content,
      editable: props.editable,
      warning: false,
    };
  }
  handleSubmit = (data: { title: string; note: string }) => {
    const title = data.title ?? "";
    const content = data.note ?? "";
    this.setState({
      title,
      content,
      editable: false,
    });
    this.props.updateNote(this.props.index, title, content);
  };
  editNote = () => {
    this.setState({
      editable: true,
    });
  };
  removeNoteWarning = () => {
    this.setState({
      warning: true,
    });
  };
  closeNoteEditor = () => {
    this.handleRemoveNote(true);
  };
  handleRemoveNote = (action: boolean) => {
    if (action) this.props.removeNote(this.props.index);
    else this.setState({ warning: false });
  };

  render() {
    if (this.state.editable) {
      return (
        <div className="bg-white p-4 rounded-md self-center">
          <AlertDialog
            open={this.state.warning}
            onOpenChange={() => this.setState({ warning: false })}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  selected note.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => this.setState({ warning: false })}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-custom-500 text-white hover:bg-custom-400"
                  onClick={() => this.handleRemoveNote(true)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <NoteForm
            title={this.state.title}
            content={this.state.content}
            handleSubmit={this.handleSubmit}
            closeNoteEditor={this.closeNoteEditor}
          />
        </div>
      );
    } else {
      return (
        <div className="bg-indigo-50 self-center">
          <AlertDialog
            open={this.state.warning}
            onOpenChange={() => this.handleRemoveNote(false)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  selected note.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => this.handleRemoveNote(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-custom-500 text-white hover:bg-custom-400"
                  onClick={() => this.handleRemoveNote(true)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="bg-white overflow-auto border-2 border-gray-200 p-4 rounded-md">
            <div className="flex gap-2">
              <h3 className="mb-4 text-xl font-bold flex-grow">
                {this.state.title}
              </h3>
              <Button
                aria-label="Edit note"
                className="bg-custom-500 text-white hover:bg-custom-400"
                onClick={this.editNote}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button
                aria-label="Delete note"
                className="bg-custom-500 text-white hover:bg-custom-400"
                onClick={this.removeNoteWarning}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
            <p className="whitespace-pre-line">{this.state.content}</p>
          </div>
        </div>
      );
    }
  }
}

export default Note;
