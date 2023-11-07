import React from "react";

type TodoColumnProps = {
  item: todoObj;
};

interface todoObj {
  id: string;
  name: string;
  description: string;
  status: string;
}
const TodoColumn: React.FC<TodoColumnProps> = ({ item }) => {
  return <div>Have a good coding {item?.name}</div>;
};
export default TodoColumn;
