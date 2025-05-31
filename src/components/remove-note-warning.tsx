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
