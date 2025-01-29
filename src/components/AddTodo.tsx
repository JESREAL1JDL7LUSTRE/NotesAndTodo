import { Popover, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { PopoverContent } from "./ui/popover"
import { Input } from "./ui/input"
import { PushTodoData } from "@/server/DBfunctions"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

const AddTodo = () => {

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => PushTodoData(todoTitle, todoDesc, false),
    onSuccess: () => {
      setTodoTitle("");
      setTodoDesc("");
      queryClient.invalidateQueries({queryKey:["TodoItem"]})
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

  const handleAddTodo = () => {
    mutation.mutate();
  };

    return (
      <div className="w-2/3 flex justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="w-full flex">
              <Plus />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[var(--radix-popover-trigger-width)]" 
            align="start">
            <Input placeholder="Enter Todo" className="w-full m-1 " onChange={(e) => setTodoTitle(e.target.value)}/>
            <Input placeholder="Enter Description" className="w-full m-1" onChange={(e) => setTodoDesc(e.target.value)} />
            <div className="flex justify-center items-center">
                <Button variant="outline" size="icon" className="w-2/3  flex m-2 hover:bg-yellow-400" onClick={handleAddTodo}><Plus/></Button></div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

export default AddTodo
