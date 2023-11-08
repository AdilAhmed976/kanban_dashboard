import { todoObj } from "@/types";
import { SortableContext } from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import TaskCard from "./TaskCard";

type InProgressColumnProps = {
  items: todoObj[];
  boardId: string;
};

const InProgressColumn: React.FC<InProgressColumnProps> = ({
  items,
  boardId,
}) => {
  const todoId = useMemo(() => items.map((col) => col.id), [items]);

  return (
    <div className="w-[33%] -h-[100%]">
      <text>In Progress</text>
      <div className="w-[100%] h-[90%] overflow-x-hidden overflow-y-scroll">
        {/* <SortableContext items={todoId}> */}
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
        {/* </SortableContext> */}
      </div>
    </div>
  );
};
export default InProgressColumn;
