import AddTodo from "./AddTodo"
import DoneTodo from "./DoneTodo"
import TodoItem from "./TodoItem"

const Todo = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full flex-col font-serif font-bold">
        <h1 className="text-4xl">Todo</h1>
        <div className="flex justify-center h-[80%] w-2/3 border-2 border-green-600 bg-yellow-300 rounded-xl p-3 m-3 font-serif font-bold">
        <div className="flex flex-col w-full h-full overflow-auto">
          <DoneTodo />
            <div className="flex flex-col w-full mt-3 h-full overflow-auto scrollbar-hide">
              <TodoItem />
            </div>
        </div>
        </div>
        <div className="w-full flex justify-center">
          <AddTodo />
        </div>
    </div>
  )
}

export default Todo
