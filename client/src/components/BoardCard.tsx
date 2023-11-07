import React, { useState } from "react";
import TodoColoumn from "./TodoColumn";
import TodoColumn from "./TodoColumn";

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

  return (
    <div className="p-2 min-w-[50%] w-[50%] border border-black">
      <div className="p-1">
        <p>{board.name}</p>
        <p className="truncate">{board.description}</p>
      </div>
      <TodoColumn item={todos.filter((t: todoObj) => t.status === "TODO")} />
      {/* <InProgressColoumn /> */}
      {/* <CompletedColoumn /> */}
    </div>
  );
};
export default BoardCard;
