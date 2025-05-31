import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NoteFormProps } from "@/types/note-interfaces";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

const messageTitle = "Title must be at least 2 characters.";
const messageNote = "Note must be at least 2 characters.";

const formSchema = z.object({
  title: z.string().min(2, { message: messageTitle }),
  note: z.string().min(2, { message: messageNote }),
});

const NoteForm: React.FC<NoteFormProps> = ({
  title,
  note,
  handleSubmit,
  closeNoteEditor,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title, note },
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
            aria-label="Save note"
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

export default NoteForm;
