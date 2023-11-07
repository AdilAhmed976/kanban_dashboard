import { todoObj } from "@/types";
import { SortableContext } from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import TaskCard from "./TaskCard";

type InProgressColoumnProps = {
  items: todoObj[];
};

const InProgressColoumn: React.FC<InProgressColoumnProps> = ({ items }) => {
  const todoId = useMemo(() => items.map((col) => col.id), [items]);
  return (
    <div className="w-[33%] -h-[100%]">
      <text>Todo</text>
      <div className="w-[100%] h-[90%] overflow-x-hidden overflow-y-scroll">
        <SortableContext items={todoId}>
          {items?.map((el: todoObj) => {
            return (
              <TaskCard
                key={el.id}
                item={el}
                boardId={boardId}
                allItems={items}
              />
            );
          })}
        </SortableContext>
      </div>
    </div>
  );
};
export default InProgressColoumn;
