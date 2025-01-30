import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { PopoverContent } from "./ui/popover";
import { Input } from "./ui/input";
import { PushTodoData } from "@/server/DBfunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DatePickerWithPresets } from "./DatePicker";

const AddTodo = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // Control popover state

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => PushTodoData(todoTitle, todoDesc, false, new Date(todoDate)),
    onSuccess: () => {
      setTodoTitle("");
      setTodoDesc("");
      setTodoDate("");
      queryClient.invalidateQueries({ queryKey: ["TodoItem"] });
      setIsPopoverOpen(false); // Close the popover after success
    },
    onError: async (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      console.log("Success - refetching");
    }
  }, [mutation.isSuccess]);

  const handleAddTodo = () => {
    mutation.mutate();
  };

  return (
    <div className="w-2/3 flex justify-center items-center">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="w-full flex"
            onClick={() => setIsPopoverOpen(true)}
          >
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] font-serif items-center justify-center" 
          align="start"
        >
          <Input
            placeholder="Enter Todo"
            className="w-full m-1"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <Input
            placeholder="Enter Description"
            className="w-full m-1"
            value={todoDesc}
            onChange={(e) => setTodoDesc(e.target.value)}
          />
          <div className="flex justify-center m-1">
            <DatePickerWithPresets onChange={(date) => setTodoDate(date)} />
          </div>
          <div className="flex justify-center items-center">
            <Button
              variant="outline"
              size="icon"
              className="w-2/3 flex m-2 hover:bg-yellow-400"
              onClick={handleAddTodo}
            >
              <Plus />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddTodo;
