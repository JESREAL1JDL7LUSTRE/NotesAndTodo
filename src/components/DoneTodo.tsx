import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { UserResponseHttpDataTodo } from "@/server/DataTypes";
  import Loading from "./ui/Loading";
  import { Checkbox } from "@/components/ui/checkbox";
  import { useMutation, useQuery } from "@tanstack/react-query";
  import { FetchDataTodo, PushDoneTodoDataRev } from "@/server/DBfunctions";
  import { useQueryClient } from "@tanstack/react-query"

  
  const DoneTodo = () => {
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
      mutationFn: (id: number) => PushDoneTodoDataRev(id),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["TodoItem"]})
      },
      onError: async (error) => {
        alert(`Error: ${error.message}`);
      }
    });
  
    if (TodoError && !TodoIsLoading) {
      alert("Error fetching completed todos");
      return null;
    }
  
    if (TodoIsLoading) {
      return <Loading />;
    }
  
    const completedTodos = TodoData?.filter(todo => todo.TodoDone) || [];
  
    return (
      <div className="flex flex-col w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">Completed ({completedTodos.length})</DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border rounded max-h-96 overflow-y-auto"
            align="start"
          >
            {completedTodos.map(todo => (
              <DropdownMenuItem key={todo.id} className="flex items-center">
                <Checkbox 
                  checked={todo.TodoDone} 
                  className="mr-2 "
                  onClick={() => mutation.mutate(todo.id)}
                />
                {todo.TodoTitle}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  
  export default DoneTodo;
