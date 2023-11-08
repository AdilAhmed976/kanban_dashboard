export interface todoObj {
  id: string;
  name: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
}

export interface boardsObj {
  id: string;
  name: string;
  description: string;
}
