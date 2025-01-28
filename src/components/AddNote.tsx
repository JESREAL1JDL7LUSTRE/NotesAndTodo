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
  import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


const AddNote = () => {
  return (
    <div className=" w-full justify-center">
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" className="w-full"><Plus/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="h-16 w-full text-3xl">
                <input
                id="NoteTitle"
                  placeholder="Enter Note Title"
                  className="font-bold text-black border-none  p-0 m-0 w-full h-full"
                />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
                <textarea id="NoteValue" placeholder="Enter Note" className="font-serif font-semibold text-md text-black w-full h-96 resize-none border border-gray-700 rounded" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

export default AddNote
