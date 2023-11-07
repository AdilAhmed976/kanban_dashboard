"use client";
import { generateId } from "@/common/utils";
import React, { Key, useState } from "react";
import BoardCard from "./BoardCard";

type Kanban_BoardsProps = {};

interface boardsObj {
  id: String;
  name: String;
  description: String;
}

const Kanban_Boards: React.FC<Kanban_BoardsProps> = () => {
  const [boards, setBoards] = useState<boardsObj[]>([
    {
      id: generateId(),
      name: "adil",
      description: "Hello",
    },
  ]);

  const [boardName, setBoardName] = useState<boardsObj[]>([]);
  const handleAddBoard = () => {};

  return (
    <div className="flex flex-col justify-space-between h-screen p-10 gap-10">
      <div className="m-auto flex h-[80%] w-full items-center overflow-x-auto overflow-y-hidden">
        {boards && boards.length > 0 ? (
          boards.map((element: boardsObj) => {
            return <BoardCard key={element.id as Key} />;
          })
        ) : (
          <>Load</>
        )}
      </div>
      <div className="flex flex-col w-[20%] h-[20%] m-auto gap-2">
        <input
          className="bg-transparent border rounded-lg p-2 hover:ring-2"
          placeholder="Add Name..."
        />
        <input
          className="bg-transparent border rounded-lg p-2 hover:ring-2"
          placeholder="Add Description..."
        />
        <button
          onClick={handleAddBoard}
          className="p-2 cursor-pointer rounded-lg border-2 ring-rose-500 hover:ring-2 flex gap-2"
        >
          Add board
        </button>
      </div>
    </div>
  );
};
export default Kanban_Boards;
