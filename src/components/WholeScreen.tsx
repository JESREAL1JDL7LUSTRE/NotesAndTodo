import Note from "./Note"
import Todo from "./Todo"

const WholeScreen = () => {
  return (
    <div id="container" className=" flex justify-center w-full items-center h-screen bg-sky-400">
      <Note />
      <Todo />
    </div>
  )
}

export default WholeScreen
