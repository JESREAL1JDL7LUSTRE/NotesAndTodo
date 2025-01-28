import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  const DoneTodo = () => {
    return (
      <div className="flex flex-col w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">Completed</DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border rounded"
            align="start"
          >
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

export default DoneTodo
