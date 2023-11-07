import { todoObj } from "@/types";
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
    id: item.id + boardId,
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
        className=" min-w-[100%] w-[100%] p-2 mb-2 rounded-lg border border-pink box-border relative"
        ref={setNodeRef}
        key={key}
      >
        {item.name}
        {item.id}

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
    >
      {item.name}
      {item.id}
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
