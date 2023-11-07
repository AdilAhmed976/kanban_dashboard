"use client";
import { generateId } from "@/common/utils";
import React, { Key, useMemo, useState } from "react";
import BoardCard from "./BoardCard";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

type Kanban_BoardsProps = {};

interface boardsObj {
  id: string;
  name: string;
  description: string;
}

const Kanban_Boards: React.FC<Kanban_BoardsProps> = () => {
  const [boards, setBoards] = useState<boardsObj[]>([
    {
      id: generateId(),
      name: "adil",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro temporibus ratione nihil, eius veritatis eaque repellendus dolores laudantium provident fugit non suscipit, nulla aperiam sapiente esse voluptate. Aut, dolore animi?",
    },
    {
      id: generateId(),
      name: "adil",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro temporibus ratione nihil, eius veritatis eaque repellendus dolores laudantium provident fugit non suscipit, nulla aperiam sapiente esse voluptate. Aut, dolore animi?",
    },
    {
      id: generateId(),
      name: "adil",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro temporibus ratione nihil, eius veritatis eaque repellendus dolores laudantium provident fugit non suscipit, nulla aperiam sapiente esse voluptate. Aut, dolore animi?",
    },
    {
      id: generateId(),
      name: "adil",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro temporibus ratione nihil, eius veritatis eaque repellendus dolores laudantium provident fugit non suscipit, nulla aperiam sapiente esse voluptate. Aut, dolore animi?",
    },
  ]);

  const [boardName, setBoardName] = useState<boardsObj[]>([]);
  const handleAddBoard = () => {};

  const boardId = useMemo(() => boards.map((col) => col.id), [boards]);

  return (
    <div className="flex flex-col justify-space-between h-screen p-10 gap-10 bg-black">
      <div className="m-auto flex gap-4 h-[90%] w-full items-center overflow-x-auto overflow-y-hidden">
        <DndContext
        // sensors={sensors}
        // // onDragStart={onDragStart}
        // onDragEnd={onDragEnd}
        // onDragOver={onDragOver}
        >
          <SortableContext items={boardId}>
            {boards?.map((element: boardsObj) => {
              return <BoardCard key={element.id as Key} board={element} />;
            })}
          </SortableContext>
        </DndContext>
      </div>
      <div className="flex flex-col m-auto gap-2">
        <div className="flex flex-row gap-4">
          <input
            className="bg-transparent border rounded-lg p-2 hover:ring-2"
            placeholder="Add Name..."
          />
          <input
            className="bg-transparent border rounded-lg p-2 hover:ring-2"
            placeholder="Add Description..."
          />
        </div>
        <button
          onClick={handleAddBoard}
          className="p-2 cursor-pointer rounded-lg border-2 ring-rose-500 hover:ring-2 flex gap-2 "
        >
          Add board
        </button>
      </div>
    </div>
  );
};
export default Kanban_Boards;
