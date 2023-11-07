import React from "react";

interface BoardCardProps {
  board: boardObj; // Specify that the 'board' prop should be of type 'boardObj'
}

interface boardObj {
  id: string; // Use lowercase 'string' instead of 'String'
  name: string;
  description: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  return (
    <div className="p-10 min-w-[50%] w-[50%] border border-black">
      {board.description}
    </div>
  );
};
export default BoardCard;
