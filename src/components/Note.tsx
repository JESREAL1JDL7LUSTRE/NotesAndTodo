import AddNote from "./AddNote"
import NoteItem from "./NoteItem"

const Note = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-4xl">Note</h1>
        <div className=" flex justify-center h-[80%] w-2/3 border border-yellow-500 rounded-xl p-3 m-3 bg-yellow-400">
        <NoteItem />
        </div>
        <div className="w-2/3 flex justify-center">
          <AddNote />
        </div>
        
        
    </div>
  )
}

export default Note
