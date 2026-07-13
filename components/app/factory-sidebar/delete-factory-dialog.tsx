import type { Factory } from "@/components/app/factory-data";
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

type Props = {
  factory: Factory | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
};

export function DeleteFactoryDialog(props: Props) {
  const { factory, onClose, onConfirm } = props;

  const handleConfirm = () => {
    if (!factory) {
      return;
    }

    onConfirm(factory.id);
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <AlertDialog open={factory !== null} onOpenChange={handleOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить завод?</AlertDialogTitle>
          <AlertDialogDescription>
            {factory
              ? `Завод «${factory.name}» будет удалён без возможности восстановления.`
              : ""}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
