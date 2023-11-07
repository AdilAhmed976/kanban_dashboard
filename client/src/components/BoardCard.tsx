import React, { useMemo, useState } from "react";
import TodoColumn from "./TodoColumn";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { generateId } from "@/common/utils";
import { MdDragIndicator } from "react-icons/md";

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
  const [todos, setTodos] = useState<todoObj[]>([
    {
      id: generateId(),
      name: "string",
      description: "string",
      status: "TODO",
    },
    {
      id: generateId(),
      name: "string",
      description: "string",
      status: "TODO",
    },
    {
      id: generateId(),
      name: "string",
      description: "string",
      status: "TODO",
    },
    {
      id: generateId(),
      name: "string",
      description: "string",
      status: "TODO",
    },
    {
      id: generateId(),
      name: "string",
      description: "string",
      status: "TODO",
    },
    {
      id: generateId(),
      name: "string",
      description: "string",
      status: "TODO",
    },
    {
      id: generateId(),
      name: "string",
      description: "string",
      status: "TODO",
    },
    {
      id: generateId(),
      name: "string",
      description: "string",
      status: "TODO",
    },
    {
      id: generateId(),
      name: "string",
      description: "string",
      status: "TODO",
    },
    {
      id: generateId(),
      name: "string",
      description: "string",
      status: "TODO",
    },
  ]);

  const todosTodo = useMemo(() => todos.filter((t) => t.status === "TODO"), []);
  const todosInProgress = useMemo(
    () => todos.filter((t) => t.status === "IN_PROGRESS"),
    []
  );
  const todosCompleted = useMemo(
    () => todos.filter((t) => t.status === "COMPLETED"),
    [todos]
  );

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
      ref={setNodeRef}
      className="p-2 min-w-[70%] w-[70%] border border-white h-[90%] rounded-lg"
    >
      <div className="p-1">
        <MdDragIndicator
          {...attributes}
          {...listeners}
          color={"white"}
          className=":hover bg-red"
        />
        <p>{board.id}</p>
        <p className="truncate">{board.name}</p>
        <p className="truncate">{board.description}</p>
      </div>
      <div className="p-2 h-[80%] border-white flex flex-row">
        <TodoColumn items={todosTodo} boardId={board.id} />
        {/* <TodoColumn items={todosInProgress} />
        <TodoColumn items={todosCompleted} /> */}
      </div>
    </div>
  );
};
export default BoardCard;
