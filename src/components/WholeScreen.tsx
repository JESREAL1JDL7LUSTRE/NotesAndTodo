import Note from "./Note"
import Todo from "./Todo"

const WholeScreen = () => {
  return (
    <div id="container" className=" flex justify-center w-full items-center h-screen bg-green-400">
      <Note />
      <Todo />
      
      
    </div>
  )
}

export default WholeScreen
