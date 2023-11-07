import React, { useMemo, useState } from "react";
import TodoColumn from "./TodoColumn";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { generateId } from "@/common/utils";
import { MdDragIndicator } from "react-icons/md";
import InProgressColumn from "./InProgressColumn";
import CompletedColumn from "./CompletedColumn";
import { todoObj } from "@/types";
import TaskCard from "./TaskCard";

interface BoardCardProps {
  board: boardObj; // Specify that the 'board' prop should be of type 'boardObj'
}

interface boardObj {
  id: string;
  name: string;
  description: string;
}
const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.id,
    data: {
      type: "board",
      board,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const [todos, setTodos] = useState<{
    todo: todoObj[];
    in_progress: todoObj[];
    completed: todoObj[];
  }>({
    todo: [
      { id: "string", name: "string", description: "string", status: "TODO" },
      { id: "string-2", name: "string", description: "string", status: "TODO" },
      { id: "string-3", name: "string", description: "string", status: "TODO" },
    ],
    in_progress: [],
    completed: [],
  });

  const todoId = useMemo(() => todos.todo?.map((col) => col.id), [todos]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="p-2 min-w-[70%] w-[70%] border border-white h-[90%] rounded-lg opacity-40 border-2 border-pink-500"
      >
        <div className="p-1" {...attributes} {...listeners}>
          <p>{board.id}</p>
          <p className="truncate">{board.name}</p>
          <p className="truncate">{board.description}</p>
        </div>
        <div className="p-2 h-[80%] border-white flex flex-row"></div>
      </div>
    );
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="p-2 min-w-[70%] w-[70%] border border-white h-[90%] rounded-lg"
    >
      <div className="p-1">
        <MdDragIndicator {...attributes} {...listeners} color={"white"} />
        <p>{board.id}</p>
        <p className="truncate">{board.name}</p>
        <p className="truncate">{board.description}</p>
      </div>
      <div className="p-2 h-[80%] border-white flex flex-row">
        <TodoColumn items={todos.todo} boardId={board.id} />
        <InProgressColumn items={todos.in_progress} boardId={board.id} />
        <CompletedColumn items={todos.completed} boardId={board.id} />
      </div>
    </div>
  );
};
export default BoardCard;

//  <div className="w-[33%] h-[100%]">
//   <div>Todo</div>
//   <div className="w-[100%] h-[90%] border border-red-500 overflow-x-hidden overflow-y-scroll">
//     {/* <DndContext> */}
//     <SortableContext items={todoId}>
//       {todos.todo?.map((el: todoObj) => {
//         return (
//           <TaskCard
//             key={el.id}
//             item={el}
//             boardId={board.id}
//             allItems={todos.todo}
//           />
//         );
//       })}
//     </SortableContext>
//     {/* </DndContext> */}
//   </div>
// </div>
