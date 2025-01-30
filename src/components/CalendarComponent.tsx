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

  const [hoveredTodo, setHoveredTodo] = useState<string[] | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  if (TodoError && !TodoIsLoading) {
    alert("Error in Fetching Todo Bruhh");
    return null;
  }

  if (TodoIsLoading) {
    return <Loading />;
  }

    // Process todos into red, green, yellow dates
    const groupedTodos = TodoData?.reduce((acc, todo) => {
      const todoDate = new Date(todo.TodoDate);
      const dateStr = todoDate.toDateString();
      if (!acc[dateStr]) {
        acc[dateStr] = {
          count: 1,
          hasUndone: !todo.TodoDone,
        };
      } else {
        acc[dateStr].count += 1;
      }
      return acc;
    }, {} as Record<string, { count: number; hasUndone: boolean }>);
  
    const redDates: Date[] = [];
    const greenDates: Date[] = [];
    const yellowDates: Date[] = [];
  
    if (groupedTodos) {
      Object.entries(groupedTodos).forEach(([dateStr, { count, hasUndone }]) => {
        const date = new Date(dateStr);
        if (count > 1) {
          yellowDates.push(date);
        } else {
          if (hasUndone) {
            redDates.push(date);
          } else {
            greenDates.push(date);
          }
        }
      });
    }
  
    const handleDateHover = (date: Date | undefined) => {
      if (!date) return;
    
      // Find all todos for the hovered date
      const todosForDate = TodoData?.filter(
        (todo) => new Date(todo.TodoDate).toDateString() === date.toDateString()
      );
    
      if (todosForDate && todosForDate.length > 0) {
        // When there are multiple todos, store the array of TodoTitles
        setHoveredTodo(todosForDate.map(todo => todo.TodoTitle));
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
                  red: redDates,
                  green: greenDates,
                  yellow: yellowDates,
                }}
                modifiersClassNames={{
                  red: "bg-red-300 text-white hover:bg-red-400",
                  green: "bg-green-300 text-white hover:bg-green-400",
                  yellow: "bg-yellow-300 text-white hover:bg-yellow-400",
                }}
              />
              {popoverOpen && hoveredTodo && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white p-2 border rounded shadow-lg z-10">
  {hoveredTodo && Array.isArray(hoveredTodo) ? (
    hoveredTodo.map((title, index) => (
      <p key={index}>Todo: {title}</p>
    ))
  ) : (
    <p>{hoveredTodo}</p>
  )}
</div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };
  
  export default CalendarComponent;