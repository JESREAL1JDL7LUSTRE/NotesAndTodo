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
import { Input } from "./ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DelTodoData, FetchDataTodo, PushDoneTodoData, UpdateTodoData } from "@/server/DBfunctions";
import { UserResponseHttpDataTodo } from "@/server/DataTypes";
import Loading from "./ui/Loading";
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react";
import { DatePickerWithPresets } from "./DatePicker";

const TodoItem = () => {

  const [editedTitle, setEditedTitle] = useState("");
const [editedDesc, setEditedDesc] = useState("");
const [editedDate, setEditedDate] = useState("");

  const {
    data: TodoData,
    error: TodoError,
    isLoading: TodoIsLoading,
  } = useQuery<UserResponseHttpDataTodo[]>({
    queryKey: ["TodoItem"],
    queryFn: FetchDataTodo,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => PushDoneTodoData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["TodoItem"]})
    },
    onError: async (error) => {
      alert(`Error: ${error.message}`);
    }
  });

  const mutationDel = useMutation({
    mutationFn: (id: number) => DelTodoData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["TodoItem"]})
    },
    onError: async (error) => {
      alert(`Error: ${error.message}`);
    }
  });

  const mutationUpd = useMutation({
    mutationFn: ({ id, TodoTitle, TodoDesc, TodoDate }: { id: number, TodoTitle: string, TodoDesc: string, TodoDate: Date}) => UpdateTodoData(id, TodoTitle, TodoDesc, TodoDate),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["TodoItem"]})
    },
    onError: async (error) => {
      alert(`Error: ${error.message}`);
    }
  });



  if (TodoError && !TodoIsLoading) {
    alert("Error in Fetching Todo Bruhh");
    return null;
  }

  if (TodoIsLoading) {
    return <Loading />;
  }

  return (
    <ul>
      {TodoData?.filter(todo => !todo.TodoDone).map((DBforTodo) => (
        <li key={DBforTodo.id}>
          <div className="w-full justify-center p-1">
            <AlertDialog>
              <div>
                <div className="items-top flex space-x-2 bg-white p-2 rounded-lg h-11 items-center justify-center relative">
                  <Checkbox id={`todo-${DBforTodo.id}`} onClick={() => mutation.mutate(DBforTodo.id)}/>
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={`todo-${DBforTodo.id}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                    >
                      {DBforTodo.TodoTitle}
                    </label>
                  </div>
                  <AlertDialogTrigger asChild>
                    <div className="w-2 h-11 justify-end absolute right-6">
                      <Button
                        variant="outline"
                        className="w-full h-11 justify-center border-none border-white border-transparent"
                      >
                        <Edit />
                      </Button>
                    </div>
                  </AlertDialogTrigger>
                </div>
              </div>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="h-16 w-full text-3xl font-serif">
                      <input
                        id="TodoTitle"
                        defaultValue={DBforTodo.TodoTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="font-bold text-black border-none p-0 m-0 w-full h-full"
                      />
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <Input
                    className="font-serif text-slate-800"
                      placeholder="Enter Todo"
                      defaultValue={DBforTodo.TodoDesc}
                      onChange={(e) => setEditedDesc(e.target.value)}
                    />
                  </AlertDialogDescription>
                  <DatePickerWithPresets defaultValue={DBforTodo.TodoDate ? new Date(DBforTodo.TodoDate) : undefined} 
  onChange={(dateString) => setEditedDate(dateString)}></DatePickerWithPresets>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className="" onClick={() => mutationDel.mutate(DBforTodo.id)}>
                    Delete
                  </AlertDialogAction>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction onClick={() => mutationUpd.mutate({ id: DBforTodo.id, 
                    TodoTitle: editedTitle || DBforTodo.TodoTitle, 
                    TodoDesc: editedDesc || DBforTodo.TodoDesc,
                    TodoDate: new Date (editedDate || DBforTodo.TodoDate)})}>Save</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoItem;
