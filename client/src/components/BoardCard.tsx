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
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";

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
      {
        id: generateId(),
        name: "stringkdk",
        description: "string",
        status: "TODO",
      },
      {
        id: generateId(),
        name: "strin,l;s',l',g",
        description: "string",
        status: "TODO",
      },
      {
        id: generateId(),
        name: "straLNajdnAJNOing",
        description: "string",
        status: "TODO",
      },
    ],
    in_progress: [
      {
        id: generateId(),
        name: "strinLKMSLKMg",
        description: "stC;KSMKMKring",
        status: "IN_PROGRESS",
      },
      {
        id: generateId(),
        name: "strinCASLMKSg",
        description: "C'LS,DLLKASPDtring",
        status: "IN_PROGRESS",
      },
      {
        id: generateId(),
        name: "Lsmlktring",
        description: "string",
        status: "IN_PROGRESS",
      },
      {
        id: generateId(),
        name: "string",
        description: "string",
        status: "IN_PROGRESS",
      },
      {
        id: generateId(),
        name: "string",
        description: "string",
        status: "IN_PROGRESS",
      },
    ],
    completed: [],
  });

  const [activeTask, setActiveTask] = useState<todoObj | null>(null);

  const todoId = useMemo(() => {
    let todo = todos.todo?.map((col) => col.id);
    let progress = todos.in_progress?.map((col) => col.id);
    let completed = todos.completed?.map((col) => col.id);
    return [...todo, ...progress, ...completed];
  }, [todos]);
  console.log("🚀 ~ file: BoardCard.tsx:81 ~ todoId ~ todoId:", todoId);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current?.item);
      return;
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
  };
  const onDragOver = () => {};

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
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div
        style={style}
        ref={setNodeRef}
        className="p-2 min-w-[70%] w-[70%] border border-white h-[90%] rounded-lg"
      >
        <div className="p-1">
          <div className="flex gap-2 align-center border-2">
            <MdDragIndicator {...attributes} {...listeners} color={"white"} />
            <p className="truncate">{board.name}</p>
          </div>
          <p className="truncate">{board.description}</p>
        </div>
        <div className="p-2 h-[80%] border-white flex flex-row gap-4">
          <SortableContext items={todoId}>
            <TodoColumn items={todos.todo} boardId={board.id} />
            <InProgressColumn items={todos.in_progress} boardId={board.id} />
            <CompletedColumn items={todos.completed} boardId={board.id} />
          </SortableContext>
        </div>
      </div>
      {createPortal(
        <DragOverlay>
          {activeTask && (
            <TaskCard
              key={activeTask.id}
              item={activeTask}
              boardId={"CUSTOME"}
              allItems={[]}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
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
