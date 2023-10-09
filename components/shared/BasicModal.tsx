import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  description: React.ReactNode;
  onRedirection?: () => void;
  btnCancel?: boolean;
  //
}
export const BasicModal = ({
  title,
  description,
  open,
  setOpen,
  onRedirection,
  btnCancel = false,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-teal text-white py-2 px-5 rounded-[10px] hover:bg-teal/80"
            onClick={onRedirection && onRedirection}
          >
            Acceptar
          </AlertDialogAction>
          {btnCancel && (
            <AlertDialogCancel className="bg-red-600 text-white py-2 px-5 rounded-[10px] hover:bg-red-600/80 hover:text-white">
              Cancel
            </AlertDialogCancel>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
