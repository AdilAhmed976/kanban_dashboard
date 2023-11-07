"use client";
import { generateId } from "@/common/utils";
import React, { Key, useMemo, useState } from "react";
import BoardCard from "./BoardCard";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

type Kanban_BoardsProps = {};

interface boardsObj {
  id: string;
  name: string;
  description: string;
}
interface taskObj {
  id: string;
  name: string;
  description: string;
  status: string;
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
      name: "Asim",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro temporibus ratione nihil, eius veritatis eaque repellendus dolores laudantium provident fugit non suscipit, nulla aperiam sapiente esse voluptate. Aut, dolore animi?",
    },
    {
      id: generateId(),
      name: "Hassan",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro temporibus ratione nihil, eius veritatis eaque repellendus dolores laudantium provident fugit non suscipit, nulla aperiam sapiente esse voluptate. Aut, dolore animi?",
    },
    {
      id: generateId(),
      name: "Dabeer",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro temporibus ratione nihil, eius veritatis eaque repellendus dolores laudantium provident fugit non suscipit, nulla aperiam sapiente esse voluptate. Aut, dolore animi?",
    },
  ]);

  const [boardName, setBoardName] = useState<String | null>(null);
  const [boardDescription, setBoardDescription] = useState<String | null>(null);
  const handleAddBoard = () => {};

  const [activeBoard, setActiveBoard] = useState<boardsObj | null>(null);
  const [activeTask, setActiveTask] = useState<taskObj | null>(null);

  const boardId = useMemo(() => boards.map((col) => col.id), [boards]);

  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     activationConstraint: {
  //       distance: 10,
  //     },
  //   })
  // );
  const onDragStart = (e: any) => {
    console.log("🚀 ~ file: Kanban_Boards.tsx:74 ~ onDragStart ~ e:", e);
    if (e.active.data.current?.type === "board") {
      setActiveBoard(e.active.data.current?.board);
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    setActiveBoard(null);
    const { active, over } = event;
    const activeId = active?.id;
    const overId = over?.id;
    setBoards((board) => {
      const activeIndex = board.findIndex((t) => t.id === activeId);
      const overIndex = board.findIndex((t) => t.id === overId);
      return arrayMove(boards, activeIndex, overIndex);
    });
    
  };
  const onDragOver = (event:DragOverEvent) => {
    
  };

  return (
    <div className="flex flex-col justify-space-between h-screen p-10 gap-10 bg-black">
      <div className="m-auto flex gap-4 h-[90%] w-full items-center overflow-x-auto overflow-y-hidden">
        <DndContext
          // sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <SortableContext items={boardId}>
            {boards?.map((element: boardsObj) => {
              return <BoardCard key={element.id as Key} board={element} />;
            })}
          </SortableContext>

          {createPortal(
            <DragOverlay>
              {activeBoard && <BoardCard board={activeBoard} />}
            </DragOverlay>,
            document.body
          )}
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
