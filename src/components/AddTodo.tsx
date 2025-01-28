import { Popover, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { PopoverContent } from "./ui/popover"
import { Input } from "./ui/input"

const AddTodo = () => {
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
            align="start"
          >
            <Input placeholder="Enter Todo" className="w-full m-1 " />
            <Input placeholder="Enter Description" className="w-full m-1" />
            <div className="flex justify-center items-center">
                <Button variant="outline" size="icon" className="w-2/3  flex m-2 hover:bg-yellow-400"><Plus/></Button></div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

export default AddTodo
