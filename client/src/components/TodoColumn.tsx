import { SortableContext } from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import TaskCard from "./TaskCard";
import { todoObj } from "@/types";
import { DndContext } from "@dnd-kit/core";

type TodoColumnProps = {
  items: todoObj[];
  boardId: string;
};

const TodoColumn: React.FC<TodoColumnProps> = ({ items, boardId }) => {
  const todoId = useMemo(() => items.map((col) => col.id), [items]);

  return (
    <div className="w-[33%] h-[100%]">
      <div>Todo</div>
      <div className="w-[100%] h-[90%] border border-red-500 overflow-x-hidden overflow-y-scroll">
        {/* <DndContext> */}
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
        {/* </DndContext> */}
      </div>
    </div>
  );
};
export default TodoColumn;
