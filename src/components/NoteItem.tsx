import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

const NoteItem = () => {
  const [noteTitle] = useState("NoteItemSample");
  const [noteDescription] = useState("NoteItemDescription");

  return (
    <div className=" w-full justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className=" w-full h-11 justify-center">
            <Button variant="outline" className=" w-full h-11 justify-center">{noteTitle}
            </Button>
            </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
            <div className="h-16 w-full text-3xl">
                <input
                id="NoteTitle"
                  defaultValue={noteTitle}
                  className="font-bold text-black border-none  p-0 m-0 w-full h-full"
                />
            </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              
                <textarea id="NoteValue" defaultValue={noteDescription} className="font-serif font-semibold text-md text-black w-full h-96 resize-none border border-gray-700 rounded" />
                
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Delete</AlertDialogAction>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NoteItem;