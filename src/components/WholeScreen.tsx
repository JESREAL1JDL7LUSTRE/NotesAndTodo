import Note from './Note'
import Todo from './Todo'

const WholeScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Note />
      <Todo />
    </div>
  )
}

export default WholeScreen
