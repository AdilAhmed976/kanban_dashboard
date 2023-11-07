export interface todoObj {
  id: string;
  name: string;
  description: string;
  status: "TODO" | "IN-PROGRESS" | "COMPLETED";
}

export interface boardsObj {
  id: string;
  name: string;
  description: string;
}
