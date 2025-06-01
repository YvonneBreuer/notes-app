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

// RemoveNoteWarning is a reusable dialog component that displays a confirmation prompt
// when the user attempts to delete a note.
// - The dialog is controlled by the `warning` prop (open/close state).
// - When the user clicks "Continue", it calls `handleRemoveNote(true)` to confirm deletion.
// - When the user clicks "Cancel" or closes the dialog, it calls `handleRemoveNote(false)` to abort.
// This ensures users must explicitly confirm before a note is permanently deleted.
const RemoveNoteWarning: React.FC<{
  warning: boolean;
  handleRemoveNote: (action: boolean) => void;
}> = ({ warning, handleRemoveNote }) => {
  return (
    <AlertDialog open={warning} onOpenChange={() => handleRemoveNote(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            selected note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleRemoveNote(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-custom-500 text-white hover:bg-custom-400"
            onClick={() => handleRemoveNote(true)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveNoteWarning;
