import { useState } from 'react';
import Note from "./Note";
import Todo from "./Todo";

const WholeScreen = () => {
  const [activePanel, setActivePanel] = useState<'todo' | 'note'>('todo');

  return (
    <div className="flex h-screen w-full bg-sky-400 overflow-hidden relative">
      <div className="">
      </div>
      <div
        className={`absolute w-full h-full transition-transform duration-300 cursor-pointer ${
          activePanel === 'todo' 
            ? 'translate-x-0 z-10' 
            : '-translate-x-[70%] z-20'
        }`}
        onClick={() => setActivePanel('todo')}
      >
        <Note />
      </div>
      <div
        className={`absolute w-full h-full transition-transform duration-300 cursor-pointer ${
          activePanel === 'note' 
            ? 'translate-x-0 z-10' 
            : 'translate-x-[70%] z-20'
        }`}
        onClick={() => setActivePanel('note')}
      >
        <Todo />
      </div>
    </div>
  );
};

export default WholeScreen