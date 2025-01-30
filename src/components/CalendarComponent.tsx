import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar1Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Loading from "./ui/Loading";
import { FetchDataTodo } from "@/server/DBfunctions";
import { UserResponseHttpDataTodo } from "@/server/DataTypes";

const CalendarComponent = () => {
  const {
    data: TodoData,
    error: TodoError,
    isLoading: TodoIsLoading,
  } = useQuery<UserResponseHttpDataTodo[]>({
    queryKey: ["TodoItem"],
    queryFn: FetchDataTodo,
  });

  const [hoveredTodo, setHoveredTodo] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  if (TodoError && !TodoIsLoading) {
    alert("Error in Fetching Todo Bruhh");
    return null;
  }

  if (TodoIsLoading) {
    return <Loading />;
  }

  // Extract dates with todos
  const todoDates = TodoData?.map((todo) => new Date(todo.TodoDate)) || [];

  const handleDateHover = (date: Date | undefined) => {
    if (!date) return;

    // Find the todo for the hovered date
    const todoForDate = TodoData?.find(
      (todo) => new Date(todo.TodoDate).toDateString() === date.toDateString()
    );

    if (todoForDate) {
      setHoveredTodo(todoForDate.TodoTitle);
      setPopoverOpen(true);
    } else {
      setHoveredTodo(null);
      setPopoverOpen(false);
    }
  };

  return (
    <div className="p-2">
      <Popover>
        <PopoverTrigger className="p-2">
          <Calendar1Icon className="size-10 bg-white rounded" />
        </PopoverTrigger>
        <PopoverContent className="relative">
          <div
            onMouseLeave={() => {
              setPopoverOpen(false);
              setHoveredTodo(null);
            }}
          >
            <Calendar
              mode="single"
              onDayMouseEnter={handleDateHover}
              className="rounded-md border"
              modifiers={{
                hasTodo: todoDates, // This marks the dates that have todos
              }}
              modifiersClassNames={{
                hasTodo: "bg-green-500 text-white hover:bg-green-600", // Apply styles
              }}
            />
            {popoverOpen && hoveredTodo && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white p-2 border rounded shadow-lg z-10">
                <p>Todo: {hoveredTodo}</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarComponent;
