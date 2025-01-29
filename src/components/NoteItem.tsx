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
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserResponseHttpDataNote } from "@/server/DataTypes";
import { DelNoteData, FetchDataNote, UpdateNoteData } from "@/server/DBfunctions";
import Loading from "./ui/Loading";
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react";

const NoteItem = () => {

    const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const {
    data: NoteData,
    error: NoteError,
    isLoading: NoteIsLoading,
  } = useQuery<UserResponseHttpDataNote[]>({
    queryKey: ["NoteItem"],
    queryFn: FetchDataNote,
  });

  const queryClient = useQueryClient();

  const mutationDel = useMutation({
    mutationFn: (id: number) => DelNoteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["NoteItem"]})
    },
    onError: async (error) => {
      alert(`Error: ${error.message}`);
    }
  });

  
    const mutationUpd = useMutation({
      mutationFn: ({ id, NoteTitle, NoteDesc }: { id: number, NoteTitle: string, NoteDesc: string }) => UpdateNoteData(id, NoteTitle, NoteDesc),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["NoteItem"]})
      },
      onError: async (error) => {
        alert(`Error: ${error.message}`);
      }
    });

  if (NoteError && !NoteIsLoading) {
    alert("Error on Fetching Note Bruhh");
    console.error(NoteError);
    return null;
  }

  if (NoteIsLoading) {
    return <Loading />;
  }

  return (
    <ul className="w-full">
      {NoteData?.map((DBforNote) => (
        <li key={DBforNote.id}>
          <div className="w-full justify-center p-1">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="w-full h-11 flex justify-center ">
                  <Button variant="outline" className="w-full h-11 justify-center font-bold">
                    {DBforNote.NoteTitle}
                  </Button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="h-16 w-full text-3xl font-serif font-bold">
                      <input
                        id="NoteTitle"
                        defaultValue={DBforNote.NoteTitle} 
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="font-bold text-black border-none p-0 m-0 w-full h-full"
                      />
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <textarea
                      id="NoteValue"
                      defaultValue={DBforNote.NoteDesc}
                      onChange={(e) => setEditedDesc(e.target.value)}
                      className="font-serif font-semibold text-md text-black w-full h-96 resize-none border border-gray-700 rounded"
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => mutationDel.mutate(DBforNote.id)}>Delete</AlertDialogAction>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction onClick={() => mutationUpd.mutate({ id: DBforNote.id, 
                    NoteTitle: editedTitle || DBforNote.NoteTitle, 
                    NoteDesc: editedDesc || DBforNote.NoteDesc })}>Save</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </li>
      ))}
    </ul>
  );  
};

export default NoteItem;
