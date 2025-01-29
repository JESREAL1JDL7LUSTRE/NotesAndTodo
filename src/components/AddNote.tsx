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
import { PushNoteData } from "@/server/DBfunctions"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

const AddNote = () => {

  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => PushNoteData(noteTitle, noteDesc),
    onSuccess: () => {
      setNoteTitle("");
      setNoteDesc("");
      queryClient.invalidateQueries({queryKey:["NoteItem"]})
    },
    onError: async (error) => {
      alert(`Error: ${error.message}`);
    }
  });

    useEffect(() => {
      if (mutation.isSuccess) {
        console.log("success - refetching");
      }
  
    },[mutation.isSuccess])
  
    const handleAddNote = () => {
      mutation.mutate();
    };
  

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
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
                <textarea id="NoteValue" placeholder="Enter Note" className="font-serif font-semibold text-md text-black w-full h-96 resize-none border border-gray-700 rounded" value={noteDesc} onChange={(e) => setNoteDesc(e.target.value)}/>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddNote}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

export default AddNote
