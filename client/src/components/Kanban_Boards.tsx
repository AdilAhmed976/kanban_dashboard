'use client'
import { generateId } from "@/common/utils";
import React, { Key, useState } from "react";

type Kanban_BoardsProps = {};

interface boardsObj {
  id: String;
  name: String;
  description: String;
}

const Kanban_Boards: React.FC<Kanban_BoardsProps> = () => {
  const [boards, setBoards] = useState<boardsObj[]>([
    {
      id: generateId(),
      name: "adil",
      description: "Hello",
    },
    {
      id: generateId(),
      name: "adil",
      description: "Hello",
    },
  ]);

  return (
    <div>
      {boards.length > 0 ? (
        boards.map((element: boardsObj) => {
          return <div key={element.id as Key}>{element.name}</div>;
        })
      ) : (
        <>Load</>
      )}
    </div>
  );
};
export default Kanban_Boards;
