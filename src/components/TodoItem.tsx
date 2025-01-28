import {useState} from 'react'
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

import { Input } from './ui/input';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from './ui/button';
import { Edit } from 'lucide-react';



const TodoItem = () => {
    const [TodoTitle] = useState("TodoItemSample");
    const [TodoDescription] = useState("TodoItemDescription");

  return (
    <div className=" w-full justify-center">
      <AlertDialog>
      <div>
      <div className="items-top flex space-x-2 bg-white p-2 rounded-lg h-11 items-center justify-center relative">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {TodoTitle}
        </label>
        
      </div>
      <AlertDialogTrigger asChild>
            <div className=" w-2 h-11 justify-end absolute right-6">
                <Button variant="outline" className=" w-full h-11 justify-center border-none border-white border-transparent"><Edit className=""></Edit></Button>
            </div>
          
          </AlertDialogTrigger>
    </div>
          
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="h-16 w-full text-3xl">
                <input
                id="TodoTitle"
                  defaultValue={TodoTitle}
                  className="font-bold text-black border-none  p-0 m-0 w-full h-full"
                />
            </div></AlertDialogTitle>
          <AlertDialogDescription>
          <Input placeholder="Enter Todo" defaultValue={TodoDescription}/>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogAction className="justify-start">Delete</AlertDialogAction>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

export default TodoItem
