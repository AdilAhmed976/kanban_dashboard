import { SortableContext } from "@dnd-kit/sortable";
import React, { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { todoObj } from "@/types";
import { DndContext } from "@dnd-kit/core";

type TodoColumnProps = {
  items: todoObj[];
  boardId: string;
};

const TodoColumn: React.FC<TodoColumnProps> = ({ items, boardId }) => {
  // const todoId = useMemo(() => items.map((col) => col.id), [items]);

  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTododDescription] = useState("");
  const [toggle, setToggle] = useState(false);
  return (
    <div className="w-[33%] h-[100%]">
      <div>Todo</div>
      <div className="w-[100%] h-[90%] overflow-x-hidden overflow-y-scroll">
        {/* <DndContext> */}
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
        {/* </DndContext> */}
      </div>
      <div className="relative w-[100%] border-2">
        <button
          onClick={() => setToggle((prev) => !prev)}
          className="w-[100%] bg-red-500 h-[100%] rounded-sm"
        >
          {toggle ? "Confirm" : "Add"}
        </button>

        {toggle ? (
          <div className="absolute top-[-20] bg-black-400 p-2 border-2 border-white z-100000">
            <input
              className="w-[100%] bg-pink-300"
              placeholder="Add Name"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
            />
            <input
              className="w-[100%] bg-pink-300"
              placeholder="Add Description"
              value={todoDescription}
              onChange={(e) => setTododDescription(e.target.value)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default TodoColumn;
