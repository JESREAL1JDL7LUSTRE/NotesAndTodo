import AddNote from "./AddNote"
import NoteItem from "./NoteItem"

const Note = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center font-bold font-serif">
        <h1 className="text-4xl">Note</h1>
        <div className="font-serif flex justify-center h-[80%] w-2/3 border-2 border-green-600 rounded-xl p-3 m-3 bg-yellow-300 overflow-auto scrollbar-hide">
        <NoteItem />
        </div>
        <div className="w-2/3 flex justify-center">
          <AddNote />
        </div>
        
        
    </div>
  )
}

export default Note
