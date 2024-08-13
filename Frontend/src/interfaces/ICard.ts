import { IUser } from "./IUser";

export interface ICard {
  id: string;
  position: number;
  title: string;
  description: string;
  listId: string;
  createAt: string;
  members: Pick<IUser, "id" | "username" | "email">[];
}
