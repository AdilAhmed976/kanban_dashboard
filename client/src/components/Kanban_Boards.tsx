"use client";
import { generateId } from "@/common/utils";
import React, { Key, useMemo, useState } from "react";
import BoardCard from "./BoardCard";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { boardsObj, todoObj } from "@/types";
import TaskCard from "./TaskCard";

type Kanban_BoardsProps = {};

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

  const [boardName, setBoardName] = useState<string>("");
  const [boardDescription, setBoardDescription] = useState<string>("");
  const handleAddBoard = () => {
    if (!boardName || !boardDescription) {
      alert("Name / Description Cannot be Empty");
      return;
    }
    let obj: boardsObj = {
      id: generateId(),
      name: boardName,
      description: boardDescription,
    };
    setBoards([...boards, obj]);
  };

  const [activeBoard, setActiveBoard] = useState<boardsObj | null>(null);
  const [activeTask, setActiveTask] = useState<todoObj | null>(null);
  // console.log("🚀 ~ file: Kanban_Boards.tsx:65 ~ activeBoard:", activeBoard);
  // console.log("🚀 ~ file: Kanban_Boards.tsx:67 ~ activeTask:", activeTask);

  const boardId = useMemo(() => boards.map((col) => col.id), [boards]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "board") {
      setActiveBoard(event.active.data.current?.board);
      return;
    }
    // if (event.active.data.current?.type === "task") {
    //   setActiveTask(event.active.data.current?.item);
    //   return;
    // }
  };
  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    setActiveBoard(null);

    const { active, over } = event;
    const activeId = active?.id;
    const overId = over?.id;
    if (activeBoard) {
      setBoards((board) => {
        const activeIndex = board.findIndex((t) => t.id === activeId);
        const overIndex = board.findIndex((t) => t.id === overId);
        return arrayMove(boards, activeIndex, overIndex);
      });
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    console.log(
      "🚀 ~ file: Kanban_Boards.tsx:119 ~ onDragOver ~ active:",
      active
    );

    let activeBoardId = active?.data?.current?.item?.boardId;
    let overBoardId = over?.data?.current?.item?.boardId;
    if (activeBoardId !== overBoardId) return;
    console.log(
      "🚀 ~ file: Kanban_Boards.tsx:117 ~ onDragOver ~ event:",
      event
    );
    // setActiveTask(null);
    // setActiveBoard(null);
  };

  return (
    <div className="flex flex-col justify-space-between h-screen p-4 gap-4 bg-black">
      <div className="m-auto flex gap-4 h-[100%] w-full items-center overflow-x-auto overflow-y-hidden">
        <DndContext
          sensors={sensors}
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
              {activeBoard && (
                <BoardCard key={activeBoard?.id as Key} board={activeBoard} />
              )}
              {/* {activeTask && (
                <TaskCard
                  key={activeTask.id}
                  item={activeTask}
                  boardId={"CUSTOME"}
                  allItems={[]}
                />
              )} */}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
      <div className="flex flex-col m-auto gap-2 border-2 border-red-300 w-[100%]">
        <div className="flex flex-row gap-4">
          <input
            value={boardName}
            onChange={(e) => {
              setBoardName(e.target.value);
            }}
            className="bg-transparent border rounded-lg p-2 hover:ring-2"
            placeholder="Add Name..."
          />
          <input
            value={boardDescription}
            onChange={(e) => {
              setBoardDescription(e.target.value);
            }}
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
