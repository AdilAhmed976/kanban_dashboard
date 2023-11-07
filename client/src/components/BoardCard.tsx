import React, { useState } from "react";
import TodoColumn from "./TodoColumn";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface BoardCardProps {
  board: boardObj; // Specify that the 'board' prop should be of type 'boardObj'
}

interface boardObj {
  id: string;
  name: string;
  description: string;
}
interface todoObj {
  id: string;
  name: string;
  description: string;
  status: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const [todos, setTodos] = useState<todoObj[]>([]);

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

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="p-2 min-w-[50%] w-[50%] border border-white h-[90%]"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-2 min-w-[50%] w-[50%] border border-white h-[90%]"
    >
      <div className="p-1">
        <p>{board.id}</p>
        <p className="truncate">{board.name}</p>
        <p className="truncate">{board.description}</p>
      </div>
      {/* <TodoColumn item={todos.filter((t: todoObj) => t.status === "TODO")} /> */}
      {/* <InProgressColoumn /> */}
      {/* <CompletedColoumn /> */}
    </div>
  );
};
export default BoardCard;
