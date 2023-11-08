import { todoObj } from "@/types";
import { DragOverlay } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { MdDragIndicator } from "react-icons/md";

type TaskCardProps = {
  item: todoObj;
  allItems: todoObj[];
  key: string;
  boardId: string;
};

const TaskCard: React.FC<TaskCardProps> = ({
  item,
  boardId,
  key,
  allItems,
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    // id: item.id + boardId,
    id: item.id
    ,
    data: {
      type: "task",
      item: { ...item, boardId },
      allItems,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // if it is dragging
  if (isDragging) {
    return (
      <div
        className=" min-w-[100%] w-[100%] p-2 mb-2 rounded-lg border border-pink-500 box-border relative"
        ref={setNodeRef}
        key={key}
        style={style}
      >
        <text>{item.name}</text>
        <p>{item.id}</p>
        <MdDragIndicator
          {...attributes}
          {...listeners}
          color={"white"}
          className="absolute top-1/2 right-0"
        />
      </div>
    );
  }

  return (
    <div
      className=" min-w-[100%] w-[100%] p-2 mb-2 rounded-lg border border-white box-border relative"
      ref={setNodeRef}
      key={key}
      style={style}
    >
      <text>{item.name}</text>
      <p>{item.id}</p>
      <MdDragIndicator
        {...attributes}
        {...listeners}
        color={"white"}
        className="absolute top-1/2 right-0"
      />
    </div>
  );
};
export default TaskCard;
